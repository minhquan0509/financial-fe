import firebase from "firebase/app";
import "firebase/messaging";
import { firebaseConfig } from "./constants";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

let messaging;

if (typeof window !== "undefined") {
  if (firebase.messaging.isSupported()) {
    messaging = firebase.messaging();
  }
}

export const getMessagingToken = async () => {
  let currentToken = "";
  if (!messaging) return;
  try {
    currentToken = await messaging.getToken({
      vapidKey:
        "BDxBzr32JYTSlNNXAvIwpXIUFhbUanFb2oXfy0z2HEQqSV8wD8ooEJGrrTbzM8W8CRHEnhC0oiHi13WljEONfjA",
    });
    console.log("FCM registration token", currentToken);
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error);
  }
  return currentToken;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging?.onMessage((payload) => {
      resolve(payload);
    });
  });
