# PlantCare Testprotokoll

Dieses Testprotokoll basiert auf dem geplanten Testplan aus der PlantCare-Dokumentation. Die Tests wurden mit dem installierten APK auf einem Android Smartphone durchgeführt.

## Testangaben

- Tester: Igor
- Gerät: Android Smartphone, Samsung mit OneUI
- Datum: 27.06.2026
- App-Version: 1.0.0
- Build: APK mit EAS Preview Build

## Zusammenfassung

- Geplante Testfälle: 12
- Zusatztests: 8
- Bestanden: 20
- Nicht bestanden: 0
- Ergebnis: Die geplanten Grundfunktionen funktionieren im APK.

## Geplante Testfälle

### T01 - Registrierung

- Schritte: App öffnen, Registrierung öffnen, gültige E-Mail und Passwort eingeben.
- Erwartetes Resultat: Benutzerkonto wird erstellt und Benutzer kommt zur Pflanzenliste.
- Effektives Resultat: Benutzerkonto wurde erstellt und die Pflanzenliste wurde angezeigt.
- Status: Bestanden

### T02 - Login gültig

- Schritte: Bestehende E-Mail und korrektes Passwort eingeben.
- Erwartetes Resultat: Benutzer wird angemeldet und sieht seine Pflanzenliste.
- Effektives Resultat: Anmeldung war erfolgreich und die eigene Pflanzenliste wurde angezeigt.
- Status: Bestanden

### T03 - Login ungültig

- Schritte: Falsches Passwort eingeben.
- Erwartetes Resultat: Fehlermeldung wird angezeigt, Benutzer bleibt auf der Anmeldung.
- Effektives Resultat: Fehlermeldung wurde angezeigt und der Benutzer blieb auf der Anmeldung.
- Status: Bestanden

### T04 - Logout

- Schritte: Auf Logout-Icon drücken und Dialog bestätigen.
- Erwartetes Resultat: Benutzer wird abgemeldet und kommt zur Anmeldung.
- Effektives Resultat: Benutzer wurde abgemeldet und kam zur Anmeldung zurück.
- Status: Bestanden

### T05 - Pflanze erstellen

- Schritte: Neue Pflanze mit Name, Art und Notiz erfassen.
- Erwartetes Resultat: Pflanze wird gespeichert und in der Pflanzenliste angezeigt.
- Effektives Resultat: Pflanze wurde gespeichert und in der Liste angezeigt.
- Status: Bestanden

### T06 - Pflichtfelder prüfen

- Schritte: Pflanze ohne Namen speichern.
- Erwartetes Resultat: App zeigt Fehlermeldung und speichert keinen ungültigen Eintrag.
- Effektives Resultat: Fehlermeldung wurde angezeigt und kein ungültiger Eintrag wurde gespeichert.
- Status: Bestanden

### T07 - Foto hinzufügen

- Schritte: Pflanzendetail öffnen und neues Foto aufnehmen oder auswählen.
- Erwartetes Resultat: Foto wird der Pflanze zugeordnet und im Fotoverlauf angezeigt.
- Effektives Resultat: Foto wurde gespeichert und im Fotoverlauf angezeigt.
- Status: Bestanden

### T08 - Wachstumsverlauf anzeigen

- Schritte: Mehrere Fotos zu einer Pflanze speichern.
- Erwartetes Resultat: Fotos werden chronologisch im Detail-Screen angezeigt.
- Effektives Resultat: Mehrere Fotos wurden chronologisch im Detail-Screen angezeigt.
- Status: Bestanden

### T09 - Pflegeaufgabe erstellen

- Schritte: Aufgabe Giessen, Düngen oder Umtopfen mit Datum erfassen.
- Erwartetes Resultat: Aufgabe wird gespeichert und bei der Pflanze angezeigt.
- Effektives Resultat: Aufgabe wurde gespeichert und bei der Pflanze angezeigt.
- Status: Bestanden

### T10 - Erinnerung prüfen

- Schritte: Pflegeaufgabe mit naher Erinnerung im APK erstellen.
- Erwartetes Resultat: Lokale Benachrichtigung wird zum geplanten Zeitpunkt angezeigt.
- Effektives Resultat: Lokale Benachrichtigung wurde zum geplanten Zeitpunkt angezeigt.
- Status: Bestanden

### T11 - Persistenz prüfen

- Schritte: App schliessen und neu öffnen.
- Erwartetes Resultat: Gespeicherte Pflanzen, Fotos und Aufgaben sind weiterhin vorhanden.
- Effektives Resultat: Gespeicherte Daten waren nach dem Neustart weiterhin vorhanden.
- Status: Bestanden

### T12 - Benutzerdaten trennen

- Schritte: Mit Benutzer A und Benutzer B anmelden.
- Erwartetes Resultat: Jeder Benutzer sieht nur seine eigenen Pflanzen und Aufgaben.
- Effektives Resultat: Jeder Benutzer sah nur seine eigenen Daten.
- Status: Bestanden

## Zusatztests

### Z01 - Pflanze bearbeiten

- Schritte: Pflanze ändern und zur Detailansicht zurückkehren.
- Erwartetes Resultat: Neue Daten sind sichtbar.
- Effektives Resultat: Geänderte Daten wurden direkt angezeigt.
- Status: Bestanden

### Z02 - Pflanze löschen

- Schritte: Pflanze löschen und Dialog bestätigen.
- Erwartetes Resultat: Pflanze verschwindet aus der Liste.
- Effektives Resultat: Pflanze wurde gelöscht und war nicht mehr in der Liste sichtbar.
- Status: Bestanden

### Z03 - Foto öffnen und zoomen

- Schritte: Foto im Fotoverlauf antippen und mit zwei Fingern zoomen.
- Erwartetes Resultat: Foto öffnet sich, Zoom funktioniert und setzt zurück.
- Effektives Resultat: Foto öffnete sich, Zoom funktionierte und wurde nach dem Loslassen zurückgesetzt.
- Status: Bestanden

### Z04 - Foto löschen

- Schritte: Foto öffnen und löschen bestätigen.
- Erwartetes Resultat: Foto wird aus dem Verlauf entfernt.
- Effektives Resultat: Foto wurde aus dem Verlauf entfernt.
- Status: Bestanden

### Z05 - Pflegeaufgabe bearbeiten

- Schritte: Aufgabe öffnen, Typ oder Datum ändern.
- Erwartetes Resultat: Geänderte Aufgabe wird angezeigt.
- Effektives Resultat: Geänderte Aufgabe wurde angezeigt.
- Status: Bestanden

### Z06 - Pflegeaufgabe erledigen

- Schritte: Aufgabe als erledigt markieren.
- Erwartetes Resultat: Status wird sichtbar auf erledigt gesetzt.
- Effektives Resultat: Aufgabe wurde sichtbar als erledigt markiert.
- Status: Bestanden

### Z07 - KI-Pflanzenerkennung

- Schritte: Foto einer Pflanze analysieren.
- Erwartetes Resultat: KI gibt eine verständliche Antwort ohne Markdown-Zeichen.
- Effektives Resultat: KI-Antwort war verständlich und ohne sichtbare Markdown-Zeichen.
- Status: Bestanden

### Z08 - KI-Verlauf

- Schritte: KI-Erkennung speichern und Screen erneut öffnen.
- Erwartetes Resultat: Gespeicherte Erkennung bleibt sichtbar.
- Effektives Resultat: Gespeicherte Erkennung war nach erneutem Öffnen sichtbar.
- Status: Bestanden
