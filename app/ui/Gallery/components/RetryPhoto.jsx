'use client';

import { useContext } from 'react';
import { GalleryContext } from '@/utils/context';

import RetryIcon from '@/public/icons/retry.svg';

export default function RetryPhoto({ id }) {
  const { getPhotosAndIndex, onAddImages } = useContext(GalleryContext);

  const onRetryImage = async () => {
    const { temp_photos, i } = getPhotosAndIndex(id);
    const imgInfo = temp_photos[i];

    await onAddImages([imgInfo?.original_file], temp_photos, i);
  };

  return (
    <button className="photo-icon retry-icon mb-1" onClick={onRetryImage}>
      <RetryIcon />
    </button>
  );
}
