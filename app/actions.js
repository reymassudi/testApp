'use server';

import { cookies } from 'next/headers';
import { cookie_names } from '@/utils/constants/enums';
import { decrypt } from '@/utils/auth';

export async function getToken() {
  // console.log('getToken');
  const session = (await cookies()).get(cookie_names.token)?.value;
  // console.log('session', session);
  const token = await decrypt(session);

  // console.log('token get', token);
  return {
    access_token: token?.access_token,
    refresh_token: token?.refresh_token,
    token_expire: token?.token_expire,
  };
}
