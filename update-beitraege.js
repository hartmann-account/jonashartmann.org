#!/usr/bin/env node

/**
 * Dieses Script aktualisiert automatisch die index.json Datei
 * basierend auf allen Markdown-Dateien im Beiträge-Verzeichnis.
 * 
 * Verwendung: node update-beitraege.js
 */

const fs = require('fs');
const path = require('path');

const beitraegeDir = path.join(__dirname, 'beitraege');
const indexPath = path.join(beitraegeDir, 'index.json');

// Metadaten aus Markdown extrahieren
function extrahiereMetadaten(markdown, dateiname) {
  const zeilen = markdown.split('\n');
  let titel = 'Unbenannter Beitrag';
  let datum = new Date().toISOString().split('T')[0];
  let beschreibung = '';
  
  // Titel extrahieren (erste H1 Überschrift)
  for (const zeile of zeilen) {
    if (zeile.startsWith('# ')) {
      titel = zeile.substring(2).trim();
      break;
    }
  }
  
  // Datum extrahieren (suche nach *Datum: ...)
  const datumMatch = markdown.match(/\*Datum:\s*(.+?)\*/);
  if (datumMatch) {
    const datumText = datumMatch[1].trim();
    // Versuche deutsches Datum zu parsen (z.B. "21. Juli 2025")
    const deutschMatch = datumText.match(/(\d{1,2})\.\s*(\w+)\s*(\d{4})/);
    if (deutschMatch) {
      const monate = {
        'Januar': '01', 'Februar': '02', 'März': '03', 'April': '04',
        'Mai': '05', 'Juni': '06', 'Juli': '07', 'August': '08',
        'September': '09', 'Oktober': '10', 'November': '11', 'Dezember': '12'
      };
      const tag = deutschMatch[1].padStart(2, '0');
      const monat = monate[deutschMatch[2]] || '01';
      const jahr = deutschMatch[3];
      datum = `${jahr}-${monat}-${tag}`;
    } else if (datumText.match(/\d{4}-\d{2}-\d{2}/)) {
      // ISO-Format bereits vorhanden
      datum = datumText;
    }
  }
  
  // Beschreibung extrahieren (erster Absatz nach Titel und Datum)
  const inhaltOhneTitel = markdown
    .replace(/^#\s+.+$/m, '')
    .replace(/\*Datum:.+?\*/, '')
    .trim();
  
  const erstesAbsatzMatch = inhaltOhneTitel.match(/^(.+?)(\n\n|$)/s);
  if (erstesAbsatzMatch) {
    let beschreibungText = erstesAbsatzMatch[1]
      .replace(/[\*_#\[\]]/g, '')
      .trim();
    
    if (beschreibungText.length > 150) {
      beschreibungText = beschreibungText.substring(0, 147) + '...';
    }
    beschreibung = beschreibungText;
  }
  
  return {
    datei: dateiname,
    titel: titel,
    datum: datum,
    beschreibung: beschreibung
  };
}

// Hauptfunktion
function aktualisiereIndex() {
  console.log('Aktualisiere Beiträge-Index...\n');
  
  // Stelle sicher, dass das Beiträge-Verzeichnis existiert
  if (!fs.existsSync(beitraegeDir)) {
    console.error('Fehler: Beiträge-Verzeichnis existiert nicht!');
    process.exit(1);
  }
  
  // Lese alle Markdown-Dateien
  const dateien = fs.readdirSync(beitraegeDir)
    .filter(datei => datei.endsWith('.md') && datei !== 'README.md');
  
  console.log(`Gefundene Beiträge: ${dateien.length}`);
  
  const beitraege = [];
  
  // Verarbeite jede Markdown-Datei
  dateien.forEach(datei => {
    try {
      const inhalt = fs.readFileSync(path.join(beitraegeDir, datei), 'utf8');
      const metadaten = extrahiereMetadaten(inhalt, datei);
      beitraege.push(metadaten);
      console.log(`✓ ${datei}: "${metadaten.titel}"`);
    } catch (error) {
      console.error(`✗ Fehler bei ${datei}: ${error.message}`);
    }
  });
  
  // Sortiere nach Datum (neueste zuerst)
  beitraege.sort((a, b) => new Date(b.datum) - new Date(a.datum));
  
  // Schreibe index.json
  try {
    fs.writeFileSync(indexPath, JSON.stringify(beitraege, null, 2));
    console.log(`\n✓ index.json erfolgreich aktualisiert mit ${beitraege.length} Beiträgen`);
  } catch (error) {
    console.error(`✗ Fehler beim Schreiben der index.json: ${error.message}`);
    process.exit(1);
  }
}

// Script ausführen
aktualisiereIndex();