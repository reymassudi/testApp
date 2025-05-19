'use client';

import { urls } from '@/utils/constants/navigation';
import { searchQueries } from '@/utils/constants/enums';

export async function fetch_api(api, method, body) {
  const response = await fetch(api, {
    method,
    body,
  });

  let data;
  try {
    data = await response.json();
  } catch (error) {
    data = null;
  }

  const status = response?.status;

  await handle_not_authorized(status, data?.data?.detail);

  return { data: data?.data, ok: data?.ok, status };
}

export function handle_not_authorized(status, detail) {
  if (
    status === 401 ||
    (status === 404 &&
      typeof detail === 'string' &&
      detail === 'User Not Found')
  ) {
    window.location.href = `${urls.signIn}?${searchQueries.loginRedirect}=true`;
  }
}
