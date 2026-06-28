# PlantCare

PlantCare ist eine mobile App für das Schulprojekt ÜK-Modul 335. Die App hilft dabei, Zimmerpflanzen zu verwalten und erkennen, Fotos als Wachstumsverlauf zu speichern und Pflegeaufgaben mit Erinnerung zu planen.

## Projektinformationen

- App-Name: PlantCare
- Entwicklungsart: Hybrid Mobile App
- Framework: Expo SDK 54 mit React Native
- Sprache: JavaScript / JSX
- Backend: Supabase
- Zielgerät: Android Smartphone

In der ursprünglichen Planung war Firebase vorgesehen. Wegen technischen Problemen wurde im Projekt Supabase als erlaubte Alternative verwendet. Authentifizierung, persistente Speicherung und Benutzertrennung sind deshalb mit Supabase umgesetzt.

## Hauptfunktionen

- Benutzer registrieren
- Benutzer anmelden
- Session nach App-Neustart behalten
- Benutzer abmelden mit Bestätigung
- Pflanzen erfassen
- Pflanzenliste anzeigen
- Pflanzendetails anzeigen
- Pflanzen bearbeiten und löschen
- Erstes Foto beim Erfassen einer Pflanze hinzufügen
- Fotos mit Kamera oder Galerie hinzufügen
- Fotoverlauf anzeigen
- Fotos öffnen und mit zwei Fingern zoomen
- Fotos löschen
- Pflegeaufgaben erfassen
- Pflegeaufgaben bearbeiten
- Pflegeaufgaben als erledigt oder offen markieren
- Pflegeaufgaben löschen
- Erinnerungsdatum und Uhrzeit setzen
- Wiederholung täglich, wöchentlich oder monatlich setzen
- Vibration nach dem Speichern einer Pflegeaufgabe
- Lokale Benachrichtigungen für Pflegeaufgaben planen
- Optionale KI-Pflanzenerkennung mit Foto
- KI-Erkennungen mit Foto und Antwort speichern

## Sensoren Und Aktoren

Sensor:

- Kamera und Fotogalerie über `expo-image-picker`

Aktoren:

- Vibration über React Native `Vibration`
- Lokale Benachrichtigung über `expo-notifications`

Hinweis: Android Expo Go unterstützt lokale Notifications mit `expo-notifications` leider nur eingeschränkt. Die App verhindert deshalb Fehler in Expo Go. Die vollständige Prüfung der geplanten Benachrichtigung erfolgt im APK-Build.

## Persistente Speicherung

Die Daten werden in Supabase gespeichert. Jede Tabelle enthält eine `benutzer_id`, damit Daten dem angemeldeten Benutzer zugeordnet werden können.

Verwendete Tabellen:

- `pflanzen`
- `fotos`
- `pflegeaufgaben`
- `ki_erkennungen`
- `auth.users`

Die Fotos selbst werden in dieser Schulprojekt-Version lokal auf dem Gerät gespeichert. In Supabase wird der lokale Pfad gespeichert. Das entspricht der geplanten ersten Version. Für eine produktive App wäre Supabase Storage sinnvoll.

## Authentifizierung

Die Authentifizierung erfolgt mit Supabase Auth über E-Mail und Passwort. Die Session wird mit `AsyncStorage` gespeichert, damit der Benutzer nach einem App-Neustart angemeldet bleibt.

## Optionale KI-Erweiterung

Die App enthält eine optionale KI-Funktion zur Pflanzenerkennung. Der Benutzer nimmt ein Foto auf oder wählt ein Foto aus. Danach wird das Bild an die NVIDIA API gesendet. Die Antwort enthält eine Vermutung zur Pflanze und kurze Pflegetipps.

Verwendetes Modell:

- `minimaxai/minimax-m3`

Wichtig: Der NVIDIA API-Key wird in dieser Schulprojekt-Version über `.env` gesetzt. Für eine produktive App sollte ein sicherer Backend-Proxy verwendet werden, damit der API-Key nicht in der App enthalten ist.

## Installation Und Start

Abhängigkeiten installieren:

```bash
npm install
```

App starten:

```bash
npx expo start -c
```

Danach den QR-Code mit Expo Go auf dem Smartphone öffnen.

## Umgebungsvariablen

Die Datei `.env` darf nicht in GitHub hochgeladen werden. Als Vorlage gibt es `.env.example`.

Benötigte Werte:

```bash
EXPO_PUBLIC_SUPABASE_URL=deine_supabase_url
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=dein_supabase_publishable_key
EXPO_PUBLIC_NVIDIA_API_KEY=dein_nvidia_api_key
```

## APK Build

Für die Abgabe wird eine APK-Datei benötigt. Das Projekt enthält eine EAS-Konfiguration:

```bash
npx eas build -p android --profile preview
```

Der `preview` Build erstellt eine APK-Datei für die interne Abgabe und Tests.

## Projektstruktur

```text
App.js
src/
  components/
  screens/
  services/
  utils/
docs/
  Supabase_Setup.md
  Testprotokoll.md
  screenshots/
```

## Testplan

Der ausführliche Testplan befindet sich in [docs/Testprotokoll.md](docs/Testprotokoll.md).

Wichtige Testbereiche:

- Registrierung und Anmeldung
- Logout
- Pflanzen erfassen, bearbeiten und löschen
- Fotos hinzufügen, öffnen, zoomen und löschen
- Pflegeaufgaben erfassen, bearbeiten, erledigen und löschen
- Erinnerung und Vibration
- Persistenz nach App-Neustart
- Benutzertrennung

## Screenshots

Die Screenshots für die Abgabe können im Ordner [docs/screenshots](docs/screenshots) gespeichert werden.

Empfohlene Screenshots:

- `01_anmeldung.png`
- `02_pflanzenliste.png`
- `03_pflanze_erfassen.png`
- `04_pflanze_detail.png`
- `05_fotoverlauf.png`
- `06_pflegeaufgaben.png`
- `07_ki_erkennung.png`

## Abgabe

Für die finale Abgabe werden benötigt:

- GitHub Repository oder ZIP ohne `node_modules`
- APK-Datei
- Dokumentation als README oder Markdown/PDF
- Testprotokoll
- Selbstbewertung im Excel-Sheet
