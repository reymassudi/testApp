'use client';

import { useTranslations } from 'next-intl';
import { useContext } from 'react';
import GalleryPhotos from '@/app/ui/Gallery/components/GalleryPhotos';

import { GalleryContext } from '@/utils/context';

import EmptyGallery from '@/public/img/empty-gallery.svg';

export default function YourGallery() {
  const t = useTranslations();
  const { photos, totalFiles } = useContext(GalleryContext);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h6>{t('gallery.your_gallery')}</h6>
        {totalFiles > 0 && (
          <p className="body-3 text-gray-600">
            {t('gallery.photo_num', { num: totalFiles })}
          </p>
        )}
      </div>

      <div className="flex items-center justify-center flex-col">
        {photos?.length > 0 ? (
          <GalleryPhotos />
        ) : (
          <div className="empty-gallery">
            <EmptyGallery />
            <p className="body-2 text-gray-400 mt-4 text-center">
              {t('gallery.no_image')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
