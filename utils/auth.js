'use server';

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { refresh_token_expiration, token_expiration } from '@/utils/constants';
import { cookie_names } from '@/utils/constants/enums';

const secretKey = process.env.SECRET_KEY;
const encodedKey = new TextEncoder().encode(secretKey);
const encodeAlg = 'HS256';

export async function getToken() {
  // console.log('getToken');
  const session = (await cookies()).get(cookie_names.token)?.value;
  // console.log('session', session);
  const token = await decrypt(session);

  // console.log('token get', token);
  return {
    access_token: token?.access_token,
    refresh_token: token?.refresh_token,
    token_expire: token?.token_expire,
  };
}

export async function getTokenFromReq(sessionCookie) {
  // console.log('session', sessionCookie);
  const token = await decrypt(sessionCookie);

  // console.log('token get', token);
  return {
    access_token: token?.access_token,
    refresh_token: token?.refresh_token,
    token_expire: token?.token_expire,
  };
}

export async function encrypt(payload) {
  // console.log('payload', payload);
  return new SignJWT(payload)
    .setProtectedHeader({ alg: encodeAlg })
    .setIssuedAt()
    .sign(encodedKey);
}

export async function decrypt(session) {
  // console.log('session session', session);
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: [encodeAlg],
    });
    return payload;
  } catch (error) {
    console.log('Failed to verify session');
    // console.log('Failed to verify session', error);
  }
}

export async function initialSession(tokenData) {
  // token expiration so we can refresh token sooner than cookie be removed
  const token_expire = new Date(
    Date.now() + token_expiration * 24 * 59 * 60 * 1000,
  ).getTime();
  // cookie expiration because refresh token lasts longer than token
  const expiresAt = new Date(
    Date.now() + refresh_token_expiration * 24 * 60 * 60 * 1000,
  ).getTime();
  const session = await encrypt({ ...tokenData, token_expire, expiresAt });
  return { session, expiresAt };
}

export async function createSession(tokenData) {
  try {
    const { session, expiresAt } = await initialSession(tokenData);
    const cookieStore = await cookies();

    cookieStore.set(cookie_names.token, session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: expiresAt,
      sameSite: 'lax',
      path: '/',
    });

    return { ok: true };
  } catch (error) {
    console.log('Failed to create session', error);
    return { ok: false };
  }
}

export async function deleteSession() {
  try {
    (await cookies()).delete(cookie_names.token);
    (await cookies()).delete(cookie_names.notification);
    return true;
  } catch (error) {
    console.log('Failed to delete session', error);
    return false;
  }
}

export async function setLocaleCookie(locale) {
  try {
    const cookieStore = await cookies();
    const farFutureDate = new Date('9999-12-31T23:59:59Z');

    const stringLocale = JSON.stringify(locale);

    cookieStore.set(cookie_names.locale, stringLocale, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: farFutureDate,
      sameSite: 'lax',
      path: '/',
    });

    return { ok: true };
  } catch (error) {
    console.log('Failed to set locale', error);
    return { ok: false };
  }
}

export async function setNotificationCookie(fcm_token) {
  try {
    const cookieStore = await cookies();
    const farFutureDate = new Date('9999-12-31T23:59:59Z');

    const token = await encrypt({ fcm_token });

    cookieStore.set(cookie_names.notification, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: farFutureDate,
      sameSite: 'lax',
      path: '/',
    });

    return { ok: true };
  } catch (error) {
    console.log('Failed to set locale', error);
    return { ok: false };
  }
}

export async function getNotificationCookie() {
  try {
    const session = (await cookies()).get(cookie_names.notification)?.value;
    // console.log('session', session);
    const token = await decrypt(session);

    // console.log('fcm_token get', token);
    return {
      fcm_token: token?.fcm_token,
    };
  } catch (error) {
    console.log('Failed to set locale', error);
    return { ok: false };
  }
}
