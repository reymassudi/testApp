import { NextResponse } from 'next/server';
import { auth_fetch } from '@/app/api/base_api';
import { apis, method } from '@/utils/constants/apis';

// client
export async function GET(request) {
  const { data, response } = await auth_fetch('/notif/test/', method.get);

  return NextResponse.json({ data }, { status: response?.status });
}
