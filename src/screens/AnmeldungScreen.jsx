import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function AnmeldungScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PlantCare</Text>
      <Text style={styles.text}>Anmeldung</Text>

      <Button
        title="Einloggen"
        onPress={() => navigation.navigate("PflanzenListe")}
      />

      <Button
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
    gap: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
});