'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { navigationMenu } from '@/utils/constants/navigation';

export default function NavigationMenu() {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <div className="navigation-menu">
      {navigationMenu.map(({ title, link, Icon }, index) => (
        <Link
          href={link}
          className={`nav-menu body-3 ${pathname.startsWith(link) ? 'active' : ''}`}
          key={`menu-${index}`}
        >
          <Icon className="nav-icon" />
          {t(title)}
        </Link>
      ))}
    </div>
  );
}
