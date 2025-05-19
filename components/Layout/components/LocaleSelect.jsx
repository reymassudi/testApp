'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { InputSelect } from '@/components/Input';
import { onLocaleUpdate } from '@/actions/profile';

import GlobeIcon from '@/public/icons/globe.svg';

export default function LocaleSelect({ localesOptions, localesList }) {
  const locale = useLocale();
  const router = useRouter();

  const onLocaleChange = async (value) => {
    const selectedLocale = localesList?.find(
      (locale) => locale.language === value,
    );
    await onLocaleUpdate({ locale: selectedLocale });
    router.refresh();
  };

  if (locale) {
    return (
      <div className="locale-select">
        <InputSelect
          name="locale"
          options={localesOptions}
          onInputChange={onLocaleChange}
          defaultValue={locale}
        />
        <div className="locale-select-icon">
          <GlobeIcon />
        </div>
      </div>
    );
  }
  return null;
}
