'use client';

import { fetch_api } from '@/app/api/base_fetch_client';
import { convertTimeToISO, validateEmail } from '@/utils/functions';
import { method } from '@/utils/constants/apis';

export async function onUserInit(form, t) {
  try {
    const name = form?.full_name;
    const period = form?.last_period;
    const days = form?.pregnancy_days;

    if (name) {
      const { ok, error } = await onUserUpdate(name, 'full_name', t);

      if (!ok) {
        throw error;
      }
    }
    if (period || days) {
      const body = {
        ...(period && { last_period: convertTimeToISO(period) }),
        ...(days && { pregnancy_days: days }),
      };
      const { data, ok } = await updateMother(body);
      if (!ok) {
        throw t('error.server');
      }
    }

    return { ok: true };
  } catch (error) {
    console.log('error onUserInit', error);

    return {
      ok: false,
      error: { server: error },
    };
  }
}

export async function onUserUpdate(value, name, t) {
  try {
    if (name === 'email' && value) {
      if (!validateEmail(value)) {
        throw t('error.validation', { name: t('profile.email') });
      }
    }

    const body = {
      [name]: value || value === false ? value : null,
    };

    const { data, ok } = await fetch_api(
      `/api/user/profile`,
      method.patch,
      JSON.stringify(body),
    );

    if (!ok) {
      const detail = data?.detail;
      if (typeof detail === 'object') {
        throw detail[0]?.msg;
      } else if (typeof detail === 'string') {
        throw detail;
      } else {
        throw ' ';
      }
    }

    return {
      ok,
    };
  } catch (error) {
    console.log('error onUserUpdate', error);

    return {
      ok: false,
      error: { [name]: typeof error === 'string' ? error : t('error.server') },
    };
  }
}

export async function onMotherUpdate(value, name) {
  try {
    const body = {
      [name]: value || value === false ? value : null,
    };

    return await updateMother(body);
  } catch (error) {
    console.log('error onMotherUpdate', error);

    return {
      ok: false,
    };
  }
}

export async function updateMother(body) {
  try {
    return await fetch_api(
      `/api/user/mother`,
      method.patch,
      JSON.stringify(body),
    );
  } catch (error) {
    console.log('error updateMother', error);

    return {
      ok: false,
    };
  }
}

export async function onLocaleUpdate(body) {
  try {
    return await fetch_api(
      `/api/user/locale`,
      method.post,
      JSON.stringify(body),
    );
  } catch (error) {
    console.log('error onLocaleUpdate', error);

    return {
      ok: false,
    };
  }
}
