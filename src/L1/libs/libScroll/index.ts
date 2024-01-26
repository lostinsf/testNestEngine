import { RefObject } from 'react';

export const LibScroll = (
  scrollRef: RefObject<HTMLDivElement> | null,
  type: string,
  behavior: ScrollBehavior,
  offsetTop: number,
  startTime: number,
  endTime: number,
) => {
  if (scrollRef !== undefined && scrollRef !== null) {
    switch (type) {
      case 'top':
        setTimeout(() => {
          if (scrollRef.current !== null) {
            scrollRef.current.scrollTo({
              behavior,
              top: 0,
            });
          }
        }, startTime);
        break;
      case 'down':
        setTimeout(() => {
          if (scrollRef.current !== null) {
            scrollRef.current.scrollTo({
              behavior,
              top: scrollRef.current.offsetTop + scrollRef.current.offsetHeight,
            });
          }
        }, startTime);
        break;
      case 'fall':
        setTimeout(() => {
          if (scrollRef.current !== null) {
            scrollRef.current.scrollTo({
              behavior: 'smooth',
              top: 99999,
            });
          }
        }, startTime);
        break;
      case 'topCenter':
        setTimeout(() => {
          if (scrollRef.current !== null) {
            scrollRef.current.scrollTo({
              behavior,
              top: 0,
              left: (scrollRef.current.offsetWidth - scrollRef.current.offsetWidth) / 2,
            });
          }
        }, startTime);
        break;
      case 'downCenter':
        setTimeout(() => {
          if (scrollRef.current !== null) {
            scrollRef.current.scrollTo({
              behavior,
              top: scrollRef.current.offsetTop + scrollRef.current.offsetHeight,
              left: (scrollRef.current.offsetWidth - scrollRef.current.offsetWidth) / 2,
            });
          }
        }, startTime);
        break;
      case 'rewind':
        setTimeout(() => {
          if (scrollRef.current !== null) {
            scrollRef.current.scrollTo({
              behavior,
              top: scrollRef.current.offsetTop + scrollRef.current.offsetHeight,
            });
          }
        }, startTime);
        setTimeout(() => {
          if (scrollRef.current !== null) {
            scrollRef.current.scrollTo({
              behavior,
              top: 0,
            });
          }
        }, endTime);
        break;
      default:
        setTimeout(() => {
          if (scrollRef.current !== null) {
            scrollRef.current.scrollTo({
              behavior,
              top: offsetTop,
            });
          }
        }, startTime);
    }
  }
};
