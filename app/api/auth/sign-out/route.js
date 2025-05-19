import { NextResponse } from 'next/server';
import { auth_fetch } from '@/app/api/base_api';
import { apis, method } from '@/utils/constants/apis';
import { cookie_names } from '@/utils/constants/enums';

export async function POST(request) {
  const authToken = request.headers.get(cookie_names.token);

  const { data, response } = await auth_fetch(
    apis.logout,
    method.post,
    null,
    null,
    null,
    authToken,
  );

  return NextResponse.json(
    { data, ok: response?.ok },
    { status: response?.status },
  );
}
