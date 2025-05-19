import ArticleReader from '@/app/ui/Articles/ArticleReader';

export default async function Article({ params }) {
  const id = (await params)?.id;

  return <ArticleReader id={id} />;
}
