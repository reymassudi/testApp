import TermsOfService from '@/app/ui/AboutApp/TermsOfService';

export default async function TermsOfServicePage() {
  return (
    <>
      <TermsOfService />
      <div className="layout-shadow" />

      <div className="terms-page-bg blur-bg">
        <div>
          <div className="ellipse-yellow" />
          <div className="ellipse-green" />
        </div>
      </div>
    </>
  );
}
