import { NextResponse } from 'next/server';
import { auth_fetch } from '@/app/api/base_api';
import { apis, method } from '@/utils/constants/apis';

export async function POST(request) {
  const formData = await request.formData();
  const { data, response } = await auth_fetch(
    apis.chat_voice,
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
