'use server';

import { getLocale, getTranslations } from 'next-intl/server';
import TermsPersian from './content/terms-persian';
import TermsEnglish from './content/terms-english';

import { locales } from '@/utils/constants/enums';
import '../about-app.scss';

export default async function TermsOfService() {
  const t = await getTranslations();
  const locale = await getLocale();

  return (
    <div className="terms-page">
      <h5 className="mb-8">{t('terms.terms_of_service')}</h5>

      {locale === locales.persian ? <TermsPersian /> : <TermsEnglish />}
    </div>
  );
}
