/*
 * Die Asset-Version steht nur als Worker-Binding zur Verfuegung, die
 * Layout-Komponente hat aber keinen Zugriff auf env. Sie wird deshalb einmal
 * pro Request in dieses Modul geschrieben - der Wert ist fuer eine
 * Deployment-Version konstant, nebenlaeufige Requests schreiben also immer
 * denselben Wert.
 */
let assetVersion = "1";

export function setAssetVersion(v?: string) {
  if (v) assetVersion = v;
}

export function getAssetVersion() {
  return assetVersion;
}
