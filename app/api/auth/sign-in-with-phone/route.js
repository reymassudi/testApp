import { NextResponse } from 'next/server';
import { no_auth_fetch } from '@/app/api/base_api';
import { apis, method } from '@/utils/constants/apis';

// client
export async function POST(request) {
  const body = await request?.json();

  const { data, response } = await no_auth_fetch(apis.login, method.post, body);

  return NextResponse.json(
    { data, ok: response?.ok },
    { status: response?.status },
  );
}
