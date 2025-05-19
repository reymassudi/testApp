'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

import { urls } from '@/utils/constants/navigation';
import ArticleAlt from '@/public/img/article-temp.jpg';

export default function ArticleCard({
  title,
  summary,
  study_time,
  image_path,
  id,
  fullWidth,
}) {
  const t = useTranslations();

  return (
    <Link
      href={`${urls.articles}/${id}/`}
      className="article-card x-infinite-scroll-item"
    >
      <div className="article-img">
        <Image
          src={
            image_path
              ? `${process.env.BASE_URL}/${image_path}`
              : ArticleAlt?.src
          }
          alt="article"
          width={fullWidth ? 0 : 208}
          height={93}
          style={
            fullWidth
              ? { width: '100%', height: '200px', objectFit: 'cover' }
              : { objectFit: 'cover' }
          }
          {...(fullWidth ? { sizes: '100vw' } : null)}
          unoptimized
        />
      </div>

      <div className="p-4">
        <p className="mb-2 h7 article-title">{title}</p>
        <p className="body-3 mb-2 text-gray-600 article-description">
          {summary}
        </p>
        <p className="h9 text-ultraviolet">
          {t('article.study_time', { t: study_time })}
        </p>
      </div>
    </Link>
  );
}
