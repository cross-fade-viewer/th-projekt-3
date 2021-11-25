# ADR Wahl des Package-Management Systems

Datum: 25.11.2021

## Einleitung

* Zusammenfassung
* Diskussion (Kontext)
* Entscheidung
* Auswirkungen

## Spezifikationen ##

* Zusammenfassung
    * Im Kontext der **Veröffentlichung der Komponente** <br>
      damit die Komponente **leicht zu finden und einzubauen ist** <br>
      haben wir uns entschieden **npm** zu verwenden <br>
      da **VUE selbst besser mit npm funktioniert**<br>
      unter Inkaufnahme **einer längeren Installation der Dependencies**.
* Diskussion (Kontext)
  * Wir haben uns Yarn und npm angesehen und sind zu dem Schluss gekommen, dass sie sich sehr ähnlich sind.
  * Abgesehen davon haben wir andere populäre Package-Management Systeme wie pnpm und homebrew betrachtet.
  * VUE selbst empfehlen für ihre Framework-Installation **npm**.
   
* Entscheidung
  * Wir haben uns für npm entschieden, weil es **für VUE empfohlen und sehr verbreitet ist**.
