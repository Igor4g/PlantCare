# Supabase Setup

PlantCare verwendet Supabase als erlaubte Alternative zu Firebase. Supabase übernimmt Authentifizierung, persistente Speicherung und Benutzertrennung.

## Authentifizierung

Verwendet wird Supabase Auth mit E-Mail und Passwort. Die Benutzer-ID aus `auth.users.id` wird in den App-Tabellen als `benutzer_id` gespeichert.

## Tabellen

### pflanzen

| Spalte | Typ | Zweck |
| --- | --- | --- |
| id | uuid | Primärschlüssel |
| benutzer_id | uuid | Besitzer der Pflanze |
| name | text | Pflanzenname |
| pflanzenart | text | Art der Pflanze |
| notizen | text | Notizen |
| letztes_foto_uri | text | Vorschau-Foto |
| naechste_pflege_am | timestamptz | nächste offene Pflegeaufgabe |
| erstellt_am | timestamptz | Erstellungszeitpunkt |
| aktualisiert_am | timestamptz | letzter Änderungszeitpunkt |

### fotos

| Spalte | Typ | Zweck |
| --- | --- | --- |
| id | uuid | Primärschlüssel |
| pflanze_id | uuid | Zugehörige Pflanze |
| benutzer_id | uuid | Besitzer des Fotos |
| lokaler_pfad | text | lokaler Bildpfad |
| notiz | text | optionale Notiz |
| erstellt_am | timestamptz | Erstellungszeitpunkt |

### pflegeaufgaben

| Spalte | Typ | Zweck |
| --- | --- | --- |
| id | uuid | Primärschlüssel |
| pflanze_id | uuid | Zugehörige Pflanze |
| benutzer_id | uuid | Besitzer der Aufgabe |
| typ | text | Giessen, Düngen oder Umtopfen |
| erinnerung_am | timestamptz | Datum und Zeit der Erinnerung |
| wiederholung | text | täglich, wöchentlich oder monatlich |
| erledigt | boolean | Status der Aufgabe |
| notification_id | text | ID der lokalen Benachrichtigung |
| erstellt_am | timestamptz | Erstellungszeitpunkt |

### ki_erkennungen

| Spalte | Typ | Zweck |
| --- | --- | --- |
| id | uuid | Primärschlüssel |
| benutzer_id | uuid | Besitzer der KI-Erkennung |
| foto_pfad | text | lokaler Bildpfad |
| foto_base64 | text | Bilddaten für Anzeige im Verlauf |
| antwort | text | Antwort der KI |
| modell | text | verwendetes KI-Modell |
| erstellt_am | timestamptz | Erstellungszeitpunkt |

## SQL Für KI-Erkennungen

Falls die Tabelle `ki_erkennungen` noch nicht existiert:

```sql
create table public.ki_erkennungen (
  id uuid primary key default gen_random_uuid(),
  benutzer_id uuid not null references auth.users(id) on delete cascade,
  foto_pfad text,
  foto_base64 text,
  antwort text not null,
  modell text,
  erstellt_am timestamptz not null default now()
);

alter table public.ki_erkennungen enable row level security;

create policy "Benutzer sehen eigene KI-Erkennungen"
on public.ki_erkennungen
for select
to authenticated
using (auth.uid() = benutzer_id);

create policy "Benutzer speichern eigene KI-Erkennungen"
on public.ki_erkennungen
for insert
to authenticated
with check (auth.uid() = benutzer_id);

grant select, insert, update, delete on public.ki_erkennungen to authenticated;
```

## Erwartete RLS-Regeln

Für alle benutzerbezogenen Tabellen soll Row Level Security aktiviert sein. Jeder Benutzer darf nur eigene Daten lesen und schreiben.

Beispiel für `pflanzen`:

```sql
alter table public.pflanzen enable row level security;

create policy "Benutzer lesen eigene Pflanzen"
on public.pflanzen
for select
to authenticated
using (auth.uid() = benutzer_id);

create policy "Benutzer erstellen eigene Pflanzen"
on public.pflanzen
for insert
to authenticated
with check (auth.uid() = benutzer_id);

create policy "Benutzer ändern eigene Pflanzen"
on public.pflanzen
for update
to authenticated
using (auth.uid() = benutzer_id)
with check (auth.uid() = benutzer_id);

create policy "Benutzer löschen eigene Pflanzen"
on public.pflanzen
for delete
to authenticated
using (auth.uid() = benutzer_id);
```

Die gleichen Regeln sollen sinngemäss auch für `fotos`, `pflegeaufgaben` und `ki_erkennungen` gelten.

## Sicherheit

- `.env` wird nicht ins Repository geladen.
- Supabase Publishable Key ist für Client-Apps vorgesehen.
- Der NVIDIA API-Key ist für diese Schulprojekt-Version lokal in `.env`.
- Für eine produktive App sollte der NVIDIA API-Key über einen Backend-Proxy geschützt werden.
