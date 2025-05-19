import Link from 'next/link';
import AuthSlider from '@/app/ui/SignIn/AuthSlider';
import LocaleSelect from './components/LocaleSelect';
import { getConfigs } from '@/actions/get-server';

import { urls } from '@/utils/constants/navigation';
import { getTranslations } from 'next-intl/server';
import './layout.scss';

export default async function AuthLayout({ children }) {
  const t = await getTranslations();
  const localesList = await getConfigs();
  const list = localesList?.data?.languages;

  const localesOptions = list?.map((locale) => ({
    value: locale?.language,
    label: locale?.language,
  }));

  return (
    <>
      <div className="h-full">
        <AuthSlider />

        <div className="locale-select-auth">
          <LocaleSelect localesOptions={localesOptions} localesList={list} />
        </div>

        {children}
      </div>

      <div className="body-3 text-center">
        {t.rich('auth.accept_terms', {
          privacy: (chunks) => (
            <Link
              className="text-ultraviolet underline underline-offset-4"
              href={urls.privacyPolicy}
            >
              {chunks}
            </Link>
          ),
          terms: (chunks) => (
            <Link
              className="text-ultraviolet underline underline-offset-4"
              href={urls.terms}
            >
              {chunks}
            </Link>
          ),
        })}
      </div>
    </>
  );
}
