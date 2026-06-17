import React from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { abmelden } from "../services/authService";

export default function PflanzenListeScreen({ navigation }) {
  async function handleAbmelden() {
    try {
      await abmelden();
    } catch (error) {
      Alert.alert("Fehler", "Abmelden fehlgeschlagen.");
      console.log(error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meine Pflanzen</Text>
      <Text>Noch keine Pflanzen erfasst.</Text>

      <Button
        title="Neue Pflanze erfassen"
        onPress={() => navigation.navigate("PflanzeErfassen")}
      />

      <Button
        title="Demo Detailansicht oeffnen"
        onPress={() => navigation.navigate("PflanzeDetail")}
      />

      <Button title="Abmelden" onPress={handleAbmelden} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
});