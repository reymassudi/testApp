import { getLocale, getTranslations } from 'next-intl/server';
import WelcomeForm from './components/WelcomeForm';
import { getMother } from '@/actions/get-server';
import { get_pregnancy_week } from '@/utils/functions';

import './welcome.scss';

export default async function WelcomePage() {
  // to create the mother in database
  await getMother();

  const t = await getTranslations();
  const locale = await getLocale();

  const weeks = get_pregnancy_week(locale, t);

  return (
    <>
      <div className="h-full py-14 px-10 z-10 relative">
        <div>
          <h2 className="text-center">{t('auth.welcome')}</h2>
          <p className="text-gray-800 text-center mt-2">
            {t('auth.to_app', { app: t('app_name') })}
          </p>
        </div>

        <WelcomeForm weeks={weeks} />
      </div>

      <div className="blur-bg welcome-bg">
        <div className="ellipse-yellow circle-lg" />
        <div className="ellipse-yellow circle-md" />
        <div className="ellipse-green" />
      </div>
    </>
  );
}
