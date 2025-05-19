'use client';

import { fetch_api } from '@/app/api/base_fetch_client';
import { method } from '@/utils/constants/apis';

export async function getAlbum(page, lastId) {
  try {
    const { data, ok } = await fetch_api(
      `/api/gallery?${page ? `&page=${page}` : ''}${lastId ? `&last_id=${lastId}` : ''}`,
      method.get,
    );

    return { data, ok };
  } catch (error) {
    console.log('error getAlbum', error);

    return { data: { files: [] } };
  }
}

export async function deletePhoto(id) {
  try {
    return await fetch_api(`/api/gallery?id=${id}`, method.delete);
  } catch (error) {
    console.log('error deletePhoto', error);

    return { ok: false };
  }
}
