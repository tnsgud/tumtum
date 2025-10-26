"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
	SelectGroup,
	SelectSeparator,
} from "../ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePickerWithInput } from "../ui/date-picker-with-input";
import { browserClient } from "@/lib/supabase.browser";
import { Tables } from "@/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMissionStore } from "@/stores/mission-store";

const addCategory = z.object({
	category: z.string(),
});

type AddCategorySchema = z.infer<typeof addCategory>;

const addTodoSchema = z.object({
	title: z.string().min(1),
	category: z.string().min(1),
	priority: z.string().min(1),
	deadline: z.date(),
});

type AddFormSchema = z.infer<typeof addTodoSchema>;

const priorities = [
	{ id: 0, name: "low" },
	{ id: 1, name: "medium" },
	{ id: 2, name: "high" },
];

export default function AddTodoDialog() {
	const missionRefresh = useMissionStore((state) => state.refresh);
	const [categories, setCategories] = useState<Tables<"category">[]>([]);
	const [open, setOpen] = useState(false);
	const [addCategorDialogOpen, setAddCategoryDialogOpen] = useState(false);
	const addCategoryForm = useForm<AddCategorySchema>({
		resolver: zodResolver(addCategory),
		defaultValues: {
			category: "",
		},
	});
	const form = useForm<AddFormSchema>({
		resolver: zodResolver(addTodoSchema),
		defaultValues: {
			title: "",
			category: "",
			priority: "",
			deadline: new Date(),
		},
	});
	const { formState } = form;
	const isFormValid =
		formState.isValid && Object.values(formState.dirtyFields).length === 4;
	const router = useRouter();

	const categoryDialogOnSubmit = async (formData: AddCategorySchema) => {
		const supabase = browserClient();
		const { error } = await supabase
			.from("category")
			.insert({ name: formData.category, color: "#c7fcff" });

		if (error) {
			alert("문제가 발생했으니 관리자한테 문의하세요.");
			console.log(error);

			return;
		}

		const { data } = await supabase.from("category").select("*");
		setCategories(data ?? []);

		addCategoryForm.reset();
		setAddCategoryDialogOpen(false);
	};

	const onSubmit = async (formData: AddFormSchema) => {
		// 사용자의 로컬 타임존을 고려한 날짜 저장
		// 날짜만 저장하고 시간은 00:00:00으로 설정하여 타임존 문제 방지
		const deadlineDate = new Date(formData.deadline);
		deadlineDate.setHours(0, 0, 0, 0); // 로컬 타임존 기준으로 자정으로 설정

		const supabase = await browserClient();
		const { error } = await supabase.from("mission").insert({
			title: formData.title,
			category_id: Number(formData.category),
			deadline_at: deadlineDate.toISOString(),
			priority: Number(formData.priority),
		});

		if (error) {
			// error 처리
			console.error("미션 저장 오류:", error);
		} else {
			// 성공 시 dialog 닫기
			router.refresh();
			setOpen(false);
			form.reset();
			missionRefresh();
		}
	};

	useEffect(() => {
		async function fetchData() {
			const supabase = browserClient();
			const { data } = await supabase.from("category").select("*");

			setCategories(data ?? []);
		}

		fetchData();
	}, []);

	return (
		<>
			<Dialog
				open={addCategorDialogOpen}
				onOpenChange={(isOpen) => {
					setAddCategoryDialogOpen(isOpen);
				}}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>카테고리 수정</DialogTitle>
					</DialogHeader>
					<Form {...addCategoryForm}>
						<form
							onSubmit={addCategoryForm.handleSubmit(categoryDialogOnSubmit)}
						>
							{/* <FormField
              name='title'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>제목</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={'title'} />
                  </FormControl>
                </FormItem>
              )}
            /> */}
							<FormField
								name="category"
								control={addCategoryForm.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>test</FormLabel>
										<FormControl>
											<Input {...field} placeholder="name" />
										</FormControl>
									</FormItem>
								)}
							/>
							<Button>Add Category</Button>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
			<Dialog
				open={open}
				onOpenChange={(isOpen) => {
					setOpen(isOpen);
					if (!isOpen) {
						form.reset();
					}
				}}
			>
				<DialogTrigger>
					<div className="bg-rose-500 hover:bg-rose-600 text-white rounded-md px-4 py-2 flex flex-row items-center justify-center">
						<Plus className="mr-2 h-4 w-4" />새 미션 추가
					</div>
				</DialogTrigger>
				<DialogContent aria-description="add-todo-dialog">
					<DialogHeader>
						<DialogTitle>할 일 추가</DialogTitle>
					</DialogHeader>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="flex flex-col space-y-2"
						>
							<FormField
								name="title"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>제목</FormLabel>
										<FormControl>
											<Input {...field} placeholder={"title"} />
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								name="category"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>카테고리</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<SelectTrigger>
												<SelectValue placeholder={"choose todo category"} />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													{categories.map((v) => (
														<SelectItem
															key={`todo-category-${v.id}`}
															value={`${v.id}`}
														>
															{v.name}
														</SelectItem>
													))}
												</SelectGroup>
												<SelectSeparator />
												<Button
													size="lg"
													variant="ghost"
													onClick={(e) => {
														e.stopPropagation();
														setAddCategoryDialogOpen(true);
													}}
												>
													Add Category
												</Button>
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>

							<FormField
								name="priority"
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<FormLabel>우선순위</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<SelectTrigger>
												<SelectValue placeholder={"choose todo priority"} />
											</SelectTrigger>
											<SelectContent>
												{priorities.map((v) => (
													<SelectItem
														key={`todo-priority-${v.id}`}
														value={v.id.toString()}
													>
														{v.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>

							<FormField
								name="deadline"
								control={form.control}
								render={({ field }) => {
									return (
										<FormItem>
											<FormLabel>마감일</FormLabel>
											<FormControl>
												<DatePickerWithInput
													value={field.value}
													onChange={(iso) => field.onChange(iso)}
												/>
											</FormControl>
										</FormItem>
									);
								}}
							/>

							<DialogFooter>
								<DialogClose asChild>
									<Button variant="outline">Cancel</Button>
								</DialogClose>

								<Button
									type="submit"
									disabled={!isFormValid}
									className={
										!isFormValid ? "opacity-50 cursor-not-allowed" : ""
									}
								>
									Submit
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</>
	);
}
