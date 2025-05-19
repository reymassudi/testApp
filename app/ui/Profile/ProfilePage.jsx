import { getLocale, getTranslations } from 'next-intl/server';
import ProfileForm from './components/ProfileForm';
import { getMother } from '@/actions/get-server';
import { get_profile_fields } from './components/profile-fields';
import { get_pregnancy_week } from '@/utils/functions';

import './profile.scss';

export default async function ProfilePage() {
  const t = await getTranslations();
  const locale = await getLocale();

  const { data } = await getMother();
  const profileFields = await get_profile_fields(t);

  const weeks = get_pregnancy_week(locale, t);

  return (
    <ProfileForm
      profileFields={profileFields}
      motherData={data}
      weeks={weeks}
    />
  );
}
