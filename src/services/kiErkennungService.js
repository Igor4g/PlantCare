import { supabase } from "./supabaseClient";

export async function kiErkennungenLaden() {
  const { data, error } = await supabase
    .from("ki_erkennungen")
    .select("*")
    .order("erstellt_am", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function kiErkennungSpeichern({ fotoPfad, fotoBase64, antwort }) {
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  const { data, error } = await supabase
    .from("ki_erkennungen")
    .insert({
      benutzer_id: userData.user.id,
      foto_pfad: fotoPfad,
      foto_base64: fotoBase64,
      antwort,
      modell: "minimaxai/minimax-m3",
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
