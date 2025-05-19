import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { urls } from '@/utils/constants/navigation';

import EditIcon from '@/public/icons/edit-contained.svg';

export default async function NewChatButton() {
  const t = await getTranslations();

  return (
    <Link href={urls.chat} className="new-chat-button">
      <p className="h8 me-2">{t('chat.new_chat')}</p>
      <EditIcon />
    </Link>
  );
}
