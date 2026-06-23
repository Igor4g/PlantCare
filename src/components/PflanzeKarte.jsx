import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";

export default function PflanzeKarte({ pflanze, onDetails }) {
  return (
    <View style={styles.card}>
      {pflanze.letztes_foto_uri ? (
        <Image
          source={{ uri: pflanze.letztes_foto_uri }}
          style={styles.bild}
        />
      ) : null}

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
  bild: {
    width: "100%",
    height: 160,
    borderRadius: 6,
    backgroundColor: "#eee",
  },
});
