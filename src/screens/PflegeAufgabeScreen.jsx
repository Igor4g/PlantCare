import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function PflegeAufgabeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pflegeaufgabe</Text>
      <Text>Hier wird spaeter eine Erinnerung geplant.</Text>

      <Button
        title="Speichern"
        onPress={() => navigation.navigate("PflanzeDetail")}
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