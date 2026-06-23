import { supabase } from "./supabaseClient";

export async function pflanzenLaden() {
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  const benutzerId = userData.user.id;

  const { data, error } = await supabase
    .from("pflanzen")
    .select("*")
    .eq("benutzer_id", benutzerId)
    .order("erstellt_am", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function pflanzeErstellen(name, pflanzenart, notizen) {
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  const benutzerId = userData.user.id;

  const { data, error } = await supabase
    .from("pflanzen")
    .insert({
      benutzer_id: benutzerId,
      name: name,
      pflanzenart: pflanzenart,
      notizen: notizen,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function pflanzeLöschen(pflanzenId) {
  const { error } = await supabase
    .from("pflanzen")
    .delete()
    .eq("id", pflanzenId);

  if (error) {
    throw error;
  }
}

export async function pflanzeLadenNachId(pflanzenId) {
  const { data, error } = await supabase
    .from("pflanzen")
    .select("*")
    .eq("id", pflanzenId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function pflanzeAktualisieren(
  pflanzenId,
  name,
  pflanzenart,
  notizen
) {
  const { data, error } = await supabase
    .from("pflanzen")
    .update({
      name: name,
      pflanzenart: pflanzenart,
      notizen: notizen,
      aktualisiert_am: new Date().toISOString(),
    })
    .eq("id", pflanzenId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
