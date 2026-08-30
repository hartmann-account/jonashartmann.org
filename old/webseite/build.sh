#!/bin/bash

# Build-Script für Cloudflare Pages
echo "Aktualisiere Beiträge-Index..."

# Python-Version verwenden (in Cloudflare Pages verfügbar)
python3 update-beitraege.py

echo "Build abgeschlossen!"