import React, { useRef, useState } from "react";
import {
  Alert,
  Button,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function FotoVerlauf({ fotos, onFotoLöschen }) {
  const [ausgewähltesFoto, setAusgewähltesFoto] = useState(null);
  const [zoom, setZoom] = useState(1);
  const startAbstand = useRef(null);

  if (!fotos || fotos.length === 0) {
    return <Text>Noch keine Fotos erfasst.</Text>;
  }

  return (
    <>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {fotos.map((foto) => (
          <Pressable
            key={foto.id}
            style={styles.fotoEintrag}
            onPress={() => setAusgewähltesFoto(foto)}
          >
            <Image source={{ uri: foto.lokaler_pfad }} style={styles.bild} />
            <Text style={styles.datum}>{datumAnzeigen(foto.erstellt_am)}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <Modal
        visible={!!ausgewähltesFoto}
        animationType="fade"
        onRequestClose={modalSchliessen}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalButtons}>
            <Button title="Schliessen" onPress={modalSchliessen} />
            <Button title="Foto löschen" onPress={handleFotoLöschen} />
          </View>

          {ausgewähltesFoto ? (
            <View
              style={styles.zoomBereich}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
            >
              <Image
                source={{ uri: ausgewähltesFoto.lokaler_pfad }}
                style={[styles.grossesBild, { transform: [{ scale: zoom }] }]}
                resizeMode="contain"
              />
            </View>
          ) : null}
        </View>
      </Modal>
    </>
  );

  function modalSchliessen() {
    setAusgewähltesFoto(null);
    setZoom(1);
    startAbstand.current = null;
  }

  function handleFotoLöschen() {
    if (!ausgewähltesFoto) {
      return;
    }

    Alert.alert("Foto löschen", "Möchtest du dieses Foto wirklich löschen?", [
      { text: "Abbrechen", style: "cancel" },
      {
        text: "Löschen",
        style: "destructive",
        onPress: () => {
          onFotoLöschen(ausgewähltesFoto);
          modalSchliessen();
        },
      },
    ]);
  }

  function handleTouchStart(event) {
    if (event.nativeEvent.touches.length === 2) {
      const abstand = fingerAbstand(event.nativeEvent.touches);
      startAbstand.current = abstand;
    }
  }

  function handleTouchMove(event) {
    if (event.nativeEvent.touches.length !== 2 || !startAbstand.current) {
      return;
    }

    const abstand = fingerAbstand(event.nativeEvent.touches);
    const neuerZoom = Math.min(Math.max(abstand / startAbstand.current, 1), 3);
    setZoom(neuerZoom);
  }

  function handleTouchEnd() {
    setZoom(1);
    startAbstand.current = null;
  }
}

function datumAnzeigen(datum) {
  if (!datum) {
    return "Kein Datum";
  }

  return new Date(datum).toLocaleDateString("de-CH");
}

function fingerAbstand(touches) {
  const finger1 = touches[0];
  const finger2 = touches[1];
  const xAbstand = finger1.pageX - finger2.pageX;
  const yAbstand = finger1.pageY - finger2.pageY;

  return Math.sqrt(xAbstand * xAbstand + yAbstand * yAbstand);
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
  modalContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  modalButtons: {
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  zoomBereich: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  grossesBild: {
    width: "100%",
    height: "100%",
  },
});
