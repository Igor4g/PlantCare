import { Platform, Vibration } from "react-native";
import Constants from "expo-constants";

let handlerGesetzt = false;

export async function benachrichtigungPlanen(typ, erinnerungAm, wiederholung) {
  const Notifications = notificationsLaden();

  if (!Notifications) {
    return null;
  }

  await benachrichtigungVorbereiten();

  const erlaubnis = await Notifications.getPermissionsAsync();
  let status = erlaubnis.status;

  if (status !== "granted") {
    const neueErlaubnis = await Notifications.requestPermissionsAsync();
    status = neueErlaubnis.status;
  }

  if (status !== "granted") {
    return null;
  }

  const datum = new Date(erinnerungAm);

  return Notifications.scheduleNotificationAsync({
    content: {
      title: "PlantCare Erinnerung",
      body: `${typ}: Deine Pflanze braucht Pflege.`,
      sound: true,
    },
    trigger: triggerErstellen(datum, wiederholung),
  });
}

export async function benachrichtigungAbbrechen(notificationId) {
  const Notifications = notificationsLaden();

  if (!Notifications) {
    return;
  }

  if (!notificationId) {
    return;
  }

  await Notifications.cancelScheduledNotificationAsync(notificationId);
}

export function kurzeVibration() {
  Vibration.vibrate(150);
}

async function benachrichtigungVorbereiten() {
  const Notifications = notificationsLaden();

  if (!Notifications) {
    return;
  }

  if (Platform.OS !== "android") {
    return;
  }

  await Notifications.setNotificationChannelAsync("pflege", {
    name: "Pflegeerinnerungen",
    importance: Notifications.AndroidImportance.HIGH,
    vibrationPattern: [0, 250, 250, 250],
  });
}

function notificationsLaden() {
  if (läuftInAndroidExpoGo()) {
    return null;
  }

  const Notifications = require("expo-notifications");

  if (!handlerGesetzt) {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
    handlerGesetzt = true;
  }

  return Notifications;
}

function läuftInAndroidExpoGo() {
  return (
    Platform.OS === "android" && Constants.executionEnvironment === "storeClient"
  );
}

function triggerErstellen(datum, wiederholung) {
  const Notifications = notificationsLaden();

  if (wiederholung === "täglich") {
    return {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: datum.getHours(),
      minute: datum.getMinutes(),
      channelId: "pflege",
    };
  }

  if (wiederholung === "wöchentlich") {
    return {
      type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
      weekday: datum.getDay() + 1,
      hour: datum.getHours(),
      minute: datum.getMinutes(),
      channelId: "pflege",
    };
  }

  return {
    type: Notifications.SchedulableTriggerInputTypes.MONTHLY,
    day: datum.getDate(),
    hour: datum.getHours(),
    minute: datum.getMinutes(),
    channelId: "pflege",
  };
}
