'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Github, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { createClient } from '@/utils/supabase/client';
import {
  LoginFormItem,
  LoginFormSchema,
  loginFormSchema,
} from '../../app/login/types';
import { login } from '@/app/login/actions';

const formItems: LoginFormItem[] = [
  {
    name: 'email',
    label: '이메일',
    placeholder: 'name@example.com',
    inputType: 'email',
  },
  {
    name: 'password',
    label: '비밀번호',
    placeholder: '',
    inputType: 'password',
  },
];

export function LoginForm() {
  const router = useRouter();
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (formData: LoginFormSchema) => {
    const supabase = await createClient();
    const {
      data: { user },
    } = await login(formData);

    if (user === null) {
      alert('존재하지 않는 계정');
      return;
    }

    // onboarding 확인
    const { data } = await supabase
      .from('onboarding_check')
      .select('id')
      .eq('user_id', user.id);
    if (data?.length === 0) {
      router.push('/onboarding');
      return;
    }

    router.push('dashboard');
  };

  return (
    <div className='space-y-4'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          {formItems.map(({ name, label, placeholder, inputType }) => (
            <FormField
              key={`login-form-item-${name}`}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{label}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={placeholder}
                      type={inputType}
                    />
                  </FormControl>
                  <FormMessage />
                  {name === 'password' && (
                    <Button
                      variant='link'
                      size='sm'
                      className='text-xs text-rose-500 hover:text-rose-600 p-0 justify-end'
                    >
                      비밀번호 찾기
                    </Button>
                  )}
                </FormItem>
              )}
            />
          ))}
          <Button
            type='submit'
            className='w-full bg-rose-500 hover:bg-rose-600 text-white'
          >
            로그인
          </Button>
        </form>
      </Form>

      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <Separator />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>또는</span>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-2'>
        <Button variant='outline' className='w-full'>
          <Github className='mr-2 h-4 w-4' />
          Github
        </Button>
        <Button variant='outline' className='w-full'>
          <Mail className='mr-2 h-4 w-4' />
          Google
        </Button>
      </div>
    </div>
  );
}
