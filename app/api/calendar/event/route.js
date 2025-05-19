import { NextResponse } from 'next/server';
import { auth_fetch } from '@/app/api/base_api';
import { apis, method } from '@/utils/constants/apis';

// client
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const { data, response } = await auth_fetch(
    `${apis.calendar_event}${id}/`,
    method.get,
  );

  return NextResponse.json(
    { data, ok: response?.ok },
    { status: response?.status },
  );
}

// client
export async function POST(request) {
  const body = await request.json();
  const { data, response } = await auth_fetch(
    apis.calendar_event,
    method.post,
    body,
  );

  return NextResponse.json(
    { data, ok: response?.ok },
    { status: response?.status },
  );
}

// client
export async function PATCH(request) {
  const body = await request.json();
  const { data, response } = await auth_fetch(
    `${apis.calendar_event}${body?.id}/`,
    method.patch,
    body,
  );

  return NextResponse.json(
    { data, ok: response?.ok },
    { status: response?.status },
  );
}

// client
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const { data, response } = await auth_fetch(
    `${apis.calendar_event}${id}/`,
    method.delete,
  );

  return NextResponse.json(
    { data, ok: response?.ok },
    { status: response?.status },
  );
}
