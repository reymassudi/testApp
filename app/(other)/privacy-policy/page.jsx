import PrivacyPolicy from '@/app/ui/AboutApp/PrivacyPolicy';

export default async function PrivacyPolicyPage() {
  return (
    <>
      <PrivacyPolicy />
      <div className="layout-shadow" />

      <div className="privacy-page-bg blur-bg">
        <div>
          <div className="ellipse-yellow" />
          <div className="ellipse-green" />
        </div>
      </div>
    </>
  );
}
