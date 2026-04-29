importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBoCvUZBuzHEq4SE_uD6Laf157gMl_mo0w",
  authDomain: "bid-the-bezel.firebaseapp.com",
  projectId: "bid-the-bezel",
  messagingSenderId: "973660886500",
  appId: "1:973660886500:web:066354850f68eaa48f63f1",
});
const messaging = firebase.messaging();

// optional background handler
messaging.onBackgroundMessage((payload) => {
  console.log("Background message:", payload);

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
  });
});