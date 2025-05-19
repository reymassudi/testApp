import HomeIcon from '@/public/icons/home.svg';
import ChatIcon from '@/public/icons/chat.svg';
import CalendarIcon from '@/public/icons/calendar-menu.svg';

import UserProfileIcon from '@/public/icons/user-profile.svg';
import DietIcon from '@/public/icons/diet.svg';
import SceneIcon from '@/public/icons/scene.svg';

export const urls = {
  aboutUs: '/about-us',
  addEvent: '/calendar/add-event',
  addMood: '/calendar/add-mood',
  addSymptom: '/calendar/add-symptom',
  articles: '/articles',
  calendar: '/calendar',
  calendarFull: '/calendar/full',
  chat: '/chat',
  gallery: '/gallery',
  home: '/home',
  otp: '/login/otp',
  privacyPolicy: '/privacy-policy',
  profile: '/profile',
  signIn: '/login',
  signOut: '/sign-out',
  terms: '/terms-of-service',
  welcome: '/welcome',
};

export const navigationMenu = [
  { title: 'menu.home', link: urls.home, Icon: HomeIcon },
  { title: 'menu.chat', link: urls.chat, Icon: ChatIcon },
  { title: 'menu.calendar', link: urls.calendar, Icon: CalendarIcon },
];

export const drawerMenuTop = [
  { title: 'menu.profile', link: urls.profile, Icon: UserProfileIcon },
  // { title: 'menu.diet_guide', link: '/diet_guide', Icon: DietIcon },
  {
    title: 'menu.pregnancy_moments',
    link: urls.gallery,
    Icon: SceneIcon,
  },
];

export const drawerMenuBottom = [
  { title: 'menu.about_us', link: urls.aboutUs },
  { title: 'menu.privacy_policy', link: urls.privacyPolicy },
  { title: 'menu.terms', link: urls.terms },
];

export const generalRoutes = [urls.privacyPolicy, urls.terms];
