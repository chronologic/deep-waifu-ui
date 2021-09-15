import axios from 'axios';

import { API_URL } from '../env';

const client = axios.create({
  baseURL: API_URL,
});

const api = {
  async selfie2anime(selfie: File): Promise<File> {
    const fd = new FormData();
    fd.append('selfie', selfie, 'selfie.jpg');

    const { data } = await client.post(`/selfie2anime`, fd, { responseType: 'blob' });
    const res = new File([data], 'waifu.png');

    return res;
  },
};

export default api;
