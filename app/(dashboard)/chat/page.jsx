import { Suspense } from 'react';
import ChatPage from '@/app/ui/Chat/ChatPage';
import { getToken } from '@/utils/auth';

export default async function Chat() {
  const { access_token } = await getToken();

  return (
    <Suspense fallback={<div />}>
      <ChatPage token={access_token} />

      <div className="chat-bg blur-bg">
        <div>
          <div className="ellipse-yellow" />
          <div className="ellipse-green" />
        </div>
      </div>
    </Suspense>
  );
}
