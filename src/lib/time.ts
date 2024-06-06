import dayjs from 'dayjs';
import 'dayjs/locale/id';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
dayjs.locale('id');

type daysParams = [
  date?: string | number | dayjs.Dayjs | Date | null | undefined,
  format?: dayjs.OptionType | undefined,
  locale?: string | undefined,
  strict?: boolean | undefined,
];

export default function days(...params: daysParams) {
  return dayjs(params[0], params[1], params[2], params[3]).locale('id');
}

export const getTime = (created_at: number | string) => {
  return new Date(created_at)
    .toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    .replace(/\./g, ':');
};

export const getDate = (
  created_at: string | number,
  weekday: boolean = false,
  showToday: boolean = true,
) => {
  const format: Intl.DateTimeFormatOptions = {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    weekday: weekday ? 'long' : undefined,
  };
  const today = new Date().toLocaleDateString('id-ID', format);
  const date = new Date(created_at).toLocaleDateString('id-ID', format);
  if (showToday) {
    return today == date ? 'Hari ini  ' : date.replace(/\//g, '-') + '  ';
  } else {
    return date.replace(/\//g, '-') + '  ';
  }
};

export const timeFormat = (created_at: number | string) => {
  return getDate(created_at) + getTime(created_at);
};
