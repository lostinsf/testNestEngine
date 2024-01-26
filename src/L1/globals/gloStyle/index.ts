import { css } from '@emotion/react';

export const GloStyle = css`
  // fonts
  /* Pretendard */
  @font-face {
    font-family: 'Pretendard';
    font-weight: 100;
    src:
      local('Pretendard-Thin'),
      url('/fonts/Pretendard-Thin.woff') format('truetype');
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 200;
    src:
      local('Pretendard-ExtraLight'),
      url('/fonts/Pretendard-ExtraLight.woff') format('truetype');
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 300;
    src:
      local('Pretendard-Light'),
      url('/fonts/Pretendard-Light.woff') format('truetype');
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 400;
    src:
      local('Pretendard-Regular'),
      url('/fonts/Pretendard-Regular.woff') format('truetype');
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 500;
    src:
      local('Pretendard-Medium'),
      url('/fonts/Pretendard-Medium.woff') format('truetype');
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 600;
    src:
      local('Pretendard-SemiBold'),
      url('/fonts/Pretendard-SemiBold.woff') format('truetype');
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 700;
    src:
      local('Pretendard-Bold'),
      url('/fonts/Pretendard-Bold.woff') format('truetype');
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 800;
    src:
      local('Pretendard-ExtraBold'),
      url('/fonts/Pretendard-ExtraBold.woff') format('truetype');
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 900;
    src:
      local('Pretendard-Black'),
      url('/fonts/Pretendard-Black.woff') format('truetype');
  }

  /* NotoSansKR */
  @font-face {
    font-family: 'NotoSansKR';
    font-weight: 100;
    src:
      local('NotoSansKR-Thin'),
      url('/fonts/NotoSansKR-Thin.ttf') format('truetype');
  }
  @font-face {
    font-family: 'NotoSansKR';
    font-weight: 200;
    src:
      local('NotoSansKR-ExtraLight'),
      url('/fonts/NotoSansKR-ExtraLight.ttf') format('truetype');
  }
  @font-face {
    font-family: 'NotoSansKR';
    font-weight: 300;
    src:
      local('NotoSansKR-Light'),
      url('/fonts/NotoSansKR-Light.ttf') format('truetype');
  }
  @font-face {
    font-family: 'NotoSansKR';
    font-weight: 400;
    src:
      local('NotoSansKR-Regular'),
      url('/fonts/NotoSansKR-Regular.ttf') format('truetype');
  }
  @font-face {
    font-family: 'NotoSansKR';
    font-weight: 500;
    src:
      local('NotoSansKR-Medium'),
      url('/fonts/NotoSansKR-Medium.ttf') format('truetype');
  }
  @font-face {
    font-family: 'NotoSansKR';
    font-weight: 600;
    src:
      local('NotoSansKR-SemiBold'),
      url('/fonts/NotoSansKR-SemiBold.ttf') format('truetype');
  }
  @font-face {
    font-family: 'NotoSansKR';
    font-weight: 700;
    src:
      local('NotoSansKR-Bold'),
      url('/fonts/NotoSansKR-Bold.ttf') format('truetype');
  }
  @font-face {
    font-family: 'NotoSansKR';
    font-weight: 800;
    src:
      local('NotoSansKR-ExtraBold'),
      url('/fonts/NotoSansKR-ExtraBold.ttf') format('truetype');
  }
  @font-face {
    font-family: 'NotoSansKR';
    font-weight: 900;
    src:
      local('NotoSansKR-Black'),
      url('/fonts/NotoSansKR-Black.ttf') format('truetype');
  }

  // base
  * {
    box-sizing: border-box;
  }
  html {
    color: black;
    font-family: 'Pretendard';
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 135%;
    word-break: keep-all;
  }
  body {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100vw;
    height: auto;
    gap: 0;
  }
  /* div {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    position: relative;
    width: auto;
    height: auto;
    gap: 0;
  }
  input {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    position: relative;
    width: auto;
    height: auto;
    gap: 0;
    outline: none;
  }
  button {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    position: relative;
    width: auto;
    height: auto;
    gap: 16px;
    cursor: pointer;
  } */
  button {
    border: unset;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;
