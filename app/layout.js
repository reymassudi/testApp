import { Nunito } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import localFont from 'next/font/local';
import { NextUIProvider } from '@nextui-org/system';
import { getIsRTL } from '@/utils/functions';
import { getConfigs } from '@/actions/get-server';
import PushNotificationManager from '@/components/Notification';

import './globals.css';

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
});

const shabnam = localFont({
  src: [
    {
      path: '../public/fonts/Shabnam.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Shabnam-Medium.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-persian',
});

export default async function RootLayout({ children }) {
  const messages = await getMessages();
  const locale = await getLocale();
  const localesList = await getConfigs();
  const isRTL = getIsRTL(locale, localesList?.data?.languages);

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'}>
      <body
        className={isRTL ? shabnam.className : `${nunito.variable} antialiased`}
      >
        <NextUIProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
            <PushNotificationManager />
            {/*<InstallPrompt />*/}
            <div id="dropdown-root" />
          </NextIntlClientProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
