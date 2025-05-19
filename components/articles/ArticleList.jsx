import { useTranslations } from 'next-intl';
import Link from 'next/link';
import ArticleCard from '@/components/articles/ArticleCard';

import { urls } from '@/utils/constants/navigation';
import './articles.scss';

export default function ArticleList({ isHome, data, title }) {
  const t = useTranslations();
  const listKey = isHome ? 'home' : title;

  return (
    <div className={`articles ${isHome ? 'mt-8' : 'mb-6'}`}>
      {isHome ? (
        <div className="flex justify-between items-center w-full mb-4">
          <h6 className="inline">{t('article.articles')}</h6>

          <Link href={urls.articles} className="text-ultraviolet inline h8">
            {t('general.see_more')}
          </Link>
        </div>
      ) : (
        <p className="h7 mb-2">{title}</p>
      )}

      <div className="x-infinite-scroll-container smooth-scroll">
        {data?.map((article, index) => (
          <ArticleCard {...article} key={`${listKey}-${index}`} />
        ))}
      </div>
    </div>
  );
}
