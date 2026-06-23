import React, { useState } from "react";
import {
  Alert,
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { pflegeAufgabeErstellen } from "../services/pflegeService";
import { kurzeVibration } from "../services/benachrichtigungService";

const pflegeTypen = ["Giessen", "Düngen", "Umtopfen"];
const wiederholungen = ["täglich", "wöchentlich", "monatlich"];

export default function PflegeAufgabeScreen({ route, navigation }) {
  const pflanze = route.params?.pflanze;
  const pflanzenId = route.params?.pflanzenId || pflanze?.id;

  const [typ, setTyp] = useState("Giessen");
  const [erinnerungDatum, setErinnerungDatum] = useState(standardDatum());
  const [wiederholung, setWiederholung] = useState("täglich");
  const [pickerModus, setPickerModus] = useState(null);
  const [lädt, setLädt] = useState(false);

  async function handleSpeichern() {
    if (!pflanzenId) {
      Alert.alert("Fehler", "Keine Pflanze ausgewählt.");
      return;
    }

    try {
      setLädt(true);
      await pflegeAufgabeErstellen(
        pflanzenId,
        typ,
        erinnerungDatum.toISOString(),
        wiederholung
      );
      kurzeVibration();
      navigation.goBack();
    } catch (error) {
      Alert.alert("Fehler", "Pflegeaufgabe konnte nicht gespeichert werden.");
      console.log(error.message);
    } finally {
      setLädt(false);
    }
  }

  function handleDatumÄndern(event, neuesDatum) {
    if (!neuesDatum) {
      setPickerModus(null);
      return;
    }

    setErinnerungDatum(neuesDatum);
    setPickerModus(null);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Pflegeaufgabe erfassen</Text>

      <Text style={styles.label}>Typ:</Text>
      <View style={styles.typAuswahl}>
        {pflegeTypen.map((pflegeTyp) => (
          <Pressable
            key={pflegeTyp}
            style={[
              styles.auswahl,
              pflegeTyp === typ ? styles.auswahlAktiv : null,
            ]}
            onPress={() => setTyp(pflegeTyp)}
          >
            <Text
              style={[
                styles.auswahlText,
                pflegeTyp === typ ? styles.auswahlTextAktiv : null,
              ]}
            >
              {pflegeTyp}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Start der Erinnerung:</Text>
      <View style={styles.datumButtons}>
        <Pressable
          style={styles.datumButton}
          onPress={() => setPickerModus("date")}
        >
          <Text>{datumAnzeigen(erinnerungDatum)}</Text>
        </Pressable>

        <Pressable
          style={styles.datumButton}
          onPress={() => setPickerModus("time")}
        >
          <Text>{zeitAnzeigen(erinnerungDatum)}</Text>
        </Pressable>
      </View>

      {pickerModus ? (
        <DateTimePicker
          value={erinnerungDatum}
          mode={pickerModus}
          is24Hour
          onChange={handleDatumÄndern}
        />
      ) : null}

      <Text style={styles.label}>Wiederholung:</Text>
      <View style={styles.typAuswahl}>
        {wiederholungen.map((eintrag) => (
          <Pressable
            key={eintrag}
            style={[
              styles.auswahl,
              eintrag === wiederholung ? styles.auswahlAktiv : null,
            ]}
            onPress={() => setWiederholung(eintrag)}
          >
            <Text
              style={[
                styles.auswahlText,
                eintrag === wiederholung ? styles.auswahlTextAktiv : null,
              ]}
            >
              {eintrag}
            </Text>
          </Pressable>
        ))}
      </View>

      <Button
        title={lädt ? "Wird gespeichert..." : "Speichern"}
        onPress={handleSpeichern}
        disabled={lädt}
      />
    </ScrollView>
  );
}

function standardDatum() {
  const morgen = new Date();
  morgen.setDate(morgen.getDate() + 1);
  morgen.setHours(9, 0, 0, 0);

  return morgen;
}

function datumAnzeigen(datum) {
  return datum.toLocaleDateString("de-CH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function zeitAnzeigen(datum) {
  return datum.toLocaleTimeString("de-CH", {
    hour: "2-digit",
    minute: "2-digit",
  });
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
  },
  typAuswahl: {
    gap: 8,
  },
  auswahl: {
    borderWidth: 1,
    borderColor: "#999",
    padding: 12,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  auswahlAktiv: {
    borderColor: "#2e7d32",
    backgroundColor: "#e8f5e9",
  },
  auswahlText: {
    fontWeight: "bold",
  },
  auswahlTextAktiv: {
    color: "#1b5e20",
  },
  datumButtons: {
    flexDirection: "row",
    gap: 8,
  },
  datumButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 6,
    padding: 12,
    backgroundColor: "#fff",
  },
});
