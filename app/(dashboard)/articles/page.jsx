import ArticlesPage from '@/app/ui/Articles/ArticlesPage';

export default async function Articles() {
  return (
    <>
      <ArticlesPage />

      <div className="articles-bg blur-bg">
        <div>
          <div className="ellipse-yellow" />
          <div className="ellipse-green" />
        </div>
      </div>
    </>
  );
}
