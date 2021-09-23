import axios from 'axios';

import { API_URL } from '../env';
import { IMintStatus, IStripeCheckoutIntent } from '../types';

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
  async mint(tx: string, selfie: File, name: string): Promise<void> {
    const fd = new FormData();
    fd.append('tx', tx);
    fd.append('name', name);
    fd.append('selfie', selfie, 'selfie.jpg');

    const { data } = await client.post(`/mint`, fd, { responseType: 'json' });

    return data;
  },
  async mintStatus(tx: string): Promise<IMintStatus> {
    const { data } = await client.get(`/mint/${tx}`, { responseType: 'json' });

    return data;
  },
  async createStripeCheckoutIntent({ name, image }: { name: string; image: File }): Promise<IStripeCheckoutIntent> {
    const fd = new FormData();
    fd.append('name', name);
    fd.append('image', image, 'image.png');

    const { data } = await client.post(`/checkoutIntent`, fd, { responseType: 'json' });

    return data;
  },
};

export default api;
