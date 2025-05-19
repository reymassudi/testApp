import NotFoundPage from '@/app/ui/NotFound';

export default async function NotFound() {
  return (
    <div className="not-found">
      <NotFoundPage />

      <div className="not-found-bg blur-bg">
        <div className="bg-shape-top">
          <div className="ellipse-yellow" />
          <div className="ellipse-green" />
        </div>
        <div className="bg-shape-bottom">
          <div className="ellipse-yellow" />
          <div className="ellipse-green" />
        </div>
      </div>
    </div>
  );
}
