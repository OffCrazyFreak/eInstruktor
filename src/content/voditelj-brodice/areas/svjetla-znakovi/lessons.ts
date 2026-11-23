import type { ILesson } from "@/content/types";

const lessons: ILesson[] = [
	{
		slug: "vrste-i-sektori-svjetala",
		area: "svjetla-znakovi",
		order: 1,
		title: "Vrste svjetala i njihovi sektori",
		summary: "Koja svjetla postoje, koje su boje i na koju stranu svijetle.",
		level: "common",
		minutes: 6,
		blocks: [
			{
				type: "text",
				level: "common",
				markdown:
					"Noću ne vidiš trup drugog plovila, vidiš samo njegova svjetla. Iz njih moraš pročitati tri stvari: **što** je to plovilo, **kamo** ide i **trebaš li ti nešto poduzeti**.\n\nSvjetla se pale od zalaska do izlaska sunca. Pale se i danju kad je vidljivost slaba, na primjer u magli ili jakoj kiši.",
			},
			{
				type: "table",
				level: "common",
				caption: "Osnovna svjetla",
				columns: ["Svjetlo", "Boja", "Luk", "Kamo svijetli"],
				rows: [
					[
						"Jarbolno",
						"bijelo",
						"225°",
						"naprijed i bočno, do malo iza poprečnice",
					],
					[
						"Bočno desno",
						"zeleno",
						"112,5°",
						"od pramca udesno, do malo iza poprečnice",
					],
					[
						"Bočno lijevo",
						"crveno",
						"112,5°",
						"od pramca ulijevo, do malo iza poprečnice",
					],
					["Krmeno", "bijelo", "135°", "natrag"],
					["Za tegljenje", "žuto", "135°", "natrag, iznad krmenog"],
					[
						"Kružno",
						"bijelo, crveno, zeleno ili žuto",
						"360°",
						"na sve strane",
					],
				],
			},
			{
				type: "visual",
				level: "common",
				visual: "ship-lights-viewer",
				caption:
					"Okreći se oko plovila i gledaj koja svjetla vidiš iz kojeg smjera.",
				props: { focus: "sectors", vessel: "power-12-50m" },
			},
			{
				type: "text",
				level: "common",
				markdown:
					"Jarbolno svjetlo i dva bočna pokrivaju isti luk od 225°. Krmeno pokriva ostatak, 135°. Zajedno daju puni krug, pa iz svakog smjera vidiš barem jedno svjetlo.\n\nGranica je 22,5° iza poprečnice (poprečnica je crta okomita na uzdužnicu plovila, točno na boku). Iza te granice vidiš samo krmeno svjetlo.",
			},
			{
				type: "remember",
				level: "common",
				title: "Zapamti",
				items: [
					"Desno je zeleno, lijevo je crveno.",
					"Vidiš oba bočna svjetla zajedno: plovilo ide ravno prema tebi.",
					"Vidiš samo bijelo krmeno: gledaš ga straga, ono se udaljava ili ga ti sustižeš.",
					"Žuto iznad krmenog: plovilo nešto tegli.",
				],
			},
			{
				type: "check",
				level: "common",
				questionId: "svjetla-znakovi-006",
			},
			{
				type: "table",
				level: "B",
				caption: "Najmanji domet svjetala u nautičkim miljama",
				columns: ["Duljina plovila", "Jarbolno", "Bočna", "Krmeno", "Kružna"],
				rows: [
					["50 m i više", "6", "3", "3", "3"],
					["12 do 50 m", "5 (3 ako je kraće od 20 m)", "2", "2", "2"],
					["kraće od 12 m", "2", "1", "2", "2"],
				],
			},
			{
				type: "check",
				level: "common",
				questionId: "svjetla-znakovi-007",
			},
		],
		cheatSheet: [
			"Jarbolno bijelo 225°, krmeno bijelo 135°, bočna 112,5° svako.",
			"Desno zeleno, lijevo crveno.",
			"Svjetla gore od zalaska do izlaska sunca i u smanjenoj vidljivosti.",
			"Žuto svjetlo za tegljenje stoji iznad krmenog.",
		],
		source: "original",
	},
	{
		slug: "svjetla-motornih-plovila",
		area: "svjetla-znakovi",
		order: 2,
		title: "Svjetla motornih plovila",
		summary: "Koja svjetla nosi motorno plovilo ovisno o duljini.",
		level: "common",
		minutes: 6,
		blocks: [
			{
				type: "text",
				level: "common",
				markdown:
					"Motorno plovilo je svako plovilo koje pokreće motor. To vrijedi i za jedrilicu koja plovi na motor, čak i kad su joj jedra podignuta.\n\nŠto je plovilo dulje, to ima više svjetala.",
			},
			{
				type: "table",
				level: "common",
				caption: "Motorna plovila u plovidbi",
				columns: ["Plovilo", "Svjetla"],
				rows: [
					[
						"Kraće od 7 m i ne brže od 7 čvorova",
						"bijelo kružno; bočna ako je moguće",
					],
					[
						"Kraće od 12 m",
						"bočna i bijelo kružno (ili jarbolno, bočna i krmeno)",
					],
					["12 do 50 m", "jarbolno, bočna i krmeno"],
					["50 m i više", "dva jarbolna (stražnje više), bočna i krmeno"],
				],
			},
			{
				type: "visual",
				level: "common",
				visual: "ship-lights-viewer",
				caption:
					"Promijeni duljinu plovila i usporedi svjetla sprijeda, s boka i straga.",
				props: { focus: "power-driven", vessel: "power-over-50m" },
			},
			{
				type: "example",
				level: "common",
				title: "Što vidiš iz kojeg smjera",
				markdown:
					"Sprijeda: jarbolno, crveno i zeleno.\n\nS desnog boka: jarbolno i zeleno.\n\nS lijevog boka: jarbolno i crveno.\n\nStraga: samo krmeno.",
			},
			{
				type: "text",
				level: "A",
				markdown:
					"S kategorijom A voziš brodicu do 7 m i 15 kW. Ako tvoja brodica može ići brže od 7 čvorova, a s takvim motorom obično može, samo bijelo kružno svjetlo nije dovoljno. Trebaju ti i bočna svjetla.",
			},
			{
				type: "remember",
				level: "common",
				items: [
					"Bijelo jarbolno svjetlo znači motor.",
					"Do 12 m smiješ jarbolno i krmeno zamijeniti jednim bijelim kružnim.",
					"Preko 50 m dva jarbolna: kad su u istoj okomici, brod ide ravno prema tebi.",
				],
			},
			{
				type: "check",
				level: "common",
				questionId: "svjetla-znakovi-010",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"Plovilo na zračnom jastuku (lebdjelica) kad plovi bez istiskivanja vode (iznad vode) uz svjetla motornog plovila pali i **žuto bljeskajuće kružno svjetlo**.",
			},
			{
				type: "check",
				level: "common",
				questionId: "svjetla-znakovi-015",
			},
		],
		cheatSheet: [
			"Ispod 7 m i do 7 čv: bijelo kružno.",
			"Ispod 12 m: bočna i bijelo kružno.",
			"12 do 50 m: jarbolno, bočna, krmeno.",
			"Preko 50 m: dva jarbolna, stražnje više.",
		],
		source: "original",
	},
	{
		slug: "svjetla-jedrilica-i-vesla",
		area: "svjetla-znakovi",
		order: 3,
		title: "Jedrilice i čamci na vesla",
		summary:
			"Svjetla jedrilica, trobojna svjetiljka i što je motorni jedrenjak.",
		level: "common",
		minutes: 5,
		blocks: [
			{
				type: "text",
				level: "common",
				markdown:
					"Jedrilica koja plovi samo na jedra **nema bijelo jarbolno svjetlo**. Nosi bočna svjetla i krmeno.\n\nJedrilica kraća od 20 m smije ta tri svjetla spojiti u jednu **trobojnu svjetiljku** na vrhu jarbola. Tako se bolje vidi preko valova. Dok trobojna gori, druga bočna i krmeno ne smiju gorjeti.",
			},
			{
				type: "table",
				level: "common",
				caption: "Jedrilice i vesla",
				columns: ["Plovilo", "Svjetla"],
				rows: [
					["Jedrilica bilo koje duljine", "bočna i krmeno"],
					[
						"Jedrilica kraća od 20 m",
						"bočna i krmeno, ili trobojna na vrhu jarbola",
					],
					[
						"Jedrilica, dodatno po želji",
						"crveno iznad zelenog kružnog na vrhu jarbola (ne uz trobojnu)",
					],
					[
						"Jedrilica kraća od 7 m",
						"bočna i krmeno ako može; inače spremna bijela svjetiljka",
					],
					["Čamac na vesla", "kao jedrilica, ili spremna bijela svjetiljka"],
				],
			},
			{
				type: "visual",
				level: "common",
				visual: "ship-lights-viewer",
				caption: "Usporedi jedrilicu pod jedrima i jedrilicu na motor.",
				props: { focus: "sailing", vessel: "sailing-under-20m" },
			},
			{
				type: "warning",
				level: "common",
				markdown:
					"Kad jedrilica upali motor, postaje **motorno plovilo**. Pali jarbolno svjetlo, a danju ističe crni stožac vrhom prema dolje. Gubi i prednost koju jedrilica ima pred motornim plovilima.",
			},
			{
				type: "remember",
				level: "common",
				items: [
					"Jedrilica na jedra: bez bijelog jarbolnog svjetla.",
					"Trobojna svjetiljka: samo do 20 m i bez drugih bočnih i krmenog.",
					"Jedrilica na motor = motorno plovilo.",
					"Mali čamac na vesla: spremna bijela svjetiljka.",
				],
			},
			{
				type: "check",
				level: "common",
				questionId: "svjetla-znakovi-021",
			},
		],
		cheatSheet: [
			"Jedrilica na jedra: bočna i krmeno, bez jarbolnog.",
			"Ispod 20 m smije trobojnu na vrhu jarbola.",
			"Na motor: svjetla motornog plovila i stožac vrhom dolje.",
			"Vesla i male jedrilice: spremna bijela svjetiljka.",
		],
		source: "original",
	},
	{
		slug: "svjetla-posebnih-plovila",
		area: "svjetla-znakovi",
		order: 4,
		title: "Ribari, tegljači, sidro i posebna plovila",
		summary: "Kružna svjetla u okomici koja ti govore što plovilo radi.",
		level: "common",
		minutes: 8,
		blocks: [
			{
				type: "text",
				level: "common",
				markdown:
					"Plovila koja nešto rade ili su u nevolji nose **kružna svjetla jedno iznad drugog**. Čitaš ih odozgo prema dolje.\n\nAko se takvo plovilo kreće kroz vodu, uz njih pali i obična svjetla (bočna i krmeno, a neka i jarbolno).",
			},
			{
				type: "table",
				level: "common",
				caption: "Kružna svjetla, odozgo prema dolje",
				columns: ["Plovilo", "Svjetla"],
				rows: [
					[
						"Usidreno",
						"bijelo naprijed; od 50 m još jedno bijelo straga, niže",
					],
					["Nesposobno za manevar", "crveno, crveno"],
					["Nasukano", "svjetla sidrenja i crveno, crveno"],
					["Ograničene sposobnosti manevriranja", "crveno, bijelo, crveno"],
					["Ograničeno gazom", "crveno, crveno, crveno"],
					["Koćar", "zeleno, bijelo"],
					["Ostali ribolov", "crveno, bijelo"],
					["Peljarski brod u službi", "bijelo, crveno"],
					["Čisti mine", "tri zelena (vrh jarbola i dva sa strane)"],
				],
			},
			{
				type: "visual",
				level: "common",
				visual: "ship-lights-viewer",
				caption: "Izaberi stanje plovila i pogledaj njegova svjetla noću.",
				props: { focus: "special", vessel: "trawler" },
			},
			{
				type: "remember",
				level: "common",
				title: "Mali trikovi",
				items: [
					"Bijelo gore, crveno dolje: peljar.",
					"Crveno gore, bijelo dolje: ribar.",
					"Zeleno gore, bijelo dolje: koćar.",
					"Dva crvena: ne može se maknuti. Tri crvena: velik gaz.",
				],
			},
			{
				type: "text",
				level: "common",
				markdown:
					"**Tegljač** nosi dva jarbolna svjetla u okomici, a tri ako je teglj dulji od 200 m. Uz to ima bočna, krmeno i žuto svjetlo za tegljenje iznad krmenog. Tegljeni objekt nosi bočna i krmeno svjetlo.\n\nUsidreni brod dulji od 100 m mora upaliti i radna svjetla na palubi.",
			},
			{
				type: "check",
				level: "common",
				questionId: "svjetla-znakovi-026",
			},
			{
				type: "source-note",
				level: "common",
				markdown:
					"Starija skripta za brod koji čisti mine kaže 1000 m po krmi i 500 m po boku. Važeća pravila kažu jednostavno: ne prilazi mu bliže od **1000 m**.",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"Plovila kraća od 12 m ne moraju nositi svjetla nesposobnosti za manevar ni ograničene sposobnosti manevriranja. Iznimka je ronjenje: plovilo s roniocima mora pokazati da ga treba zaobići.",
			},
			{
				type: "check",
				level: "common",
				questionId: "svjetla-znakovi-030",
			},
		],
		cheatSheet: [
			"Sidro: bijelo kružno, od 50 m dva.",
			"Dva crvena: nesposoban za manevar; uz svjetla sidrenja: nasukan.",
			"Crveno, bijelo, crveno: ograničen manevriranjem. Tri crvena: ograničen gazom.",
			"Zeleno-bijelo koćar, crveno-bijelo ribar, bijelo-crveno peljar.",
			"Tegljač: dva jarbolna (tri preko 200 m) i žuto iznad krmenog.",
		],
		source: "original",
	},
	{
		slug: "dnevni-znakovi",
		area: "svjetla-znakovi",
		order: 5,
		title: "Dnevni znakovi",
		summary: "Crni oblici koji danju zamjenjuju posebna svjetla.",
		level: "common",
		minutes: 5,
		blocks: [
			{
				type: "text",
				level: "common",
				markdown:
					"Danju se svjetla slabo vide, pa plovila ističu **crne oblike**: kuglu, stožac, valjak i dvostruki stožac. Vješaju se tamo gdje se najbolje vide, obično na jarbolu.\n\nVećina znakova prati noćna svjetla. Gdje noću gori crveno svjetlo, danju često visi kugla.",
			},
			{
				type: "visual",
				level: "common",
				visual: "day-shapes",
				caption: "Složi znakove na jarbol za zadano stanje plovila.",
				props: { mode: "builder" },
			},
			{
				type: "table",
				level: "common",
				caption: "Dnevni znakovi",
				columns: ["Stanje plovila", "Znak"],
				rows: [
					["Usidreno", "jedna kugla na pramčanom dijelu"],
					["Nesposobno za manevar", "dvije kugle u okomici"],
					["Nasukano", "tri kugle u okomici"],
					[
						"Ograničene sposobnosti manevriranja",
						"kugla, dvostruki stožac spojen bazama, kugla",
					],
					["Ograničeno gazom", "valjak"],
					["Ribolov", "dva stošca spojena vrhovima; ispod 20 m smije košara"],
					["Jedrilica na motor", "stožac vrhom prema dolje"],
					[
						"Tegljenje, teglj dulji od 200 m",
						"dvostruki stožac spojen bazama, na tegljaču i na teglju",
					],
					["Čisti mine", "tri kugle (vrh jarbola i dvije sa strane)"],
					["Peljarski brod", "zastava H (bijelo-crvena) iz signalnog kodeksa"],
				],
			},
			{
				type: "remember",
				level: "common",
				items: [
					"Kugle broje nevolju: jedna sidro, dvije ne može se maknuti, tri nasukan.",
					"Stožac vrhom dolje: jedrilica na motor.",
					"Pješčani sat (stošci vrhovima zajedno): ribar.",
					"Valjak: ograničen gazom.",
				],
			},
			{
				type: "check",
				level: "common",
				questionId: "svjetla-znakovi-035",
			},
			{
				type: "check",
				level: "common",
				questionId: "svjetla-znakovi-037",
			},
		],
		cheatSheet: [
			"Svi dnevni znakovi su crni.",
			"Kugla sidro, dvije kugle nesposoban, tri kugle nasukan.",
			"Stožac vrhom dolje: jedrilica na motor.",
			"Stošci vrhovima zajedno: ribolov; valjak: gaz.",
		],
		source: "original",
	},
	{
		slug: "zvucni-signali-u-manevru",
		area: "svjetla-znakovi",
		order: 6,
		title: "Zvučni signali kad se plovila vide",
		summary:
			"Kratki i dugi signali za skretanje, vožnju krmom, pretjecanje i zavoje.",
		level: "common",
		minutes: 5,
		blocks: [
			{
				type: "text",
				level: "common",
				markdown:
					"Kad se plovila vide, sirenom jedno drugom javljaju što rade. **Kratki** signal traje oko 1 sekundu, **dugi** 4 do 6 sekundi.",
			},
			{
				type: "visual",
				level: "common",
				visual: "sound-signal-player",
				caption: "Poslušaj svaki signal i pogodi što znači.",
				props: { set: "manoeuvre" },
			},
			{
				type: "table",
				level: "common",
				caption: "Signali u manevru",
				columns: ["Signal", "Značenje"],
				rows: [
					["1 kratki", "mijenjam kurs udesno"],
					["2 kratka", "mijenjam kurs ulijevo"],
					["3 kratka", "vozim krmom"],
					["5 ili više kratkih", "ne razumijem tvoju namjeru, pazi"],
					["1 dugi", "dolazim iza zavoja ili rta; odgovor je također 1 dugi"],
				],
			},
			{
				type: "text",
				level: "common",
				markdown:
					"U uskom kanalu pretjecanje treba dogovoriti. Plovilo straga pita, plovilo ispred odgovara:\n\n- 2 duga i 1 kratki: želim proći s tvoje desne strane.\n- 2 duga i 2 kratka: želim proći s tvoje lijeve strane.\n- dugi, kratki, dugi, kratki: slažem se.\n\nBez pristanka ne pretječeš. Uz sirenu možeš se dogovoriti i preko VHF-a.",
			},
			{
				type: "remember",
				level: "common",
				items: [
					"Broj kratkih: jedan desno, dva lijevo, tri krmom.",
					"Pet kratkih znači sumnju i upozorenje.",
					"Jedan dugi kod zavoja i rta.",
				],
			},
			{
				type: "check",
				level: "common",
				questionId: "svjetla-znakovi-041",
			},
			{
				type: "check",
				level: "common",
				questionId: "svjetla-znakovi-042",
			},
		],
		cheatSheet: [
			"Kratki oko 1 s, dugi 4 do 6 s.",
			"1 kratki desno, 2 kratka lijevo, 3 kratka krmom.",
			"5 kratkih: ne razumijem, oprez.",
			"Pretjecanje u kanalu: 2 duga + 1 ili 2 kratka; pristanak dugi-kratki-dugi-kratki.",
		],
		source: "original",
	},
	{
		slug: "zvucni-signali-u-magli",
		area: "svjetla-znakovi",
		order: 7,
		title: "Zvučni signali u magli",
		summary: "Kako se javljaš kad ne vidiš ništa, i kako prepoznaješ druge.",
		level: "common",
		minutes: 6,
		blocks: [
			{
				type: "text",
				level: "common",
				markdown:
					"U magli se plovila ne vide, pa se javljaju zvukom. Signali se ponavljaju u razmacima **ne duljim od 2 minute**. Usidrena i nasukana plovila zvone barem **jednom u minuti**.",
			},
			{
				type: "table",
				level: "common",
				caption: "Signali pri smanjenoj vidljivosti",
				columns: ["Plovilo", "Signal"],
				rows: [
					["Motorno, kreće se kroz vodu", "1 dugi"],
					["Motorno, plovi ali stoji", "2 duga"],
					[
						"Jedrilica, ribar, tegljač, nesposoban, ograničen manevriranjem ili gazom",
						"1 dugi i 2 kratka",
					],
					["Usidreno", "brza zvonjava oko 5 s; od 100 m i gong na krmi"],
					["Nasukano", "3 udarca zvona, zvonjava, 3 udarca zvona"],
				],
			},
			{
				type: "visual",
				level: "common",
				visual: "sound-signal-player",
				caption: "Signali u magli: tko se javlja?",
				props: { set: "fog" },
			},
			{
				type: "source-note",
				level: "common",
				markdown:
					"Neke bilješke kažu da dugi signal u magli traje 5 do 7 sekundi. Pravila kažu **4 do 6 sekundi**, isto kao i u manevru.",
			},
			{
				type: "remember",
				level: "common",
				items: [
					"Jedan dugi: motorno plovilo u vožnji.",
					"Dva duga: motorno plovilo koje stoji.",
					"Dugi i dva kratka: plovilo koje se teško uklanja.",
					"Zvono: sidro. Tri udarca prije i poslije: nasukan.",
				],
			},
			{
				type: "check",
				level: "common",
				questionId: "svjetla-znakovi-047",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"Plovilo od 12 m i dulje mora imati zviždaljku (sirenu), od 20 m i zvono, a od 100 m i gong. Plovilo kraće od 12 m ne mora davati propisane signale, ali mora dati neki drugi učinkovit zvučni signal, najviše svake 2 minute.\n\nTegljeni objekt s posadom javlja se s 1 dugim i 3 kratka, odmah nakon signala tegljača. Peljarski brod uz svoj signal smije dati 4 kratka kao znak raspoznavanja.",
			},
			{
				type: "check",
				level: "common",
				questionId: "svjetla-znakovi-050",
			},
		],
		cheatSheet: [
			"Signal u razmacima do 2 minute, sidro najmanje jednom u minuti.",
			"1 dugi u vožnji, 2 duga kad stoji.",
			"Dugi i 2 kratka: jedrilica, ribar, tegljač, ograničeni.",
			"Zvono 5 s: sidro; tri udarca prije i poslije: nasukan.",
		],
		source: "original",
	},
];

export default lessons;
