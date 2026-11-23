import type { ILesson } from "@/content/types";

const lessons: ILesson[] = [
	{
		slug: "balisaza-i-iala",
		area: "plovne-oznake",
		order: 1,
		title: "Balisaža i IALA",
		summary:
			"Zašto na moru postoje oznake, tko ih postavlja i što znači IALA regija A.",
		level: "common",
		minutes: 4,
		blocks: [
			{
				type: "text",
				level: "common",
				markdown:
					"**Balisaža** je sustav oznaka na moru: plutače, stupovi, svjetla i svjetionici. Pokazuju ti plovni put, opasnosti i mjesta za orijentaciju.\n\nPravila za oznake usklađuje **IALA**, međunarodno udruženje svjetioničarskih službi. U Hrvatskoj oznake postavlja i održava **Plovput** iz Splita.",
			},
			{
				type: "text",
				level: "common",
				markdown:
					"Svijet je podijeljen na dvije **regije**. Razlikuju se samo po boji lijeve i desne strane plovnog puta.\n\n- **Regija A** (Europa, Jadran): lijevo **crveno**, desno **zeleno**.\n- **Regija B** (Amerike, Japan, Koreja, Filipini): obrnuto.",
			},
			{
				type: "source-note",
				level: "common",
				markdown:
					'U starom dokumentu s pitanjima piše "lateralni sustav A (crveno lijevo) i kardinalni sustav B". To nije točno. A i B su regije svijeta, a lateralne i kardinalne su vrste oznaka koje postoje u obje regije.',
			},
			{
				type: "table",
				level: "common",
				caption: "Vrste oznaka",
				columns: ["Oznaka", "Boje", "Što kaže"],
				rows: [
					[
						"Lateralna",
						"crvena ili zelena",
						"lijeva ili desna strana plovnog puta",
					],
					[
						"Kardinalna",
						"crna i žuta",
						"na kojoj strani opasnosti je sigurna voda",
					],
					[
						"Usamljena opasnost",
						"crna s crvenim pojasom",
						"mala opasnost, obiđi je na udaljenosti",
					],
					[
						"Sigurne vode",
						"crveno-bijele okomite pruge",
						"oko oznake je sigurna voda",
					],
					["Posebna", "žuta", "područje posebne namjene"],
					[
						"Nova opasnost",
						"plavo-žute okomite pruge",
						"opasnost koje još nema na kartama",
					],
				],
			},
			{
				type: "visual",
				level: "common",
				visual: "iala-buoy-explorer",
				caption:
					"Dodirni oznaku i pogledaj boje, vršni znak, svjetlo i stranu prolaza.",
				props: { focus: "all" },
			},
			{
				type: "remember",
				level: "common",
				items: [
					"Jadran je u IALA regiji A: lijevo crveno, desno zeleno.",
					"A i B su regije, a ne vrste oznaka.",
					"Oznake u Hrvatskoj postavlja Plovput, karte izdaje HHI.",
				],
			},
			{ type: "check", level: "common", questionId: "plovne-oznake-003" },
		],
		cheatSheet: [
			"Balisaža: sustav oznaka na moru.",
			"IALA regija A (Jadran): crveno lijevo, zeleno desno.",
			"Plovput postavlja i održava oznake.",
			"Šest vrsta: lateralne, kardinalne, usamljena opasnost, sigurne vode, posebne, nova opasnost.",
		],
		source: "original",
	},
	{
		slug: "lateralne-oznake",
		area: "plovne-oznake",
		order: 2,
		title: "Lateralne oznake",
		summary:
			"Crveno lijevo, zeleno desno: oblici, vršni znakovi, lučka svjetla i račvanje kanala.",
		level: "common",
		minutes: 6,
		blocks: [
			{
				type: "text",
				level: "common",
				markdown:
					"Lateralne oznake obilježavaju **lijevu i desnu stranu** kanala, prolaza i ulaza u luku.\n\nStrane vrijede za **smjer označavanja**, a to je smjer s mora prema luci. Kad uplovljavaš, crvenu ostavljaš lijevo, zelenu desno. Kad isplovljavaš, obrnuto.",
			},
			{
				type: "table",
				level: "common",
				caption: "Lateralne oznake u regiji A",
				columns: ["", "Lijeva strana", "Desna strana"],
				rows: [
					["Boja", "crvena", "zelena"],
					["Oblik", "valjak, stup ili motka", "stožac, stup ili motka"],
					["Vršni znak", "crveni valjak", "zeleni stožac vrhom gore"],
					["Svjetlo", "crveno", "zeleno"],
				],
			},
			{
				type: "visual",
				level: "common",
				visual: "iala-buoy-explorer",
				caption: "Okreni smjer plovidbe i vidi kako se mijenja strana prolaza.",
				props: { focus: "lateral" },
			},
			{
				type: "text",
				level: "common",
				markdown:
					"**Lučka svjetla** slijede isto pravilo. Gledano s mora prema ulazu, na lijevom lukobranu je **crveno**, a na desnom **zeleno** svjetlo. Uplovljavaš između njih.",
			},
			{
				type: "example",
				level: "common",
				title: "Trik za pamćenje",
				markdown:
					"Dolaziš kući s mora: crveno ti je s lijeve ruke, zeleno s desne. Na izlasku iz luke sve okreneš.",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"**Račvanje kanala:** gdje se kanal dijeli, oznaka pokazuje koji je krak glavni.\n\n- Crvena sa širokim zelenim pojasom: ostavi je lijevo, **glavni kanal je desno**.\n- Zelena sa širokim crvenim pojasom: ostavi je desno, **glavni kanal je lijevo**.\n\nNjihovo svjetlo ima ritam **Fl(2+1)**: dva bljeska, pa jedan. Obične lateralne oznake smiju imati bilo koji ritam osim tog.",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"Prema hrvatskoj tablici IALA oznaka, i **mostovi** se označavaju po istoj logici: lijeva strana prolaza crvenom četvrtastom pločom i crvenim svjetlom, desna zelenim trokutom i zelenim svjetlom.",
			},
			{
				type: "remember",
				level: "common",
				items: [
					"Uplovljavanje: crveno lijevo, zeleno desno.",
					"Isplovljavanje: obrnuto.",
					"Lijeva oznaka: crveni valjak. Desna: zeleni stožac.",
					"Lučka svjetla s mora: crveno lijevo, zeleno desno.",
				],
			},
			{ type: "check", level: "common", questionId: "plovne-oznake-005" },
			{ type: "check", level: "B", questionId: "plovne-oznake-011" },
		],
		cheatSheet: [
			"Smjer označavanja: s mora prema luci.",
			"Lijevo: crveno, valjak, crveno svjetlo.",
			"Desno: zeleno, stožac vrhom gore, zeleno svjetlo.",
			"Račvanje: osnovna boja kaže stranu, Fl(2+1), glavni kanal na suprotnu stranu.",
		],
		source: "original",
	},
	{
		slug: "kardinalne-oznake",
		area: "plovne-oznake",
		order: 3,
		title: "Kardinalne oznake",
		summary:
			"Crno-žute oznake N, E, S i W: boje, stošci, svjetla i strana prolaza.",
		level: "common",
		minutes: 7,
		blocks: [
			{
				type: "text",
				level: "common",
				markdown:
					"Kardinalna oznaka stoji uz opasnost (plićinu, hrid) i kaže ti **na kojoj je strani sigurna voda**.\n\nIme oznake je strana prolaza: pored **sjeverne** prolaziš **sjeverno** od nje, pored južne južno, isto vrijedi za istok i zapad. Sjeverni kvadrant je između NW i NE, ostali slijede u smjeru kazaljke na satu.",
			},
			{
				type: "visual",
				level: "common",
				visual: "cardinal-quadrant",
				caption:
					"Vozi brodicu oko opasnosti i gledaj koja se oznaka pojavljuje.",
				props: { mode: "explore" },
			},
			{
				type: "table",
				level: "common",
				caption: "Četiri kardinalne oznake",
				columns: ["Oznaka", "Stošci na vrhu", "Boje odozgo"],
				rows: [
					["Sjever (N)", "oba vrhom gore", "crno iznad žutog"],
					["Istok (E)", "baza uz bazu", "crno, žuti pojas, crno"],
					["Jug (S)", "oba vrhom dolje", "žuto iznad crnog"],
					["Zapad (W)", "vrh uz vrh", "žuto, crni pojas, žuto"],
				],
			},
			{
				type: "example",
				level: "common",
				title: "Trik: stošci pokazuju crno",
				markdown:
					"Gdje pokazuju vrhovi stožaca, tamo je crna boja. Sjever: vrhovi gore, crno gore. Jug: vrhovi dolje, crno dolje. Zapad: vrhovi prema sredini, crni pojas u sredini. Istok: vrhovi prema van, crno gore i dolje.",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"**Svjetla** kardinalnih oznaka su uvijek **bijela** i bljeskaju brzo: **Q** (kratki brzi bljeskovi, 50 do 79 u minuti) ili **VQ** (vrlo brzi, 80 do 159 u minuti). Broj bljeskova prati brojčanik sata.",
			},
			{
				type: "table",
				level: "B",
				caption: "Svjetla kardinalnih oznaka",
				columns: ["Oznaka", "Na satu", "Svjetlo"],
				rows: [
					["Sjever", "12", "neprekidno Q ili VQ"],
					["Istok", "3", "VQ(3) 5s ili Q(3) 10s"],
					["Jug", "6", "VQ(6)+LFl 10s ili Q(6)+LFl 15s"],
					["Zapad", "9", "VQ(9) 10s ili Q(9) 15s"],
				],
			},
			{
				type: "remember",
				level: "common",
				items: [
					"Prolaziš sa strane po kojoj se oznaka zove.",
					"Vrhovi stožaca pokazuju gdje je crno.",
					"Svjetlo bijelo: 3 bljeska istok, 6 i dugi jug, 9 zapad, sjever bez prekida.",
				],
			},
			{ type: "check", level: "common", questionId: "plovne-oznake-020" },
			{ type: "check", level: "B", questionId: "plovne-oznake-022" },
		],
		cheatSheet: [
			"Crno-žute, dva crna stošca na vrhu.",
			"Ime = strana prolaza (N prolaziš sjeverno).",
			"N vrhovi gore, S dolje, E baza uz bazu, W vrh uz vrh.",
			"Bijelo svjetlo po satu: N stalno, E 3, S 6 + dugi, W 9.",
		],
		source: "original",
	},
	{
		slug: "ostale-oznake",
		area: "plovne-oznake",
		order: 4,
		title: "Usamljena opasnost, sigurne vode i posebne oznake",
		summary:
			"Oznake koje nisu lateralne ni kardinalne i kako ih razlikuješ danju i noću.",
		level: "common",
		minutes: 5,
		blocks: [
			{
				type: "table",
				level: "common",
				caption: "Ostale oznake danju",
				columns: ["Oznaka", "Izgled", "Vršni znak", "Značenje"],
				rows: [
					[
						"Usamljena opasnost",
						"crna s jednim ili više crvenih pojaseva",
						"dvije crne kugle",
						"mala opasnost okružena plovnom vodom",
					],
					[
						"Sigurne vode",
						"okomite crvene i bijele pruge",
						"jedna crvena kugla",
						"voda oko oznake je sigurna",
					],
					[
						"Posebna oznaka",
						"žuta, bilo kojeg oblika",
						"žuti X",
						"područje posebne namjene",
					],
					[
						"Nova opasnost",
						"okomite plave i žute pruge",
						"žuti uspravni križ",
						"opasnost koje još nema na kartama",
					],
				],
			},
			{
				type: "visual",
				level: "common",
				visual: "iala-buoy-explorer",
				caption: "Usporedi vršne znakove: dvije kugle, jedna kugla, X i križ.",
				props: { focus: "other" },
			},
			{
				type: "warning",
				level: "common",
				markdown:
					"**Usamljenu opasnost** možeš obići s bilo koje strane, ali ne prolazi blizu. **Novu opasnost** obiđi u širokom luku: još nije ucrtana na kartama, a često je to svježa podrtina.",
			},
			{
				type: "table",
				level: "B",
				caption: "Ostale oznake noću",
				columns: ["Oznaka", "Svjetlo"],
				rows: [
					["Usamljena opasnost", "bijelo, Fl(2)"],
					[
						"Sigurne vode",
						"bijelo: Iso, Oc, jedan dugi bljesak svakih 10 s ili Morse A",
					],
					[
						"Posebna oznaka",
						"žuto, ritam koji se ne može zamijeniti s bijelim svjetlima drugih oznaka",
					],
					["Nova opasnost", "naizmjence plavo i žuto"],
				],
			},
			{
				type: "remember",
				level: "common",
				items: [
					"Dvije crne kugle: usamljena opasnost (noću bijelo Fl(2)).",
					"Crveno-bijele okomite pruge i crvena kugla: sigurne vode.",
					"Žuto sa žutim X: posebna oznaka.",
					"Plavo-žuto sa žutim križem: nova opasnost.",
				],
			},
			{ type: "check", level: "common", questionId: "plovne-oznake-029" },
			{ type: "check", level: "B", questionId: "plovne-oznake-032" },
		],
		cheatSheet: [
			"Usamljena opasnost: crno-crveno, dvije crne kugle, Fl(2) bijelo.",
			"Sigurne vode: crveno-bijele okomite pruge, crvena kugla, Iso, Oc, LFl 10s ili Mo(A).",
			"Posebna: žuta, žuti X, žuto svjetlo.",
			"Nova opasnost: plavo-žute pruge, žuti križ, plavo i žuto svjetlo.",
		],
		source: "original",
	},
	{
		slug: "karakteristike-svjetla",
		area: "plovne-oznake",
		order: 5,
		title: "Svjetionici i karakteristika svjetla",
		summary:
			"Kako pročitaš zapis svjetla s karte: boja, ritam, period, visina, domet i sektori.",
		level: "B",
		minutes: 7,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"Svako pomorsko svjetlo ima svoj **ritam** po kojem ga prepoznaš noću. Ako zamijeniš dva svjetionika, misliš da si negdje gdje nisi. Zato zapis s karte moraš znati pročitati.\n\nNa hrvatskim kartama i u skriptama boje se pišu hrvatskim slovima, a ritam često međunarodnom kraticom.",
			},
			{
				type: "table",
				level: "B",
				caption: "Boje i ritmovi",
				columns: ["Oznaka", "Značenje"],
				rows: [
					["B / C / Z / Ž", "bijelo / crveno / zeleno / žuto"],
					["F", "stalno svjetlo, bez prekida"],
					["Fl (u skriptama Bl)", "bljesak: svjetlo kraće od tame"],
					["Fl(4)", "grupa od četiri bljeska"],
					["LFl", "dugi bljesak, najmanje 2 s"],
					["Oc", "prekidno: svjetlo dulje od tame"],
					["Iso (u skriptama Izo)", "izofazno: svjetlo i tama jednako"],
					["Q / VQ", "brzi / vrlo brzi bljeskovi"],
				],
			},
			{
				type: "example",
				level: "B",
				title: "Čitamo: B C Bl(4) 10s 21m 15-10M",
				markdown:
					"- **B C**: svjetlo je bijelo i crveno (u različitim sektorima)\n- **Bl(4)**: bljeska u grupama od četiri\n- **10s**: grupa se ponavlja svakih 10 sekundi\n- **21m**: svjetlo je 21 m iznad mora\n- **15-10M**: bijelo se vidi 15 milja, crveno 10 milja",
			},
			{
				type: "visual",
				level: "B",
				visual: "light-characteristic-reader",
				caption: "Upiši ili odaberi zapis svjetla i gledaj kako svijetli.",
				props: { code: "B C Bl(4) 10s 21m 15-10M", showSectors: true },
			},
			{
				type: "text",
				level: "B",
				markdown:
					'**Sektori:** mnoga svjetla nemaju istu boju u svim smjerovima. Obojeni sektori, najčešće crveni, pokrivaju plićine i hridi. Sektor u kojem se svjetlo ne vidi označen je s "Pot" (zatamnjenje).\n\nPlovi u **bijelom sektoru**. Ako svjetlo promijeni boju, promijeni kurs i vrati se u bijelo.',
			},
			{
				type: "source-note",
				level: "B",
				markdown:
					"Bilješke za ispit B kažu da kratki bljesak traje manje od 1 s, a dugi 3 s. Po IALA pravilima dugi bljesak traje najmanje 2 s, pa je 3 s samo jedan mogući primjer.",
			},
			{
				type: "remember",
				level: "B",
				items: [
					"Redoslijed zapisa: boja, ritam, period, visina, domet.",
					"Iso: svjetlo i tama jednako. Oc: više svjetla. Fl: više tame.",
					"Više dometa redom prate boje s početka zapisa.",
					"Crveni sektor: izađi iz njega u bijeli.",
				],
			},
			{ type: "check", level: "B", questionId: "plovne-oznake-035" },
			{ type: "check", level: "B", questionId: "plovne-oznake-038" },
		],
		cheatSheet: [
			"B bijelo, C crveno, Z zeleno, Ž žuto.",
			"Fl/Bl bljesak, Oc prekidno, Iso/Izo izofazno, LFl dugi (2 s i više).",
			"Zapis: boja, ritam, period (s), visina (m), domet (M).",
			'Plovi u bijelom sektoru, "Pot" je sektor u kojem svjetla nema.',
		],
		source: "original",
	},
];

export default lessons;
