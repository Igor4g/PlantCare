import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function PflanzenListeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meine Pflanzen</Text>
      <Text>Noch keine Pflanzen erfasst.</Text>

      <Button
        title="Neue Pflanze erfassen"
        onPress={() => navigation.navigate("PflanzeErfassen")}
      />

      <Button
        title="Demo Detailansicht öffnen"
        onPress={() => navigation.navigate("PflanzeDetail")}
      />

      <Button
        title="Abmelden"
        onPress={() => navigation.navigate("Anmeldung")}
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