'use client';

import { usePathname, useRouter } from 'next/navigation';

import { urls } from '@/utils/constants/navigation';
import ArrowLeft from '@/public/icons/arrow-curve-left-up.svg';

export default function BackButton() {
  const router = useRouter();
  const path = usePathname();

  const onGoBack = async () => {
    router.back();
  };

  return (
    <button
      onClick={onGoBack}
      className={`back-button rtl:scale-x-[-1]${path === urls.calendarFull ? ' back-button-fixed' : ''}`}
    >
      <ArrowLeft />
    </button>
  );
}
