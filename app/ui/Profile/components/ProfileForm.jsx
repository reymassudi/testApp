'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ProfileField from './ProfileField';
import ProfileImage from './ProfileImage';
import PeriodAndStage from '@/components/auth-form/PeriodAndStage';
// import SpecialConditions from '@/components/auth-form/SpecialConditions';
import { onUserImgChange } from '@/actions/files';
import { onMotherUpdate, onUserUpdate } from '@/actions/profile';

import UserProfile from '@/public/img/user-profile.png';

const SectionTitle = ({ title }) => {
  return <h6>{title}</h6>;
};

const ProfileFields = ({
  fields,
  userData,
  onFieldChange,
  errors,
  removeError,
}) => {
  return (
    <>
      {fields.map((field) => {
        const name = field.name;
        if (
          (name === 'email' && userData?.['phone_number']) ||
          (name === 'phone_number' && userData?.['email'])
        ) {
          return;
        }

        return (
          <ProfileField
            {...field}
            defaultValue={userData?.[name]}
            onFieldChange={onFieldChange}
            key={name}
            error={errors?.[name]}
            removeError={removeError}
          />
        );
      })}
    </>
  );
};

export default function ProfileForm({ profileFields, motherData, weeks }) {
  const t = useTranslations();
  const [errors, setErrors] = useState({});

  const onUserField = async (value, name) => {
    const res = await onUserUpdate(value, name, t);
    onChangeResult(res);
  };
  const onMotherField = async (value, name) => {
    const res = await onMotherUpdate(value, name);
    onChangeResult(res);
  };
  const onChangeResult = (res) => {
    if (!res?.ok) {
      setErrors({ ...errors, ...res.error });
    }
  };

  const onImgChange = async (img) => {
    return await onUserImgChange(img, t);
  };

  const removeError = (name) => {
    if (errors?.[name]) {
      const temp_errors = { ...errors };
      delete temp_errors[name];
      setErrors(temp_errors);
    }
  };

  return (
    <div className="profile-page">
      <SectionTitle title={t('profile.personal_data')} />
      <div className="profile-section">
        <ProfileImage
          defaultImg={UserProfile?.src}
          img={motherData?.user?.profile_image}
          onImgChange={onImgChange}
          label={t('profile.choose_image')}
        />

        <ProfileFields
          fields={profileFields.personal_data}
          userData={motherData?.user}
          onFieldChange={onUserField}
          errors={errors}
          removeError={removeError}
        />
      </div>

      <SectionTitle title={t('pregnancy.pregnancy_state')} />
      <div className="profile-section">
        <PeriodAndStage
          className="profile-stage"
          onInputChange={onMotherField}
          weeks={weeks}
          defaultValue={{
            period: motherData?.last_period,
            stage: motherData?.pregnancy_days,
          }}
        />

        <ProfileFields
          fields={profileFields.pregnancy_state}
          userData={motherData}
          onFieldChange={onMotherField}
          errors={errors}
        />
      </div>

      <SectionTitle title={t('pregnancy.medical_details')} />
      <div className="profile-section">
        <ProfileFields
          fields={profileFields.medical_details}
          userData={motherData}
          onFieldChange={onMotherField}
          errors={errors}
        />

        {/*<SpecialConditions />*/}
      </div>
    </div>
  );
}
