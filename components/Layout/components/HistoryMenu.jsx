'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useDisclosure } from '@nextui-org/react';
import { Drawer, DrawerBody, DrawerContent } from '@nextui-org/drawer';
import InfiniteScroll from 'react-infinite-scroll-component';
import HistoryMenuLink from './HistoryMenuLink';
import { getChatHistory } from '@/actions/chat';
import { useChat } from '@/utils/context/ChatContext';

import History from '@/public/icons/history.svg';
import CloseIcon from '@/public/icons/close.svg';

export default function HistoryMenu({ data }) {
  const t = useTranslations();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { refreshHistory, setRefreshHistory, isRTL } = useChat();
  const [histories, setHistories] = useState([]);
  const [pagination, setPagination] = useState({ totalPages: 0 });

  const placement = isRTL ? 'right' : 'left';

  useEffect(() => {
    if (data?.data) {
      setHistories(data?.data);
      setPagination({ totalPages: data?.totalPages });
    }
  }, [data]);

  useEffect(() => {
    if (refreshHistory) {
      onGetNewPage(true);
    }
  }, [refreshHistory]);

  const onHistoryRename = (id, newTopic) => {
    const tempHistories = [...histories];
    const item = tempHistories.find((item) => item.id === id);
    item.topic = newTopic;
    setHistories(tempHistories);
  };

  const onHistoryDelete = (id) => {
    const tempHistories = [...histories];
    const i = tempHistories?.findIndex((item) => item.id === id);
    tempHistories.splice(i, 1);
    setHistories(tempHistories);
  };

  const onGetNewPage = async (refresh) => {
    const index = refresh ? 0 : histories?.length;
    const { data, totalPages, ok } = await getChatHistory(index);

    if (ok) {
      const tempHistoriesArray = refresh ? [...data] : [...histories, ...data];
      setHistories(tempHistoriesArray);
      setPagination({ totalPages });
    }
    if (refreshHistory) {
      setRefreshHistory(false);
    }
  };

  return (
    <>
      <div className="flex justify-start w-full">
        <button onClick={onOpen} className="history-button ms-2">
          <History />
        </button>
      </div>

      <Drawer
        isOpen={isOpen}
        placement={placement}
        onClose={onClose}
        classNames={{
          wrapper: 'px-5 history-drawer-wrapper',
          closeButton: 'hidden',
          base: 'pt-6 history-drawer-base', // section
          body: 'p-0 gap-0',
          backdrop: 'history-drawer-backdrop',
        }}
      >
        <DrawerContent>
          {(onClose) => (
            <DrawerBody className="history-menu">
              <div className="flex justify-between w-full mb-6 history-menu-header">
                <p className="h7">{t('chat.history')}</p>

                <button onClick={onClose} className="w-auto h-auto">
                  <CloseIcon className="drawer-close-icon" />
                </button>
              </div>

              <div id="history-scroll-div">
                <InfiniteScroll
                  dataLength={histories?.length}
                  next={onGetNewPage}
                  hasMore={pagination.totalPages > histories.length}
                  loader={<span />}
                  scrollableTarget="history-scroll-div"
                >
                  {histories?.map((item) => (
                    <HistoryMenuLink
                      item={item}
                      onClose={onClose}
                      key={`histories-${item?.id}`}
                      onHistoryRename={onHistoryRename}
                      onHistoryDelete={onHistoryDelete}
                    />
                  ))}
                </InfiniteScroll>
              </div>
            </DrawerBody>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
