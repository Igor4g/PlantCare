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

  function handleAbmelden() {
    Alert.alert(
      "Abmelden",
      "Möchtest du dich wirklich abmelden?",
      [
        { text: "Abbrechen", style: "cancel" },
        {
          text: "Abmelden",
          style: "destructive",
          onPress: abmeldenBestätigen,
        },
      ]
    );
  }

  async function abmeldenBestätigen() {
    try {
      await abmelden();
    } catch (error) {
      Alert.alert("Fehler", "Abmelden fehlgeschlagen.");
      console.log(error.message);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.kopfZeile}>
        <View style={styles.kopfText}>
          <AppText style={styles.title}>Meine Pflanzen</AppText>
          <AppText style={styles.untertitel}>
            Pflanzen, Fotos und Pflegeaufgaben an einem Ort.
          </AppText>
        </View>

        <AppButton
          title="Abmelden"
          onPress={handleAbmelden}
          variant="outline"
          iconName="log-out-outline"
          iconOnly
          style={styles.abmeldenButton}
        />
      </View>

      <View style={styles.aktionen}>
        <AppButton
          title="Neue Pflanze erfassen"
          onPress={() => navigation.navigate("PflanzeErfassen")}
          iconName="add-outline"
        />

        <AppButton
          title="Unbekannte Pflanze erkennen"
          onPress={() => navigation.navigate("PflanzeErkennen")}
          variant="outline"
          iconName="scan-outline"
        />
      </View>

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

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 16,
    backgroundColor: "#f6f8f4",
  },
  kopfZeile: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  kopfText: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1f3b28",
  },
  untertitel: {
    color: "#52635a",
  },
  aktionen: {
    gap: 8,
  },
  abmeldenButton: {
    marginTop: 2,
  },
  empty: {
    marginTop: 16,
  },
});
