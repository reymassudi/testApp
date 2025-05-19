import { NextResponse } from 'next/server';
import { auth_fetch } from '@/app/api/base_api';
import { apis, method, tags } from '@/utils/constants/apis';
import { history_page_count } from '@/utils/constants';
import { cookie_names } from '@/utils/constants/enums';

// client
export async function PATCH(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const body = await request.json();
  const { data, response } = await auth_fetch(
    `${apis.chat}${id}/`,
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
    `${apis.chat}${id}/`,
    method.delete,
  );

  return NextResponse.json(
    { data, ok: response?.ok },
    { status: response?.status },
  );
}

// server - client
export async function GET(request) {
  const authHeader = request.headers.get(cookie_names.token);

  const { searchParams } = new URL(request.url);
  const index = searchParams.get('index');

  const { data, response } = await auth_fetch(
    `${apis.chats}?limit=${history_page_count}&index=${index}`,
    method.get,
    null,
    tags.chat_history,
    null,
    authHeader,
  );

  if (!response?.ok) {
    return NextResponse.json(
      { data: { files: [] } },
      { status: response?.status },
    );
  }

  return NextResponse.json(
    { data, ok: response?.ok },
    { status: response?.status },
  );
}
