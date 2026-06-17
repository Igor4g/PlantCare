import { supabase } from "./supabaseClient";

export async function registrieren(email, passwort) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: passwort,
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function anmelden(email, passwort) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: passwort,
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function abmelden() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}

export async function aktuelleSessionLesen() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  return data.session;
}