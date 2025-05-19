import { useTranslations } from 'next-intl';
import { getPregnancyWeek } from '@/utils/functions';

export default function UserWelcome({ motherData, isRTL }) {
  const t = useTranslations();

  const userData = motherData?.user;
  const name = userData?.full_name;
  const days = motherData?.pregnancy_days;

  return (
    <div className="user-welcome">
      {name ? (
        <h4>{t('home.welcome_message_name', { name: name })}</h4>
      ) : (
        <h4>{t('home.welcome_message_dear')}</h4>
      )}
      <p
        className={`${isRTL ? 'body-2' : 'body-1'} pregnancy-stage-message mt-2`}
      >
        {days ? (
          <span>
            {t('home.pregnancy_stage_string', {
              num: getPregnancyWeek(days),
            })}
          </span>
        ) : (
          <span>{t('home.pregnancy_stage_unknown_message')}</span>
        )}
      </p>
    </div>
  );
}
