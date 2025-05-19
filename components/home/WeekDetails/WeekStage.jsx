import { useTranslations } from 'next-intl';
import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import StageString from '@/components/StageString';
import WeeksProgress from '@/components/home/WeeksProgress';
import { getPregnancyDateLeft, getPregnancyTrimester } from '@/utils/functions';

import { WeekContext } from '@/utils/context';
import { urls } from '@/utils/constants/navigation';
import HomeDetails from '@/public/img/home/home-details.png';

export default function WeekStage() {
  const t = useTranslations();

  const { motherData, isRTL } = useContext(WeekContext);
  const days = motherData?.pregnancy_days;

  return (
    <>
      {days ? (
        <div className="week-stage-known">
          <div className="week-stage-card bg-white">
            <h6>
              <StageString num={days} />
            </h6>
            <h6>{t('home.pregnancy_stage_in')}</h6>

            <p className="body-2 text-gray-800 mt-4 pregnancy-date text-center">
              {t('home.pregnancy_stage_trimester', {
                atr: t(`statics.ordinals.${getPregnancyTrimester(days)}`),
              })}{' '}
              /{' '}
              <span
                className={`${isRTL ? 'body-3' : 'body-2'} text-gray-600 ms-0.5`}
              >
                <StageString
                  num={getPregnancyDateLeft(days)}
                  tKey="home.pregnancy_stage_left"
                />
              </span>
            </p>

            <WeeksProgress />
          </div>
        </div>
      ) : (
        <div className="week-stage-unknown-container">
          <div className="week-stage-unknown">
            <Image
              src={HomeDetails?.src}
              width={193}
              height={101}
              alt="get-started"
            />
            <p
              className={`${isRTL ? 'body-3' : 'body-2'} text-gray-800 text-center mt-4`}
            >
              {t('home.complete_details_message')}
            </p>

            <Link href={urls.profile} className="mt-2">
              <button className="button-ultraviolet w-auto">
                {t('home.get_started')}
              </button>
            </Link>
          </div>

          <div className="home-bg-middle blur-bg">
            <div className="ellipse-yellow" />
          </div>

          <div className="home-bg-bottom blur-bg">
            <div className="ellipse-yellow" />
            <div className="ellipse-green" />
          </div>
        </div>
      )}
    </>
  );
}
