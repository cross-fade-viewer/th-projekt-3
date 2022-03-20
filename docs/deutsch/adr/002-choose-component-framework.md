# Auswahl eines Komponenten-fähigen Frameworks für die erste Veröffentlichung

Datum: 08.12.2021

## Einleitung

* Zusammenfassung
* Diskussion (Kontext)
* Entscheidung
* Auswirkungen

## Spezifikationen ##

* Zusammenfassung
  * Im Kontext der Veröffentlichung unserer Komponente<br>
    in Betrachtung der möglichen Web-Frameworks mit Komponenten-Struktur<br>
    haben wir uns entschieden mit Vue zu beginnen<br>
    um die Komponente ohne großen Aufwand für alle Vue AnwenderInnen zu Verfügung zu stellen<br>
    unter Inkaufnahme, dass andere Frameworks vorerst nicht unterstützt werden.
* Diskussion (Kontext)
  * Es bestehen mehrere Möglichkeiten, unsere Komponente zu veröffentlichen. Als...
    * Vue-Komponente
    * React-Komponente
    * Angular-Komponente
    * Svelte-Komponente
    * Web-Komponente (Vanilla JS Web Components)
  * Das Ziel ist es, die Komponente für möglichst alle verbreiteten Frameworks / Technologien zu implementieren.
* Entscheidung
  * Die Entscheidung fiel auf Vue, da bereits Expertise im Team besteht und die ursprüngliche Implementation aus Projekt 2 ebenfalls in Vue entwickelt wurde. 
  * In Zukunft soll durch den Open Source Ansatz jede/r an der Implementierungen für andere Technologiestacks mitwirken können.
* Auswirkungen
  * Vorerst liegt der Fokus ausschließlich auf der Implementation in Vue.
  * Erst im Anschluss wird eine Implementation als Web Component (Technologie-übergreifend) angestrebt.
