'use client';

import { useContext } from 'react';
import Masonry from 'react-masonry-css';
import InfiniteScroll from 'react-infinite-scroll-component';
import PhotoItem from './PhotoItem';

import { GalleryContext } from '@/utils/context';

export default function GalleryPhotos() {
  const { photos, totalFiles, onGetNewPage } = useContext(GalleryContext);

  const onPagination = () => {
    onGetNewPage();
  };

  return (
    <div className="gallery-photos">
      <InfiniteScroll
        dataLength={photos?.length}
        next={onPagination}
        hasMore={totalFiles > photos?.length}
        loader={<span />}
      >
        <Masonry
          breakpointCols={{ default: 2 }}
          className="masonry-grid"
          columnClassName="masonry-grid-column"
        >
          {photos?.map((photo) => (
            <PhotoItem
              photo={photo}
              key={`photo-gallery-${photo?.temp_id ? photo?.temp_id : photo?.id}`}
            />
          ))}
        </Masonry>
      </InfiniteScroll>
    </div>
  );
}
