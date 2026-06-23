import React, { useCallback, useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import {
  pflanzeLadenNachId,
  pflanzeLöschen,
} from "../services/pflanzenService";

export default function PflanzeDetailScreen({ route, navigation }) {
  const startPflanze = route.params?.pflanze;
  const pflanzenId = route.params?.pflanzenId || startPflanze?.id;

  const [pflanze, setPflanze] = useState(startPflanze || null);
  const [lädt, setLädt] = useState(!!pflanzenId && !startPflanze);

  useFocusEffect(
    useCallback(() => {
      if (!pflanzenId) {
        setPflanze(null);
        return;
      }

      let screenIstAktiv = true;

      async function pflanzeNeuLaden() {
        try {
          setLädt(true);
          const aktuellePflanze = await pflanzeLadenNachId(pflanzenId);

          if (screenIstAktiv) {
            setPflanze(aktuellePflanze);
          }
        } catch (error) {
          Alert.alert("Fehler", "Pflanze konnte nicht geladen werden.");
          console.log(error.message);
        } finally {
          if (screenIstAktiv) {
            setLädt(false);
          }
        }
      }

      pflanzeNeuLaden();

      return () => {
        screenIstAktiv = false;
      };
    }, [pflanzenId])
  );

  async function handleLöschen() {
    try {
      await pflanzeLöschen(pflanze.id);
      navigation.goBack();
    } catch (error) {
      Alert.alert("Fehler", "Pflanze konnte nicht gelöscht werden.");
      console.log(error.message);
    }
  }

  if (!pflanze) {
    return (
      <View style={styles.container}>
        <Text>
          {lädt ? "Pflanze wird geladen..." : "Keine Pflanze ausgewählt."}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {lädt ? <Text>Pflanze wird geladen...</Text> : null}

      <Text style={styles.title}>{pflanze.name}</Text>

      <Text style={styles.label}>Pflanzenart:</Text>
      <Text>{pflanze.pflanzenart || "Keine Pflanzenart erfasst"}</Text>

      <Text style={styles.label}>Notizen:</Text>
      <Text>{pflanze.notizen || "Keine Notizen erfasst"}</Text>

      <Button
        title="Pflanze bearbeiten"
        onPress={() => navigation.navigate("PflanzeErfassen", { pflanze })}
      />

      <Button
        title="Pflegeaufgabe erfassen"
        onPress={() => navigation.navigate("PflegeAufgabe", { pflanze })}
      />

      <Button title="Pflanze löschen" onPress={handleLöschen} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  label: {
    fontWeight: "bold",
    marginTop: 8,
  },
});
