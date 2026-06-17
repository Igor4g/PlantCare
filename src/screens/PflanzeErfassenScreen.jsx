import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function PflanzeErfassenScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pflanze erfassen</Text>
      <Text>Hier wird spaeter eine neue Pflanze gespeichert.</Text>

      <Button
        title="Speichern"
        onPress={() => navigation.navigate("PflanzenListe")}
      />
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