'use client';

import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { InputImage } from '@/components/Input';

const ProfileImage = ({ label, onImgChange, defaultImg, img }) => {
  const t = useTranslations();

  const [userImg, setUserImg] = useState(
    img ? `${process.env.BASE_URL}/${img}` : defaultImg,
  );
  const fileInput = useRef(null);
  const [error, setError] = useState('');

  const handleClick = () => {
    fileInput.current.click();
  };

  const handleChange = async (event) => {
    if (event?.error) {
      setError(t('error.img_format'));
      return;
    }

    const fileUploaded = event?.files[0];
    setUserImg(URL.createObjectURL(fileUploaded));
    const { ok, error } = await onImgChange(fileUploaded);

    if (!ok && error) {
      setError(error);
    }
  };

  return (
    <div className="input-image mb-4">
      <Image
        src={userImg}
        alt="user-profile"
        width={48}
        height={48}
        onClick={handleClick}
        unoptimized
      />

      <div
        className={`flex flex-col items-start justify-end ms-2 ${error ? 'mb-0' : 'mb-4'}`}
      >
        <button
          type="button"
          onClick={handleClick}
          className="body-3 text-gray-600"
        >
          {label}
        </button>
        {error && <p className="input-error-text w-full">{error}</p>}
      </div>

      <InputImage inputRef={fileInput} onChange={handleChange} />
    </div>
  );
};

export default ProfileImage;
