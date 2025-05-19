'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Progress } from '@nextui-org/react';
import moment from 'moment-jalaali';
import Image from 'next/image';
import DeletePhoto from './DeletePhoto';
import RetryPhoto from './RetryPhoto';

import { locales } from '@/utils/constants/enums';

import CheckCircle from '@/public/icons/check-circle.svg';
import FileUpload from '@/public/icons/file-up.svg';

export default function PhotoItem({ photo }) {
  const { file_path, creation_time, id, file, loading, justLoaded, error } =
    photo;

  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className={`photo-item ${loading ? 'photo-blur' : ''}`}>
      <Image
        src={file ? file : `${process.env.BASE_URL}/${file_path}`}
        fill
        alt="album image"
        sizes="100%"
        unoptimized
      />

      <div className="photo-details body-4">
        {loading || justLoaded ? (
          <div className="photo-bottom">
            <div className="photo-up justify-between items-end">
              <div className="flex">
                <FileUpload />
                <span className="ms-1 my-px">
                  {t('gallery.uploading_file')}
                </span>
              </div>

              {justLoaded && (
                <div className="photo-icon checked-icon">
                  <CheckCircle />
                </div>
              )}
            </div>

            {loading && (
              <div className="photo-progress mt-1">
                <Progress
                  classNames={{
                    indicator: 'bg-mint border-mint',
                  }}
                  isIndeterminate
                  value={60}
                  aria-label="Loading..."
                  className="upload-progress"
                  size="sm"
                />
              </div>
            )}

            {justLoaded && <div className="done-progress mt-1 mb-2" />}
          </div>
        ) : (
          <>
            {error ? (
              <div className="photo-bottom">
                <div className="flex flex-col items-end mb-1">
                  <RetryPhoto id={id} />
                  <DeletePhoto id={id} isError />
                </div>

                <span>{t('error.album_upload_failed')}</span>
              </div>
            ) : (
              <>
                <div className="justify-self-end">
                  <DeletePhoto id={id} />
                </div>

                <div className="photo-bottom">
                  {t('general.date')}:{' '}
                  {locale === locales.persian
                    ? moment(creation_time).format('jYYYY/jMM/jDD')
                    : creation_time?.split('T')[0]}
                </div>
              </>
            )}
          </>
        )}
      </div>

      <div className="photo-backdrop" />
    </div>
  );
}
