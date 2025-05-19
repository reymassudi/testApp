import ReactDOM from 'react-dom';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

import ArrowLeft from '@/public/icons/arrow-curve-left-up.svg';
import CopyLeft from '@/public/icons/copy-left.svg';

export default function MessageOptionDropdown({
  isOpen,
  anchorEl,
  scrollContainer,
  isAi,
  setIsDropdownOpen,
  onReply,
  context,
}) {
  const t = useTranslations();
  const dropdownRef = useRef(null);
  const dropdownRoot = document.getElementById('dropdown-root');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsDropdownOpen]);

  if (!isOpen || !anchorEl || !scrollContainer || !dropdownRoot) return null;

  const rect = anchorEl.getBoundingClientRect();
  const scrollRect = scrollContainer.getBoundingClientRect();

  const dropdownStyle = {
    position: 'absolute',
    top: rect.bottom - scrollRect.top + 81,
    insetInlineEnd: isAi ? 24 : 62,
    zIndex: 10,
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(context);
      setIsDropdownOpen(false);
      // setIsCopied(true);
      // setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return ReactDOM.createPortal(
    <div style={dropdownStyle} ref={dropdownRef}>
      <div className="chat-dropdown-menu">
        <button className="chat-dropdown-option" onClick={onReply}>
          <ArrowLeft className="rtl:scale-x-[-1]" />
          {t('chat.reply')}
        </button>

        <button className="chat-dropdown-option" onClick={handleCopy}>
          <CopyLeft />
          {t('chat.copy')}
        </button>
      </div>
    </div>,
    dropdownRoot,
  );
}
