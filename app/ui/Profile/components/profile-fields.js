import { get_baby_genders } from '@/utils/functions';

export async function get_profile_fields(t) {
  return {
    personal_data: [
      {
        title: t('profile.name'),
        placeholder: t('profile.name_placeholder'),
        name: 'full_name',
        type: 'text',
      },
      {
        title: t('profile.age'),
        placeholder: t('profile.age_placeholder'),
        name: 'age',
        type: 'number',
      },
      {
        title: t('profile.email'),
        placeholder: t('profile.email_placeholder'),
        name: 'email',
        type: 'disabled',
      },
      {
        title: t('profile.phone'),
        name: 'phone_number',
        type: 'disabled',
      },
    ],
    pregnancy_state: [
      {
        title: t('pregnancy.baby_sex'),
        name: 'baby_sex',
        type: 'select',
        options: await get_baby_genders(t),
      },
      {
        title: t('pregnancy.first_child'),
        name: 'first_child',
        type: 'switch',
      },
      {
        title: t('pregnancy.pregnancy_loss'),
        name: 'pregnancy_loss',
        type: 'switch',
      },
    ],
    medical_details: [
      {
        title: t('pregnancy.blood_pressure'),
        name: 'pregnancy_blood_pressure',
        type: 'switch',
      },
      {
        title: t('pregnancy.diabetes'),
        name: 'gestational_diabetes',
        type: 'switch',
      },
    ],
  };
}
