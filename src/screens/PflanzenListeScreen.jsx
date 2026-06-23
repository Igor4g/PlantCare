import React, { useCallback, useState } from "react";
import { View, StyleSheet, Alert, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { abmelden } from "../services/authService";
import { pflanzenLaden } from "../services/pflanzenService";
import PflanzeKarte from "../components/PflanzeKarte";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";

export default function PflanzenListeScreen({ navigation }) {
  const [pflanzen, setPflanzen] = useState([]);
  const [lädt, setLädt] = useState(false);

  useFocusEffect(
    useCallback(() => {
      handlePflanzenLaden();
    }, [])
  );

  async function handlePflanzenLaden() {
    try {
      setLädt(true);
      const daten = await pflanzenLaden();
      setPflanzen(daten);
    } catch (error) {
      Alert.alert("Fehler", "Pflanzen konnten nicht geladen werden.");
      console.log(error.message);
    } finally {
      setLädt(false);
    }
  }

  async function handleAbmelden() {
    try {
      await abmelden();
    } catch (error) {
      Alert.alert("Fehler", "Abmelden fehlgeschlagen.");
      console.log(error.message);
    }
  }

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Meine Pflanzen</AppText>

      <AppButton
        title="Neue Pflanze erfassen"
        onPress={() => navigation.navigate("PflanzeErfassen")}
      />

      <AppButton
        title="Unbekannte Pflanze erkennen"
        onPress={() => navigation.navigate("PflanzeErkennen")}
      />

      {lädt ? <AppText>Pflanzen werden geladen...</AppText> : null}

      <FlatList
        data={pflanzen}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <AppText style={styles.empty}>Noch keine Pflanzen erfasst.</AppText>
        }
        renderItem={({ item }) => (
          <PflanzeKarte
            pflanze={item}
            onDetails={() =>
              navigation.navigate("PflanzeDetail", { pflanze: item })
            }
          />
        )}
      />

      <AppButton title="Abmelden" onPress={handleAbmelden} />
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
  empty: {
    marginTop: 16,
  },
});
