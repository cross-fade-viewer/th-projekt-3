# Decide which test framework to use for core functionality

## Einleitung

* Zusammenfassung
* Diskussion (Kontext)
* Entscheidung
* Auswirkungen

## Spezifikationen

### Zusammenfassung
Im Kontext der **Qualitätssicherung des Codes**<br>
in Betrachtung von **Testframeworks**<br>
haben wir uns für **Deno Tests** entschieden<br>
um eine **höhere Codequalität** zu erreichen.

### Diskussion (Kontext)
* Wir möchten die Qualität unseres Codes besonders für die Kernfunktionalitäten sicherstellen und Bugs vorbeugen. Hierfür möchten wir Unit-Tests einsetzen.
* Mögliche Bibliotheken sind: Jasmine, Ava, Karma, Mocha/Chai, Jest, Deno.
* Da wir uns bei den Kern-Funktionen nicht im Vue.js-Ökosystem befinden, können auch dem Ökosystem fremde Frameworks genutzt werden.

### Entscheidung
* Wegen der guten Lesbarkeit der Testsyntax (ähnlich zu Jest) haben wir uns für Deno Tests entschieden. 
* Jest würde ein Node-Projekt benötigen, was das Core-Verzeichnis entsprechend mit überflüssigen Dateien und Ordnern füllen würde.
* Deno Tests bauen auf der JS/TS-Laufzeitumgebung Deno auf. Sie verzichten komplett auf einen projektinternen Dependency-Ordner. So bleibt das Core-Verzeichnis sehr aufgeräumt.

### Auswirkungen
* Es lassen sich automatisierte Tests für alle Kernfunktionen implementieren.
* Diese Tests können gemeinsam mit den Jest-Tests der Vue-Komponente durch GitHub Workflows ausgeführt werden um eine hohe Branch-Qualität zu erhalten. 
