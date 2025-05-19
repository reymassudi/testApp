'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getArticle } from '@/actions/articles';

import { urls } from '@/utils/constants/navigation';
import Clock from '@/public/icons/clock.svg';
import './articles.scss';

export default function ArticleReader({ id }) {
  const router = useRouter();
  const t = useTranslations();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { data, ok } = await getArticle(id);

      if (ok) {
        try {
          const response = await fetch(
            `${process.env.BASE_URL}/${data?.body_path}`,
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const text = await response.text();
          setData({ ...data, text });
        } catch (err) {
          console.log(err);
          router.push(urls.articles);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchData();
  }, []);

  return (
    <div className="article-reader mt-6">
      {loading ? (
        <div className="article-loading">
          <div className="px-4">
            <div className="w-full h-[60px] animate-pulse-custom"></div>

            <div className="mt-2 w-3/4 h-[18px] animate-pulse-custom"></div>
          </div>

          <div className="article-img mt-6 w-full animate-pulse-custom"></div>

          <div className="my-8 w-full h-[590px] animate-pulse-custom"></div>
        </div>
      ) : (
        <>
          <div className="px-4">
            <h5>{data?.title}</h5>

            <div className="flex items-center body-4 text-gray-700 mt-2">
              <p>{data?.category}</p>
              <Clock className="article-clock-svg me-1 ms-4" />
              <p>{t('article.study_time', { t: data?.study_time })}</p>
            </div>
          </div>

          <div className="article-img mt-6">
            <Image
              alt="img"
              src={`${process.env.BASE_URL}/${data?.image_path}`}
              sizes="100%"
              unoptimized
              fill
              priority
              style={{ objectFit: 'cover' }}
            />
          </div>

          <p className="body-3 text-gray-700 my-8 px-2 whitespace-pre-line">
            {data?.text}
          </p>
        </>
      )}
    </div>
  );
}
