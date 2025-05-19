importScripts(
  'https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js',
);

const firebaseConfig = {
  apiKey: 'AIzaSyAiJZ5Fc-gF-zVSYGM5H-oURqndzIJSS2A',
  authDomain: 'mamacare-2a752.firebaseapp.com',
  projectId: 'mamacare-2a752',
  storageBucket: 'mamacare-2a752.firebasestorage.app',
  messagingSenderId: '959803603698',
  appId: '1:959803603698:web:3ea7ce2dfbaafb3f62ee6b',
  measurementId: 'G-JVWLN8H51X',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  // console.log('Received background message:', payload);

  try {
    let notificationTitle;
    let notificationOptions = {
      body: '',
      icon: '/notification.ico',
    };

    notificationTitle = payload.data?.title || '';
    notificationOptions.body = payload.data?.body || '';

    self.registration.showNotification(notificationTitle, notificationOptions);
  } catch (error) {
    console.error('🚨 Error displaying background notification:', error);
  }
});
