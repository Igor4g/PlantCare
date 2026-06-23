import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  pflegeAufgabeAktualisieren,
  pflegeAufgabeErstellen,
} from "../services/pflegeService";
import { kurzeVibration } from "../services/benachrichtigungService";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";

const pflegeTypen = ["Giessen", "Düngen", "Umtopfen"];
const wiederholungen = ["täglich", "wöchentlich", "monatlich"];

export default function PflegeAufgabeScreen({ route, navigation }) {
  const pflanze = route.params?.pflanze;
  const vorhandeneAufgabe = route.params?.aufgabe;
  const istBearbeiten = !!vorhandeneAufgabe;
  const pflanzenId = route.params?.pflanzenId || pflanze?.id;

  const [typ, setTyp] = useState(vorhandeneAufgabe?.typ || "Giessen");
  const [erinnerungDatum, setErinnerungDatum] = useState(
    vorhandeneAufgabe?.erinnerung_am
      ? new Date(vorhandeneAufgabe.erinnerung_am)
      : standardDatum()
  );
  const [wiederholung, setWiederholung] = useState(
    vorhandeneAufgabe?.wiederholung || "täglich"
  );
  const [pickerModus, setPickerModus] = useState(null);
  const [lädt, setLädt] = useState(false);

  async function handleSpeichern() {
    if (!pflanzenId) {
      Alert.alert("Fehler", "Keine Pflanze ausgewählt.");
      return;
    }

    try {
      setLädt(true);

      if (istBearbeiten) {
        await pflegeAufgabeAktualisieren(
          vorhandeneAufgabe.id,
          pflanzenId,
          typ,
          erinnerungDatum.toISOString(),
          wiederholung
        );
      } else {
        await pflegeAufgabeErstellen(
          pflanzenId,
          typ,
          erinnerungDatum.toISOString(),
          wiederholung
        );
      }

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
      <AppText style={styles.title}>
        {istBearbeiten ? "Pflegeaufgabe bearbeiten" : "Pflegeaufgabe erfassen"}
      </AppText>

      <AppText style={styles.label}>Typ:</AppText>
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
            <AppText
              style={[
                styles.auswahlText,
                pflegeTyp === typ ? styles.auswahlTextAktiv : null,
              ]}
            >
              {pflegeTyp}
            </AppText>
          </Pressable>
        ))}
      </View>

      <AppText style={styles.label}>Start der Erinnerung:</AppText>
      <View style={styles.datumButtons}>
        <Pressable
          style={styles.datumButton}
          onPress={() => setPickerModus("date")}
        >
          <AppText>{datumAnzeigen(erinnerungDatum)}</AppText>
        </Pressable>

        <Pressable
          style={styles.datumButton}
          onPress={() => setPickerModus("time")}
        >
          <AppText>{zeitAnzeigen(erinnerungDatum)}</AppText>
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

      <AppText style={styles.label}>Wiederholung:</AppText>
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
            <AppText
              style={[
                styles.auswahlText,
                eintrag === wiederholung ? styles.auswahlTextAktiv : null,
              ]}
            >
              {eintrag}
            </AppText>
          </Pressable>
        ))}
      </View>

      <AppButton
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
