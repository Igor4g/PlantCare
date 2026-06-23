import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import {
  pflanzeErstellen,
  pflanzeAktualisieren,
} from "../services/pflanzenService";

export default function PflanzeErfassenScreen({ route, navigation }) {
  const vorhandenePflanze = route.params?.pflanze;
  const istBearbeiten = !!vorhandenePflanze;

  const [name, setName] = useState(vorhandenePflanze?.name || "");
  const [pflanzenart, setPflanzenart] = useState(
    vorhandenePflanze?.pflanzenart || ""
  );
  const [notizen, setNotizen] = useState(vorhandenePflanze?.notizen || "");
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
        await pflanzeErstellen(name, pflanzenart, notizen);
      }

      navigation.goBack();
    } catch (error) {
      Alert.alert("Fehler", "Pflanze konnte nicht gespeichert werden.");
      console.log(error.message);
    } finally {
      setLädt(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {istBearbeiten ? "Pflanze bearbeiten" : "Pflanze erfassen"}
      </Text>

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

      <Button
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
  },
  notizen: {
    height: 100,
    textAlignVertical: "top",
  },
});