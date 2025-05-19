import { NextResponse } from 'next/server';
import { auth_fetch } from '@/app/api/base_api';
import { apis, method } from '@/utils/constants/apis';
import { cookie_names } from '@/utils/constants/enums';

// server
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const byCategory = searchParams.get('byCategory');

  const authHeader = request.headers.get(cookie_names.token);

  const { data, response } = await auth_fetch(
    `${apis.article}?by_category=${byCategory}`,
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
