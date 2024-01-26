import axios from 'axios';

export const LibAxios = (url: string, token?: string) =>
  axios.create({
    baseURL: url === '' ? process.env.NEXT_PUBLIC_URL_FRONT : url,
    headers:
      token === undefined
        ? { 'Content-Type': 'application/json' }
        : {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
    withCredentials: true,
  });
