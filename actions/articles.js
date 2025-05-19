import { fetch_api } from '@/app/api/base_fetch_client';
import { method } from '@/utils/constants/apis';

export async function getArticle(id) {
  try {
    const { data, ok } = await fetch_api(
      `/api/articles/article?&id=${id}`,
      method.get,
    );

    return { data, ok };
  } catch (error) {
    console.log('error getArticle', error);

    return { data: { files: [] } };
  }
}
