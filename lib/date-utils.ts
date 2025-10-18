import {  format } from 'date-fns'

function getDateString(date: Date | string): string {
  if (typeof date === 'string') {
    return date.split('T')[0];
  }
  return date.toISOString().split('T')[0];
}

const formatCode = 'yyyy-MM-dd'

function dateFormat(date: string|Date): string {
  if (typeof date === 'string') {
    return format(new Date(date),formatCode)
  }

  return format(date, formatCode)
}

export { getDateString , dateFormat};