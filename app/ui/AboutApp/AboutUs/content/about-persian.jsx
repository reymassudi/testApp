'use server';

import { getTranslations } from 'next-intl/server';

import { company_mail, company_website } from '@/utils/constants';
import Stork from '@/public/img/about-us-stork.svg';

export default async function AboutPersian() {
  const t = await getTranslations();

  return (
    <>
      <span className="font-bold">{t('app_name')}،</span>{' '}
      <span>
        همراه هوشمند و قابل اعتماد شما در سفر شگفت‌انگیز بارداری و مادر شدن است.
        با ترکیب گرمای مهر مادری و توان هوش مصنوعی، {t('app_name')} با
        راهنمایی‌های شخصی‌سازی‌شده، مراقبت‌های احساسی و ابزارهای هوشمند، در هر
        گام از این مسیر با شما همراه است.
      </span>
      <div className="mt-7 relative stork-container">
        <span className="h9 block">اطلاعات تماس</span>

        <span className="body-4 block mt-4">
          ایمیل <span className="ms-3">{company_mail}</span>
        </span>
        <span className="body-4 block">
          وبسایت <span className="ms-2">{company_website}</span>
        </span>

        <Stork className="stork rtl:scale-x-[-1]" />
      </div>
    </>
  );
}
