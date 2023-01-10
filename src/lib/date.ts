import { utcToZonedTime } from 'date-fns-tz';

export const TimezonedDate = (date: string): Date => {
  const d = new Date(date);
  return utcToZonedTime(d, 'Asia/Tokyo');
};

export const FormattedDate = (date: string): string => {
  const d = new Date(date);
  return utcToZonedTime(d, 'Asia/Tokyo').toDateString();
};

export const FormattedISODate = (date: string): string => {
  const d = new Date(date);
  return utcToZonedTime(d, 'Asia/Tokyo').toISOString();
};

export const FormattedTodayISODate = (): string => {
  const current = Date.now();
  return utcToZonedTime(current, 'Asia/Tokyo').toISOString();
};
