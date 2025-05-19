import { cookies } from 'next/headers';
import OtherLayout from '@/components/Layout/OtherLayout';

import { cookie_names } from '@/utils/constants/enums';

export default async function Layout({ children }) {
  const session = (await cookies()).get(cookie_names.token)?.value;

  return <OtherLayout loggedIn={!!session}>{children}</OtherLayout>;
}
