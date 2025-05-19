import { fetch_api } from '@/app/api/base_fetch_server';
import { method } from '@/utils/constants/apis';

export async function onSignOut() {
  const { data, status } = await fetch_api('/api/auth/sign-out', method.post);

  return { ok: status === 200 };
}
