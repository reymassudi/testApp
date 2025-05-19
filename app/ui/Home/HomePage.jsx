'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import UserWelcome from './components/UserWelcome';
import AskMeCard from './components/AskMeCard';
import WeekDetails from '@/components/home/WeekDetails';
import { getMother } from '@/actions/home';
import { requestNotificationPermission } from '@/utils/firebase';

import { searchQueries } from '@/utils/constants/enums';
import './home.scss';
// import { fetch_api } from '@/app/api/base_fetch_client';

export default function HomePage({ isRTL, articles, motherData }) {
  const router = useRouter();
  const [data, setData] = useState(motherData);

  const searchParams = useSearchParams();
  const setFCM = searchParams.get(searchQueries.setFCM);

  useEffect(() => {
    fetchMother();
  }, [router]);

  useEffect(() => {
    if (setFCM === '1') {
      requestNotificationPermission();
    }
  }, [setFCM]);

  const fetchMother = async () => {
    const res = await getMother();
    setData(res.data);
  };

  // const getTestNotif = async () => {
  //   await fetch_api('/api/notification/test/', 'GET');
  // };

  return (
    <div className="home-page">
      {data ? (
        <>
          <UserWelcome motherData={data} isRTL={isRTL} />
          <AskMeCard />
          <WeekDetails motherData={data} isRTL={isRTL} articles={articles} />
        </>
      ) : null}

      {/*<button onClick={getTestNotif}>notification</button>*/}
    </div>
  );
}
