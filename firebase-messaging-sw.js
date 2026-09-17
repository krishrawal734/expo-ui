importScripts(
  "https://www.gstatic.com/firebasejs/12.18.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/12.18.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDGeMDTV6O-Rh06t2W-e62cD1fCI_9ywZg",
  authDomain: "my-expo-app-2da74.firebaseapp.com",
  projectId: "my-expo-app-2da74",
  storageBucket: "my-expo-app-2da74.firebasestorage.app",
  messagingSenderId: "312280399965",
  appId: "1:312280399965:web:f56792febe1d4bac544db4",
  measurementId: "G-99WS3L15QM",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("SW: BACKGROUND MESSAGE RECEIVED", payload);

  const title =
    payload.notification?.title ||
    payload.data?.title ||
    "New Notification";

  const body =
    payload.notification?.body ||
    payload.data?.body ||
    payload.data?.message ||
    "You received a new notification.";

  const options = {
    body: body,
    data: payload.data || {},
  };

  // Broadcast to all active client windows
  self.clients
    .matchAll({ type: "window", includeUncontrolled: true })
    .then((clients) => {
      clients.forEach((client) => {
        client.postMessage({
          type: "FCM_BG_NOTIFICATION",
          title: title,
          body: body,
        });
      });
    });

  return self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const title = event.notification.title || "Notification";
  const body = event.notification.body || "";

  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if ("focus" in client) {
            client.focus();
            client.postMessage({
              type: "FCM_NOTIFICATION_CLICK",
              title: title,
              body: body,
            });
            return;
          }
        }
        if (self.clients.openWindow) {
          return self.clients.openWindow("/");
        }
      })
  );
});