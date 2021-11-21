# KassAapje

KassAapje is een Point-Of-Sale Applicatie bedoeld voor verenigingen zoals jeugdhuizen, studentenclubs, vzw's...
Het bevat de mogelijkheid om een vereniging aan te maken en daarbinnen meerdere kassa's te beheren (bv. een kassa voor de bar, een evenement...).

## Praktische Elementen
### Belangrijkste Functionaliteiten
* Een vereniging aanmaken (door guests)
* Een kassa aanmaken en beheren
* Catalogus raadplegen en beheren
* Opdeling in rollen
  * Vereniging Admin: Kassa's beheren, bewerkingen uitvoeren
  * Kassa Admin: Eigen kassa beheren, catalogus bewerken
  * Verkoper: Enkel dingen uit catalogus verkopen (bewerkingen voorstellen maar niet uitvoeren)
  * Penningmeester: Betalingen opvolgen binnen een bepaalde kassa
* Verschillende afrekenmogelijkheden
  * Bestelling op naam
  * Anonieme klant
* Verschillende productopties
  * Voorraad beheren?
  * nabestelling toestaan?
  * Varianten zoals maat/kleur/...
  * Verschillende prijzen per variant
* Verschillende betaalmethoden (zelf toe te voegen)
  * bv. Payconic, overschrijving, cash...
* Opvolgen van betalingen
  * Betaling op pending tot de admin bevestigd

### Technische structuur
* Frontend: Svelte
* Backend: Express (Node.js) m.b.v. GraphQL 
* Database: MariaDB
### Passwords
* Database: 
  * User: admin
  * Password: strong_password
* Frontend
  * User: docent@howest.be
  * Password: P@ssw0rd
* Backend
  * User: docent@howest.be
  * Password: P@ssw0rd
## Team Verdeling
* Karel Bousson
  * Focus op backend 
* Ibe Verbeke
  * Focus op frontend

## Milestones
### Gepasseerd
22 Oktober: ER-Diagram + Design in XD + Trello-Board

29 Oktober: Basic routes in backend (CRUD-acties) + First layout frontend

👎 Niet gelukt, lastiger dan voorspeld: lessenachterstand Karel etc.

7 November: Te bepalen afhankelijk van voortgang

ℹ STATUS 21/11:
- 🅱 Alle entities aangemaakt in de backend en GraphQL toegevoegd. Je kan al organisaties ophalen.
- 💻 Design in XD, nog niet af.

### Nog te komen
8 December: Versie 1 app af (MVP)
## ER Diagram
![ER-diagram](https://github.com/BoussonKarel/KassAapje/blob/main/documentation/img/KassAapje.drawio.png)




