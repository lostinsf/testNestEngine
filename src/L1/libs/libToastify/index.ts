import { toast } from 'react-toastify';
import { LibToastifyCallbackProps } from './interface';
import { LibToastifyList } from './list';
import { LibToastifyType } from './type';

export const LibToastify = (
  type: string,
  value: string,
  context?: LibToastifyType,
  callback?: LibToastifyCallbackProps,
) => {
  switch (type) {
    case 'info':
      toast.info(value, context === undefined ? { ...LibToastifyList, ...callback } : { ...context, ...callback });
      break;
    case 'success':
      toast.success(value, context === undefined ? { ...LibToastifyList, ...callback } : { ...context, ...callback });
      break;
    case 'warn':
      toast.warn(value, context === undefined ? { ...LibToastifyList, ...callback } : { ...context, ...callback });
      break;
    default:
      toast.error(value, context === undefined ? { ...LibToastifyList, ...callback } : { ...context, ...callback });
  }
};
