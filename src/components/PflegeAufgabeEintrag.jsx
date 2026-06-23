import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function PflegeAufgabeEintrag({
  aufgabe,
  onErledigtWechseln,
  onLöschen,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.typ}>{aufgabe.typ}</Text>
      <Text>Erinnerung: {datumAnzeigen(aufgabe.erinnerung_am)}</Text>
      <Text>Wiederholung: {aufgabe.wiederholung || "nicht gesetzt"}</Text>
      <Text>Status: {aufgabe.erledigt ? "erledigt" : "offen"}</Text>

      <View style={styles.buttons}>
        <Button
          title={aufgabe.erledigt ? "Als offen markieren" : "Erledigt"}
          onPress={() => onErledigtWechseln(aufgabe)}
        />
        <Button title="Löschen" onPress={() => onLöschen(aufgabe)} />
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
    gap: 4,
  },
  typ: {
    fontWeight: "bold",
    fontSize: 16,
  },
  buttons: {
    marginTop: 6,
    gap: 6,
  },
});
