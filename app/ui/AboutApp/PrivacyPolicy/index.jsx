'use server';

import { getLocale, getTranslations } from 'next-intl/server';
import PolicyPersian from './content/policy-persian';
import PolicyEnglish from './content/policy-english';
import { locales } from '@/utils/constants/enums';

import '../about-app.scss';

export default async function PrivacyPolicy() {
  const t = await getTranslations();
  const locale = await getLocale();

  return (
    <div className="terms-page">
      <h5 className="mb-8">{t('terms.privacy_policy')}</h5>
      {locale === locales.persian ? <PolicyPersian /> : <PolicyEnglish />}
    </div>
  );
}
