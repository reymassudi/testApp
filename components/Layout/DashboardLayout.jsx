import NavigationMenu from './components/NavigationMenu';
import DrawerMenu from './components/DrawerMenu';
import { get_locale } from '@/utils/server-functions';

import './layout.scss';

export default async function DashboardLayout({ children }) {
  const isRTL = (await get_locale())?.rtl;

  return (
    <div className="dashboard-layout">
      <DrawerMenu isRTL={isRTL} />
      {children}
      <NavigationMenu />
    </div>
  );
}
