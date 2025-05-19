'use server';

import { getTranslations } from 'next-intl/server';

import { company_mail, company_website } from '@/utils/constants';
import Stork from '@/public/img/about-us-stork.svg';

export default async function AboutEnglish() {
  const t = await getTranslations();

  return (
    <>
      <span className="font-bold">{t('app_name')}</span>{' '}
      <span>
        — Your Intelligent and Trusted Companion on the Extraordinary Journey of
        Pregnancy and Motherhood Blending the warmth of maternal care with the
        power of artificial intelligence, {t('app_name')} supports expecting
        mothers through every stage of pregnancy with personalized guidance,
        emotional well-being support, and smart health tools — all tailored to
        your unique needs and experiences.
      </span>
      <div className="mt-7 relative">
        <span className="h9 block">Contact Information</span>

        <span className="body-4 block mt-4">
          Email <span className="ms-3">{company_mail}</span>
        </span>
        <span className="body-4 block">
          Website <span className="ms-2">{company_website}</span>
        </span>

        <Stork className="stork" />
      </div>
    </>
  );
}
