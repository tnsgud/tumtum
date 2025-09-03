'use client'

import { Plus } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '../ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const addTodoSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
})

type AddFormSchema = z.infer<typeof addTodoSchema>

const categories = [
  { id: 'a', name: 'coding' },
  { id: 'b', name: 'learning' },
  { id: 'c', name: 'break' },
  { id: 'd', name: 'thinking' },
]

type AddTodoFormItem = {
  name: keyof AddFormSchema
  label: string
  placeholder: string
}

const addTodoFormItem: AddTodoFormItem[] = [
  {
    name: 'title',
    label: '제목',
    placeholder: 'title',
  },
  {
    name: 'description',
    label: '설명',
    placeholder: 'desc',
  },
]

export default function AddTodoDialog() {
  const form = useForm<AddFormSchema>({
    resolver: zodResolver(addTodoSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  })

  const onSubmit = (data: AddFormSchema) => {
    // processing

    // reset
    form.setValue('title', '')
    form.setValue('description', '')
    form.setValue('category', '')
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="bg-rose-500 hover:bg-rose-600 text-white">
          <Plus className="mr-2 h-4 w-4" />새 미션 추가
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>할 일 추가</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-2"
          >
            {addTodoFormItem.map((v) => (
              <FormField
                key={`add-todo-dialog-${v.name}`}
                name={v.name}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{v.label}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={v.placeholder} />
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}

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
                      <SelectValue placeholder={'choos todo category'} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((v) => (
                        <SelectItem key={`todo-category-${v.id}`} value={v.id}>
                          {v.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>

              <DialogClose asChild>
                <Button type="submit">Submit</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
