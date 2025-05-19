'use client';

import { createContext, useContext, useState } from 'react';

const ChatContext = createContext(null);

export function ChatProvider({ children, value }) {
  const [refreshHistory, setRefreshHistory] = useState(false);
  const [replyMessage, setReplyMessage] = useState(null);

  return (
    <ChatContext.Provider
      value={{
        refreshHistory,
        setRefreshHistory,
        replyMessage,
        setReplyMessage,
        isRTL: value?.isRTL,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}
