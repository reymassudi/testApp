'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { deleteConversation } from '@/actions/chat';
import { useChat } from '@/utils/context/ChatContext';

import { urls } from '@/utils/constants/navigation';
import { searchQueries } from '@/utils/constants/enums';

import EllipseIcon from '@/public/icons/ellipse.svg';
import EditIcon from '@/public/icons/edit.svg';
import TrashIcon from '@/public/icons/trash.svg';

export default function HistoryMenuDropdown({
  id,
  setIsEdit,
  onHistoryDelete,
}) {
  const t = useTranslations();
  const router = useRouter();
  const dropdownRef = useRef(null);
  const searchParams = useSearchParams();
  const paramId = searchParams.get(searchQueries.chatId);

  const { isRTL } = useChat();

  const [openDropdown, setOpenDropdown] = useState(false);

  const toggleMenu = () => {
    setOpenDropdown(!openDropdown);
  };

  const onEdit = () => {
    setIsEdit(true);
    setOpenDropdown(false);
  };

  const onDelete = async () => {
    setOpenDropdown(false);
    const { ok } = await deleteConversation(id);

    if (ok && paramId == id) {
      router.push(urls.chat);
    }
    if (ok) {
      onHistoryDelete(id);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setOpenDropdown]);

  return (
    <div className="history-menu-dropdown" ref={dropdownRef}>
      <button className="dropdown-button" onClick={toggleMenu}>
        <EllipseIcon />
      </button>

      {openDropdown && (
        <div className="dropdown-menu">
          <button
            className={`dropdown-option rename-option ${isRTL ? 'body-3' : 'body-2'}`}
            onClick={onEdit}
          >
            <EditIcon />
            {t('chat.rename')}
          </button>

          <button
            className={`dropdown-option delete-option ${isRTL ? 'body-3' : 'body-2'}`}
            onClick={onDelete}
          >
            <TrashIcon />
            {t('general.delete')}
          </button>
        </div>
      )}
    </div>
  );
}
