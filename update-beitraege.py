#!/usr/bin/env python3

"""
Dieses Script aktualisiert automatisch die index.json Datei
basierend auf allen Markdown-Dateien im Beiträge-Verzeichnis.

Verwendung: python3 update-beitraege.py
"""

import os
import json
import re
from datetime import datetime

def extrahiere_metadaten(markdown, dateiname):
    """Extrahiert Titel, Datum und Beschreibung aus einer Markdown-Datei."""
    
    zeilen = markdown.split('\n')
    titel = 'Unbenannter Beitrag'
    datum = datetime.now().strftime('%Y-%m-%d')
    beschreibung = ''
    
    # Titel extrahieren (erste H1 Überschrift)
    for zeile in zeilen:
        if zeile.startswith('# '):
            titel = zeile[2:].strip()
            break
    
    # Datum extrahieren (suche nach *Datum: ...)
    datum_match = re.search(r'\*Datum:\s*(.+?)\*', markdown)
    if datum_match:
        datum_text = datum_match.group(1).strip()
        
        # Versuche deutsches Datum zu parsen (z.B. "21. Juli 2025")
        deutsch_match = re.match(r'(\d{1,2})\.\s*(\w+)\s*(\d{4})', datum_text)
        if deutsch_match:
            monate = {
                'Januar': '01', 'Februar': '02', 'März': '03', 'April': '04',
                'Mai': '05', 'Juni': '06', 'Juli': '07', 'August': '08',
                'September': '09', 'Oktober': '10', 'November': '11', 'Dezember': '12'
            }
            tag = deutsch_match.group(1).zfill(2)
            monat = monate.get(deutsch_match.group(2), '01')
            jahr = deutsch_match.group(3)
            datum = f"{jahr}-{monat}-{tag}"
        elif re.match(r'\d{4}-\d{2}-\d{2}', datum_text):
            # ISO-Format bereits vorhanden
            datum = datum_text
    
    # Beschreibung extrahieren (erster Absatz nach Titel und Datum)
    inhalt_ohne_titel = re.sub(r'^#\s+.+$', '', markdown, flags=re.MULTILINE)
    inhalt_ohne_titel = re.sub(r'\*Datum:.+?\*', '', inhalt_ohne_titel).strip()
    
    erstes_absatz_match = re.match(r'^(.+?)(\n\n|$)', inhalt_ohne_titel, re.DOTALL)
    if erstes_absatz_match:
        beschreibung_text = erstes_absatz_match.group(1)
        # Entferne Markdown-Formatierung
        beschreibung_text = re.sub(r'[\*_#\[\]]', '', beschreibung_text).strip()
        
        if len(beschreibung_text) > 150:
            beschreibung_text = beschreibung_text[:147] + '...'
        beschreibung = beschreibung_text
    
    return {
        'datei': dateiname,
        'titel': titel,
        'datum': datum,
        'beschreibung': beschreibung
    }

def aktualisiere_index():
    """Hauptfunktion zum Aktualisieren der index.json."""
    
    print('Aktualisiere Beiträge-Index...\n')
    
    # Pfade definieren
    script_dir = os.path.dirname(os.path.abspath(__file__))
    beitraege_dir = os.path.join(script_dir, 'beitraege')
    index_path = os.path.join(beitraege_dir, 'index.json')
    
    # Stelle sicher, dass das Beiträge-Verzeichnis existiert
    if not os.path.exists(beitraege_dir):
        print('Fehler: Beiträge-Verzeichnis existiert nicht!')
        return
    
    # Lese alle Markdown-Dateien
    dateien = [f for f in os.listdir(beitraege_dir) 
               if f.endswith('.md') and f != 'README.md']
    
    print(f'Gefundene Beiträge: {len(dateien)}')
    
    beitraege = []
    
    # Verarbeite jede Markdown-Datei
    for datei in dateien:
        try:
            with open(os.path.join(beitraege_dir, datei), 'r', encoding='utf-8') as f:
                inhalt = f.read()
            
            metadaten = extrahiere_metadaten(inhalt, datei)
            beitraege.append(metadaten)
            print(f'✓ {datei}: "{metadaten["titel"]}"')
            
        except Exception as e:
            print(f'✗ Fehler bei {datei}: {str(e)}')
    
    # Sortiere nach Datum (neueste zuerst)
    beitraege.sort(key=lambda x: x['datum'], reverse=True)
    
    # Schreibe index.json
    try:
        with open(index_path, 'w', encoding='utf-8') as f:
            json.dump(beitraege, f, ensure_ascii=False, indent=2)
        print(f'\n✓ index.json erfolgreich aktualisiert mit {len(beitraege)} Beiträgen')
    except Exception as e:
        print(f'✗ Fehler beim Schreiben der index.json: {str(e)}')

if __name__ == '__main__':
    aktualisiere_index()