'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { InputImage } from '@/components/Input';

import { GalleryContext } from '@/utils/context';

import UploadIcon from '@/public/icons/upload.svg';

export default function UploadBox({ loading, serverError }) {
  const t = useTranslations();
  const { onAddImages } = useContext(GalleryContext);
  const fileInput = useRef(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (serverError) {
      setError(serverError);
    } else {
      setError('');
    }
  }, [serverError]);

  const handleClick = () => {
    if (!loading) {
      fileInput.current.click();
    }
  };

  const handleChange = async (event) => {
    if (event?.error) {
      setError(t('error.img_format'));
      return;
    }
    setError('');

    const filesUploaded = event?.files;
    await onAddImages(filesUploaded);
  };

  return (
    <div className="mb-8">
      <div
        className="gallery-upload-box"
        style={
          error
            ? { backgroundImage: `url('/img/upload-error.png')` }
            : { backgroundImage: `url('/img/upload-background.png')` }
        }
        onClick={handleClick}
      >
        <UploadIcon />

        <p className="text-gray-600 mt-1 h7">{t('gallery.upload_here')}</p>
        <p className="text-gray-600 mt-1 mb-4 body-4">
          {t('gallery.upload_limits')}
        </p>

        <button className="button-ultraviolet" disabled={loading}>
          {t('gallery.browse')}
        </button>

        <InputImage inputRef={fileInput} onChange={handleChange} multiple />
      </div>
      {error && <p className="input-error-text mt-2 text-right">{error}</p>}
    </div>
  );
}
