import DrawerMenu from './components/DrawerMenu';
import BackButton from './components/BackButton';

import './layout.scss';

export default function OtherLayout({ children, loggedIn }) {
  return (
    <div className="other-layout">
      {loggedIn && <DrawerMenu />}
      <BackButton />
      {children}
    </div>
  );
}
