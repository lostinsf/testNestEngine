import { Theme } from 'react-toastify';

export type LibToastifyType = {
  position?: any;
  autoClose: number;
  hideProgressBar: boolean;
  closeOnClick: boolean;
  pauseOnHover: boolean;
  draggable: boolean;
  progress?: string;
  theme?: Theme;
};

export type LibToastifyContainerType = {
  position?: any;
  autoClose: number;
  hideProgressBar: boolean;
  newestOnTop: boolean;
  closeOnClick: boolean;
  rtl: boolean;
  pauseOnFocusLoss: boolean;
  draggable: boolean;
  pauseOnHover: boolean;
  theme?: Theme;
};
