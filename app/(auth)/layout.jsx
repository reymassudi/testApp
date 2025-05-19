export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen h-full grid grid-rows-[1fr_50px]">
      {children}
    </div>
  );
}
