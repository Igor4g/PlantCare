import React, { useCallback, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import { pflanzeMitKiErkennen } from "../services/kiService";
import {
  kiErkennungenLaden,
  kiErkennungSpeichern,
} from "../services/kiErkennungService";

export default function PflanzeErkennenScreen() {
  const [bildUri, setBildUri] = useState(null);
  const [base64Bild, setBase64Bild] = useState(null);
  const [antwort, setAntwort] = useState("");
  const [kiVerlauf, setKiVerlauf] = useState([]);
  const [lädt, setLädt] = useState(false);
  const [verlaufFehlt, setVerlaufFehlt] = useState(false);

  useFocusEffect(
    useCallback(() => {
      verlaufLaden();
    }, [])
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
      quality: 0.6,
      base64: true,
    });

    fotoSetzen(result);
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
      quality: 0.6,
      base64: true,
    });

    fotoSetzen(result);
  }

  function fotoSetzen(result) {
    if (result.canceled) {
      return;
    }

    setBildUri(result.assets[0].uri);
    setBase64Bild(result.assets[0].base64);
    setAntwort("");
  }

  async function verlaufLaden() {
    try {
      const daten = await kiErkennungenLaden();
      setKiVerlauf(daten);
      setVerlaufFehlt(false);
    } catch (error) {
      setVerlaufFehlt(true);
      console.log(error.message);
    }
  }

  async function handleAnalysieren() {
    if (!base64Bild) {
      Alert.alert("Fehler", "Bitte zuerst ein Foto auswählen.");
      return;
    }

    try {
      setLädt(true);
      const kiAntwort = await pflanzeMitKiErkennen(base64Bild);
      const saubereAntwort = kiTextBereinigen(kiAntwort);
      setAntwort(saubereAntwort);

      try {
        const gespeicherteErkennung = await kiErkennungSpeichern({
          fotoPfad: bildUri,
          fotoBase64: base64Bild,
          antwort: saubereAntwort,
        });

        setKiVerlauf((alterVerlauf) => [gespeicherteErkennung, ...alterVerlauf]);
        setVerlaufFehlt(false);
      } catch (speicherFehler) {
        setVerlaufFehlt(true);
        Alert.alert(
          "Hinweis",
          "Die KI-Antwort wurde angezeigt, aber noch nicht in Supabase gespeichert. Bitte zuerst die Tabelle ki_erkennungen erstellen."
        );
        console.log(speicherFehler.message);
      }
    } catch (error) {
      if (error.message === "NVIDIA_API_KEY_FEHLT") {
        Alert.alert(
          "API-Key fehlt",
          "Bitte EXPO_PUBLIC_NVIDIA_API_KEY in der .env Datei setzen."
        );
      } else {
        Alert.alert("Fehler", "Die Pflanze konnte nicht erkannt werden.");
        console.log(error.message);
      }
    } finally {
      setLädt(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AppText style={styles.title}>Pflanze erkennen</AppText>

      <View style={styles.infoBox}>
        <AppText style={styles.infoTitel}>KI-Erweiterung</AppText>
        <AppText>
          Nimm ein Foto einer unbekannten Pflanze auf oder wähle ein Foto aus.
          Die KI gibt eine Vermutung und kurze Pflegetipps.
        </AppText>
      </View>

      <View style={styles.buttons}>
        <AppButton
          title="Foto aufnehmen"
          onPress={handleFotoAusKamera}
          iconName="camera-outline"
          style={styles.halberButton}
        />
        <AppButton
          title="Foto auswählen"
          onPress={handleFotoAusGalerie}
          variant="outline"
          iconName="image-outline"
          style={styles.halberButton}
        />
      </View>

      {bildUri ? <Image source={{ uri: bildUri }} style={styles.bild} /> : null}

      <AppButton
        title={lädt ? "Wird analysiert..." : "Pflanze analysieren"}
        onPress={handleAnalysieren}
        disabled={lädt}
        iconName="search-outline"
      />

      {antwort ? (
        <View style={styles.ergebnis}>
          <AppText style={styles.ergebnisTitel}>Ergebnis:</AppText>
          <FormatierterKiText text={antwort} />
        </View>
      ) : null}

      <View style={styles.verlaufKopf}>
        <AppText style={styles.ergebnisTitel}>Gespeicherte Erkennungen</AppText>
        <AppButton
          title="Aktualisieren"
          onPress={verlaufLaden}
          variant="outline"
          iconName="refresh-outline"
          style={styles.kleinerButton}
        />
      </View>

      {verlaufFehlt ? (
        <View style={styles.hinweisBox}>
          <AppText>
            Der Verlauf kann erst geladen werden, wenn die Tabelle
            ki_erkennungen in Supabase erstellt wurde.
          </AppText>
        </View>
      ) : null}

      {kiVerlauf.length === 0 && !verlaufFehlt ? (
        <AppText>Noch keine KI-Erkennung gespeichert.</AppText>
      ) : null}

      {kiVerlauf.map((eintrag) => (
        <View key={eintrag.id} style={styles.verlaufEintrag}>
          {fotoUriAnzeigen(eintrag) ? (
            <Image
              source={{ uri: fotoUriAnzeigen(eintrag) }}
              style={styles.verlaufBild}
            />
          ) : null}
          <View style={styles.verlaufText}>
            <AppText style={styles.datum}>
              {datumAnzeigen(eintrag.erstellt_am)}
            </AppText>
            <FormatierterKiText text={eintrag.antwort} />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

function FormatierterKiText({ text }) {
  return (
    <View style={styles.kiTextBox}>
      {text
        .split("\n")
        .map((zeile) => zeile.trim())
        .filter((zeile) => zeile.length > 0)
        .map((zeile, index) => {
          const istTitel = zeile.endsWith(":") || zeile.includes(":");
          return (
            <AppText
              key={`${zeile}-${index}`}
              style={istTitel ? styles.kiZeileTitel : styles.kiZeile}
            >
              {zeile}
            </AppText>
          );
        })}
    </View>
  );
}

function kiTextBereinigen(text) {
  return text
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/#{1,6}\s?/g, "")
    .replace(/`/g, "")
    .replace(/\r/g, "")
    .trim();
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

function fotoUriAnzeigen(eintrag) {
  if (eintrag.foto_pfad) {
    return eintrag.foto_pfad;
  }

  if (eintrag.foto_base64) {
    return `data:image/jpeg;base64,${eintrag.foto_base64}`;
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    gap: 14,
    backgroundColor: "#f6f8f4",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1f3b28",
  },
  infoBox: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d9e2d4",
    borderRadius: 6,
    padding: 12,
    gap: 6,
  },
  infoTitel: {
    fontWeight: "bold",
    color: "#2f6b3f",
  },
  buttons: {
    flexDirection: "row",
    gap: 8,
  },
  halberButton: {
    flex: 1,
    paddingHorizontal: 8,
  },
  bild: {
    width: "100%",
    height: 260,
    borderRadius: 6,
    backgroundColor: "#eee",
  },
  ergebnis: {
    borderWidth: 1,
    borderColor: "#c7d8c0",
    borderRadius: 6,
    padding: 12,
    gap: 8,
    backgroundColor: "#fff",
  },
  ergebnisTitel: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#1f3b28",
  },
  kiTextBox: {
    gap: 5,
  },
  kiZeileTitel: {
    fontWeight: "bold",
    lineHeight: 22,
  },
  kiZeile: {
    lineHeight: 22,
  },
  verlaufKopf: {
    marginTop: 8,
    gap: 8,
  },
  kleinerButton: {
    alignSelf: "flex-start",
    paddingVertical: 8,
  },
  hinweisBox: {
    backgroundColor: "#fff6df",
    borderWidth: 1,
    borderColor: "#e1c16e",
    borderRadius: 6,
    padding: 12,
  },
  verlaufEintrag: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d9e2d4",
    borderRadius: 6,
    padding: 10,
  },
  verlaufBild: {
    width: 72,
    height: 96,
    borderRadius: 6,
    backgroundColor: "#eee",
  },
  verlaufText: {
    flex: 1,
    gap: 5,
  },
  datum: {
    color: "#666",
    fontSize: 13,
  },
});
