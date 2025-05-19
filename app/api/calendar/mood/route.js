import { NextResponse } from 'next/server';
import { auth_fetch } from '@/app/api/base_api';
import { apis, method } from '@/utils/constants/apis';
import { cookie_names } from '@/utils/constants/enums';

// client
export async function POST(request) {
  const body = await request.json();
  const { data, response } = await auth_fetch(
    apis.calendar_mood,
    method.post,
    body,
  );

  return NextResponse.json(
    { data, ok: response?.ok },
    { status: response?.status },
  );
}

// server / client
export async function GET(request) {
  const authHeader = request.headers.get(cookie_names.token);
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');

  const { data, response } = await auth_fetch(
    `${apis.calendar_mood_symptom}?date=${date}`,
    method.get,
    null,
    null,
    null,
    authHeader,
  );

  return NextResponse.json(
    { data, ok: response?.ok },
    { status: response?.status },
  );
}
