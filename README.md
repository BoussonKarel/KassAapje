# KassAapje

KassAapje is een Point-Of-Sale Applicatie bedoeld voor verenigingen zoals jeugdhuizen, studentenclubs, vzw's...
Het bevat de mogelijkheid om een vereniging aan te maken en daarbinnen meerdere kassa's te beheren (bv. een kassa voor de bar, een evenement...).

## Praktische Elementen
### Gewenste Functionaliteiten
* Een vereniging aanmaken (door guests)
* Een kassa aanmaken en beheren
* Catalogus raadplegen en beheren
* Opdeling in rollen
  * Vereniging Admin: Kassa's beheren, bewerkingen uitvoeren
  * Kassa Admin: Eigen kassa beheren, catalogus bewerken
  * Kassa Gebruiker/Verkoper: Enkel dingen uit catalogus verkopen (bewerkingen voorstellen maar niet uitvoeren)maar niet uitvoeren)
* Verschillende productopties
  * Varianten zoals maat/kleur/...
  * Verschillende prijzen per variant
  * EXTRA: Voorraad beheren?
  * EXTRA: Nabestelling toestaan?
* EXTRA: Verschillende betaalmethoden (zelf toe te voegen)
  * bv. Payconic, overschrijving, cash...
* EXTRA: Verschillende afrekenmogelijkheden
  * Bestelling op naam
  * Anonieme klant
* EXTRA: Opvolgen van betalingen
  * Betaling op pending tot de admin bevestigt

### Technische structuur
* Frontend: Svelte
* Backend: Express (Node.js)
* Database: MariaDB
* GraphQL voor API calls

### Passwords
* Database: 
  * User: admin
  * Password: strong_password
* Admin Gebruiker:
  * User: docent@howest.be
  * Password: P@ssw0rd
* Gewone Kassa gebruiker:
  * User: gebruiker@kassaapje.be
  * Password: P@ssw0rd

### IP adressen
- **Lokaal - Development**
  - Backend http://localhost:8888/
  - Frontend http://localhost:3000/
- **Schoolnetwerk - Production (k8s)**
  - Backend http://localhost:30201/
  - Adminer http://localhost:30299/
  - Frontend http://localhost:30280/

### Team Verdeling
* Karel Bousson
  * Focus op backend 
* Ibe Verbeke
  * Focus op frontend

### ER Diagram
![ER-diagram](https://github.com/BoussonKarel/KassAapje/blob/main/documentation/img/KassAapje.drawio.png)

## Milestones
### Gepasseerd
22 Oktober: ER-Diagram + Design in XD + Trello-Board
29 Oktober: Basic routes in backend (CRUD-acties) + First layout frontend
👎 Niet gelukt, lastiger dan voorspeld: lessenachterstand Karel etc.

ℹ STATUS 21/11:
- 🅱 Alle entities aangemaakt in de backend en GraphQL toegevoegd. Je kan al organisaties ophalen.
- 💻 Design in XD, nog niet af.

ℹ UPDATE 21/12:
- Backend presentatieklaar.
  - Wordt volledig automatisch op k8s gedeployed m.b.v. Github Actions.
  - Alles van de checklist voor project kan afgevinkt worden (uitgez. Rancher)
- Frontend nog een kleine ramp.
  - Uitstel gehad voor de presentatie, gezien de grote hoeveelheid werk nog na achterstand en sukkelen op bepaalde stukken van Frontend.

### Nog te komen
Week van 10 januari: presentatie
