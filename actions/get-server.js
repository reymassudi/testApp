'use server';

import { redirect } from 'next/navigation';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { fetch_api } from '@/app/api/base_fetch_server';
import { method } from '@/utils/constants/apis';
import { urls } from '@/utils/constants/navigation';
import { searchQueries } from '@/utils/constants/enums';

export async function getMother() {
  try {
    return await fetch_api('/api/user/mother', method.get);
  } catch (error) {
    console.log('error getMother', error);
    if (isRedirectError(error)) {
      redirect(`${urls.signIn}?${searchQueries.loginRedirect}=true`);
    }

    return { data: {} };
  }
}

export async function getAlbum(page, lastId) {
  try {
    return await fetch_api(
      `/api/gallery?${page ? `&page=${page}` : ''}${lastId ? `&last_id=${lastId}` : ''}`,
      method.get,
    );
  } catch (error) {
    console.log('error getAlbum', error);
    if (isRedirectError(error)) {
      redirect(`${urls.signIn}?${searchQueries.loginRedirect}=true`);
    }

    return { data: { files: [] } };
  }
}

export async function getChatHistory(index = 0) {
  try {
    const { data, ok } = await fetch_api(
      `/api/chat/history?index=${index}`,
      method.get,
    );

    return {
      data: data?.conversations,
      totalPages: data?.total_items,
      ok,
    };
  } catch (error) {
    console.log('error getChatHistory', error);
    if (isRedirectError(error)) {
      redirect(`${urls.signIn}?${searchQueries.loginRedirect}=true`);
    }

    return { data: [], ok: false };
  }
}

export async function getConfigs() {
  try {
    const { data, ok } = await fetch_api(`/api/user/locale`, method.get);

    return {
      data,
      ok,
    };
  } catch (error) {
    console.log('error getConfigs', error);

    return { data: [], ok: false };
  }
}

export async function getArticles(byCategory) {
  try {
    const { data, ok } = await fetch_api(
      `/api/articles/all?byCategory=${byCategory !== undefined}`,
      method.get,
    );

    return { data, ok };
  } catch (error) {
    console.log('error getArticle', error);

    return { data: {}, ok: false };
  }
}
