#!/usr/bin/env bash
# Gera o IronMeridian-Prism.zip (instância pronta para importar no Prism Launcher)
# a partir do modelo em release/instance/. Não inclui nenhum mod: na primeira
# abertura, o packwiz-installer-bootstrap baixa tudo do GitHub.
#
# Uso: scripts/build-instance-zip.sh [saida.zip]
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="${1:-$ROOT/dist/IronMeridian-Prism.zip}"
BOOTSTRAP_URL="https://github.com/packwiz/packwiz-installer-bootstrap/releases/latest/download/packwiz-installer-bootstrap.jar"

WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT
INST="$WORK/Iron Meridian"
mkdir -p "$INST/minecraft"
cp "$ROOT/release/instance/instance.cfg" "$ROOT/release/instance/mmc-pack.json" "$INST/"
curl -fsSL -o "$INST/minecraft/packwiz-installer-bootstrap.jar" "$BOOTSTRAP_URL"
unzip -tq "$INST/minecraft/packwiz-installer-bootstrap.jar" >/dev/null

mkdir -p "$(dirname "$OUT")"
rm -f "$OUT"
(cd "$WORK" && zip -qr "$OUT" "Iron Meridian")
echo "Gerado: $OUT"
