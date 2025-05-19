import { NextResponse } from 'next/server';
import { setLocaleCookie } from '@/utils/auth';
import { no_auth_fetch } from '@/app/api/base_api';
import { apis, method } from '@/utils/constants/apis';

// client
export async function POST(request) {
  const data = await request.json();

  const { ok } = await setLocaleCookie(data?.locale);

  return NextResponse.json({ ok }, { status: 200 });
}

// server
export async function GET() {
  const { data, response } = await no_auth_fetch(apis.configs, method.get);

  return NextResponse.json({ data }, { status: response?.status });
}
