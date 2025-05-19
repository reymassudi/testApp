import { NextResponse } from 'next/server';
import { auth_fetch } from '@/app/api/base_api';
import { apis, method } from '@/utils/constants/apis';

// client
export async function PATCH(request) {
  const body = await request.json();
  const { data, response } = await auth_fetch(apis.user, method.patch, body);

  return NextResponse.json(
    { data, ok: response?.ok },
    { status: response?.status },
  );
}

// client
export async function POST(request) {
  const formData = await request.formData();
  const { data, response } = await auth_fetch(
    apis.upload_profile_img,
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
