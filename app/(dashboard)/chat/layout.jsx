import ChatLayout from '@/components/Layout/ChatLayout';
import { ChatProvider } from '@/utils/context/ChatContext';
import { get_locale } from '@/utils/server-functions';

export default async function Layout({ children }) {
  const isRTL = (await get_locale())?.rtl;

  return (
    <ChatProvider value={{ isRTL }}>
      <ChatLayout>{children}</ChatLayout>
    </ChatProvider>
  );
}
