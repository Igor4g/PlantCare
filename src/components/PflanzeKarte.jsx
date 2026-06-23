import React from "react";
import { Image, StyleSheet, View } from "react-native";
import AppText from "./AppText";
import AppButton from "./AppButton";

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
          <AppText style={styles.keinBildText}>Kein Foto</AppText>
        )}
      </View>

      <View style={styles.inhalt}>
        <AppText style={styles.name}>{pflanze.name}</AppText>

        {pflanze.pflanzenart ? (
          <AppText>Art: {pflanze.pflanzenart}</AppText>
        ) : (
          <AppText>Keine Pflanzenart erfasst</AppText>
        )}

        {pflanze.notizen ? (
          <AppText>Notizen: {pflanze.notizen}</AppText>
        ) : null}

        <AppText style={styles.pflegeText}>
          Nächste Pflege: {datumAnzeigen(pflanze.naechste_pflege_am)}
        </AppText>

        <AppButton title="Details öffnen" onPress={onDetails} />
      </View>
    </View>
  );
}

function datumAnzeigen(datum) {
  if (!datum) {
    return "Keine geplant";
  }

  return new Date(datum).toLocaleString("de-CH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
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
  pflegeText: {
    color: "#2e7d32",
    fontWeight: "bold",
  },
});
