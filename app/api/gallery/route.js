import { NextResponse } from 'next/server';
import { auth_fetch } from '@/app/api/base_api';
import { apis, method } from '@/utils/constants/apis';
import { album_page_count } from '@/utils/constants';
import { cookie_names } from '@/utils/constants/enums';

// client
export async function POST(request) {
  const formData = await request.formData();
  const { data, response } = await auth_fetch(
    apis.album,
    method.post,
    formData,
    null,
    true,
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
    `${apis.album}${id}/`,
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
  const page = searchParams.get('page');
  const lastId = searchParams.get('last_id');

  const { data, response } = await auth_fetch(
    `${apis.album}?limit=${album_page_count}${page ? `&page=${page}` : ''}${lastId ? `&last_id=${lastId}` : ''}`,
    method.get,
    null,
    null,
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
