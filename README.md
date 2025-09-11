### CLOCKWORLD av Mikael Lindstedt

I Clockworld kan du som användare kolla upp lokal tid och datum för olika städer, dels för förinställda storstäder
världen över, men du kan även lägga till egna städer om du vill. Tider visas både analogt och digitalt, du kan visa  
detaljerad vy för en stad, lägga till utvalda städer som favoriter, och ha alla dina favoriter samlade på ett ställe
så att du snabbt kommer åt dem!

# För att köra programmet:

Öppna VS Code eller annan kodeditor. I terminalen, kör:

```bash
git clone https://github.com/Bobbyloo89/CLOCKWORLD.git
cd clockworld
npm install
npm run dev
```

## Hur tänkte du när du skissade gränssnitt? Gärna länk till skisser:

_Länk till skiss:_ https://www.figma.com/design/gU9Ux3v9IMyVPLvzms60Cf/CLOCKWORLD?node-id=0-1&t=nc44XwD5mpUgcIY9-1

Jag började med att skriva alla User Stories för projektet. Dessa User Stories omvandlades till en kravspecifikation för
programmet och med tydliga krav redo började jag att, med hjälp av papper och penna, skissa lösningar för dessa. Funktionalitet
och grundläggande layout var fokus i dessa skisser. När jag kände mig nöjd med lösningarna jag skapat så öppnade jag upp Figma
och började jobba mer detaljerat med designen av mitt projekt och finslipade där jag kände att justeringar behövdes. Layout
är designad efter ledorden "enkelt och funktionellt", jag har försökt att inte överväldiga användaren med för mycket information
på skärmen samtidigt, och försökt lyfta fram de visuella element som jag rankar som "viktigast" för en bra användarupplevelse,
samtidigt som jag försökt använda mig av lösningar som användaren med stor sannolikhet är van vid från andra produkter (t.ex.
"Home"-knapp uppe till vänster, navigeringsmeny uppe till höger, "viktig" information centrerat på skärmen, osv.). Färgvalen
kommer från en artikel jag läst någonstans om att färgen orange passar bra ihop med nästan alla andra färger, och från den
grunden växte resten av designen fram.

## Hur har du valt att dela upp din applikation?

Jag har så gott jag kan, med de förkunskaper jag har, försökt följa principer för "separation of concerns" under arbetet med projektet.
/components är uppdelat i de byggstenar jag tänker att applikationen är uppbyggd av:  
/layout, som innehåller min Footer och Header som visas i alla vyer av min applikation.  
/city, som innehåller CityCard vilket är huvudbyggstenen i min applikation och är den del som visar majoriteten av "content" som sidan innehåller.  
/clock, som innehåller AnalogClock och DigitalClock, och som renderas i varje CityCard och i CityDetail-sidan.  
/form, som innehåller CountrySelect och TimezoneSelect. Dessa två komponenter hanterar logik och begränsningar för hur jag vill att
användaren ska använda sig av formuläret för att lägga till en ny stad i applikationen utan svårigheter eller risk för att fel uppstår.

/data innhåller, precis som det låter, all JSON-data jag använder mig av i applikationen.  
/cities.json är mina 20 förinlagda storstäder och har formatet:

```json
{
  "city": "Paris",
  "country": "France",
  "tz": "Europe/Paris", //IANA-format
  "featured": true
}
```

Dessa används för att visas på startsidan av applikationen via "featured", true visas på startsidan, false visas inte.

/countries.json är en lista med alla världens länder (nästan) och har formatet:

```json
{
  "name": "Afghanistan"
}
```

Den används för att populera inputfältet för Country i formuläret för att lägga till ny stad. Jag valde denna lösning dels för att underlätta
för användaren genom att ge dem en sökbar dropdown-lista med länder, men även för att säkerställa att input-värdet valideras (om input inte existerar i countries.json så godkänns det inte), och den behövs även för min lösning för input av tidszoner.

/iana_timezones.json är en lista med (nästan alla) tidszoner världen över, i IANA-format:

```json
{
  "tz": "Africa/Abidjan", //Tidszon i IANA-format
  "countries": ["Côte d'Ivoire"] // Alla länder där ovanstående tidszon används
}
```

Jag kände att tidszoner är rätt komplicerade när man börjar väga in alla olika lokala bestämmelser för sommar/vintertid och tänkte att jag
på något sätt ville dels begränsa användarens valmöjligheter för att underlätta för dem, men även för att underlätta för mig själv att validera
den tidszon-input som användaren skickar in via formuläret när de skapar en ny stad. Istället för att ha massa olika inputfält i formuläret
(generell tidszon, datum för övergång till sommartid, datum för övergång till vintertid, osv.) så ger jag användaren en enda dropdown-lista
för val av tidszon, och begränsar denna lista genom att filtrera den med hjälp av landet de valt i inputfältet för Country. Fördelen med detta
är att om man t.ex. väljer "Sweden" som Country, så visas enbart "Europe/Stockholm" i listan då alla städer i Sverige följer samma regler för sommar-/vintertid och ligger i samma tidszon. Nackdelen är att om man väljer "United States" eller annat stort land så kan man få många förslag i listan, då landet ligger i flera olika tidszoner, och dessutom har olika regler för sommar-/vintertid inom samma tidszon. Jag känner ändå att
valet blir lättare för användaren med denna lösningen, jämfört med att de ska behöva fylla massa detaljerad information för tidszon OCH lokala bestämmelser för DST.

/pages innehåller de olika routes/vyer min applikation består av:  
/Home - Startsidan, där jag visar CityCard:s för alla mina "featured" städer, och en knapp för att lägga till en ny stad (CTA!).  
/AddCity - Innehåller formuläret för att lägga till en ny stad, där användaren får skriva in namnet på staden, välja land från en lista,
välja tidszon från en lista som filtreras efter val av land, en checkbox för om man vill lägga till den nya staden som favorit, och en knapp som sparar den nya staden i localStorage och tar användaren vidare till detaljvyn för den nytillagda staden.  
/CityDetail - En detaljerad sida för vald stad med dynamisk routing via slugs (/country/city). I nuvarande version av applikationen så ser den nästan exakt likadan ut som ett CityCard, men jag använder mig inta av CityCard här då jag vill ha valmöjligheten att vidareutveckla den med mer detaljerad info i framtiden. Finns även en knapp här för att markera/avmarkera som favorit.  
/Favorites - Visar CityCard:s för alla städer användaren favoritmarkerat och en knapp för att lägga till ny stad (CTA igen!).

/types innehåller en fil med Interfaces och Types som kan komma att användas på flera olika ställen i projektet/koden (och därför inte "tillhör" en enstaka, specifik komponent) som t.ex. SeedCity:

```ts
export interface SeedCity {
  city: string;
  country: string;
  tz: FeaturedTz | string;
  img?: string;
  featured?: boolean;
}
```

SeedCity används för mina 20 förinlagda städer, men fungerar även som mall för CityLike, som är ett interface som bestämmer vilka attribut och värden en stad ska ha i min applikation.

/utils innehåller olika helpers som används i olika komponenter, t.ex. /clockAnimation beskriver hur den analoga klockan ska renderas, /slug som slugifierar lands- och stadsnamn så att de säkert och smidigt kan användas för routing, och /storage som innehåller logik för hur vi sparar och hämtar data från localStorage.

/hooks innehåller just nu bara /useTick, som ser till att alla klockor vi renderar bara "tickar" en gång varje minut istället för varje sekund eller ms, jag bestämde mig tidigt för att jag inte ville visa sekundvisaren på de analoga klockorna då jag upplevde att det var för "busy" när man visar så många klockor samtidigt på skärmen, tanken är därför att useTick ska göra sidan snabbare och mindre CPU-krävande, då vi inte har något behov av att tiden uppdateras oftare än varje hel minut. useTick skapar även ett globalt "NU" i applikationen vilket gör att alla klockor inte behöver hålla koll på systemets tid individuellt.

## Hur gick du tillväga när du använde Git, samt när du testade att programmet faktiskt fungerar som det ska?

Jag jobbade i en och samma branch men hade även en lokal kopia som jag använde för att testa större refaktoreringar i. Jag försökte att pusha upp kod till GitHub så fort jag hade ny, fullt fungerande, färdig kod, men jag har lätt för att råka hamna "in the zone" när jag kodar och när det är många rörliga delar i koden så är det lätt att jag gör färdigt en sak, som påverkar en annan sak, och då går jag direkt vidare till att jobba på den saken och glömmer att pusha upp kod. Jag kan dock säga att jag har jobbat MYCKET bättre med Git i detta projektet än jag vanligtvis gör, vilket borde synas i commit-historiken på GitHub. Så detta var väldigt bra övning för mig!  
 Jag försökte att vara tydlig i mina commit-messages och beskriva var jag gjort ändringar, vad jag har gjort för ändringar, och varför jag har gjort dessa ändringar. Hade jag jobbat i grupp så hade jag nog försökt vara ännu tydligare i mina beskrivningar, men då detta är ett individuellt projekt så har jag bara försökt vara tydlig nog för att jag själv ska förstå vad jag gjort (då minnet är bra men kort) och för att du ska kunna följa med någorlunda bra i min arbetsprocess.

Manuell testning utfördes i utvecklingsläge i Chrome:

- Testade routing: både via URL samt navigering i Header, länkar till /, /add, /favorites, samt dynamisk /:country/:city och fallback.
- Testade AddCity: tomma fält, ogiltigt land, ingen timezone, dubblettfall, lyckad/misslyckad inlämning och navigation till detaljvy.
- Testade Favorites: tom (inga favorites tillagda), att "Add Favorite/Remove Favorite"-knappen i detaljvy uppdaterar lagring och att visningen i Favorites speglar detta efter omladdning, att "Add new city"-knappen tar mig till AddCity, och att CityCard:s som visas leder till detaljvy.
- Testade burger-meny i mobilvy: öppna/stäng med knapp, Escape för att stänga, klick utanför för att stänga, fokus åter till knappen efter stängning.
- Testade klockor: olika tidszoner, datumradsformat, att digital uppdaterar per minut, att analog ritar om per minut och inte belastar CPU mer än nödvändigt.
- Testade responsivitet: övergång mellan mobilvy/desktopvy, layout med flera CityCard:s per rad på desktop och dynamisk skalning av de analoga klockorna i olika kombinationer av viewport bredd/höjd, att add-knappen placerar sig förutsägbart, att dropdowns (i header och formulär) fungerar i mobil och desktop, att text är tillräckligt tydlig och läsbar.
- Testade även appen i de olika inbyggda "mock-devices" som finns i Chromes utvecklingsläge.

## Förklara minst 3 ställen där TypeScript ger fördelar jämfört med JavaScript i din kod:

1. När man hämtar data från localStorage utan krascher (type guard) med hjälp av /storage.ts och funktionen isCityEntry och loadUserCities. TS-funktionen isCityEntry kontrollerar att varje objekt som hämtas från localStorage faktiskt har city (string), country (string), tz (string), och favorite (boolean). Då vet resten av koden att den får en "korrekt" lista med CityEntry:s vilket förhindrar krascher pga. konstig data. Man får även bättre autocompletion efter filtreringen med TS.
2. Utility types hjälper till att undvika "dubbelarbete". I t.ex. CityCard, där jag använder mig av CityLike för att säkerställa hur ett City-item får se ut, så utnyttjar jag mig av SeedCity som "mall":

```ts
type CityLike = Omit<SeedCity, "featured">;
```

Istället för att kopiera samma fält för stad/land/tidszon flera gånger så används en "originaltyp" och tar bort de delarna jag inte har användning för. Och om SeedCity skulle ändras senare så hjälper TypeScript mig att uppdatera på rätt ställen, vilket gör koden lättare att underhålla och minskar risk för "mismatch".  
3. Tidsformat med tydliga typer i utils/time.ts: formatTime(now: Date, timeZone: string) och formatDate(now: Date, timeZone: string). Båda funktionerna kräver en riktig Date och en tidszonsträng, om man försöker skicka in något annat så markerar TS felet direkt, vilket minskar risken för konstiga datum/tidsbuggar och gör även koden självförklarande (man ser direkt vad som ska in och vad som kommer ut).

Rent generellt så ger TypeScript bättre editorstöd med smartare autocompletion och snabbare upptäckt av fel och gör validering av data/värden lättare genom hela projektet.

## Beskriv hur TypeScript transpileras till JavaScript i ditt projekt:

1. Jag skriver koden i TypeScript (all källkod är TS/TSX). Typerna finns bara under utveckling, webbläsaren kan inte läsa TypeScript.
2. Vite omvandlar TS till JS när jag kör "npm run dev". Vite använder esbuild "bakom kulisserna" och tar bort alla typer, kompilerar TS/TSX till vanlig JS, hanterar import/export och JSX (React) och resultatet som skickas till webbläsaren är alltid JavaScript.
3. I tsconfig.app.json har jag noEmit: true och bundler-orienterade inställningar. Det betyder att TypeScript-kompilatorn inte skriver ut några .js-filer själv, istället är det Vite (bundlern) som hanterar översättning och paketering.
4. Om man kör "npm run build" så låter Vite hela projektet transpileras från TS till JS, optimera och slå ihop till en liten och effektiv "bundle" och lägga det färdiga resultatet i mappen "dist/". Webbläsaren får sen bara rena .js-filer och statiska assets (typ bilder och CSS).
5. Sammanfattat: Jag kodar i TS för säkerhet och tydlighet > dev: Vite tar bort typer och levererar JS direkt > build: Vite skapar optimerade JS i "dist/" > Webbläsaren ser aldrig TS utan bara vanlig JS som "bundlern" har genererat åt mig.
