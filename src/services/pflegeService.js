import { supabase } from "./supabaseClient";
import {
  benachrichtigungAbbrechen,
  benachrichtigungPlanen,
} from "./benachrichtigungService";

export async function pflegeAufgabenLaden(pflanzenId) {
  const { data, error } = await supabase
    .from("pflegeaufgaben")
    .select("*")
    .eq("pflanze_id", pflanzenId)
    .order("erinnerung_am", { ascending: true });

  if (error) {
    throw error;
  }

  return data;
}

export async function pflegeAufgabeErstellen(
  pflanzenId,
  typ,
  erinnerungAm,
  wiederholung
) {
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  const benutzerId = userData.user.id;
  const notificationId = await benachrichtigungPlanen(
    typ,
    erinnerungAm,
    wiederholung
  );

  const { data, error } = await supabase
    .from("pflegeaufgaben")
    .insert({
      pflanze_id: pflanzenId,
      benutzer_id: benutzerId,
      typ: typ,
      erinnerung_am: erinnerungAm,
      wiederholung: wiederholung,
      erledigt: false,
      notification_id: notificationId,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  await naechstePflegeAktualisieren(pflanzenId);

  return data;
}

export async function pflegeAufgabeErledigtSetzen(
  aufgabeId,
  pflanzenId,
  erledigt
) {
  const { data: alteAufgabe, error: ladeError } = await supabase
    .from("pflegeaufgaben")
    .select("*")
    .eq("id", aufgabeId)
    .single();

  if (ladeError) {
    throw ladeError;
  }

  if (alteAufgabe.notification_id) {
    await benachrichtigungAbbrechen(alteAufgabe.notification_id);
  }

  const neueNotificationId = erledigt
    ? null
    : await benachrichtigungPlanen(
        alteAufgabe.typ,
        alteAufgabe.erinnerung_am,
        alteAufgabe.wiederholung
      );

  const { data, error } = await supabase
    .from("pflegeaufgaben")
    .update({
      erledigt: erledigt,
      notification_id: neueNotificationId,
    })
    .eq("id", aufgabeId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  await naechstePflegeAktualisieren(pflanzenId);

  return data;
}

export async function pflegeAufgabeLöschen(aufgabeId, pflanzenId) {
  const { data: aufgabe, error: ladeError } = await supabase
    .from("pflegeaufgaben")
    .select("notification_id")
    .eq("id", aufgabeId)
    .single();

  if (ladeError) {
    throw ladeError;
  }

  await benachrichtigungAbbrechen(aufgabe.notification_id);

  const { error } = await supabase
    .from("pflegeaufgaben")
    .delete()
    .eq("id", aufgabeId);

  if (error) {
    throw error;
  }

  await naechstePflegeAktualisieren(pflanzenId);
}

async function naechstePflegeAktualisieren(pflanzenId) {
  const { data, error } = await supabase
    .from("pflegeaufgaben")
    .select("erinnerung_am")
    .eq("pflanze_id", pflanzenId)
    .eq("erledigt", false)
    .order("erinnerung_am", { ascending: true })
    .limit(1);

  if (error) {
    throw error;
  }

  const naechstePflege = data.length > 0 ? data[0].erinnerung_am : null;

  const { error: pflanzenError } = await supabase
    .from("pflanzen")
    .update({
      naechste_pflege_am: naechstePflege,
      aktualisiert_am: new Date().toISOString(),
    })
    .eq("id", pflanzenId);

  if (pflanzenError) {
    throw pflanzenError;
  }
}
