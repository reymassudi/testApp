'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import TextInput from '@/components/auth-form/TextInput';
import { SubmitFormButton } from '@/components/Button';
import { formatTime } from '@/utils/functions';
import { onSendCodeAgain, onVerify } from '@/actions/auth';
import { requestNotificationPermission } from '@/utils/firebase';

import { urls } from '@/utils/constants/navigation';
import { otp_expiration } from '@/utils/constants';
import { searchQueries } from '@/utils/constants/enums';

import './auth-form.scss';

export default function OTPPage({ fcm }) {
  const t = useTranslations();
  const router = useRouter();
  const locale = useLocale();

  const searchParams = useSearchParams();
  const phone = searchParams.get(searchQueries.otpPhone);
  const countryCode = searchParams.get(searchQueries.otpCountryCode);
  const newUser = searchParams.get(searchQueries.otpNewUser);

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const expirationTime = otp_expiration * 60;
  const [timer, setTimer] = useState(expirationTime);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    inputRef?.current.focus();
  }, []);

  useEffect(() => {
    if (!phone) {
      router.push(`${urls.signIn}?${searchQueries.loginRedirect}=true`);
    }
  }, [phone]);
  useEffect(() => {
    if (!countryCode) {
      router.push(`${urls.signIn}?${searchQueries.loginRedirect}=true`);
    }
  }, [countryCode]);

  useEffect(() => {
    let interval;

    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, timer]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError({});
    setLoading(true);
    const formData = { phone, code: inputRef?.current?.value, countryCode };

    const data = await onVerify(formData, t, router, newUser);

    if (data?.error) {
      setLoading(false);
      setError(data?.error);
    } else {
      if (!fcm?.fcm_token) {
        await requestNotificationPermission();
      }
    }
  };

  const resetTimer = () => {
    setTimer(expirationTime);
    setIsRunning(true);
  };

  const handleSendAgain = async () => {
    setError({});
    setLoading(true);
    inputRef.current.value = '';
    const form = { phone, code: countryCode, locale };

    const { ok } = await onSendCodeAgain(form, t);

    setLoading(false);
    if (ok) {
      resetTimer();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-10 pt-10 auth-form">
      <div className="mb-10">
        <h6 className="mb-2">{t('auth.sign_up')}</h6>

        <TextInput
          label={t('auth.enter_code')}
          error={error?.code}
          name="otp"
          type="number"
          ref={inputRef}
        />

        <div className="input-helper-text flex justify-between w-full">
          <p className="text-gray-400">{formatTime(timer)}</p>

          <p
            className={timer ? 'text-gray-100' : 'text-gray-400'}
            onClick={timer ? null : () => handleSendAgain()}
          >
            {t('auth.resend_code')}
          </p>
        </div>
      </div>

      <SubmitFormButton isPending={loading} title={t('auth.submit')} />
    </form>
  );
}
