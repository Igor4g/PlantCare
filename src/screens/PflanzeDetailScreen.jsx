import React from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { pflanzeLöschen } from "../services/pflanzenService";

export default function PflanzeDetailScreen({ route, navigation }) {
  const pflanze = route.params?.pflanze;

  async function handleLöschen() {
    try {
      await pflanzeLöschen(pflanze.id);
      navigation.goBack();
    } catch (error) {
      Alert.alert("Fehler", "Pflanze konnte nicht gelöscht werden.");
      console.log(error.message);
    }
  }

  if (!pflanze) {
    return (
      <View style={styles.container}>
        <Text>Keine Pflanze ausgewählt.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{pflanze.name}</Text>

      <Text style={styles.label}>Pflanzenart:</Text>
      <Text>{pflanze.pflanzenart || "Keine Pflanzenart erfasst"}</Text>

      <Text style={styles.label}>Notizen:</Text>
      <Text>{pflanze.notizen || "Keine Notizen erfasst"}</Text>

      <Button
        title="Pflegeaufgabe erfassen"
        onPress={() => navigation.navigate("PflegeAufgabe", { pflanze })}
      />

      <Button title="Pflanze löschen" onPress={handleLöschen} />
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
  label: {
    fontWeight: "bold",
    marginTop: 8,
  },
});