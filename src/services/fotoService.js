import { supabase } from "./supabaseClient";

export async function fotosLaden(pflanzenId) {
  const { data, error } = await supabase
    .from("fotos")
    .select("*")
    .eq("pflanze_id", pflanzenId)
    .order("erstellt_am", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function fotoSpeichern(pflanzenId, bildUri) {
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  const benutzerId = userData.user.id;

  const { data, error } = await supabase
    .from("fotos")
    .insert({
      pflanze_id: pflanzenId,
      benutzer_id: benutzerId,
      lokaler_pfad: bildUri,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  await letztesFotoAktualisieren(pflanzenId, bildUri);

  return data;
}

export async function fotoLöschen(fotoId, pflanzenId) {
  const { error } = await supabase.from("fotos").delete().eq("id", fotoId);

  if (error) {
    throw error;
  }

  const fotos = await fotosLaden(pflanzenId);
  const neuesLetztesFoto = fotos.length > 0 ? fotos[0].lokaler_pfad : null;
  await letztesFotoAktualisieren(pflanzenId, neuesLetztesFoto);

  return fotos;
}

async function letztesFotoAktualisieren(pflanzenId, bildUri) {
  const { error } = await supabase
    .from("pflanzen")
    .update({
      letztes_foto_uri: bildUri,
      aktualisiert_am: new Date().toISOString(),
    })
    .eq("id", pflanzenId);

  if (error) {
    throw error;
  }
}
