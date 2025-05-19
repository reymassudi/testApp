import { getTranslations } from 'next-intl/server';
import PhoneForm from '@/components/auth-form/PhoneForm';
import GoogleForm from '@/components/auth-form/GoogleForm';
import { get_locale } from '@/utils/server-functions';

import './auth-form.scss';

export default async function LoginPage() {
  const t = await getTranslations();
  const locale = await get_locale();
  const isRTL = locale?.rtl;

  return (
    <div className="px-10 pt-10 auth-form">
      <h6 className="mb-2">{t('auth.sign_up')}</h6>

      <div>
        <PhoneForm label={t('auth.enter_phone')} locale={locale?.language} />
        <div className="auth-or body-2">{t('general.or')}</div>
        <GoogleForm isRTL={isRTL} locale={locale?.language} />
      </div>
    </div>
  );
}
