import React, { useCallback, useState } from "react";
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import {
  pflanzeLadenNachId,
  pflanzeLöschen,
} from "../services/pflanzenService";
import {
  fotoLöschen,
  fotosLaden,
  fotoSpeichern,
} from "../services/fotoService";
import {
  pflegeAufgabeErledigtSetzen,
  pflegeAufgabeLöschen,
  pflegeAufgabenLaden,
} from "../services/pflegeService";
import FotoVerlauf from "../components/FotoVerlauf";
import PflegeAufgabeEintrag from "../components/PflegeAufgabeEintrag";

export default function PflanzeDetailScreen({ route, navigation }) {
  const startPflanze = route.params?.pflanze;
  const pflanzenId = route.params?.pflanzenId || startPflanze?.id;

  const [pflanze, setPflanze] = useState(startPflanze || null);
  const [lädt, setLädt] = useState(!!pflanzenId && !startPflanze);
  const [fotos, setFotos] = useState([]);
  const [fotosLadenAktiv, setFotosLadenAktiv] = useState(false);
  const [pflegeAufgaben, setPflegeAufgaben] = useState([]);
  const [pflegeLadenAktiv, setPflegeLadenAktiv] = useState(false);

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

      async function fotosNeuLaden() {
        try {
          setFotosLadenAktiv(true);
          const fotoDaten = await fotosLaden(pflanzenId);

          if (screenIstAktiv) {
            setFotos(fotoDaten);
          }
        } catch (error) {
          Alert.alert("Fehler", "Fotos konnten nicht geladen werden.");
          console.log(error.message);
        } finally {
          if (screenIstAktiv) {
            setFotosLadenAktiv(false);
          }
        }
      }

      async function pflegeAufgabenNeuLaden() {
        try {
          setPflegeLadenAktiv(true);
          const aufgaben = await pflegeAufgabenLaden(pflanzenId);

          if (screenIstAktiv) {
            setPflegeAufgaben(aufgaben);
          }
        } catch (error) {
          Alert.alert("Fehler", "Pflegeaufgaben konnten nicht geladen werden.");
          console.log(error.message);
        } finally {
          if (screenIstAktiv) {
            setPflegeLadenAktiv(false);
          }
        }
      }

      pflanzeNeuLaden();
      fotosNeuLaden();
      pflegeAufgabenNeuLaden();

      return () => {
        screenIstAktiv = false;
      };
    }, [pflanzenId])
  );

  async function handleFotoAusKamera() {
    const erlaubnis = await ImagePicker.requestCameraPermissionsAsync();

    if (!erlaubnis.granted) {
      Alert.alert("Fehler", "Die Kamera-Berechtigung wurde nicht erlaubt.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    });

    await fotoResultatSpeichern(result);
  }

  async function handleFotoAusGalerie() {
    const erlaubnis = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!erlaubnis.granted) {
      Alert.alert("Fehler", "Die Foto-Berechtigung wurde nicht erlaubt.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    });

    await fotoResultatSpeichern(result);
  }

  async function fotoResultatSpeichern(result) {
    if (result.canceled) {
      return;
    }

    try {
      const bildUri = result.assets[0].uri;
      const neuesFoto = await fotoSpeichern(pflanzenId, bildUri);
      setFotos((aktuelleFotos) => [neuesFoto, ...aktuelleFotos]);
      setPflanze((aktuellePflanze) => ({
        ...aktuellePflanze,
        letztes_foto_uri: bildUri,
      }));
    } catch (error) {
      Alert.alert("Fehler", "Foto konnte nicht gespeichert werden.");
      console.log(error.message);
    }
  }

  function handleFotoHinzufügen() {
    Alert.alert("Foto hinzufügen", "Woher soll das Foto kommen?", [
      { text: "Kamera", onPress: handleFotoAusKamera },
      { text: "Galerie", onPress: handleFotoAusGalerie },
      { text: "Abbrechen", style: "cancel" },
    ]);
  }

  async function handleFotoLöschen(foto) {
    try {
      const neueFotos = await fotoLöschen(foto.id, pflanzenId);
      setFotos(neueFotos);
      setPflanze((aktuellePflanze) => ({
        ...aktuellePflanze,
        letztes_foto_uri:
          neueFotos.length > 0 ? neueFotos[0].lokaler_pfad : null,
      }));
    } catch (error) {
      Alert.alert("Fehler", "Foto konnte nicht gelöscht werden.");
      console.log(error.message);
    }
  }

  async function handlePflegeErledigtWechseln(aufgabe) {
    try {
      const aktualisierteAufgabe = await pflegeAufgabeErledigtSetzen(
        aufgabe.id,
        pflanzenId,
        !aufgabe.erledigt
      );

      setPflegeAufgaben((aktuelleAufgaben) =>
        aktuelleAufgaben.map((eintrag) =>
          eintrag.id === aktualisierteAufgabe.id ? aktualisierteAufgabe : eintrag
        )
      );
    } catch (error) {
      Alert.alert("Fehler", "Pflegeaufgabe konnte nicht geändert werden.");
      console.log(error.message);
    }
  }

  function handlePflegeLöschen(aufgabe) {
    Alert.alert(
      "Pflegeaufgabe löschen",
      "Möchtest du diese Pflegeaufgabe wirklich löschen?",
      [
        { text: "Abbrechen", style: "cancel" },
        {
          text: "Löschen",
          style: "destructive",
          onPress: () => pflegeLöschen(aufgabe),
        },
      ]
    );
  }

  async function pflegeLöschen(aufgabe) {
    try {
      await pflegeAufgabeLöschen(aufgabe.id, pflanzenId);
      setPflegeAufgaben((aktuelleAufgaben) =>
        aktuelleAufgaben.filter((eintrag) => eintrag.id !== aufgabe.id)
      );
    } catch (error) {
      Alert.alert("Fehler", "Pflegeaufgabe konnte nicht gelöscht werden.");
      console.log(error.message);
    }
  }

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
    <ScrollView contentContainerStyle={styles.container}>
      {lädt ? <Text>Pflanze wird geladen...</Text> : null}

      <Text style={styles.title}>{pflanze.name}</Text>

      <Text style={styles.label}>Pflanzenart:</Text>
      <Text>{pflanze.pflanzenart || "Keine Pflanzenart erfasst"}</Text>

      <Text style={styles.label}>Notizen:</Text>
      <Text>{pflanze.notizen || "Keine Notizen erfasst"}</Text>

      <Text style={styles.label}>Fotoverlauf:</Text>
      {fotosLadenAktiv ? <Text>Fotos werden geladen...</Text> : null}
      <FotoVerlauf fotos={fotos} onFotoLöschen={handleFotoLöschen} />

      <Button title="Foto hinzufügen" onPress={handleFotoHinzufügen} />

      <Button
        title="Pflanze bearbeiten"
        onPress={() => navigation.navigate("PflanzeErfassen", { pflanze })}
      />

      <Button
        title="Pflegeaufgabe erfassen"
        onPress={() => navigation.navigate("PflegeAufgabe", { pflanze })}
      />

      <Text style={styles.label}>Pflegeaufgaben:</Text>
      {pflegeLadenAktiv ? <Text>Pflegeaufgaben werden geladen...</Text> : null}
      {pflegeAufgaben.length === 0 ? (
        <Text>Noch keine Pflegeaufgaben erfasst.</Text>
      ) : (
        pflegeAufgaben.map((aufgabe) => (
          <PflegeAufgabeEintrag
            key={aufgabe.id}
            aufgabe={aufgabe}
            onErledigtWechseln={handlePflegeErledigtWechseln}
            onLöschen={handlePflegeLöschen}
          />
        ))
      )}

      <Button title="Pflanze löschen" onPress={handleLöschen} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
