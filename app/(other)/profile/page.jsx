import ProfilePage from '@/app/ui/Profile/ProfilePage';

export default async function Profile() {
  return (
    <>
      <ProfilePage />

      <div className="profile-bg blur-bg">
        <div>
          <div className="ellipse-yellow" />
          <div className="ellipse-green" />
        </div>
      </div>
    </>
  );
}
