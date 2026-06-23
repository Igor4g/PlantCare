import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import AppText from "./AppText";

export default function PflegeAufgabeEintrag({
  aufgabe,
  onBearbeiten,
  onErledigtWechseln,
  onLöschen,
}) {
  return (
    <View
      style={[
        styles.container,
        aufgabe.erledigt ? styles.containerErledigt : null,
      ]}
    >
      <View style={styles.kopf}>
        <AppText style={styles.typ}>{aufgabe.typ}</AppText>
        <View
          style={[
            styles.status,
            aufgabe.erledigt ? styles.statusErledigt : styles.statusOffen,
          ]}
        >
          <AppText
            style={[
              styles.statusText,
              aufgabe.erledigt
                ? styles.statusTextErledigt
                : styles.statusTextOffen,
            ]}
          >
            {aufgabe.erledigt ? "Erledigt" : "Offen"}
          </AppText>
        </View>
      </View>

      <AppText>Erinnerung: {datumAnzeigen(aufgabe.erinnerung_am)}</AppText>
      <AppText>Wiederholung: {aufgabe.wiederholung || "nicht gesetzt"}</AppText>

      <View style={styles.buttons}>
        <Pressable
          style={styles.bearbeitenButton}
          onPress={() => onBearbeiten(aufgabe)}
        >
          <AppText style={styles.bearbeitenText}>Bearbeiten</AppText>
        </Pressable>

        <Pressable
          style={[
            styles.aktionButton,
            aufgabe.erledigt ? styles.offenButton : styles.erledigtButton,
          ]}
          onPress={() => onErledigtWechseln(aufgabe)}
        >
          <AppText style={styles.aktionText}>
            {aufgabe.erledigt ? "Wieder offen" : "Als erledigt markieren"}
          </AppText>
        </Pressable>

        <Pressable
          style={styles.löschenButton}
          onPress={() => onLöschen(aufgabe)}
        >
          <AppText style={styles.löschenText}>Löschen</AppText>
        </Pressable>
      </View>
    </View>
  );
}

function datumAnzeigen(datum) {
  if (!datum) {
    return "Kein Datum";
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
  container: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 6,
    padding: 12,
    gap: 6,
    backgroundColor: "#fff",
  },
  containerErledigt: {
    borderColor: "#2e7d32",
    backgroundColor: "#edf7ed",
  },
  kopf: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  typ: {
    fontWeight: "bold",
    fontSize: 16,
    flex: 1,
  },
  status: {
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  statusOffen: {
    backgroundColor: "#fff3cd",
  },
  statusErledigt: {
    backgroundColor: "#c8e6c9",
  },
  statusText: {
    fontWeight: "bold",
    fontSize: 12,
  },
  statusTextOffen: {
    color: "#7a5b00",
  },
  statusTextErledigt: {
    color: "#1b5e20",
  },
  buttons: {
    marginTop: 6,
    gap: 8,
  },
  bearbeitenButton: {
    borderWidth: 1,
    borderColor: "#1976d2",
    borderRadius: 6,
    padding: 12,
    alignItems: "center",
  },
  bearbeitenText: {
    color: "#1976d2",
    fontWeight: "bold",
  },
  aktionButton: {
    borderRadius: 6,
    padding: 12,
    alignItems: "center",
  },
  erledigtButton: {
    backgroundColor: "#2e7d32",
  },
  offenButton: {
    backgroundColor: "#616161",
  },
  aktionText: {
    color: "#fff",
    fontWeight: "bold",
  },
  löschenButton: {
    borderWidth: 1,
    borderColor: "#b00020",
    borderRadius: 6,
    padding: 12,
    alignItems: "center",
  },
  löschenText: {
    color: "#b00020",
    fontWeight: "bold",
  },
});
