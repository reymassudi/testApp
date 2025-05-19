import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  deleteSession,
  getNotificationCookie,
  getToken,
  initialSession,
} from '@/utils/auth';
import { onSignOut } from '@/actions/signout';
import { get_refreshed_token } from '@/app/api/base_api';
import { generalRoutes, urls } from '@/utils/constants/navigation';
import { cookie_names, searchQueries } from '@/utils/constants/enums';

export default async function middleware(req) {
  // console.log('req middle', req);
  const path = req.nextUrl.pathname;

  const res = NextResponse.next();

  // handle logout
  if (path.startsWith(urls.signOut)) {
    try {
      const { ok } = await onSignOut();

      if (ok) {
        await deleteSession();
        return NextResponse.redirect(new URL(urls.signIn, req.nextUrl));
      }
    } catch (error) {
      return NextResponse.redirect(new URL(urls.signIn, req.nextUrl));
    }
  }

  // handle not protected routes
  if (generalRoutes.includes(path)) {
    return res;
  }

  // handle google login
  const googleParam = req.nextUrl.searchParams.get('referer');
  if (googleParam) {
    const access_token = req.cookies?.get(cookie_names.google_token)?.value;
    const refresh_token = req.cookies?.get(cookie_names.google_refresh)?.value;
    const is_new = req.cookies?.get(cookie_names.google_new_user)?.value;

    const response = NextResponse.next();
    const { session, expiresAt } = await initialSession({
      access_token,
      refresh_token,
    });
    response.cookies.set(cookie_names.token, session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: expiresAt,
    });

    // try {
    //   (await cookies()).delete(cookie_names.google_token);
    //   (await cookies()).delete(cookie_names.google_refresh);
    //   (await cookies()).delete(cookie_names.google_new_user);
    // } catch (error) {
    //   console.log(error);
    // }

    const fcm = await getNotificationCookie();

    let redirect_url = is_new == 'False' ? urls.home : urls.welcome;
    if (fcm == undefined || !fcm?.fcm_token) {
      redirect_url = `${redirect_url}?${searchQueries.setFCM}=1`;
    }

    return NextResponse.redirect(new URL(redirect_url, req.nextUrl.origin), {
      headers: response.headers,
    });
  }

  // handle no token
  const loginRedirectQuery = req.nextUrl.searchParams.get(
    searchQueries.loginRedirect,
  );
  if (loginRedirectQuery) {
    try {
      (await cookies()).delete(cookie_names.token);
    } catch (error) {
      console.log(error);
    }

    return NextResponse.redirect(new URL(urls.signIn, req.nextUrl));
  }

  const session = await getToken();

  let loginRedirect = false;

  // refresh token
  const tokenExpire = session?.token_expire;
  if (tokenExpire && parseInt(tokenExpire) <= Date.now()) {
    const refresh_token = session.refresh_token;
    if (refresh_token) {
      const { data, response } = await get_refreshed_token(refresh_token);

      if (response?.ok) {
        const { session, expiresAt } = await initialSession({
          ...data,
          refresh_token,
        });
        res.cookies.set(cookie_names.token, session, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          expires: expiresAt,
        });
      } else {
        loginRedirect = true;
      }
    } else {
      loginRedirect = true;
    }
  }

  if (!session?.access_token || loginRedirect) {
    if (!path.startsWith(urls.signIn)) {
      return NextResponse.redirect(new URL(urls.signIn, req.nextUrl));
    } else {
      return res;
    }
  }
  if (path === '/' || (path.startsWith(urls.signIn) && !loginRedirect)) {
    return NextResponse.redirect(new URL(urls.home, req.url));
  }

  return res;
}

// Routes Middleware should not run on
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.png$|favicon\\.ico$|manifest\\.json$).*)',
  ],
};
