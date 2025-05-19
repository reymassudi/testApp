'use client';

import { useContext, useState } from 'react';
import { deletePhoto } from '@/actions/gallery';

import { GalleryContext } from '@/utils/context';

import TrashIcon from '@/public/icons/trash.svg';
import CloseCircle from '@/public/icons/close-circle.svg';

export default function DeletePhoto({ id, isError }) {
  const {
    getPhotosAndIndex,
    setPhotos,
    setTotalFiles,
    totalFiles,
    setServerError,
  } = useContext(GalleryContext);
  const [loading, setLoading] = useState(false);

  const onDeletePhoto = async () => {
    let resOk;
    if (!isError) {
      setLoading(true);
      const { ok } = await deletePhoto(id);
      resOk = ok;
    }

    if (resOk || isError) {
      onDeleteSuccess();
    } else {
      setLoading(false);
    }
  };

  const onDeleteSuccess = () => {
    if (isError) {
      setServerError(null);
    }

    const { temp_photos, i } = getPhotosAndIndex(id);
    temp_photos.splice(i, 1);
    setPhotos(temp_photos);
    setTotalFiles(totalFiles - 1);
  };

  return (
    <button
      className={`photo-icon ${isError ? 'cancel-icon' : 'trash-icon'}`}
      onClick={onDeletePhoto}
      disabled={loading}
    >
      {isError ? <CloseCircle /> : <TrashIcon />}
    </button>
  );
}
