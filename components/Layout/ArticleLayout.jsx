import { getTranslations } from 'next-intl/server';
import './layout.scss';

export default async function ArticleLayout({ children }) {
  const t = await getTranslations();

  return (
    <div className="article-layout">
      <p className="h7 text-gray-700 articles-banner">
        {t('article.articles')}
      </p>

      {children}

      <div className="article-bg blur-bg">
        <div>
          <div className="ellipse-yellow" />
          <div className="ellipse-green" />
        </div>
      </div>

      <div className="layout-shadow" />
    </div>
  );
}
