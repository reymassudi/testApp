import BackButton from '@/components/Layout/components/BackButton';

export default function OtherLayout({ children }) {
  return (
    <>
      <BackButton />
      {children}
    </>
  );
}
