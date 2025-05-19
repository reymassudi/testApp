'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function DrawerMenuLink({ item, onClose }) {
  const { link, title, Icon } = item;

  const t = useTranslations();
  const pathname = usePathname();

  return (
    <Link
      href={link}
      onClick={onClose}
      className={`drawer-menu-item body-2 ${pathname.startsWith(link) ? 'active' : ''}`}
    >
      {Icon ? <Icon className="me-2" /> : null}
      {t(title)}
    </Link>
  );
}
