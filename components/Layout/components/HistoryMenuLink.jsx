'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import HistoryMenuDropdown from './HistoryMenuDropdown';
import { renameConversation } from '@/actions/chat';

import { urls } from '@/utils/constants/navigation';
import { searchQueries } from '@/utils/constants/enums';

export default function HistoryMenuLink({
  item,
  onClose,
  onHistoryRename,
  onHistoryDelete,
}) {
  const { topic, id } = item;
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isEdit, setIsEdit] = useState(false);
  const [chatTopic, setChatTopic] = useState(topic);
  const inputRef = useRef(null);

  const link = `${urls.chat}?${searchQueries.chatId}=${id}`;
  const fullUrl = `${pathname}${searchParams.toString() ? '?' + searchParams.toString() : ''}`;

  const onChangeTopic = async () => {
    setIsEdit(false);
    const { ok } = await renameConversation(chatTopic, id);
    if (ok) {
      onHistoryRename(id, chatTopic);
    }
  };

  useEffect(() => {
    // Move the cursor to the end when is on edit
    if (isEdit && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(chatTopic.length, chatTopic.length);
    }
  }, [isEdit, chatTopic]);

  return (
    <div
      className={`grid items-center history-menu-item body-3 ${isEdit ? 'history-edit' : 'history-link'} ${fullUrl == link ? 'active' : ''}`}
    >
      {isEdit ? (
        <input
          value={chatTopic ? chatTopic : ''}
          onChange={(e) => setChatTopic(e.target.value)}
          onBlur={onChangeTopic}
          ref={inputRef}
          type="text"
        />
      ) : (
        <Link href={link} onClick={onClose} className="history-menu-link">
          {chatTopic}
        </Link>
      )}

      {!isEdit && (
        <HistoryMenuDropdown
          id={id}
          setIsEdit={setIsEdit}
          onHistoryDelete={onHistoryDelete}
        />
      )}
    </div>
  );
}
