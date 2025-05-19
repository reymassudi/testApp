import { Suspense } from 'react';
import HomePage from '@/app/ui/Home/HomePage';
import { get_locale } from '@/utils/server-functions';
import { getArticles, getMother } from '@/actions/get-server';

import './home-bg.scss';

export default async function Home() {
  const isRTL = (await get_locale())?.rtl;

  const motherData = await getMother();
  const { data } = await getArticles();
  const articles = data?.articles;

  return (
    <Suspense fallback={<div />}>
      <HomePage
        isRTL={isRTL}
        articles={articles}
        motherData={motherData?.data}
      />

      <div className="home-bg-top blur-bg">
        <div>
          <div className="ellipse-yellow" />
          <div className="ellipse-green" />
        </div>
      </div>
    </Suspense>
  );
}
