import { NextResponse } from 'next/server';
import { auth_fetch } from '@/app/api/base_api';
import { apis, method, tags } from '@/utils/constants/apis';
import { cookie_names } from '@/utils/constants/enums';

// client
export async function PATCH(request) {
  const body = await request.json();
  const { data, response } = await auth_fetch(apis.mother, method.patch, body);

  return NextResponse.json(
    { data, ok: response?.ok },
    { status: response?.status },
  );
}

// server / client
export async function GET(request) {
  const authHeader = request.headers.get(cookie_names.token);

  const { data, response } = await auth_fetch(
    apis.mother,
    method.get,
    null,
    tags.mother,
    null,
    authHeader,
  );

  return NextResponse.json({ data }, { status: response?.status });
}
