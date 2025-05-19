'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import OtherLayout from '@/components/Layout/OtherLayout';

import NotFoundImg from '@/public/img/not-found.svg';

import './not-found.scss';

export default function NotFoundPage() {
  const router = useRouter();
  const t = useTranslations();

  return (
    <OtherLayout>
      <div className="page-not-found">
        <div className="mb-8">
          <p className="body-2 text-gray-600 text-start mb-1">
            {t('error.404')}
          </p>
          <h4>{t('general.not_found')}</h4>
        </div>

        <NotFoundImg />

        <p className="body-2 text-gray-600 text-center mt-4 mb-6">
          {t('general.not_found_text')}
        </p>
        <button onClick={router.back} className="button-ultraviolet">
          {t('general.not_found_button')}
        </button>
      </div>
    </OtherLayout>
  );
}
