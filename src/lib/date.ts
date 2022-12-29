import { utcToZonedTime } from 'date-fns-tz';

export const FormattedDate = (date: string): string => {
  const d = new Date(date);
  return utcToZonedTime(d, 'Asia/Tokyo').toDateString();
};
