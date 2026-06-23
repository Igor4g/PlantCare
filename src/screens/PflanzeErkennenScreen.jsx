import React, { useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import { pflanzeMitKiErkennen } from "../services/kiService";

export default function PflanzeErkennenScreen() {
  const [bildUri, setBildUri] = useState(null);
  const [base64Bild, setBase64Bild] = useState(null);
  const [antwort, setAntwort] = useState("");
  const [lädt, setLädt] = useState(false);

  async function handleFotoAusKamera() {
    const erlaubnis = await ImagePicker.requestCameraPermissionsAsync();

    if (!erlaubnis.granted) {
      Alert.alert("Fehler", "Die Kamera-Berechtigung wurde nicht erlaubt.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.6,
      base64: true,
    });

    fotoSetzen(result);
  }

  async function handleFotoAusGalerie() {
    const erlaubnis = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!erlaubnis.granted) {
      Alert.alert("Fehler", "Die Foto-Berechtigung wurde nicht erlaubt.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.6,
      base64: true,
    });

    fotoSetzen(result);
  }

  function fotoSetzen(result) {
    if (result.canceled) {
      return;
    }

    setBildUri(result.assets[0].uri);
    setBase64Bild(result.assets[0].base64);
    setAntwort("");
  }

  async function handleAnalysieren() {
    if (!base64Bild) {
      Alert.alert("Fehler", "Bitte zuerst ein Foto auswählen.");
      return;
    }

    try {
      setLädt(true);
      const kiAntwort = await pflanzeMitKiErkennen(base64Bild);
      setAntwort(kiAntwort);
    } catch (error) {
      if (error.message === "NVIDIA_API_KEY_FEHLT") {
        Alert.alert(
          "API-Key fehlt",
          "Bitte EXPO_PUBLIC_NVIDIA_API_KEY in der .env Datei setzen."
        );
      } else {
        Alert.alert("Fehler", "Die Pflanze konnte nicht erkannt werden.");
        console.log(error.message);
      }
    } finally {
      setLädt(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AppText style={styles.title}>Pflanze erkennen</AppText>

      <AppText>
        Diese Funktion ist eine KI-Erweiterung. Du kannst ein Foto einer
        unbekannten Pflanze aufnehmen oder auswählen. Die KI versucht, die
        Pflanze zu erkennen und gibt kurze Pflegetipps.
      </AppText>

      <View style={styles.buttons}>
        <AppButton title="Foto aufnehmen" onPress={handleFotoAusKamera} />
        <AppButton title="Foto auswählen" onPress={handleFotoAusGalerie} />
      </View>

      {bildUri ? <Image source={{ uri: bildUri }} style={styles.bild} /> : null}

      <AppButton
        title={lädt ? "Wird analysiert..." : "Pflanze analysieren"}
        onPress={handleAnalysieren}
        disabled={lädt}
      />

      {antwort ? (
        <View style={styles.ergebnis}>
          <AppText style={styles.ergebnisTitel}>Ergebnis:</AppText>
          <AppText>{antwort}</AppText>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    gap: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  buttons: {
    gap: 8,
  },
  bild: {
    width: "100%",
    height: 260,
    borderRadius: 6,
    backgroundColor: "#eee",
  },
  ergebnis: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 6,
    padding: 12,
    gap: 8,
  },
  ergebnisTitel: {
    fontWeight: "bold",
  },
});
