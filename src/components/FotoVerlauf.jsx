import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function FotoVerlauf({ fotos }) {
  if (!fotos || fotos.length === 0) {
    return <Text>Noch keine Fotos erfasst.</Text>;
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {fotos.map((foto) => (
        <View key={foto.id} style={styles.fotoEintrag}>
          <Image source={{ uri: foto.lokaler_pfad }} style={styles.bild} />
          <Text style={styles.datum}>{datumAnzeigen(foto.erstellt_am)}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

function datumAnzeigen(datum) {
  if (!datum) {
    return "Kein Datum";
  }

  return new Date(datum).toLocaleDateString("de-CH");
}

const styles = StyleSheet.create({
  fotoEintrag: {
    marginRight: 12,
    width: 130,
  },
  bild: {
    width: 130,
    height: 130,
    borderRadius: 6,
    backgroundColor: "#eee",
  },
  datum: {
    marginTop: 4,
    fontSize: 12,
  },
});
