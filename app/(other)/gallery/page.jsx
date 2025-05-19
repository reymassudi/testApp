import GalleryPage from '@/app/ui/Gallery/GalleryPage';
import { cookies } from 'next/headers';
import { getTokenFromReq } from '@/utils/auth';
import { cookie_names } from '@/utils/constants/enums';

export default async function Gallery() {
  const cookieStore = await cookies();
  const { access_token } = await getTokenFromReq(
    cookieStore.get(cookie_names.token)?.value,
  );

  return (
    <>
      <GalleryPage token={access_token} />

      <div className="gallery-bg blur-bg">
        <div>
          <div className="ellipse-yellow" />
          <div className="ellipse-green" />
        </div>
      </div>
    </>
  );
}
