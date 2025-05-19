'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { onSignInWithPhone } from '@/actions/auth';
import { SubmitInputButton } from '@/components/Button';

export default function PhoneForm({ label, locale }) {
  const t = useTranslations();
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ phone: '' });
  const { phone } = form;

  const onChange = (value, name) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);

    const formData = { ...form, locale };

    const data = await onSignInWithPhone(formData, t, router);

    if (data?.error) {
      setLoading(false);
      setError(data?.error);
    }
  };

  const onInputKeyDown = async (e) => {
    if (e.repeat) return;
    if (e.key === 'Enter' && e.shiftKey) return;
    if (e.key === 'Enter' && !loading) {
      await handleSubmit();
    }
  };

  return (
    <form noValidate onSubmit={(e) => e.preventDefault()}>
      <label className="auth-label">{label}</label>
      <div
        className={`grid grid-cols-[1fr_28px] content-center phone-input ${error ? 'input-error' : ''}`}
      >
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          name="phone"
          value={phone}
          onChange={(e) => onChange(e.target.value, e.target.name)}
          onKeyDown={onInputKeyDown}
          className="auth-input"
          placeholder={t('auth.phone_placeholder')}
        />

        <SubmitInputButton
          disabled={loading || !phone}
          type={'button'}
          onClick={handleSubmit}
        />
      </div>

      {error && <p className="input-error-text mt-1">{error?.phone}</p>}
    </form>
  );
}
