import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { fetch_api } from '@/app/api/base_fetch_client';
import { method } from '@/utils/constants/apis';

// Firebase configuration (Ensure this is safe and not exposed in public repos)
const firebaseConfig = {
  apiKey: 'AIzaSyAiJZ5Fc-gF-zVSYGM5H-oURqndzIJSS2A',
  authDomain: 'mamacare-2a752.firebaseapp.com',
  projectId: 'mamacare-2a752',
  storageBucket: 'mamacare-2a752.firebasestorage.app',
  messagingSenderId: '959803603698',
  appId: '1:959803603698:web:3ea7ce2dfbaafb3f62ee6b',
  measurementId: 'G-JVWLN8H51X',
};

// Ensure Firebase is initialized only on the client-side
let messaging;
if (typeof window !== 'undefined') {
  const app = initializeApp(firebaseConfig);
  messaging = getMessaging(app);
}

// Request notification permission and get token
export const requestNotificationPermission = async () => {
  // console.log('requestNotificationPermission');
  if (!messaging) return;
  // console.log('messaging');

  try {
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      // console.log('Notification permission granted.');

      const FCMToken = await getToken(messaging, {
        vapidKey: process.env.VAPID_KEY,
      });
      // console.log('FCM Token:', FCMToken);

      // Send the token to your backend
      await fetch_api(
        '/api/notification/',
        method.post,
        JSON.stringify({ fcm_token: FCMToken }),
      );
    } else {
      console.error('Notification permission denied.');
    }
  } catch (error) {
    console.error('Error getting FCM token:', error);
  }
};

// Handle foreground notifications
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      // console.log('Received foreground message: ', payload);
      resolve(payload);
    });
  });
