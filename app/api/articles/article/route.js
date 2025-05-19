import { NextResponse } from 'next/server';
import { auth_fetch } from '@/app/api/base_api';
import { apis, method } from '@/utils/constants/apis';

// client
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const { data, response } = await auth_fetch(
    `${apis.article}${id}/`,
    method.get,
  );

  return NextResponse.json(
    { data, ok: response?.ok },
    { status: response?.status },
  );
}
