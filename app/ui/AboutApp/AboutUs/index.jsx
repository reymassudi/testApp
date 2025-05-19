'use server';

import { getLocale, getTranslations } from 'next-intl/server';
import AboutPersian from './content/about-persian';
import AboutEnglish from './content/about-english';
import { locales } from '@/utils/constants/enums';

import '../about-app.scss';

export default async function AboutUs() {
  const t = await getTranslations();
  const locale = await getLocale();

  return (
    <div className="terms-page">
      <h5 className="mb-8">{t('terms.about_us')}</h5>

      {locale === locales.persian ? <AboutPersian /> : <AboutEnglish />}
    </div>
  );
}
