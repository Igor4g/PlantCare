import React, { useState } from "react";
import { Alert, Image, TextInput, StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  pflanzeErstellen,
  pflanzeAktualisieren,
} from "../services/pflanzenService";
import { fotoSpeichern } from "../services/fotoService";
import AppText, { appSchrift } from "../components/AppText";
import AppButton from "../components/AppButton";

export default function PflanzeErfassenScreen({ route, navigation }) {
  const vorhandenePflanze = route.params?.pflanze;
  const istBearbeiten = !!vorhandenePflanze;

  const [name, setName] = useState(vorhandenePflanze?.name || "");
  const [pflanzenart, setPflanzenart] = useState(
    vorhandenePflanze?.pflanzenart || ""
  );
  const [notizen, setNotizen] = useState(vorhandenePflanze?.notizen || "");
  const [erstesFotoUri, setErstesFotoUri] = useState(null);
  const [lädt, setLädt] = useState(false);

  async function handleSpeichern() {
    if (!name) {
      Alert.alert("Fehler", "Bitte einen Pflanzennamen eingeben.");
      return;
    }

    try {
      setLädt(true);

      if (istBearbeiten) {
        await pflanzeAktualisieren(
          vorhandenePflanze.id,
          name,
          pflanzenart,
          notizen
        );
      } else {
        const neuePflanze = await pflanzeErstellen(name, pflanzenart, notizen);

        if (erstesFotoUri) {
          await fotoSpeichern(neuePflanze.id, erstesFotoUri);
        }
      }

      navigation.goBack();
    } catch (error) {
      Alert.alert("Fehler", "Pflanze konnte nicht gespeichert werden.");
      console.log(error.message);
    } finally {
      setLädt(false);
    }
  }

  async function handleFotoAusKamera() {
    const erlaubnis = await ImagePicker.requestCameraPermissionsAsync();

    if (!erlaubnis.granted) {
      Alert.alert("Fehler", "Die Kamera-Berechtigung wurde nicht erlaubt.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    });

    fotoAuswahlSpeichern(result);
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
      quality: 0.8,
    });

    fotoAuswahlSpeichern(result);
  }

  function fotoAuswahlSpeichern(result) {
    if (result.canceled) {
      return;
    }

    setErstesFotoUri(result.assets[0].uri);
  }

  function handleErstesFotoHinzufügen() {
    Alert.alert("Foto hinzufügen", "Woher soll das Foto kommen?", [
      { text: "Kamera", onPress: handleFotoAusKamera },
      { text: "Galerie", onPress: handleFotoAusGalerie },
      { text: "Abbrechen", style: "cancel" },
    ]);
  }

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>
        {istBearbeiten ? "Pflanze bearbeiten" : "Pflanze erfassen"}
      </AppText>

      <TextInput
        style={styles.input}
        placeholder="Name der Pflanze"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Pflanzenart"
        value={pflanzenart}
        onChangeText={setPflanzenart}
      />

      <TextInput
        style={[styles.input, styles.notizen]}
        placeholder="Notizen"
        value={notizen}
        onChangeText={setNotizen}
        multiline
      />

      {!istBearbeiten ? (
        <>
          {erstesFotoUri ? (
            <Image source={{ uri: erstesFotoUri }} style={styles.fotoVorschau} />
          ) : null}

          <AppButton
            title={erstesFotoUri ? "Erstes Foto ändern" : "Erstes Foto hinzufügen"}
            onPress={handleErstesFotoHinzufügen}
          />
        </>
      ) : null}

      <AppButton
        title={lädt ? "Wird gespeichert..." : "Speichern"}
        onPress={handleSpeichern}
        disabled={lädt}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    padding: 12,
    borderRadius: 6,
    fontFamily: appSchrift,
  },
  notizen: {
    height: 100,
    textAlignVertical: "top",
  },
  fotoVorschau: {
    width: "100%",
    height: 180,
    borderRadius: 6,
    backgroundColor: "#eee",
  },
});
