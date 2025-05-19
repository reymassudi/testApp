'use client';

import { useEffect } from 'react';
import { onMessageListener } from '@/utils/firebase';
import Icon from '@/app/favicon.ico';

export default function PushNotificationManager() {
  useEffect(() => {
    if (typeof window === 'undefined') return; // Prevent execution on the server

    // if ('serviceWorker' in navigator) {
    //   navigator.serviceWorker.getRegistrations().then((registrations) => {
    //     for (let registration of registrations) {
    //       registration.unregister().then((success) => {
    //         if (success) {
    //           console.log('Service worker unregistered');
    //         }
    //       });
    //     }
    //   });
    // }

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then
        //   (registration) =>
        // console.log('Service Worker registered:', registration),
        ()
        .catch((err) =>
          console.error('Service Worker registration failed:', err),
        );
    }

    // Listen for foreground messages
    onMessageListener()
      .then((payload) => {
        // console.log(
        //   'Foreground notification received:',
        //   payload
        // );

        if (Notification.permission === 'granted') {
          new Notification(payload.notification.title, {
            body: payload.notification.body,
            icon: Icon?.src,
          });
        }
      })
      .catch
      //   (err) =>
      // console.error('Error receiving foreground notification:', err),
      ();
  }, []);

  return null;
}
