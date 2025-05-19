'use server';

import { getTranslations } from 'next-intl/server';
import ArticleList from '@/components/articles/ArticleList';
import { getArticles } from '@/actions/get-server';

import './articles.scss';

export default async function ArticlesPage() {
  const { data } = await getArticles(true);
  const t = await getTranslations();

  const articles = data?.categories;

  return (
    <div className="articles-page">
      <h4>{t('article.articles')}</h4>
      <p className="body-2 articles-description">{t('article.description')}</p>

      {articles &&
        typeof articles === 'object' &&
        Object.keys(articles)?.map((name) => (
          <ArticleList data={articles[name]?.articles} title={name} />
        ))}
    </div>
  );
}
