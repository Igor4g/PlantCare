import React, { useState } from "react";
import { View, TextInput, StyleSheet, Alert } from "react-native";
import { anmelden } from "../services/authService";
import AppText, { appSchrift } from "../components/AppText";
import AppButton from "../components/AppButton";

export default function AnmeldungScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [passwort, setPasswort] = useState("");
  const [laedt, setLaedt] = useState(false);

  async function handleAnmelden() {
    if (!email || !passwort) {
      Alert.alert("Fehler", "Bitte E-Mail und Passwort eingeben.");
      return;
    }

    try {
      setLaedt(true);
      await anmelden(email, passwort);
    } catch (error) {
      Alert.alert("Fehler", "Anmeldung fehlgeschlagen.");
      console.log(error.message);
    } finally {
      setLaedt(false);
    }
  }

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>PlantCare</AppText>
      <AppText style={styles.subtitle}>Anmeldung</AppText>

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

      <AppButton
        title={laedt ? "Bitte warten..." : "Anmelden"}
        onPress={handleAnmelden}
        disabled={laedt}
      />

      <AppButton
        title="Konto erstellen"
        onPress={() => navigation.navigate("Registrierung")}
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
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    padding: 12,
    borderRadius: 6,
    fontFamily: appSchrift,
  },
});
