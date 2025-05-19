import { NextResponse } from 'next/server';
import { auth_fetch } from '@/app/api/base_api';
import { apis, method } from '@/utils/constants/apis';
import { setNotificationCookie } from '@/utils/auth';

// client
export async function POST(request) {
  const body = await request.json();
  const { data, response } = await auth_fetch(
    apis.notification,
    method.post,
    body,
  );

  let ok;
  if (response?.ok) {
    const setNotification = await setNotificationCookie(body?.fcm_token);
    ok = setNotification?.ok;
  }

  return NextResponse.json(
    { data, ok: response?.ok },
    { status: response?.status },
  );
}
