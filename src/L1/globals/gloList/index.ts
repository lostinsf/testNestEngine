import { animationControls } from 'framer-motion';
import { NextSeoProps } from 'next-seo';
import { GLOENV_GROUP_GAME_1, GLOENV_KEY_GAME_1 } from '../gloEnv';
import { GloMotionFadeIn } from '../gloMotion';
import { GloTypeAction } from '../gloType';

export const gloListNextSeo: NextSeoProps[] = [
  {
    title: 'Welcome to TEST Engine - lostinsf@naver.com',
    description: 'It was created to build a test server environment.',
    canonical: `${process.env.NEXT_PUBLIC_URL_FRONT}`,
    openGraph: {
      url: `${process.env.NEXT_PUBLIC_URL_FRONT}`,
      title: 'Welcome to TEST Engine - lostinsf@naver.com',
      description: 'It was created to build a test server environment.',
    },
  },
];

export const gloListAction: GloTypeAction[] = [
  {
    motionAnimate: animationControls(),
    motionVariants: GloMotionFadeIn,
    motionCustom: 0,
  },
];

export const gloListGameButton = [
  {
    gameId: '101',
    gameGroup: `${GLOENV_GROUP_GAME_1}`,
    gameKey: `${GLOENV_KEY_GAME_1}`,
    gameValue: 'avatar_profile',
    gameAnswer: 'avatar_profile.png',
  },
];

export const gloListUser = ['아이디', '등급', '패스워드', '패스워드확인'];
