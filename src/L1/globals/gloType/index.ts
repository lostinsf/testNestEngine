import { AnimationControls } from 'framer-motion';

export type GloTypeMotion = {
  hidden: any;
  visible: any;
};
export type GloTypeMotion1 = {
  hidden: any;
  up: any;
  up2: any;
  up3: any;
  down: any;
};
export type GloTypeMotion2 = {
  hidden: any;
  left: any;
  middle: any;
  right: any;
};
export type GloTypeAction = {
  motionAnimate: AnimationControls;
  motionVariants: GloTypeMotion;
  motionCustom: any;
};
