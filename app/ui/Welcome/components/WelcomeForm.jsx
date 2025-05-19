'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { SubmitFormButton } from '@/components/Button';
import { InputContained } from '@/components/Input';
import PeriodAndStage from '@/components/auth-form/PeriodAndStage';
import { onUserInit } from '@/actions/profile';

import { urls } from '@/utils/constants/navigation';
import '@/app/ui/SignIn/auth-form.scss';

export default function WelcomeForm({ weeks }) {
  const t = useTranslations();
  const router = useRouter();
  const [error, setError] = useState({});
  const [form, setForm] = useState({
    full_name: '',
  });
  const [loading, setLoading] = useState(false);

  const onInputChange = (value, name) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);

    const { error, ok } = await onUserInit(form, t);

    if (ok) {
      router.push(urls.home);
    }

    setError(error);
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-16 self-end flex flex-col justify-center auth-form"
    >
      <div>
        <InputContained
          name="full_name"
          label={t('profile.name')}
          className="mb-6"
          labelOption={t('general.optional')}
          onInputChange={onInputChange}
          value={form?.full_name}
        />

        <PeriodAndStage
          onInputChange={onInputChange}
          weeks={weeks}
          labelOption={t('general.optional')}
        />

        {error?.server && (
          <p className="input-error-text mt-2">{error?.server}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 mt-10">
        <SubmitFormButton
          onClick={handleSubmit}
          isPending={loading}
          title={t('auth.submit')}
        />

        <Link href={urls.home}>
          <button className="button-gray-500-outlined">{t('auth.skip')}</button>
        </Link>
      </div>
    </form>
  );
}
