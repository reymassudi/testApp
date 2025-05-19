'use client';

import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Drawer, DrawerBody, DrawerContent } from '@nextui-org/drawer';
import { useDisclosure } from '@nextui-org/react';
import Link from 'next/link';
import DrawerMenuLink from './DrawerMenuLink';

import {
  drawerMenuBottom,
  drawerMenuTop,
  urls,
} from '@/utils/constants/navigation';

import CloseIcon from '@/public/icons/close.svg';
import HomeIcon from '@/public/icons/home.svg';
import MenuIcon from '@/public/icons/menu.svg';

export default function DrawerMenu({ isRTL }) {
  const t = useTranslations();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const path = usePathname();

  const placement = isRTL ? 'right' : 'left';

  return (
    <div className="drawer-menu">
      <div
        className={`flex justify-end w-full${path === urls.calendarFull ? ' drawer-fixed' : ''}`}
      >
        <button onClick={onOpen} className="w-auto rtl:scale-x-[-1]">
          <MenuIcon />
        </button>
      </div>

      <Drawer
        isOpen={isOpen}
        size="full"
        placement={placement}
        onClose={onClose}
        classNames={{
          wrapper: 'px-5',
          closeButton: 'hidden',
          base: 'p-6 bg-mint', // section
          body: 'p-0 gap-0',
        }}
      >
        <DrawerContent>
          {(onClose) => (
            <DrawerBody>
              <div className="flex justify-between items-center w-full mb-6">
                <Link
                  href={urls.home}
                  onClick={onClose}
                  className="flex items-center"
                >
                  <HomeIcon className="drawer-home-icon" />
                  <span className="body-4 ms-2">
                    {t('general.back_to_home')}
                  </span>
                </Link>

                <button onClick={onClose} className="w-auto h-auto">
                  <CloseIcon className="drawer-close-icon" />
                </button>
              </div>

              <div className="drawer-menu-top mb-8">
                {drawerMenuTop?.map((item, index) => (
                  <DrawerMenuLink
                    item={item}
                    onClose={onClose}
                    key={`drawer-top-${index}`}
                  />
                ))}
              </div>

              <div className="drawer-menu-bottom">
                {drawerMenuBottom?.map((item, index) => (
                  <DrawerMenuLink
                    item={item}
                    onClose={onClose}
                    key={`drawer-bottom-${index}`}
                  />
                ))}
                <a href={urls.signOut} className="drawer-menu-item text-error">
                  {t('menu.sign_out')}
                </a>
              </div>
            </DrawerBody>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
