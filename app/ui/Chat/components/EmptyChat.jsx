import { useTranslations } from 'next-intl';
import Image from 'next/image';

import ChatEmpty from '@/public/img/chat/chat-empty.png';

export default function EmptyChat() {
  const t = useTranslations();

  return (
    <div className="chat-empty">
      <Image
        src={ChatEmpty?.src}
        alt="new-chat"
        width={217}
        height={120}
        priority
      />

      <p className="body-2 text-gray-600 mt-4 max-w-[220px] text-center">
        {t('chat.empty_chat_text')}
      </p>
    </div>
  );
}
