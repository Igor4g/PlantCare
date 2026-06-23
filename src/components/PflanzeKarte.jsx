import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";

export default function PflanzeKarte({ pflanze, onDetails }) {
  return (
    <View style={styles.card}>
      <View style={styles.bildBereich}>
        {pflanze.letztes_foto_uri ? (
          <Image
            source={{ uri: pflanze.letztes_foto_uri }}
            style={styles.bild}
          />
        ) : (
          <Text style={styles.keinBildText}>Kein Foto</Text>
        )}
      </View>

      <View style={styles.inhalt}>
        <Text style={styles.name}>{pflanze.name}</Text>

        {pflanze.pflanzenart ? (
          <Text>Art: {pflanze.pflanzenart}</Text>
        ) : (
          <Text>Keine Pflanzenart erfasst</Text>
        )}

        {pflanze.notizen ? <Text>Notizen: {pflanze.notizen}</Text> : null}

        <Button title="Details öffnen" onPress={onDetails} />
      </View>
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
    flexDirection: "row",
    gap: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bildBereich: {
    width: 95,
    height: 140,
    borderRadius: 6,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  bild: {
    width: "100%",
    height: "100%",
    borderRadius: 6,
  },
  keinBildText: {
    color: "#555",
    fontSize: 12,
  },
  inhalt: {
    flex: 1,
    gap: 6,
    justifyContent: "center",
  },
});
