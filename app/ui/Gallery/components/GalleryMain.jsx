'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import UploadBox from './UploadBox';
import YourGallery from './YourGallery';
import { getAlbum } from '@/actions/gallery';
import { onAlbumAdd } from '@/actions/files';

import { GalleryContext } from '@/utils/context';

export default function GalleryMain({ albumData }) {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [photos, setPhotos] = useState(albumData?.files);
  const [totalFiles, setTotalFiles] = useState(albumData?.total_files);
  const [pagination, setPagination] = useState({
    totalPages: albumData?.total_pages,
    lastId: null,
  });

  useEffect(() => {
    if (photos?.length > 0 && photos[photos.length - 1]?.id) {
      setPagination({ ...pagination, lastId: photos[photos.length - 1]?.id });
    }
  }, [photos]);

  const onAddImages = async (files, temp_photos, i) => {
    setLoading(true);
    let isRetry = !!temp_photos;
    let tempPhotoArray;
    const newPhotos = [];

    if (isRetry) {
      const imgInfo = temp_photos[i];
      imgInfo.loading = true;
      tempPhotoArray = temp_photos;
    } else {
      for (let i = 0; i < files.length; i++) {
        newPhotos.push({
          loading: true,
          name: files[i].name,
          file: URL.createObjectURL(files[i]),
          temp_id: `${new Date().toISOString()}-${files[i].name}`,
          original_file: files[i],
        });
      }
      tempPhotoArray = [...newPhotos.reverse(), ...photos];
    }

    setPhotos(tempPhotoArray);

    const { data, ok, error } = await onAlbumAdd(files, t);

    setLoading(false);
    const newPhotoArray = [...tempPhotoArray];

    if (ok && data?.length > 0) {
      if (isRetry) {
        setFetchedPhoto(newPhotoArray[i], data[0]);
      } else {
        const reversedData = data?.reverse();
        for (let i = 0; i < newPhotos.length; i++) {
          setFetchedPhoto(newPhotoArray[i], reversedData[i]);
        }
      }

      setPhotos(newPhotoArray);
      setTotalFiles(totalFiles + files?.length);

      setTimeout(() => {
        const loadedPhotoArray = [...newPhotoArray];
        if (isRetry) {
          const photo = loadedPhotoArray[i];
          photo.justLoaded = false;
        } else {
          for (let i = 0; i < newPhotos.length; i++) {
            const photo = loadedPhotoArray[i];
            photo.justLoaded = false;
          }
        }
        setPhotos(loadedPhotoArray);
      }, 1000);

      setServerError(null);
    } else {
      if (isRetry) {
        const photo = newPhotoArray[i];
        photo.loading = false;
      } else {
        for (let i = 0; i < newPhotos.length; i++) {
          const photo = newPhotoArray[i];
          photo.loading = false;
          photo.error = true;
          photo.id = photo.temp_id;
        }
      }

      setPhotos(newPhotoArray);
      setServerError(error);
    }
  };

  const setFetchedPhoto = (photo, data) => {
    photo.id = data?.file?.id;
    photo.creation_time = data?.file?.creation_time;
    photo.loading = false;
    photo.error = false;
    photo.justLoaded = true;
  };

  const getPhotosAndIndex = (id) => {
    const temp_photos = [...photos];
    temp_photos.forEach((photo) => {
      if (photo.justLoaded === true) {
        photo.justLoaded = false;
      }
    });
    const i = temp_photos?.findIndex((file) => file.id === id);

    return { temp_photos, i };
  };

  const onGetNewPage = async () => {
    const lastId = pagination.lastId;
    const { data, ok } = await getAlbum(null, lastId);

    if (ok) {
      const tempPhotoArray = [...photos, ...data?.files];
      setPhotos(tempPhotoArray);
      setPagination({ ...pagination });
    }
  };

  return (
    <GalleryContext.Provider
      value={{
        photos,
        totalFiles,
        pagination,
        setPhotos,
        setTotalFiles,
        setServerError,
        onAddImages,
        getPhotosAndIndex,
        onGetNewPage,
      }}
    >
      <UploadBox loading={loading} serverError={serverError} />
      <YourGallery />
    </GalleryContext.Provider>
  );
}
