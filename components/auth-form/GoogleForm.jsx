'use client';

import { useTranslations } from 'next-intl';

import { apis } from '@/utils/constants/apis';
import Google from '@/public/img/auth/google.svg';

export default function GoogleForm({ isRTL, locale }) {
  const t = useTranslations();

  const onGoogleLogin = () => {
    window.location.href = `${process.env.BASE_URL}${apis.login_google}?language=${locale}`;
  };

  return (
    <button
      className={`google-button${isRTL ? ' body-3' : ' body-2'}`}
      onClick={onGoogleLogin}
    >
      <Google />
      {t('auth.google_sign_up')}
    </button>
  );
}
