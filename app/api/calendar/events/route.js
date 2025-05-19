import { NextResponse } from 'next/server';
import { auth_fetch } from '@/app/api/base_api';
import { apis, method } from '@/utils/constants/apis';
import { cookie_names } from '@/utils/constants/enums';

// server / client
export async function GET(request) {
  const authHeader = request.headers.get(cookie_names.token);
  const { searchParams } = new URL(request.url);
  const fromDate = searchParams.get('from_date');
  const toDate = searchParams.get('to_date');

  const { data, response } = await auth_fetch(
    `${apis.calendar_events}?from_date=${fromDate}${toDate ? `&to_date=${toDate}` : ''}`,
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
