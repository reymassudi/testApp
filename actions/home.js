import { fetch_api } from '@/app/api/base_fetch_client';
import { method } from '@/utils/constants/apis';

export async function getMother() {
  try {
    return await fetch_api('/api/user/mother', method.get);
  } catch (error) {
    console.log('error getMother', error);

    return { data: {} };
  }
}

export async function getTips(week) {
  try {
    return await fetch_api(`/api/home/tips?week=${week}`, method.get);
  } catch (error) {
    console.log('error getTips', error);

    return { data: {} };
  }
}
