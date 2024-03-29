# Projekt III: Crossfade Image Viewer

Aufbauend auf der Vision &amp; Konzept, sowie eines "minimal viable product" vorangegangener Semester, soll in diesem Projekt eine Auswertung bzw. Verwertung stattfinden. Dabei kann die Auswertung bzw. Verwertung verschiedenes umfassen, wie eine Evaluation, Weiterentwicklung in Richtung Produktreife, Hinarbeiten auf eine Forschungsveröffentlichung oder für die Open Source Community.  Das Projekt besteht aus zwei Teilen: Einem Projektanteil (6 CP) der vom jeweiligen Projectowner geleitet wird und einem Vertiefungsworkshop (6 CP), der zu Beginn des Semesters in Absprache mit dem Projectowner, Prof. Noss, gewählt wird. Nähere Informationen dazu finden sich auch weiter unten im jeweiligen Projekt- bzw. Semesterordner bei Ilias.

-----------------

**Inhaltsübersicht**
- [Projekt III: Cranach Cross-Fade (CCF)](#projekt-iii-cranach-cross-fade-ccf)
  - [Dokumentation](#dokumentation)
  - [Starten des CCF-Moduls](#starten-des-ccf-moduls)
  - [Contribute](#contribute)
    - [Termine](#termine)
  - [Das Team](#das-team)
  - [Projekt Beschreibung](#projekt-beschreibung)

## Prototyp
Der aus Projekt I entstandende [Prototyp](https://www.figma.com/proto/Jbh4haqz3FP7IPj9vuxtBG/WTW2-Prototyp?node-id=24%3A29&scaling=scale-down) dient als Basis für dieses Projekt.


## Dokumentation
Eine detaillierte Dokumentation der einzelnen Projektergebnisse, Entscheidungen und Standards findest du unter [/docs](./docs) auf Deutsch oder auf Englisch.


## Starten des Projektes
Führe für den Start des Projektes folgende Schritte aus:

```bash
# 1. Repository klonen
git clone https://github.com/yannic-bruegger/th-projekt-3.git <Ziel-Verzeichnis>

# 2. In das lokale Repository navigieren
cd <Ziel-Verzeichnis>
```

Um die Vue-Componente zu starten führe im Anschluss folgende Befehle durch:

```
cd vue-component
npm install
npm run serve
```

Öffne anschließend einen Browser deiner Wahl und navigiere zu [`http://localhost:8080/`](http://localhost:8080/)

### Implementierung der Vue-Komponente

Um die Komponente im eigenen Projekt verwenden zu können, muss eine [Vue](https://vuejs.org/)-App aufgesetzt und in die jeweilige Seite eingebaut werden. Darin kann die Komponente eingesetzt werden.

Hierfür muss die [Vue.js](https://awesomejs.dev/for/vue/pkg/245043713989935618/) Bibliothek als Dependency eingefügt und installiert werden.

## Contribute
Möchtest du an dem Projekt mitwirken, empfehlen wir dir Kontakt zum [Projektteam](#das-team) aufzunehmen. Alle benötigen Anleitungen und Beschreibungen der Standards, auf die wir uns im Team geeinigt haben, findest du im  [/docs](./docs) Verzeichnis auf Deutsch oder auf Englisch. 

### Termine

Link zum Zoom-Meeting: Informationen auf Anfrage<br>

[Link zum Miro-Board](https://miro.com/app/board/o9J_lFjTo04=/)<br>


**Jeweils erste Sprintwoche:**

| Format | 🕔 | Agenda |
|--------|----|-------|
| Weekly (Standup) | jeden Mittwoch 13:00 bis 13:15 |<ul><li>Absprache mit dem Team zum Status der Arbeit & des Sprintziels </li><li> ggf. Paarbildung und Kalenderabgleich </li></ul> |
| Issue Refinement | jede zweite Woche |<ul><li>Betrachtung des Backlogs</li><li>(Re-)priorisierung der Issues & Aufwandsschätzung</li></ul> |


**Jeweils zweite Sprintwoche:**

| Format | 🕔 | Agenda |
|--------|----|-------|
| Review | jede zweite Woche | <ul><li>Live Demo des aktuellen Stands des Projekts</li><li>Backlog betrachten: Alles vorgesehene abgeschlossen? Haben wir das Sprintziel erreicht?</li><li>Aufwände abgleichen: Haben unsere Schätzungen gepasst?</li></ul> |
| Sprint Planning | jede zweite Woche | <ul><li>Prüfung der Teamauslastung im neuen Sprint</li><li>Backlog: Welche Issues nehmen wir diesen Sprint mit?</li><li>Zuordnung der Issue-Verantwortlichen</li><li>Kurzes Weekly: Absprache des Teams</li></ul> |
| Retro | jede zweite Woche | Was lief gut? Was ließe sich verbessern? Welche Ideen & Actions wollen wir einbringen? |

## Das Team

| Profil | Name | GitHub | Rolle |
|-|------|--------|------|
| ![](https://avatars.githubusercontent.com/u/38219697?s=60&v=4) | Rebecca Mieth | [rebeccamieth](https://github.com/rebeccamieth) |Documentory, Developer |
| ![](https://avatars.githubusercontent.com/u/73938534?s=60&v=4) | Shabnam Ramzani | [Shabnamramzani](https://github.com/Shabnamramzani) | Facilitator, Documentory und Developer |
| ![](https://avatars.githubusercontent.com/u/53353537?s=60&v=4) | Valeria Orlova | [vorlova](https://github.com/Vorlova) | Developer |
| ![](https://avatars.githubusercontent.com/u/36576062?s=60&v=4) | Yannic Brügger | [yannic-bruegger](https://github.com/yannic-bruegger) | Developer |
| ![](https://avatars.githubusercontent.com/u/73645605?s=60&v=4) | Yavar Siahmakishahri | [y4v4r](https://github.com/y4v4r) | Developer |


