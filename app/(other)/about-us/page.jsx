import AboutUs from '@/app/ui/AboutApp/AboutUs';

export default async function AboutUsPage() {
  return (
    <>
      <AboutUs />
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
