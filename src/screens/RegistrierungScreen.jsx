import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { registrieren } from "../services/authService";

export default function RegistrierungScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [passwort, setPasswort] = useState("");
  const [passwortWiederholung, setPasswortWiederholung] = useState("");
  const [laedt, setLaedt] = useState(false);

  async function handleRegistrieren() {
    if (!email || !passwort || !passwortWiederholung) {
      Alert.alert("Fehler", "Bitte alle Felder ausfüllen.");
      return;
    }

    if (passwort.length < 6) {
      Alert.alert("Fehler", "Das Passwort muss mindestens 6 Zeichen haben.");
      return;
    }

    if (passwort !== passwortWiederholung) {
      Alert.alert("Fehler", "Die Passwörter stimmen nicht überein.");
      return;
    }

    try {
      setLaedt(true);
      await registrieren(email, passwort);
      Alert.alert("Erfolg", "Konto wurde erstellt.");
    } catch (error) {
      Alert.alert("Fehler", "Registrierung fehlgeschlagen.");
      console.log(error.message);
    } finally {
      setLaedt(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrierung</Text>

      <TextInput
        style={styles.input}
        placeholder="E-Mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Passwort"
        value={passwort}
        onChangeText={setPasswort}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Passwort wiederholen"
        value={passwortWiederholung}
        onChangeText={setPasswortWiederholung}
        secureTextEntry
      />

      <Button
        title={laedt ? "Bitte warten..." : "Konto erstellen"}
        onPress={handleRegistrieren}
        disabled={laedt}
      />

      <Button
        title="Zurück zur Anmeldung"
        onPress={() => navigation.navigate("Anmeldung")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    gap: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    padding: 12,
    borderRadius: 6,
  },
});