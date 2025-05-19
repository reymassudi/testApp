import { getTranslations } from 'next-intl/server';
import GalleryMain from './components/GalleryMain';
import { getAlbum } from '@/actions/get-server';

import './gallery.scss';

export default async function GalleryPage({ token }) {
  const t = await getTranslations();

  const { data } = await getAlbum(1, null, token);

  return (
    <div className="gallery-page">
      <h6>{t('gallery.pregnancy_moments')}</h6>
      <p className="body-2 text-gray-600 mt-2 mb-5">
        {t('gallery.gallery_text')}
      </p>
      <GalleryMain albumData={data} />
    </div>
  );
}
