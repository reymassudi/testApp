import { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';

export default function ChatList({ chats, onGetNewPage, pagination }) {
  const messagesEndRef = useRef(null);
  const chatListRef = useRef(null);
  const lastScrollTopRef = useRef(0);
  const currentScrollHeight = useRef(0);
  const isAdjustingScroll = useRef(false);

  useEffect(() => {
    if (!pagination?.didPage) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      isAdjustingScroll.current = true;
      const previousScrollHeight = lastScrollTopRef.current;
      const currentScrollHeight = chatListRef.current.scrollHeight;
      const scrollOffset = currentScrollHeight - previousScrollHeight;

      chatListRef.current.scrollTop += scrollOffset;
      lastScrollTopRef.current = chatListRef.current.scrollTop;
      isAdjustingScroll.current = false;
    }
  }, [chats]);

  const handleScroll = () => {
    if (!chatListRef.current || isAdjustingScroll.current) return;

    const currentScrollTop = chatListRef.current.scrollTop;
    const isScrollingUp = currentScrollTop < lastScrollTopRef.current;

    lastScrollTopRef.current = chatListRef.current.scrollHeight;

    const isAtTop = currentScrollTop === 0;

    if (isAtTop && isScrollingUp && pagination?.totalPages > chats?.length) {
      onPagination();
    }
  };

  const onPagination = () => {
    currentScrollHeight.current = chatListRef.current.scrollHeight;
    onGetNewPage();
  };

  return (
    <div className="chat-list" ref={chatListRef} onScroll={handleScroll}>
      {chats.map((chat) => {
        const { tempId, id } = chat;
        const messageKey = `message-${tempId ? tempId : id}`;

        return (
          <ChatMessage chatListRef={chatListRef} data={chat} key={messageKey} />
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}
