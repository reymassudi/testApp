import { Suspense } from 'react';
import OTPPage from '@/app/ui/SignIn/OTPPage';
import { getNotificationCookie } from '@/utils/auth';

export default async function OTP() {
  const fcm = await getNotificationCookie();

  return (
    <Suspense fallback={<div />}>
      <OTPPage fcm={fcm} />
    </Suspense>
  );
}
