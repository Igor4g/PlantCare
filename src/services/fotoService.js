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

  return data;
}
