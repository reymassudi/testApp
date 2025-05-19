'use server';

import { redirect } from 'next/navigation';
import { getToken } from '@/utils/auth';
import { cookie_names, searchQueries } from '@/utils/constants/enums';
import { urls } from '@/utils/constants/navigation';

export async function fetch_api(api, method) {
  const { access_token } = await getToken();

  const response = await fetch(`${process.env.PUBLIC_BASE_URL}${api}`, {
    method,
    headers: {
      [cookie_names.token]: access_token,
    },
  });

  let data;
  try {
    data = await response.json();
  } catch (error) {
    data = null;
  }
  const status = response?.status;

  await handle_not_authorized(status, data?.detail);

  return { data: data?.data, ok: data?.ok, status: response?.status };
}

export async function handle_not_authorized(status, detail) {
  if (status === 401) {
    redirect(`${urls.signIn}?${searchQueries.loginRedirect}=true`);
  }

  if (
    status === 404 &&
    typeof detail === 'string' &&
    detail === 'User Not Found'
  ) {
    redirect(`${urls.signIn}?${searchQueries.loginRedirect}=true`);
  }
}
