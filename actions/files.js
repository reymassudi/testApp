'use client';

import { fetch_api } from '@/app/api/base_fetch_client';
import { method } from '@/utils/constants/apis';
import { img_size_limit } from '@/utils/constants';

export async function onAlbumAdd(files, t) {
  try {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }
    const { data, ok, status } = await fetch_api(
      `/api/gallery`,
      method.post,
      formData,
    );

    if (status === 406) {
      throw { e: t('error.img_format') };
    }
    if (status === 413) {
      throw { e: t('error.too_large', { n: img_size_limit }) };
    }
    if (!ok) {
      throw { e: t('error.server') };
    }

    return { data, ok };
  } catch (error) {
    console.log('error onAlbumAdd', error);

    return {
      ok: false,
      error: error?.e ? error?.e : t('error.server'),
    };
  }
}

export async function onUserImgChange(file, t) {
  try {
    const formData = new FormData();
    formData.append('upload_file', file);

    const { ok, status } = await fetch_api(
      `/api/user/profile`,
      method.post,
      formData,
    );

    if (status === 406) {
      throw { e: t('error.img_format') };
    }
    if (status === 413) {
      throw { e: t('error.too_large', { n: img_size_limit }) };
    }
    if (!ok) {
      throw { e: t('error.server') };
    }

    return {
      ok,
    };
  } catch (error) {
    console.log('error onUserImgChange', error);

    return {
      ok: false,
      error: error?.e ? error?.e : t('error.server'),
    };
  }
}

export async function onVoiceChat(file, t) {
  try {
    const audioBlob = new Blob(file.current, { type: 'audio/wav' });
    const formData = new FormData();
    formData.append('voice', audioBlob, 'recording.wav');

    const { ok, status, data } = await fetch_api(
      `/api/chat/transcribe`,
      method.post,
      formData,
    );

    if (!ok) {
      const detail = data?.detail;

      if (
        typeof detail === 'string' &&
        detail === 'Could not understand audio!'
      ) {
        throw { e: 'Could not understand audio!' };
      }
    }

    return {
      data,
      ok,
    };
  } catch (error) {
    console.log('error onVoiceChat', error);

    return {
      ok: false,
      error: typeof error?.e === 'string' ? error?.e : t('error.server'),
    };
  }
}
