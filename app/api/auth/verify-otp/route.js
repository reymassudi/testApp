import { NextResponse } from 'next/server';
import { createSession } from '@/utils/auth';
import { no_auth_fetch } from '@/app/api/base_api';
import { apis, method } from '@/utils/constants/apis';

export async function POST(request) {
  const body = await request.json();
  const { data, response } = await no_auth_fetch(
    apis.verify_otp,
    method.post,
    body,
  );

  let ok;
  if (response?.ok) {
    const loggedIn = await createSession(data);
    ok = loggedIn?.ok;
  }

  return NextResponse.json({ data, ok }, { status: response?.status });
}
