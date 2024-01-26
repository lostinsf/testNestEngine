import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';

export const LibDayjs = (type: string, value: Date | string, format: string = 'YYYY-MM-DD HH:mm:ss sss'): string => {
  if (type === 'kst') {
    if (typeof value !== 'string') {
      const utcDate = new Date(value.getTime() + value.getTimezoneOffset() * 60 * 1000 + 540 * 60 * 1000);
      const yyyy = utcDate.getFullYear();
      const mm = `0${utcDate.getMonth() + 1}`.slice(-2);
      const dd = `0${utcDate.getDate()}`.slice(-2);
      const hh = `0${utcDate.getHours()}`.slice(-2);
      const min = `0${utcDate.getMinutes()}`.slice(-2);
      const sec = `0${utcDate.getSeconds()}`.slice(-2);
      const msec = `00${utcDate.getMilliseconds()}`.slice(-3);
      const timestamp = `${yyyy}-${mm}-${dd} ${hh}:${min}:${sec} ${msec}`;
      return timestamp;
    }
    const dateFormat = new Date(value);
    const date = dayjs(dateFormat).add(9, 'hour').format(format);
    return date;
  }

  if (type === 'week') {
    dayjs.extend(weekOfYear);
    return dayjs(value).week().toString();
  }

  if (typeof value !== 'string') {
    const utcDate = new Date(value.getTime() + value.getTimezoneOffset() * 60 * 1000);
    const yyyy = utcDate.getFullYear();
    const mm = `0${utcDate.getMonth() + 1}`.slice(-2);
    const dd = `0${utcDate.getDate()}`.slice(-2);
    const hh = `0${utcDate.getHours()}`.slice(-2);
    const min = `0${utcDate.getMinutes()}`.slice(-2);
    const sec = `0${utcDate.getSeconds()}`.slice(-2);
    const msec = `00${utcDate.getMilliseconds()}`.slice(-3);
    const timestamp = `${yyyy}-${mm}-${dd} ${hh}:${min}:${sec} ${msec}`;
    return timestamp;
  }

  const dateFormat = new Date(value);
  const date = dayjs(dateFormat).format(format);
  return date;
};
