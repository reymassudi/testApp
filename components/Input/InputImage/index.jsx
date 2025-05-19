'use client';

import { useTranslations } from 'next-intl';

import { img_valid_formats } from '@/utils/constants';

const InputImage = ({ inputRef, onChange, multiple }) => {
  const t = useTranslations();
  const validFormats = img_valid_formats;

  const handleChange = async (event) => {
    try {
      const filesUploaded = event.target.files;

      if (filesUploaded?.length) {
        const invalidFiles = Array.from(filesUploaded).filter(
          (file) => !validFormats.includes(file.type),
        );

        if (invalidFiles.length > 0) {
          onChange({ error: t('error.img_format') });
        } else {
          onChange({ files: filesUploaded });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <input
      type="file"
      ref={inputRef}
      onChange={handleChange}
      hidden
      multiple={multiple}
      accept={validFormats.join(',')}
    />
  );
};

export default InputImage;
