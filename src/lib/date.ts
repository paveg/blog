import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

export const TimezonedDate = (date: string): Date => {
  const d = new Date(date);
  return utcToZonedTime(d, 'Asia/Tokyo');
};

export const FormattedDate = (date: string, fmt?: string): string => {
  const orderFmt = fmt ? fmt : 'yyyy/MM/dd';
  const d = new Date(date);
  return format(utcToZonedTime(d, 'Asia/Tokyo'), orderFmt);
};

export const FormattedISODate = (date: string): string => {
  const d = new Date(date);
  return utcToZonedTime(d, 'Asia/Tokyo').toISOString();
};

export const FormattedTodayISODate = (): string => {
  const current = Date.now();
  return utcToZonedTime(current, 'Asia/Tokyo').toISOString();
};
