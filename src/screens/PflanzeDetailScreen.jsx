import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function PflanzeDetailScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pflanze Details</Text>
      <Text>Hier werden Fotos und Pflegeaufgaben angezeigt.</Text>

      <Button
        title="Pflegeaufgabe erfassen"
        onPress={() => navigation.navigate("PflegeAufgabe")}
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