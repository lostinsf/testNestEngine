import { GloTypeMotion, GloTypeMotion1, GloTypeMotion2 } from '../gloType';

// 1. 사라지고 나타나는 모션
export const GloMotionFadeIn: GloTypeMotion = {
  hidden: { opacity: 0 },
  visible: (custom = 0.5) => ({
    opacity: 1,
    transition: {
      delay: custom * 1,
    },
  }),
};

// 2. 위에서 아래로 살짝 나타나는 모션
export const GloMotionFadeInDown: GloTypeMotion = {
  hidden: { opacity: 0, y: 64 },
  visible: (custom = 0.5) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 1,
    },
  }),
};

// 3. 아래에서 위로 살짝 사라지는 모션
export const GloMotionFadeInUp: GloTypeMotion = {
  hidden: { opacity: 0, y: -64 },
  visible: (custom = 0.5) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: custom * 0.5,
    },
  }),
};

// 4. 아래에서 위로 올라가는 모션 (기본 3장)
export const GloMotion1Full: GloTypeMotion1 = {
  hidden: { opacity: 1, y: '0%' },
  up: (custom = 0.5) => ({
    opacity: 1,
    y: `calc(-100%)`,
    transition: {
      duration: 1,
      delay: 0.1 * custom,
    },
  }),
  up2: (custom = 0.5) => ({
    opacity: 1,
    y: `calc(-200%)`,
    transition: {
      duration: 1,
      delay: 0.1 * custom,
    },
  }),
  up3: (custom = 0.5) => ({
    opacity: 1,
    y: `calc(-300%)`,
    transition: {
      duration: 1,
      delay: 0.1 * custom,
    },
  }),
  down: (custom = 0.5) => ({
    opacity: 1,
    y: `0%`,
    transition: {
      duration: 1,
      delay: 0.1 * custom,
    },
  }),
};

// 4. 좌에서 오른쪽으로 변경하는 모션 제공
export const GloMotion2Full: GloTypeMotion2 = {
  hidden: { opacity: 1, x: '0%' },
  left: (custom = 0.5) => ({
    opacity: 1,
    x: `calc(-100%)`,
    transition: {
      duration: 1,
      delay: 0.1 * custom,
    },
  }),
  middle: (custom = 0.5) => ({
    opacity: 1,
    x: `0%`,
    transition: {
      duration: 1,
      delay: 0.1 * custom,
    },
  }),
  right: (custom = 0.5) => ({
    opacity: 1,
    x: `calc(100%)`,
    transition: {
      duration: 1,
      delay: 0.1 * custom,
    },
  }),
};

// 5. 셀렉트 박스 이동 모션
export const GloMotionSelect = {
  hidden: { opacity: 0, y: '20px' },
  hiddenDown: { opacity: 0, y: '-20px' },
  visible: (delaySec = 0.5) => ({
    opacity: 1,
    y: '0%',
    transition: {
      duration: 0.4,
      delay: delaySec * 0.5,
    },
  }),
  visibleDown: (delaySec = 0.5) => ({
    opacity: 1,
    y: '0%',
    transition: {
      duration: 0.2,
      delay: delaySec * 0.5,
    },
  }),
};
