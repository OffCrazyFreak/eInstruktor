import type { ILesson } from "@/content/types";

const lessons: ILesson[] = [
	{
		slug: "osmatranje-i-rizik-sudara",
		area: "izbjegavanje-sudara",
		order: 1,
		title: "Osmatranje i rizik sudara",
		summary: "Kako na vrijeme primijetiti opasnost i kako pravilno reagirati.",
		level: "common",
		minutes: 6,
		blocks: [
			{
				type: "text",
				level: "common",
				markdown:
					"Pravila o izbjegavanju sudara (COLREG) vrijede za sva plovila na moru, od pedaline do tankera. Prije pitanja tko ima prednost dolaze tri osnovne obveze: **osmatraj**, **vozi sigurnom brzinom** i **procijeni postoji li rizik sudara**.",
			},
			{
				type: "text",
				level: "common",
				markdown:
					"**Osmatranje** znači stalno gledati i slušati oko sebe, i koristiti sve što imaš (radar, VHF). Većina sudara malih plovila događa se jer netko jednostavno nije gledao.\n\n**Sigurna brzina** je ona kojom možeš na vrijeme skrenuti ili stati. Ovisi o vidljivosti, prometu, vjetru, moru i tvom plovilu. Nema jednog broja koji vrijedi uvijek.",
			},
			{
				type: "visual",
				level: "common",
				visual: "collision-situations",
				caption:
					"Prati smjer prema drugom plovilu: ako se ne mijenja, idete u istu točku.",
				props: { focus: "constant-bearing" },
			},
			{
				type: "remember",
				level: "common",
				title: "Kako prepoznati rizik",
				items: [
					"Smjer prema plovilu se ne mijenja, a ono je sve bliže: rizik sudara.",
					"Pramčani kut se brzo smanjuje: prolazi ispred tvog pramca.",
					"Pramčani kut brzo raste: prolazi iza tvoje krme.",
					"U dvojbi smatraj da rizik postoji.",
				],
			},
			{
				type: "text",
				level: "common",
				markdown:
					"Kad reagiraš, reagiraj **na vrijeme i jasno**. Skreni toliko da drugi odmah vidi promjenu. Niz malih zaokreta zbunjuje. Ako treba, smanji brzinu ili stani.",
			},
			{
				type: "check",
				level: "common",
				questionId: "izbjegavanje-sudara-001",
			},
			{
				type: "check",
				level: "common",
				questionId: "izbjegavanje-sudara-003",
			},
		],
		cheatSheet: [
			"Osmatraj vidom, sluhom i svim sredstvima.",
			"Sigurna brzina ovisi o uvjetima, nije fiksni broj.",
			"Smjer se ne mijenja, a udaljenost pada: rizik sudara.",
			"Reagiraj rano i jasno, bez niza malih promjena.",
		],
		source: "original",
	},
	{
		slug: "susret-u-protukursu",
		area: "izbjegavanje-sudara",
		order: 2,
		title: "Susret u protukursu",
		summary: "Dva motorna plovila idu jedno prema drugom: oba skreću udesno.",
		level: "common",
		minutes: 3,
		blocks: [
			{
				type: "text",
				level: "common",
				markdown:
					"Kad dva motorna plovila plove jedno prema drugom, pramac prema pramcu ili gotovo tako, **oba skreću udesno**. Prolaze jedno pokraj drugog lijevim bokovima.\n\nU susretu nitko nema prednost, oba moraju djelovati.",
			},
			{
				type: "visual",
				level: "common",
				visual: "collision-situations",
				caption: "Susret u protukursu: oba skreću udesno.",
				props: { situation: "head-on" },
			},
			{
				type: "example",
				level: "common",
				title: "Kako to izgleda noću",
				markdown:
					"Vidiš crveno i zeleno bočno svjetlo istovremeno, a iznad njih bijelo jarbolno. Na većem brodu dva jarbolna svjetla su jedno točno iznad drugog. To je susret: skreni udesno.",
			},
			{
				type: "remember",
				level: "common",
				items: [
					"Susret = oba udesno.",
					"Ako nisi siguran je li susret ili križanje, smatraj da je susret.",
					"Skretanje mora biti jasno vidljivo drugome.",
				],
			},
			{
				type: "check",
				level: "common",
				questionId: "izbjegavanje-sudara-008",
			},
			{
				type: "check",
				level: "common",
				questionId: "izbjegavanje-sudara-009",
			},
		],
		cheatSheet: [
			"Pramac prema pramcu: oba motorna skreću udesno.",
			"Noću: vidiš oba bočna svjetla.",
			"U dvojbi smatraj da je susret.",
		],
		source: "original",
	},
	{
		slug: "krizanje-kurseva",
		area: "izbjegavanje-sudara",
		order: 3,
		title: "Križanje kurseva",
		summary:
			"Tko ustupa put kad se kursevi križaju i što radi plovilo s prednošću.",
		level: "common",
		minutes: 6,
		blocks: [
			{
				type: "text",
				level: "common",
				markdown:
					"Kad se kursevi dvaju motornih plovila križaju, **uklanja se ono koje drugo vidi sa svoje desne strane**. Drugo plovilo ima prednost.\n\nNoću to lako prepoznaš: ako plovilu s desne strane vidiš **crveno** (lijevo) svjetlo, ti se mičeš.",
			},
			{
				type: "visual",
				level: "common",
				visual: "collision-situations",
				caption: "Pomakni drugo plovilo i pogledaj tko ustupa put.",
				props: { situation: "crossing" },
			},
			{
				type: "table",
				level: "common",
				caption: "Dvije uloge",
				columns: ["Plovilo koje ustupa", "Plovilo s prednošću"],
				rows: [
					["drugo ti je s desne strane", "drugo ti je s lijeve strane"],
					["djeluje rano i jasno", "zadržava kurs i brzinu"],
					["skreće udesno i prolazi iza krme drugog", "pazi što drugo radi"],
					[
						"ne prelazi ispred pramca drugog",
						"ako drugo ne reagira: pet kratkih",
					],
				],
			},
			{
				type: "warning",
				level: "common",
				markdown:
					"Imati prednost ne znači imati pravo na sudar. Ako se drugo plovilo ne uklanja, daj **pet kratkih** signala. Ako i dalje ne reagira, smiješ manevrirati sam, a kad sudar ne može izbjeći samo ono, **moraš**. Tada ne skreći ulijevo prema plovilu koje ti je s lijeve strane.",
			},
			{
				type: "remember",
				level: "common",
				items: [
					"Drugo s desne: ti ustupaš.",
					"Vidiš crveno: ti se mičeš. Vidiš zeleno: zadrži kurs, ali prati.",
					"Ustupaš skretanjem udesno i prolaskom po krmi.",
				],
			},
			{
				type: "check",
				level: "common",
				questionId: "izbjegavanje-sudara-015",
			},
			{
				type: "check",
				level: "common",
				questionId: "izbjegavanje-sudara-016",
			},
		],
		cheatSheet: [
			"Uklanja se plovilo koje drugo ima s desne strane.",
			"Plovilo s prednošću zadržava kurs i brzinu.",
			"Ustupaš udesno, iza krme drugog.",
			"Drugo ne reagira: pet kratkih, zatim i sam izbjegavaš.",
		],
		source: "original",
	},
	{
		slug: "pretjecanje",
		area: "izbjegavanje-sudara",
		order: 4,
		title: "Pretjecanje",
		summary: "Tko pretječe, taj se uklanja, bez iznimke.",
		level: "common",
		minutes: 4,
		blocks: [
			{
				type: "text",
				level: "common",
				markdown:
					"Pretječeš kad drugom plovilu prilaziš straga, iz smjera **više od 22,5° iza njegove poprečnice**. Noću tada vidiš samo njegovo krmeno svjetlo, nijedno bočno.\n\nPlovilo koje pretječe **uvijek se uklanja**, bez obzira je li motorno, jedrilica ili nešto treće.",
			},
			{
				type: "visual",
				level: "common",
				visual: "collision-situations",
				caption: "Sektor pretjecanja: iza poprečnice drugog plovila.",
				props: { situation: "overtaking" },
			},
			{
				type: "text",
				level: "common",
				markdown:
					"Na otvorenom moru smiješ proći s bilo koje strane, ali drži razmak i **ne presijecaj mu kurs ispred pramca** dok ga potpuno ne prestigneš. Ostaješ plovilo koje pretječe sve dok ne prođeš i ne udaljiš se, čak i ako se kut u međuvremenu promijeni.\n\nU uskom kanalu pretjecanje se dogovara zvučnim signalima.",
			},
			{
				type: "remember",
				level: "common",
				items: [
					"Tko pretječe, uklanja se.",
					"Jedrilica koja pretječe nema prednost.",
					"Ne presijecaj kurs plovilu koje pretječeš.",
					"U dvojbi smatraj da pretječeš.",
				],
			},
			{
				type: "check",
				level: "common",
				questionId: "izbjegavanje-sudara-020",
			},
			{
				type: "check",
				level: "common",
				questionId: "izbjegavanje-sudara-021",
			},
		],
		cheatSheet: [
			"Pretjecanje: prilaziš više od 22,5° iza poprečnice.",
			"Plovilo koje pretječe uvijek se uklanja.",
			"Prođi bilo kojom stranom, ne presijecaj pramac.",
		],
		source: "original",
	},
	{
		slug: "jedrilice-medusobno",
		area: "izbjegavanje-sudara",
		order: 5,
		title: "Jedrilice međusobno i prema motornima",
		summary:
			"Pravila vjetra u bok i privjetrine te odnos jedrilice i motornog plovila.",
		level: "common",
		minutes: 5,
		blocks: [
			{
				type: "text",
				level: "common",
				markdown:
					"Za dvije jedrilice pod jedrima pravilo ovisi o tome s koje strane primaju vjetar. Stranu vjetra određuješ prema glavnom jedru: vjetar dolazi sa strane **suprotne** od one na kojoj je glavno jedro.",
			},
			{
				type: "table",
				level: "common",
				caption: "Dvije jedrilice",
				columns: ["Situacija", "Tko se uklanja"],
				rows: [
					[
						"vjetar u različite bokove",
						"ona koja prima vjetar s lijeve strane",
					],
					["vjetar u isti bok", "ona u privjetrini (bliže vjetru)"],
					[
						"ne vidiš s koje strane druga prima vjetar",
						"ti, ako vjetar primaš s lijeve strane",
					],
				],
			},
			{
				type: "visual",
				level: "common",
				visual: "collision-situations",
				caption: "Promijeni smjer vjetra i vidi koja jedrilica ustupa.",
				props: { situation: "sail-opposite-tacks", showWind: true },
			},
			{
				type: "text",
				level: "common",
				markdown:
					"**Motorno plovilo uklanja se jedrilici** pod jedrima. Dvije iznimke: jedrilica koja pretječe se uklanja, a u uskom kanalu jedrilica ne smije ometati veliki brod koji može ploviti samo kanalom.",
			},
			{
				type: "remember",
				level: "common",
				items: [
					"Različiti bokovi: uklanja se ona s vjetrom slijeva.",
					"Isti bok: uklanja se ona u privjetrini.",
					"Motorno se uklanja jedrilici, osim kad jedrilica pretječe.",
				],
			},
			{
				type: "check",
				level: "common",
				questionId: "izbjegavanje-sudara-023",
			},
			{
				type: "check",
				level: "common",
				questionId: "izbjegavanje-sudara-024",
			},
		],
		cheatSheet: [
			"Vjetar u različite bokove: uklanja se ona s vjetrom slijeva.",
			"Vjetar u isti bok: uklanja se ona u privjetrini.",
			"Privjetrina je strana suprotna glavnom jedru.",
			"Motorno plovilo ustupa jedrilici pod jedrima.",
		],
		source: "original",
	},
	{
		slug: "redoslijed-prednosti",
		area: "izbjegavanje-sudara",
		order: 6,
		title: "Tko se kome uklanja",
		summary:
			"Ljestvica plovila: što se plovilo teže miče, to ima veću prednost.",
		level: "common",
		minutes: 4,
		blocks: [
			{
				type: "text",
				level: "common",
				markdown:
					"Kad se sretnu plovila različitih vrsta, vrijedi jednostavna logika: **uklanja se ono koje se lakše miče**. Motorno plovilo je najokretnije, pa se uklanja gotovo svima.",
			},
			{
				type: "table",
				level: "common",
				caption: "Od najveće prednosti prema najmanjoj",
				columns: ["Plovilo", "Kome se uklanja"],
				rows: [
					[
						"Nesposobno za manevar, ograničene sposobnosti manevriranja",
						"nikome od ovih na popisu",
					],
					["Ribar koji lovi", "dvama iznad"],
					["Jedrilica pod jedrima", "trima iznad"],
					["Motorno plovilo", "svima iznad"],
				],
			},
			{
				type: "text",
				level: "common",
				markdown:
					"Plovilo **ograničeno gazom** (tri crvena svjetla ili valjak) ne smiješ ometati, osim ako si i sam nesposoban za manevar ili ograničen manevriranjem.\n\nPretjecanje i uski kanali imaju svoja pravila koja vrijede i ovdje: tko pretječe, uklanja se.",
			},
			{
				type: "remember",
				level: "common",
				items: [
					"Nesposoban i ograničen manevriranjem na vrhu.",
					"Zatim ribar, pa jedrilica, pa motorno plovilo.",
					"Plovilo ograničeno gazom ne ometaj.",
				],
			},
			{
				type: "check",
				level: "common",
				questionId: "izbjegavanje-sudara-027",
			},
			{
				type: "check",
				level: "common",
				questionId: "izbjegavanje-sudara-029",
			},
		],
		cheatSheet: [
			"Redoslijed: nesposoban i ograničen manevriranjem, ribar, jedrilica, motorno.",
			"Motorno plovilo se uklanja svima iznad sebe.",
			"Plovilo ograničeno gazom ne ometaj.",
		],
		source: "original",
	},
	{
		slug: "uski-kanali-i-luke",
		area: "izbjegavanje-sudara",
		order: 7,
		title: "Uski kanali i ulazi u luke",
		summary: "Desni rub kanala, veliki brodovi i prednost pri izlazu iz luke.",
		level: "common",
		minutes: 5,
		blocks: [
			{
				type: "text",
				level: "common",
				markdown:
					"U uskom kanalu drži se **desnog ruba**, koliko je sigurno. Plovila kraća od 20 m, jedrilice i ribari ne smiju ometati brod koji sigurno može ploviti samo unutar kanala.\n\nKanal ne prelazi ako time ometaš takav brod. Ne sidri se u kanalu ako nije nužno.",
			},
			{
				type: "visual",
				level: "common",
				visual: "collision-situations",
				caption: "Uski kanal: desni rub i signal kod zavoja.",
				props: { situation: "narrow-channel" },
			},
			{
				type: "text",
				level: "common",
				markdown:
					"Pred zavojem iza kojeg ne vidiš daj **jedan dugi** signal. Pretjecanje u kanalu dogovaraš zvučnim signalima, a bez pristanka ne pretječeš.",
			},
			{
				type: "warning",
				level: "common",
				markdown:
					"Na ispitu se uči da **plovilo koje izlazi iz luke ima prednost** pred onim koje ulazi. To pravilo je u Pravilniku o sigurnosti pomorske plovidbe (NN 52/25, čl. 46. st. 2): plovila koja ulaze u luku ne smiju ometati ona koja izlaze. COLREG ga nema. Plovilo s prednošću može upozoriti s najmanje pet kratkih brzih zvukova.",
			},
			{
				type: "remember",
				level: "common",
				items: [
					"Kanal: desni rub.",
					"Ispod 20 m: ne ometaj velikog u kanalu.",
					"Izlazak iz luke ima prednost pred ulaskom.",
				],
			},
			{
				type: "text",
				level: "B",
				markdown:
					"**Sheme odvojene plovidbe** su prometne trake za velike brodove, kao autoceste. Ploviš u smjeru trake, a ako je moraš prijeći, prelaziš kursom što bližim pravom kutu. Plovilo kraće od 20 m i jedrilica ne smiju ometati brodove u traci.",
			},
			{
				type: "check",
				level: "common",
				questionId: "izbjegavanje-sudara-032",
			},
			{
				type: "check",
				level: "common",
				questionId: "izbjegavanje-sudara-034",
			},
		],
		cheatSheet: [
			"U kanalu ploviš uz desni rub.",
			"Plovila ispod 20 m i jedrilice ne ometaju velike u kanalu.",
			"Jedan dugi signal pred zavojem.",
			"Izlaz iz luke ima prednost (NN 52/25, čl. 46).",
		],
		source: "original",
	},
	{
		slug: "plovidba-u-smanjenoj-vidljivosti",
		area: "izbjegavanje-sudara",
		order: 8,
		title: "Plovidba u magli",
		summary:
			"Kad se plovila ne vide, prednosti nema: usporavaš i oprezno izbjegavaš.",
		level: "B",
		minutes: 4,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"U magli, kiši ili snijegu plovila se ne vide. Tada **nema plovila s prednošću**. Svako vozi sigurnom brzinom prilagođenom vidljivosti, ima motor spreman za brzi manevar i daje signale za maglu.",
			},
			{
				type: "remember",
				level: "B",
				items: [
					"Čuješ signal ispred poprečnice: uspori na najmanju brzinu za upravljanje, po potrebi stani.",
					"Plovilo samo na radaru, ispred poprečnice: ne skreći ulijevo (osim ako ga pretječeš).",
					"Plovilo na boku ili iza poprečnice: ne skreći prema njemu.",
				],
			},
			{
				type: "visual",
				level: "B",
				visual: "sound-signal-player",
				caption: "Prepoznaj tko se javlja u magli.",
				props: { set: "fog", mode: "quiz" },
			},
			{
				type: "warning",
				level: "B",
				markdown:
					"Ako uđeš u gustu maglu s malom brodicom, uspori, upali svjetla, javljaj se zvučnim signalom i drži se podalje od plovnih puteva velikih brodova.",
			},
			{
				type: "check",
				level: "B",
				questionId: "izbjegavanje-sudara-037",
			},
			{
				type: "check",
				level: "B",
				questionId: "izbjegavanje-sudara-036",
			},
		],
		cheatSheet: [
			"U magli nema prednosti, svi izbjegavaju.",
			"Signal ispred poprečnice: uspori ili stani.",
			"Radarski kontakt naprijed: ne skreći ulijevo.",
		],
		source: "original",
	},
];

export default lessons;
