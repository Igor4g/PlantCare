# PlantCare Testprotokoll

Dieses Testprotokoll basiert auf dem geplanten Testplan aus der PlantCare-Dokumentation. Die Tests sollen zuerst in Expo Go geprüft werden. Die lokale Benachrichtigung soll zusätzlich im APK geprüft werden.

Tester: Igor  
Gerät: Android Smartphone  
Datum: offen  
App-Version: 1.0.0  

## Testfälle

| ID | Testfall | Schritte | Erwartetes Resultat | Effektives Resultat | Status |
| --- | --- | --- | --- | --- | --- |
| T01 | Registrierung | App öffnen, Registrierung öffnen, gültige E-Mail und Passwort eingeben | Benutzerkonto wird erstellt und Benutzer kommt zur Pflanzenliste | offen | offen |
| T02 | Login gültig | Bestehende E-Mail und korrektes Passwort eingeben | Benutzer wird angemeldet und sieht seine Pflanzenliste | offen | offen |
| T03 | Login ungültig | Falsches Passwort eingeben | Fehlermeldung wird angezeigt, Benutzer bleibt auf Anmeldung | offen | offen |
| T04 | Logout | Auf Logout-Icon drücken, Dialog bestätigen | Benutzer wird abgemeldet und kommt zur Anmeldung | offen | offen |
| T05 | Pflanze erstellen | Neue Pflanze mit Name, Art und Notiz erfassen | Pflanze wird gespeichert und in der Pflanzenliste angezeigt | offen | offen |
| T06 | Pflichtfelder prüfen | Pflanze ohne Namen speichern | App zeigt Fehlermeldung und speichert keinen ungültigen Eintrag | offen | offen |
| T07 | Foto hinzufügen | Pflanzendetail öffnen und neues Foto aufnehmen oder auswählen | Foto wird der Pflanze zugeordnet und im Fotoverlauf angezeigt | offen | offen |
| T08 | Wachstumsverlauf anzeigen | Mehrere Fotos zu einer Pflanze speichern | Fotos werden chronologisch im Detail-Screen angezeigt | offen | offen |
| T09 | Pflegeaufgabe erstellen | Aufgabe Giessen, Düngen oder Umtopfen mit Datum erfassen | Aufgabe wird gespeichert und bei der Pflanze angezeigt | offen | offen |
| T10 | Erinnerung prüfen | Pflegeaufgabe mit naher Erinnerung im APK erstellen | Lokale Benachrichtigung wird zum geplanten Zeitpunkt angezeigt | offen | offen |
| T11 | Persistenz prüfen | App schliessen und neu öffnen | Gespeicherte Pflanzen, Fotos und Aufgaben sind weiterhin vorhanden | offen | offen |
| T12 | Benutzerdaten trennen | Mit Benutzer A und Benutzer B anmelden | Jeder Benutzer sieht nur seine eigenen Pflanzen und Aufgaben | offen | offen |

## Zusatztests

| ID | Testfall | Schritte | Erwartetes Resultat | Effektives Resultat | Status |
| --- | --- | --- | --- | --- | --- |
| Z01 | Pflanze bearbeiten | Pflanze ändern und zur Detailansicht zurückkehren | Neue Daten sind sichtbar | offen | offen |
| Z02 | Pflanze löschen | Pflanze löschen und Dialog bestätigen | Pflanze verschwindet aus der Liste | offen | offen |
| Z03 | Foto öffnen und zoomen | Foto im Fotoverlauf antippen und mit zwei Fingern zoomen | Foto öffnet sich, Zoom funktioniert und setzt zurück | offen | offen |
| Z04 | Foto löschen | Foto öffnen und löschen bestätigen | Foto wird aus dem Verlauf entfernt | offen | offen |
| Z05 | Pflegeaufgabe bearbeiten | Aufgabe öffnen, Typ oder Datum ändern | Geänderte Aufgabe wird angezeigt | offen | offen |
| Z06 | Pflegeaufgabe erledigen | Aufgabe als erledigt markieren | Status wird sichtbar auf erledigt gesetzt | offen | offen |
| Z07 | KI-Pflanzenerkennung | Foto einer Pflanze analysieren | KI gibt eine verständliche Antwort ohne Markdown-Zeichen | offen | offen |
| Z08 | KI-Verlauf | KI-Erkennung speichern und Screen erneut öffnen | Gespeicherte Erkennung bleibt sichtbar | offen | offen |

## Hinweise Zum Testen

- Expo Go reicht für die meisten Tests.
- Die lokale Benachrichtigung muss im APK geprüft werden.
- Vibration nach dem Speichern einer Pflegeaufgabe kann auch in Expo Go geprüft werden.
- Für KI-Tests muss `EXPO_PUBLIC_NVIDIA_API_KEY` lokal gesetzt sein.
- Für Benutzertrennung müssen mindestens zwei Testkonten verwendet werden.
