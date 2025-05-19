import NewChatButton from './components/NewChatButton';
import DrawerMenu from './components/DrawerMenu';
import HistoryMenu from './components/HistoryMenu';
import { getChatHistory } from '@/actions/get-server';
import { get_locale } from '@/utils/server-functions';

export default async function ChatLayout({ children }) {
  const data = await getChatHistory(0);
  const isRTL = (await get_locale())?.rtl;

  return (
    <div className="chat-layout">
      <div className="chat-fixed">
        <DrawerMenu isRTL={isRTL} />
        <NewChatButton />
        <HistoryMenu data={data} />
      </div>
      {children}
    </div>
  );
}
