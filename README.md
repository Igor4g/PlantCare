# PlantCare

PlantCare ist eine einfache Expo React Native App für das Modul 335.
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

Hinweis: In der ursprünglichen Planung war Firebase vorgesehen. Wegen technischen Problemen wurde im Projekt Supabase verwendet.

## Funktionen

- Registrierung
- Anmeldung
- Session bleibt nach App-Neustart erhalten
- Abmelden
- Pflanzen erfassen
- Erstes Foto beim Erfassen einer Pflanze hinzufügen
- Pflanzenliste anzeigen
- Nächste Pflegeaufgabe in der Pflanzenliste anzeigen
- Pflanzendetails anzeigen
- Pflanzen bearbeiten
- Pflanzen löschen
- Fotos mit Kamera oder Galerie hinzufügen
- Fotoverlauf anzeigen
- Fotos öffnen und zoomen
- Fotos löschen
- Pflegeaufgaben erfassen
- Wiederholung: täglich, wöchentlich, monatlich
- Pflegeaufgaben bearbeiten
- Pflegeaufgaben als erledigt oder offen markieren
- Pflegeaufgaben löschen
- Vibration nach dem Speichern einer Pflegeaufgabe
- Geplante lokale Benachrichtigungen für Pflegeaufgaben

## Sensoren und Aktoren

Sensor:

- Kamera oder Galerie ueber `expo-image-picker`

Aktor:

- Vibration nach dem Speichern einer Pflegeaufgabe
- Lokale Benachrichtigung für Pflegeerinnerungen

## Hinweis zu Expo Go

Auf Android zeigt Expo Go seit SDK 53 Einschränkungen bei `expo-notifications`.
Darum werden geplante Benachrichtigungen in Android Expo Go nicht aktiv getestet.
Die Pflegeaufgabe wird trotzdem gespeichert und die direkte Vibration funktioniert.

Für den vollständigen Test der lokalen Benachrichtigung braucht es später eine APK oder eine Development Build.

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
| T01 | Registrierung mit gültiger E-Mail und Passwort | Benutzer wird erstellt und angemeldet |
| T02 | Anmeldung mit gültigen Daten | Pflanzenliste wird angezeigt |
| T03 | Anmeldung mit falschen Daten | Fehlermeldung wird angezeigt |
| T04 | App neu starten nach Anmeldung | Session bleibt erhalten |
| T05 | Abmelden | Benutzer kommt zur Anmeldung zurück |
| T06 | Pflanze erfassen | Pflanze erscheint in der Pflanzenliste |
| T07 | Pflanze bearbeiten | Detailansicht zeigt aktualisierte Daten |
| T08 | Pflanze löschen | Pflanze verschwindet aus der Liste |
| T09 | Foto hinzufügen | Foto erscheint im Fotoverlauf und als Vorschau |
| T10 | Foto öffnen, zoomen und löschen | Foto wird angezeigt, Zoom funktioniert, Foto wird entfernt |
| T11 | Pflegeaufgabe erfassen | Aufgabe erscheint in der Detailansicht |
| T12 | Pflegeaufgabe erledigt markieren und löschen | Status ändert sich sichtbar, Aufgabe kann gelöscht werden |

## Offene Punkte

- APK Build erstellen
- Lokale Benachrichtigung in APK oder Development Build vollständig testen
- Dokumentation mit Screenshots ergänzen
