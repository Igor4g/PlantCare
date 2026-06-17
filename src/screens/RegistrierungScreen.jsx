import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function RegistrierungScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrierung</Text>

      <Button
        title="Konto erstellen"
        onPress={() => navigation.navigate("PflanzenListe")}
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
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },
});