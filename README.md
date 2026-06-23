# PlantCare

PlantCare ist eine einfache Expo React Native App fuer das Modul 335.
Die App hilft, eigene Pflanzen zu erfassen, Fotos zu speichern und Pflegeaufgaben zu planen.

## Technik

- Expo SDK 54
- React Native
- JavaScript / JSX
- Supabase Auth
- Supabase Datenbank
- Expo Image Picker
- Expo Notifications
- React Native Vibration

## Funktionen

- Registrierung
- Anmeldung
- Session bleibt nach App-Neustart erhalten
- Abmelden
- Pflanzen erfassen
- Pflanzenliste anzeigen
- Pflanzendetails anzeigen
- Pflanzen bearbeiten
- Pflanzen loeschen
- Fotos mit Kamera oder Galerie hinzufuegen
- Fotoverlauf anzeigen
- Fotos oeffnen und zoomen
- Fotos loeschen
- Pflegeaufgaben erfassen
- Wiederholung: taeglich, woechentlich, monatlich
- Pflegeaufgaben als erledigt oder offen markieren
- Pflegeaufgaben loeschen
- Vibration nach dem Speichern einer Pflegeaufgabe
- Geplante lokale Benachrichtigungen fuer Pflegeaufgaben

## Sensoren und Aktoren

Sensor:

- Kamera oder Galerie ueber `expo-image-picker`

Aktor:

- Vibration nach dem Speichern einer Pflegeaufgabe
- Lokale Benachrichtigung fuer Pflegeerinnerungen

## Hinweis zu Expo Go

Auf Android zeigt Expo Go seit SDK 53 Einschraenkungen bei `expo-notifications`.
Darum werden geplante Benachrichtigungen in Android Expo Go nicht aktiv getestet.
Die Pflegeaufgabe wird trotzdem gespeichert und die direkte Vibration funktioniert.

Fuer den vollstaendigen Test der lokalen Benachrichtigung braucht es spaeter eine APK oder eine Development Build.

## Supabase Tabellen

Verwendete Tabellen:

- `pflanzen`
- `fotos`
- `pflegeaufgaben`
- `auth.users`

Wichtige Spalten:

- `pflanzen.benutzer_id`
- `pflanzen.letztes_foto_uri`
- `pflanzen.naechste_pflege_am`
- `fotos.pflanze_id`
- `fotos.lokaler_pfad`
- `pflegeaufgaben.pflanze_id`
- `pflegeaufgaben.erinnerung_am`
- `pflegeaufgaben.wiederholung`
- `pflegeaufgaben.erledigt`
- `pflegeaufgaben.notification_id`

## App starten

```bash
npm install
npx expo start -c
```

Danach den QR-Code mit Expo Go auf dem Handy scannen.

## Testplan

| Nr. | Testfall | Erwartetes Ergebnis |
| --- | --- | --- |
| T01 | Registrierung mit gueltiger E-Mail und Passwort | Benutzer wird erstellt und angemeldet |
| T02 | Anmeldung mit gueltigen Daten | Pflanzenliste wird angezeigt |
| T03 | Anmeldung mit falschen Daten | Fehlermeldung wird angezeigt |
| T04 | App neu starten nach Anmeldung | Session bleibt erhalten |
| T05 | Abmelden | Benutzer kommt zur Anmeldung zurueck |
| T06 | Pflanze erfassen | Pflanze erscheint in der Pflanzenliste |
| T07 | Pflanze bearbeiten | Detailansicht zeigt aktualisierte Daten |
| T08 | Pflanze loeschen | Pflanze verschwindet aus der Liste |
| T09 | Foto hinzufuegen | Foto erscheint im Fotoverlauf und als Vorschau |
| T10 | Foto oeffnen, zoomen und loeschen | Foto wird angezeigt, Zoom funktioniert, Foto wird entfernt |
| T11 | Pflegeaufgabe erfassen | Aufgabe erscheint in der Detailansicht |
| T12 | Pflegeaufgabe erledigt markieren und loeschen | Status aendert sich sichtbar, Aufgabe kann geloescht werden |

## Offene Punkte

- APK Build erstellen
- Lokale Benachrichtigung in APK oder Development Build vollstaendig testen
- Dokumentation mit Screenshots ergaenzen
