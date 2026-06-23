import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function PflanzeKarte({ pflanze, onDetails }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{pflanze.name}</Text>

      {pflanze.pflanzenart ? (
        <Text>Art: {pflanze.pflanzenart}</Text>
      ) : (
        <Text>Keine Pflanzenart erfasst</Text>
      )}

      {pflanze.notizen ? <Text>Notizen: {pflanze.notizen}</Text> : null}

      <Button title="Details öffnen" onPress={onDetails} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
    gap: 6,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
});