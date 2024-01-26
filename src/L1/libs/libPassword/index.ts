import CryptoJS from 'crypto-js';

export const LibPassword = (type: string, value: string) => {
  // 암호화 구분 요소 : 콜론 사용
  const cipherKey =
    process.env.NEXT_PUBLIC_LIB_PASSWORD_CHIPERKEY === undefined ? '' : process.env.NEXT_PUBLIC_LIB_PASSWORD_CHIPERKEY;
  switch (type) {
    case 'en':
      return `:${CryptoJS.AES.encrypt(value, cipherKey).toString()}`;
    default:
      return CryptoJS.AES.decrypt(value.split(':')[1], cipherKey).toString(CryptoJS.enc.Utf8);
  }
};
