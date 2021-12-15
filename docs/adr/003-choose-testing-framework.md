# ADR Entscheidung für die Qualitätssicherung

## Einleitung

* Zusammenfassung
* Diskussion (Kontext)
* Entscheidung
* Auswirkungen

## Spezifikationen

### Zusammenfassung
Im Kontext der **Qualitätssicherung des Codes**<br>
in Betrachtung von **Testverfahren**<br>
haben wir uns für **Jest** entschieden<br>
um eine **stabilere Codequalität** zu erreichen.

### Diskussion (Kontext)
Unit-Tests:
* Wir möchten die Qualität unseres Code sicherstellen und Bugs vorbeugen. Hierfür möchten wir Unit-Tests einsetzen.
* Mögliche Bibliotheken sind: Jasmine, Ava, Karma, Mocha/Chai oder Jest.
* Tests-Frameworks in Vue.js-Ökosystem sind: Jest und Mocha/chai

Component-Tests:
* Wir möchten die Vue Components ganzheitlich testen.
* Hierfür bietet Vue eine eigene Test-Bibliothek an, die auf Barrierefreiheit achtet und Refactoring erleichtert: Vue-Testing-Library

Integrationstests:
* Um sicher zu stellen, dass das Backend korrekt mit dem Frontend kommuniziert werden wir Integrationstests verfassen.
* Auch hier werden wir Jest verwenden.

UI-Tests:
* Zunächst wird die UI manuell getestet, da wir noch nicht festlegen können welche UI-Elemente regelmäßig getestet werden müssen und automatisierte UI-Tests sehr zeitaufwendig sind.

### Entscheidung
* Wegen der guten Lesbarkeit der Testsyntax haben wir uns für Jest entschieden. 
* Wir möchten außerdem Test Driven Development in der Entwicklung neuer Features nach Möglichkeit praktizieren.

### Auswirkungen
* ausstehend.
