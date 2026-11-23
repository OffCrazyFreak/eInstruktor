import type { ILesson } from "@/content/types";

const lesson: ILesson = {
	slug: "kako-do-dozvole",
	area: "propisi",
	order: 0,
	title: "Lekcija 0: Kako do dozvole",
	summary:
		"A ili B, gdje se prijaviti, što ponijeti, koliko otprilike košta i kako izgleda usmeni ispit.",
	level: "common",
	minutes: 8,
	blocks: [
		{
			type: "text",
			level: "common",
			markdown:
				"Da bi u Hrvatskoj smio upravljati brodicom, trebaš **uvjerenje o osposobljenosti za voditelja brodice**. Većina ljudi polaže kategoriju **A** ili **B**.\n\nA je osnovna dozvola za malu brodicu blizu obale. B je šira i za većinu ljudi bolji izbor: pokriva sve što i A, smiješ dalje od obale i smiješ voziti i manju jahtu. Gradiva ima više, ali uz dobru pripremu nije puno teže.",
		},
		{
			type: "table",
			level: "common",
			caption: "A ili B na jedan pogled",
			columns: ["", "Kategorija A", "Kategorija B"],
			rows: [
				["Najmanja dob", "15 godina", "16 godina"],
				[
					"Što smiješ voziti",
					"brodicu za osobne potrebe do 7 m i do 15 kW",
					"brodice za osobne potrebe i jahte do 18 m za osobne potrebe",
				],
				[
					"Koliko daleko",
					"do 6 NM od obale (IIIa, IIIb, IIIc, IV)",
					"do 12 NM od obale (III i IV)",
				],
				["Jači motor", "ne", "preko 15 kW tek s navršenih 18 godina"],
				["Ispit", "1 predmet: osnove plovidbe", "5 predmeta"],
				["Pristojba za ispit", "cca 23 EUR", "cca 58 EUR"],
				["Tečaj", "nije obavezan", "nije obavezan"],
				["Rok valjanosti", "nije propisan", "nije propisan"],
			],
		},
		{
			type: "text",
			level: "common",
			markdown:
				"Kategorija C (gospodarske brodice i plovidba dalje od 12 NM, uz obaveznu izobrazbu u pomorskom učilištu) postoji, kategorija D za voditelja brodice ne postoji, a ako si ovdje, vjerojatno nisi došao ni po jednu ni po drugu.\n\n**Treba li tečaj?** Za A i B ne treba: uvjet su samo dob i položen ispit. Možeš učiti sam i prijaviti se ravno na ispit. Tečaj pomaže ako nikad nisi bio na moru ili ti je lakše učiti uz instruktora.\n\nNajavljena je reforma (računalni dio ispita i obavezna praktična nastava za B, očekivano 2027.), ali dok se ne donese, vrijedi ovo što čitaš.",
		},
		{
			type: "warning",
			level: "common",
			markdown:
				"**Cijene su okvirne:** ispit A cca 23 EUR, ispit B cca 58 EUR, pripremni tečaj (ako ga želiš) cca 150 do 350 EUR. Iznosi se mogu promijeniti, posebno nakon 01.01.2027. kad se očekuju nova pravila.\n\nNe uplaćuj napamet: **poziv na broj razlikuje se od ureda do ureda**, pa iznos i podatke za uplatu uvijek prepiši s obrasca ureda u kojem polažeš.",
		},
		{
			type: "text",
			level: "common",
			markdown:
				"**Postupak u 8 koraka**\n\n1. **Odaberi kategoriju.** Ako nisi siguran, uzmi B.\n2. **Odaberi gdje polažeš:** Ministarstvo mora, prometa i infrastrukture u Zagrebu (voditelj.brodice@pomorstvo.hr, tel. 01 6169 198 ili 01 6169 250) ili lučka kapetanija na obali: Pula, Rijeka, Senj, Zadar, Šibenik, Split, Ploče ili Dubrovnik.\n3. **Pošalji upit za termin** (predložak je ispod). Termini nisu isti u svim gradovima.\n4. **Pripremi dokumente** (popis ispod).\n5. **Uplati pristojbu** tek kad od ureda dobiš obrazac i podatke za uplatu.\n6. **Uči gradivo:** prođi lekcije, pitanja i probni ispit u aplikaciji.\n7. **Dođi na ispit** u dogovoreno vrijeme, s osobnom iskaznicom. Ured ti javlja mjesto i vrijeme unaprijed.\n8. **Rezultat:** povjerenstvo ga kaže odmah nakon ispita, a uvjerenje (na hrvatskom i engleskom) preuzimaš u uredu.",
		},
		{
			type: "example",
			level: "common",
			title: "Predložak e-maila za prijavu",
			markdown:
				"**Predmet:** Prijava ispita za voditelja brodice kategorije B\n\nPoštovani,\n\nželio/željela bih prijaviti ispit za voditelja brodice kategorije B.\n\nMolim Vas informaciju o prvim slobodnim terminima, potrebnoj dokumentaciji i podacima za uplatu pristojbe.\n\nLijep pozdrav,\nIme i prezime\nBroj mobitela",
		},
		{
			type: "remember",
			level: "common",
			title: "Dokumenti koje obično traže",
			items: [
				"Ispunjena molba za polaganje ispita (obrazac ureda u kojem polažeš)",
				"Preslika osobne iskaznice",
				"Preslika vozačke dozvole, kao dokaz o položenoj prvoj pomoći (ako je nemaš, pitaj ured što prihvaća)",
				"Dvije fotografije 3 x 3,5 cm",
				"Potvrda o uplati pristojbe",
			],
		},
		{
			type: "text",
			level: "common",
			markdown:
				'**Kako izgleda ispit?** Ispit je **usmeni**, pred **tročlanim povjerenstvom**. Za A polažeš jedan predmet (osnove plovidbe), a za B pet: pomorsku plovidbu; motoristiku; pomorstvo, propise i meteorologiju; manevriranje, sigurnost i prvu pomoć; radiotelefoniju. Često dobiješ kratki zadatak na karti (kurs, udaljenost, pozicija) i zavežeš uzao. Vožnje brodicom nema.\n\nZa svaki predmet dobiješ ocjenu "zadovoljio" ili "nije zadovoljio", a ispit si položio samo ako si zadovoljio iz svih. Službenog popisa pitanja ni propisanog broja nema: kandidati opisuju od šest-sedam do tridesetak pitanja, a ispit s čekanjem traje od petnaestak minuta do sat vremena. Ispitivači cijene kad situaciju objasniš svojim riječima. Ako ne položiš, prijavljuješ novi termin i u pravilu ponovno plaćaš pristojbu. Polaganje na stranom jeziku ovisi o uredu i terminu, pa ga dogovori unaprijed.\n\n*Zadnje provjereno 23.11.2026.*',
		},
		{ type: "check", level: "common", questionId: "propisi-016" },
		{ type: "check", level: "common", questionId: "propisi-037" },
	],
	cheatSheet: [
		"Za većinu ljudi najbolji izbor je kategorija B (od 16 godina, do 12 NM, jahte do 18 m).",
		"Tečaj za A i B nije obavezan.",
		"Prijava: Ministarstvo u Zagrebu ili lučka kapetanija.",
		"Dokumenti: molba, preslika osobne i vozačke, dvije fotografije, uplata.",
		"Pristojba cca 23 EUR (A) i cca 58 EUR (B); poziv na broj s obrasca ureda.",
		"Ispit je usmeni, pred tročlanim povjerenstvom.",
	],
	source: "original",
};

export default lesson;
