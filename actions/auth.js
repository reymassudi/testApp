'use client';

import {
  normalizePhoneNumber,
  validatePhone,
  validateText,
} from '@/utils/functions';
import { method } from '@/utils/constants/apis';
import { urls } from '@/utils/constants/navigation';
import { searchQueries } from '@/utils/constants/enums';

const trimCountryCode = (code) => {
  try {
    return code.replace(/\+/g, '');
  } catch (e) {
    return '';
  }
};

export async function onSignInWithPhone(form, t, router, onOtp) {
  let newUser = false;
  const { phone, locale } = form;

  try {
    if (!validateText(phone)) {
      throw t('error.required', { name: t('profile.phone') });
    } else if (!validatePhone(phone)) {
      throw t('error.validation', { name: t('profile.phone') });
    }

    const body = {
      local_phone: normalizePhoneNumber(phone),
      country_code: '98',
      language: locale,
    };
    const response = await fetch('/api/auth/sign-in-with-phone', {
      method: method.post,
      body: JSON.stringify(body),
    });
    const data = await response.json();

    newUser = data?.data?.is_new_user;

    if (!data?.ok) {
      throw data?.data?.detail[0]?.msg;
    }

    // if called from otp page don't redirect:
    if (onOtp) {
      return {
        ok: true,
      };
    }
  } catch (error) {
    console.log('error onSignInWithPhone', error);

    return {
      ok: false,
      error: { phone: typeof error === 'string' ? error : t('error.server') },
    };
  }

  router.push(
    `${urls.otp}?${searchQueries.otpPhone}=${phone}&${searchQueries.otpCountryCode}=98&${searchQueries.otpNewUser}=${newUser}`,
  );
}

export async function onVerify(form, t, router, newUser) {
  try {
    const { code, phone, countryCode } = form;

    if (!validateText(code)) {
      throw t('error.required', { name: t('auth.code') });
    }

    const body = {
      local_phone: normalizePhoneNumber(phone),
      country_code: countryCode,
      one_time_pass: code,
    };

    const response = await fetch('/api/auth/verify-otp', {
      method: method.post,
      body: JSON.stringify(body),
    });
    const data = await response.json();

    if (!data?.ok) {
      if (response?.status === 401) {
        throw t('error.not_valid');
      }

      const detail = data?.data?.detail;
      if (typeof detail === 'string') {
        throw detail;
      }
      if (typeof detail === 'object') {
        throw detail[0]?.msg;
      }
    }
  } catch (error) {
    console.log('error onVerify', error);
    return {
      error: { code: error },
    };
  }

  if (newUser === 'true') {
    router.push(urls.welcome);
  } else {
    router.push(urls.home);
  }
}

export async function onSendCodeAgain(form, t) {
  return await onSignInWithPhone(form, t, null, true);
}
