'use client';

import * as React from 'react';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

function formatDate(date: Date | undefined) {
  if (!date) return '';
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function isValidDate(date: Date | undefined) {
  if (!date) return false;
  return !isNaN(date.getTime());
}

interface DatePickerWithInputProps {
  value?: Date; // ISO string (RHF 문자열 값)
  onChange: (nextIso: Date) => void; // ISO 문자열로 내보냄
}

export function DatePickerWithInput({
  value,
  onChange,
}: DatePickerWithInputProps) {
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date | undefined>(new Date());
  const [inputValue, setInputValue] = React.useState(formatDate(month));

  return (
    <div className='flex flex-col gap-3'>
      <div className='relative flex gap-2'>
        <Input
          id='date'
          value={inputValue}
          placeholder='choose date'
          className='bg-background pr-10 cursor-pointer'
          readOnly
          onClick={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
          onChange={(e) => {
            const raw = e.target.value;
            setInputValue(raw);
            const d = new Date(raw);
            if (isValidDate(d)) {
              setMonth(d);
              onChange(d);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id='date-picker'
              variant='ghost'
              className='absolute top-1/2 right-2 size-6 -translate-y-1/2'
            >
              <CalendarIcon className='size-3.5' />
              <span className='sr-only'>Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className='w-auto overflow-hidden p-0'
            align='end'
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode='single'
              selected={value}
              captionLayout='dropdown'
              month={month}
              onMonthChange={setMonth}
              disabled={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                return date < today;
              }}
              onSelect={(d) => {
                if (d && isValidDate(d)) {
                  console.log(d);
                  onChange(d);
                  setInputValue(formatDate(d));
                }
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
