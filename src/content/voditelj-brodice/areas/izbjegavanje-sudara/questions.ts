import type { IQuestion } from "@/content/types";

const questions: IQuestion[] = [
	{
		id: "izbjegavanje-sudara-001",
		area: "izbjegavanje-sudara",
		lesson: "osmatranje-i-rizik-sudara",
		level: "common",
		type: "single",
		prompt:
			"Kako najlakše prepoznaješ da postoji rizik sudara s plovilom koje se približava?",
		media: {
			visual: "collision-situations",
			props: { focus: "constant-bearing" },
		},
		options: [
			{
				id: "a",
				text: "Smjer u kojem ga vidiš (azimut) ne mijenja se, a ono je sve bliže",
				correct: true,
			},
			{ id: "b", text: "Plovilo je veće od tvoga", correct: false },
			{
				id: "c",
				text: "Plovilo se brzo pomiče prema tvojoj krmi",
				correct: false,
			},
			{ id: "d", text: "Plovilo ima upaljena bočna svjetla", correct: false },
		],
		explanation:
			"Ako plovilo stalno vidiš u istom smjeru, a udaljenost se smanjuje, kursevi vas vode u istu točku. Tada postoji rizik sudara.",
		ruleRef: "COLREG, pravilo 7",
		difficulty: 1,
		source: "original",
	},
	{
		id: "izbjegavanje-sudara-002",
		area: "izbjegavanje-sudara",
		lesson: "osmatranje-i-rizik-sudara",
		level: "common",
		type: "single",
		prompt:
			"Plovilo ti je s desne strane, a kut pod kojim ga vidiš u odnosu na pramac brzo se smanjuje (pomiče se prema tvom pramcu). Što to znači?",
		options: [
			{ id: "a", text: "Proći će ispred tvog pramca", correct: true },
			{ id: "b", text: "Proći će iza tvoje krme", correct: false },
			{ id: "c", text: "Sigurno će doći do sudara", correct: false },
			{ id: "d", text: "Plovilo stoji na mjestu", correct: false },
		],
		explanation:
			"Ako se pramčani kut brzo smanjuje, drugo plovilo odmiče prema tvom pramcu i prolazi ispred tebe. Ako brzo raste, prolazi iza krme. Ako se ne mijenja, postoji rizik sudara.",
		ruleRef: "COLREG, pravilo 7",
		difficulty: 2,
		source: "original",
	},
	{
		id: "izbjegavanje-sudara-003",
		area: "izbjegavanje-sudara",
		lesson: "osmatranje-i-rizik-sudara",
		level: "common",
		type: "true-false",
		prompt:
			"Plovilo koje izbjegava sudar treba napraviti niz malih promjena kursa, da ne zbuni druge.",
		options: [
			{ id: "t", text: "Točno", correct: false },
			{ id: "f", text: "Netočno", correct: true },
		],
		explanation:
			"Male promjene drugo plovilo ne primijeti. Radnja mora biti na vrijeme i dovoljno velika da se odmah vidi, a niz malih promjena treba izbjegavati.",
		ruleRef: "COLREG, pravilo 8",
		difficulty: 1,
		source: "original",
	},
	{
		id: "izbjegavanje-sudara-004",
		area: "izbjegavanje-sudara",
		lesson: "osmatranje-i-rizik-sudara",
		level: "common",
		type: "single",
		prompt: "Što je sigurna brzina?",
		options: [
			{
				id: "a",
				text: "Brzina kojom na vrijeme možeš izbjeći sudar i zaustaviti se na udaljenosti primjerenoj uvjetima",
				correct: true,
			},
			{ id: "b", text: "Uvijek najviše 5 čvorova", correct: false },
			{ id: "c", text: "Najveća brzina koju motor može dati", correct: false },
			{
				id: "d",
				text: "Brzina koju propisuje lučka kapetanija za cijeli Jadran",
				correct: false,
			},
		],
		explanation:
			"Sigurna brzina nije jedan broj. Ovisi o vidljivosti, prometu, vjetru, moru i tvom plovilu, a mora ti ostaviti dovoljno vremena i prostora da izbjegneš sudar.",
		ruleRef: "COLREG, pravilo 6",
		difficulty: 2,
		source: "original",
	},
	{
		id: "izbjegavanje-sudara-005",
		area: "izbjegavanje-sudara",
		lesson: "osmatranje-i-rizik-sudara",
		level: "common",
		type: "multi",
		prompt: "O čemu ovisi sigurna brzina? (Označi sva točna.)",
		options: [
			{ id: "a", text: "O vidljivosti", correct: true },
			{ id: "b", text: "O gustoći prometa", correct: true },
			{ id: "c", text: "O boji trupa", correct: false },
			{ id: "d", text: "O vjetru, moru i strujama", correct: true },
		],
		explanation:
			"Pri određivanju sigurne brzine gledaš vidljivost, promet, stanje vjetra, mora i struja te koliko brzo tvoje plovilo može zaustaviti ili skrenuti.",
		ruleRef: "COLREG, pravilo 6",
		difficulty: 2,
		source: "original",
	},
	{
		id: "izbjegavanje-sudara-006",
		area: "izbjegavanje-sudara",
		lesson: "osmatranje-i-rizik-sudara",
		level: "common",
		type: "true-false",
		prompt: "Osmatranje znači samo gledati oko sebe; slušati nije potrebno.",
		options: [
			{ id: "t", text: "Točno", correct: false },
			{ id: "f", text: "Netočno", correct: true },
		],
		explanation:
			"Osmatra se i vidom i sluhom, i svim drugim sredstvima koja imaš (na primjer radarom). U magli je sluh često važniji od vida.",
		ruleRef: "COLREG, pravilo 5",
		difficulty: 1,
		source: "original",
	},
	{
		id: "izbjegavanje-sudara-007",
		area: "izbjegavanje-sudara",
		lesson: "osmatranje-i-rizik-sudara",
		level: "common",
		type: "single",
		prompt: "Nisi siguran postoji li rizik sudara. Kako postupaš?",
		options: [
			{
				id: "a",
				text: "Smatraš da rizik postoji i ponašaš se prema tome",
				correct: true,
			},
			{ id: "b", text: "Čekaš dok ne budeš siguran", correct: false },
			{ id: "c", text: "Ubrzaš da što prije prođeš", correct: false },
			{ id: "d", text: "Prepustiš odluku drugom plovilu", correct: false },
		],
		explanation:
			"Pravila kažu da se u dvojbi smatra da rizik postoji. Bolje je rano i nepotrebno skrenuti nego zakasniti.",
		ruleRef: "COLREG, pravilo 7",
		difficulty: 2,
		source: "original",
	},
	{
		id: "izbjegavanje-sudara-008",
		area: "izbjegavanje-sudara",
		lesson: "susret-u-protukursu",
		level: "common",
		type: "single",
		prompt:
			"Dva motorna plovila plove jedno prema drugom, pramac prema pramcu. Što rade?",
		media: { visual: "collision-situations", props: { situation: "head-on" } },
		options: [
			{ id: "a", text: "Oba mijenjaju kurs udesno", correct: true },
			{ id: "b", text: "Oba mijenjaju kurs ulijevo", correct: false },
			{
				id: "c",
				text: "Manje plovilo skreće, veće zadržava kurs",
				correct: false,
			},
			{ id: "d", text: "Ono koje je sporije zaustavlja se", correct: false },
		],
		explanation:
			"U susretu nitko nema prednost. Oba plovila skreću udesno i mimoilaze se lijevim bokovima.",
		ruleRef: "COLREG, pravilo 14",
		difficulty: 1,
		source: "original",
	},
	{
		id: "izbjegavanje-sudara-009",
		area: "izbjegavanje-sudara",
		lesson: "susret-u-protukursu",
		level: "common",
		type: "single",
		prompt:
			"Noću točno ispred sebe vidiš crveno i zeleno bočno svjetlo i bijelo jarbolno iznad njih. Ti si motorno plovilo. Što radiš?",
		media: {
			visual: "ship-lights-viewer",
			props: { vessel: "power-12-50m", view: "bow" },
		},
		options: [
			{ id: "a", text: "Skrećeš udesno, na vrijeme i jasno", correct: true },
			{ id: "b", text: "Zadržavaš kurs jer imaš prednost", correct: false },
			{ id: "c", text: "Skrećeš ulijevo", correct: false },
			{ id: "d", text: "Gasiš svjetla da te bolje vidi", correct: false },
		],
		explanation:
			"Oba bočna svjetla i jarbolno znače da ti plovilo dolazi u susret. To je susret u protukursu, pa skrećeš udesno.",
		ruleRef: "COLREG, pravilo 14",
		difficulty: 2,
		source: "original",
	},
	{
		id: "izbjegavanje-sudara-010",
		area: "izbjegavanje-sudara",
		lesson: "susret-u-protukursu",
		level: "common",
		type: "single",
		prompt: "Kakva mora biti promjena kursa kojom izbjegavaš sudar?",
		options: [
			{
				id: "a",
				text: "Na vrijeme i dovoljno velika da je drugo plovilo odmah primijeti",
				correct: true,
			},
			{
				id: "b",
				text: "Što manja, da ne izgubiš puno vremena",
				correct: false,
			},
			{
				id: "c",
				text: "U zadnjem trenutku, da drugo plovilo ne stigne reagirati",
				correct: false,
			},
			{ id: "d", text: "Postupna, jedan stupanj svake minute", correct: false },
		],
		explanation:
			"Drugo plovilo mora jasno vidjeti što radiš. Zato je promjena rana, odlučna i velika, a ne niz sitnih zaokreta.",
		ruleRef: "COLREG, pravilo 8",
		difficulty: 2,
		source: "original",
	},
	{
		id: "izbjegavanje-sudara-011",
		area: "izbjegavanje-sudara",
		lesson: "susret-u-protukursu",
		level: "common",
		type: "true-false",
		prompt:
			"U susretu dva motorna plovila smiješ skrenuti ulijevo ako ti je tako lakše.",
		options: [
			{ id: "t", text: "Točno", correct: false },
			{ id: "f", text: "Netočno", correct: true },
		],
		explanation:
			"Ako jedno skrene ulijevo, a drugo udesno, opet idu jedno prema drugom. Zato je pravilo jedno: oba skreću udesno.",
		ruleRef: "COLREG, pravilo 14",
		difficulty: 1,
		source: "original",
	},
	{
		id: "izbjegavanje-sudara-012",
		area: "izbjegavanje-sudara",
		lesson: "krizanje-kurseva",
		level: "common",
		type: "single",
		prompt:
			"Kursevi dvaju motornih plovila se križaju i postoji rizik sudara. Tko se uklanja?",
		media: { visual: "collision-situations", props: { situation: "crossing" } },
		options: [
			{
				id: "a",
				text: "Ono koje drugo vidi sa svoje desne strane",
				correct: true,
			},
			{
				id: "b",
				text: "Ono koje drugo vidi sa svoje lijeve strane",
				correct: false,
			},
			{ id: "c", text: "Manje plovilo", correct: false },
			{ id: "d", text: "Ono koje je brže", correct: false },
		],
		explanation:
			"Plovilo koje drugo ima s desne strane ustupa put. Ono koje drugo ima s lijeve strane zadržava kurs i brzinu.",
		ruleRef: "COLREG, pravilo 15",
		difficulty: 1,
		source: "original",
	},
	{
		id: "izbjegavanje-sudara-013",
		area: "izbjegavanje-sudara",
		lesson: "krizanje-kurseva",
		level: "common",
		type: "single",
		prompt:
			"Voziš motornu brodicu. Drugo motorno plovilo dolazi ti s lijeve strane i kursevi se križaju. Što radiš?",
		media: {
			visual: "collision-situations",
			props: { situation: "crossing", own: "stand-on" },
		},
		options: [
			{
				id: "a",
				text: "Zadržavaš kurs i brzinu i pažljivo ga pratiš",
				correct: true,
			},
			{ id: "b", text: "Odmah skrećeš ulijevo", correct: false },
			{ id: "c", text: "Odmah se zaustavljaš", correct: false },
			{ id: "d", text: "Ubrzavaš da prođeš ispred njega", correct: false },
		],
		explanation:
			"Ti imaš prednost, pa ostaješ predvidljiv: isti kurs, ista brzina. Pratiš ga i spreman si reagirati ako se on ne ukloni.",
		ruleRef: "COLREG, pravilo 17",
		difficulty: 2,
		source: "original",
	},
	{
		id: "izbjegavanje-sudara-014",
		area: "izbjegavanje-sudara",
		lesson: "krizanje-kurseva",
		level: "common",
		type: "single",
		prompt: "Kako se najbolje ukloniš plovilu koje ti dolazi s desne strane?",
		media: {
			visual: "collision-situations",
			props: { situation: "crossing", own: "give-way" },
		},
		options: [
			{
				id: "a",
				text: "Skreneš udesno i prođeš iza njegove krme",
				correct: true,
			},
			{
				id: "b",
				text: "Ubrzaš i prođeš ispred njegovog pramca",
				correct: false,
			},
			{ id: "c", text: "Skreneš ulijevo i plovite usporedno", correct: false },
			{ id: "d", text: "Daš pet kratkih i nastaviš", correct: false },
		],
		explanation:
			"Plovilo koje ustupa treba izbjeći prolazak ispred pramca drugog plovila. Najjasnije je skrenuti udesno i proći mu po krmi, ili usporiti i pustiti ga da prođe.",
		ruleRef: "COLREG, pravila 15 i 16",
		difficulty: 2,
		source: "original",
	},
	{
		id: "izbjegavanje-sudara-015",
		area: "izbjegavanje-sudara",
		lesson: "krizanje-kurseva",
		level: "common",
		type: "single",
		prompt:
			"Noću s desne strane vidiš crveno bočno svjetlo i jarbolno svjetlo, a smjer prema njima se ne mijenja. Oba ste motorna plovila. Tko se uklanja?",
		media: {
			visual: "ship-lights-viewer",
			props: { vessel: "power-12-50m", view: "port" },
		},
		options: [
			{ id: "a", text: "Ti", correct: true },
			{ id: "b", text: "Drugo plovilo", correct: false },
			{ id: "c", text: "Nitko, oba zadržavaju kurs", correct: false },
			{ id: "d", text: "Oba skreću ulijevo", correct: false },
		],
		explanation:
			"Vidiš njegovo crveno, lijevo svjetlo, a ono ti je s desne strane. Zato ti ustupaš put. Lako pravilo: vidiš li crveno, ti se mičeš.",
		ruleRef: "COLREG, pravilo 15",
		difficulty: 2,
		source: "original",
	},
	{
		id: "izbjegavanje-sudara-016",
		area: "izbjegavanje-sudara",
		lesson: "krizanje-kurseva",
		level: "common",
		type: "single",
		prompt:
			"Imaš prednost, ali plovilo koje se treba ukloniti ništa ne poduzima i sve je bliže. Što prvo napraviš?",
		options: [
			{
				id: "a",
				text: "Daš najmanje pet kratkih zvučnih signala",
				correct: true,
			},
			{ id: "b", text: "Skreneš ulijevo prema njemu", correct: false },
			{ id: "c", text: "Ubrzaš da prođeš ispred njega", correct: false },
			{ id: "d", text: "Ne radiš ništa, ti imaš prednost", correct: false },
		],
		explanation:
			"Pet kratkih upozorava da sumnjaš u njegovu namjeru. Ako i dalje ne reagira, smiješ i sam manevrirati, a kad sudar ne može izbjeći samo on, moraš.",
		ruleRef: "COLREG, pravila 17 i 34",
		difficulty: 3,
		source: "original",
	},
	{
		id: "izbjegavanje-sudara-017",
		area: "izbjegavanje-sudara",
		lesson: "krizanje-kurseva",
		level: "common",
		type: "multi",
		prompt:
			"Plovilo s prednošću vidi da se drugo ne uklanja. Što je ispravno? (Označi sva točna.)",
		options: [
			{ id: "a", text: "Dati signal od najmanje pet kratkih", correct: true },
			{
				id: "b",
				text: "Manevrirati kad sudar više ne može izbjeći samo drugo plovilo",
				correct: true,
			},
			{
				id: "c",
				text: "Skrenuti ulijevo prema plovilu koje mu je s lijeve strane",
				correct: false,
			},
			{ id: "d", text: "Ubrzati i proći mu ispred pramca", correct: false },
		],
		explanation:
			"Plovilo s prednošću upozorava, a u krajnjoj nuždi i samo izbjegava sudar. Ne smije skrenuti ulijevo prema plovilu koje mu je s lijeve strane, jer bi mu išlo ravno u put.",
		ruleRef: "COLREG, pravilo 17",
		difficulty: 3,
		source: "original",
	},
	{
		id: "izbjegavanje-sudara-018",
		area: "izbjegavanje-sudara",
		lesson: "pretjecanje",
		level: "common",
		type: "single",
		prompt: "Kada se smatra da pretječeš drugo plovilo?",
		media: {
			visual: "collision-situations",
			props: { situation: "overtaking" },
		},
		options: [
			{
				id: "a",
				text: "Kad mu prilaziš iz smjera više od 22,5° iza njegove poprečnice",
				correct: true,
			},
			{
				id: "b",
				text: "Kad si brži od njega, iz bilo kojeg smjera",
				correct: false,
			},
			{ id: "c", text: "Kad mu prilaziš točno s boka", correct: false },
			{ id: "d", text: "Samo kad ste u uskom kanalu", correct: false },
		],
		explanation:
			"Pretječeš kad dolaziš iz sektora njegovog krmenog svjetla, više od 22,5° iza poprečnice. Noću tada vidiš samo njegovo krmeno svjetlo.",
		ruleRef: "COLREG, pravilo 13",
		difficulty: 3,
		source: "original",
	},
	{
		id: "izbjegavanje-sudara-019",
		area: "izbjegavanje-sudara",
		lesson: "pretjecanje",
		level: "common",
		type: "single",
		prompt: "Tko se uklanja kod pretjecanja?",
		options: [
			{ id: "a", text: "Plovilo koje pretječe", correct: true },
			{ id: "b", text: "Plovilo koje se pretječe", correct: false },
			{ id: "c", text: "Manje plovilo", correct: false },
			{ id: "d", text: "Motorno plovilo, uvijek", correct: false },
		],
		explanation:
			"Plovilo koje pretječe uvijek se uklanja, bez obzira na vrstu plovila. Plovilo ispred zadržava kurs i brzinu.",
		ruleRef: "COLREG, pravilo 13",
		difficulty: 1,
		source: "original",
	},
	{
		id: "izbjegavanje-sudara-020",
		area: "izbjegavanje-sudara",
		lesson: "pretjecanje",
		level: "common",
		type: "true-false",
		prompt:
			"Jedrilica koja pretječe motornu brodicu ima prednost jer je jedrilica.",
		options: [
			{ id: "t", text: "Točno", correct: false },
			{ id: "f", text: "Netočno", correct: true },
		],
		explanation:
			"Pravilo o pretjecanju jače je od prednosti jedrilice. Jedrilica koja pretječe mora se ukloniti kao i svako drugo plovilo.",
		ruleRef: "COLREG, pravila 13 i 18",
		difficulty: 1,
		source: "original",
	},
	{
		id: "izbjegavanje-sudara-021",
		area: "izbjegavanje-sudara",
		lesson: "pretjecanje",
		level: "common",
		type: "single",
		prompt:
			"Noću ispred sebe vidiš samo jedno bijelo krmeno svjetlo i polako mu se približavaš. U kojoj si situaciji?",
		media: {
			visual: "ship-lights-viewer",
			props: { vessel: "power-12-50m", view: "stern" },
		},
		options: [
			{ id: "a", text: "Pretječeš ga i ti se uklanjaš", correct: true },
			{
				id: "b",
				text: "Susret u protukursu, oba skrećete udesno",
				correct: false,
			},
			{ id: "c", text: "Križanje u kojem ti imaš prednost", correct: false },
			{
				id: "d",
				text: "To je usidreno plovilo, pa nema pravila",
				correct: false,
			},
		],
		explanation:
			"Samo krmeno svjetlo znači da ga gledaš straga. Ako mu se približavaš, ti pretječeš i ti se uklanjaš. Pazi: usidreno plovilo ima bijelo kružno svjetlo, pa izgleda slično, zato prati mijenja li se udaljenost.",
		ruleRef: "COLREG, pravilo 13",
		difficulty: 2,
		source: "original",
	},
	{
		id: "izbjegavanje-sudara-022",
		area: "izbjegavanje-sudara",
		lesson: "pretjecanje",
		level: "common",
		type: "single",
		prompt:
			"Na otvorenom moru pretječeš sporije plovilo. S koje strane smiješ proći?",
		options: [
			{
				id: "a",
				text: "S bilo koje strane, ali mu ne smiješ presjeći kurs ispred pramca",
				correct: true,
			},
			{ id: "b", text: "Samo s njegove lijeve strane", correct: false },
			{ id: "c", text: "Samo s njegove desne strane", correct: false },
			{
				id: "d",
				text: "Ni s koje, na otvorenom moru pretjecanje je zabranjeno",
				correct: false,
			},
		],
		explanation:
			"Na otvorenom moru biraš stranu prema prometu oko sebe. Drži sigurnu udaljenost i ne prelazi mu ispred pramca dok ga ne prestigneš potpuno.",
		ruleRef: "COLREG, pravilo 13",
		difficulty: 2,
		source: "original",
	},
	{
		id: "izbjegavanje-sudara-023",
		area: "izbjegavanje-sudara",
		lesson: "jedrilice-medusobno",
		level: "common",
		type: "single",
		prompt:
			"Dvije jedrilice primaju vjetar u različite bokove. Koja se uklanja?",
		media: {
			visual: "collision-situations",
			props: { situation: "sail-opposite-tacks" },
		},
		options: [
			{ id: "a", text: "Ona koja prima vjetar s lijeve strane", correct: true },
			{ id: "b", text: "Ona koja prima vjetar s desne strane", correct: false },
			{ id: "c", text: "Ona koja je manja", correct: false },
			{ id: "d", text: "Ona koja je bliže obali", correct: false },
		],
		explanation:
			"Kad su vjetrovi u različite bokove, uklanja se jedrilica koja vjetar prima s lijeve strane.",
		ruleRef: "COLREG, pravilo 12",
		difficulty: 2,
		source: "original",
	},
	{
		id: "izbjegavanje-sudara-024",
		area: "izbjegavanje-sudara",
		lesson: "jedrilice-medusobno",
		level: "common",
		type: "single",
		prompt: "Dvije jedrilice primaju vjetar u isti bok. Koja se uklanja?",
		media: {
			visual: "collision-situations",
			props: { situation: "sail-same-tack" },
		},
		options: [
			{ id: "a", text: "Ona u privjetrini (bliže vjetru)", correct: true },
			{ id: "b", text: "Ona u zavjetrini", correct: false },
			{ id: "c", text: "Ona koja je brža", correct: false },
			{ id: "d", text: "Nijedna, obje zadržavaju kurs", correct: false },
		],
		explanation:
			"Jedrilica u privjetrini ima vjetar prva i lakše manevrira, pa se ona uklanja. Jedrilica u zavjetrini ima prednost.",
		ruleRef: "COLREG, pravilo 12",
		difficulty: 2,
		source: "original",
	},
	{
		id: "izbjegavanje-sudara-025",
		area: "izbjegavanje-sudara",
		lesson: "jedrilice-medusobno",
		level: "common",
		type: "single",
		prompt: "Kako odrediš koja je strana jedrilice privjetrinska?",
		options: [
			{
				id: "a",
				text: "To je strana suprotna onoj na kojoj je glavno jedro",
				correct: true,
			},
			{ id: "b", text: "To je uvijek desna strana", correct: false },
			{
				id: "c",
				text: "To je strana na kojoj je glavno jedro",
				correct: false,
			},
			{ id: "d", text: "To je strana okrenuta obali", correct: false },
		],
		explanation:
			"Vjetar gura glavno jedro na suprotnu stranu od one s koje puše. Zato je privjetrinska strana suprotna od strane na kojoj je glavno jedro.",
		ruleRef: "COLREG, pravilo 12",
		difficulty: 3,
		source: "original",
	},
	{
		id: "izbjegavanje-sudara-026",
		area: "izbjegavanje-sudara",
		lesson: "jedrilice-medusobno",
		level: "common",
		type: "single",
		prompt:
			"Motorna brodica i jedrilica pod jedrima križaju kurseve. Tko se uklanja?",
		media: {
			visual: "collision-situations",
			props: { situation: "power-vs-sail" },
		},
		options: [
			{ id: "a", text: "Motorna brodica", correct: true },
			{ id: "b", text: "Jedrilica", correct: false },
			{
				id: "c",
				text: "Ono plovilo koje drugo vidi s desne strane",
				correct: false,
			},
			{ id: "d", text: "Manje plovilo", correct: false },
		],
		explanation:
			"Motorno plovilo se uklanja jedrilici pod jedrima. Iznimke su pretjecanje (tko pretječe, uklanja se) i uski kanal, gdje jedrilica ne smije ometati veliki brod.",
		ruleRef: "COLREG, pravilo 18",
		difficulty: 1,
		source: "original",
	},
	{
		id: "izbjegavanje-sudara-027",
		area: "izbjegavanje-sudara",
		lesson: "redoslijed-prednosti",
		level: "common",
		type: "single",
		prompt:
			"Jedrilica pod jedrima i ribarsko plovilo koje lovi mrežom približavaju se. Tko se uklanja?",
		options: [
			{ id: "a", text: "Jedrilica", correct: true },
			{ id: "b", text: "Ribarsko plovilo", correct: false },
			{ id: "c", text: "Oba skreću udesno", correct: false },
			{ id: "d", text: "Ono koje je brže", correct: false },
		],
		explanation:
			"Ribar koji lovi teško manevrira jer je vezan za mreže. Zato mu se jedrilica uklanja.",
		ruleRef: "COLREG, pravilo 18",
		difficulty: 2,
		source: "original",
	},
	{
		id: "izbjegavanje-sudara-028",
		area: "izbjegavanje-sudara",
		lesson: "redoslijed-prednosti",
		level: "common",
		type: "single",
		prompt: "Motorna jahta i brod s dva crvena kružna svjetla. Tko se uklanja?",
		options: [
			{ id: "a", text: "Motorna jahta", correct: true },
			{ id: "b", text: "Brod s dva crvena svjetla", correct: false },
			{ id: "c", text: "Ono plovilo koje je s lijeve strane", correct: false },
			{ id: "d", text: "Oba skreću ulijevo", correct: false },
		],
		explanation:
			"Dva crvena svjetla znače da je brod nesposoban za manevar. Takav brod ne može se maknuti, pa mu se uklanjaju svi.",
		ruleRef: "COLREG, pravilo 18",
		difficulty: 1,
		source: "original",
	},
	{
		id: "izbjegavanje-sudara-029",
		area: "izbjegavanje-sudara",
		lesson: "redoslijed-prednosti",
		level: "common",
		type: "single",
		prompt:
			"Tegljač s teglom pokazuje crveno, bijelo, crveno jer se zbog teglja ne može lako uklanjati. Jedrilica mu se približava. Tko se uklanja?",
		options: [
			{ id: "a", text: "Jedrilica", correct: true },
			{ id: "b", text: "Tegljač", correct: false },
			{ id: "c", text: "Oba skreću udesno", correct: false },
			{ id: "d", text: "Ono koje je brže", correct: false },
		],
		explanation:
			"Plovilo ograničene sposobnosti manevriranja ima prednost i pred jedrilicom. Tegljač je ograničen u manevriranju samo ako teglj bitno ograničava njegovu mogućnost skretanja (pravilo 3(g)(vi)). Inače je motorno plovilo, pa tada jedrilica ima prednost.",
		ruleRef: "COLREG, pravila 18 i 27",
		difficulty: 3,
		source: "original",
	},
	{
		id: "izbjegavanje-sudara-030",
		area: "izbjegavanje-sudara",
		lesson: "redoslijed-prednosti",
		level: "common",
		type: "single",
		prompt:
			"Koji je redoslijed, od plovila kojem se svi uklanjaju prema onom koje se uklanja najviše?",
		options: [
			{
				id: "a",
				text: "Nesposoban za manevar i ograničen manevriranjem, ribar, jedrilica, motorno plovilo",
				correct: true,
			},
			{
				id: "b",
				text: "Motorno plovilo, jedrilica, ribar, nesposoban za manevar",
				correct: false,
			},
			{
				id: "c",
				text: "Jedrilica, motorno plovilo, ribar, nesposoban za manevar",
				correct: false,
			},
			{
				id: "d",
				text: "Ribar, jedrilica, nesposoban za manevar, motorno plovilo",
				correct: false,
			},
		],
		explanation:
			"Što se plovilo teže miče, to je više na popisu. Motorno plovilo se miče najlakše, pa se uklanja svima iznad sebe. Plovilo ograničeno gazom ne smije se ometati.",
		ruleRef: "COLREG, pravilo 18",
		difficulty: 3,
		source: "original",
	},
	{
		id: "izbjegavanje-sudara-031",
		area: "izbjegavanje-sudara",
		lesson: "uski-kanali-i-luke",
		level: "common",
		type: "single",
		prompt: "Kojom stranom uskog kanala ploviš?",
		media: {
			visual: "collision-situations",
			props: { situation: "narrow-channel" },
		},
		options: [
			{
				id: "a",
				text: "Što bliže desnom rubu kanala, koliko je sigurno",
				correct: true,
			},
			{ id: "b", text: "Sredinom kanala", correct: false },
			{ id: "c", text: "Što bliže lijevom rubu", correct: false },
			{ id: "d", text: "Svejedno, ovisi o vjetru", correct: false },
		],
		explanation:
			"U uskom kanalu držiš se desnog ruba, koliko je to sigurno i moguće. Tako plovila iz suprotnih smjerova imaju svako svoju stranu.",
		ruleRef: "COLREG, pravilo 9",
		difficulty: 1,
		source: "original",
	},
	{
		id: "izbjegavanje-sudara-032",
		area: "izbjegavanje-sudara",
		lesson: "uski-kanali-i-luke",
		level: "common",
		type: "single",
		prompt:
			"Voziš brodicu od 8 m kroz uski kanal. Prema tebi dolazi veliki brod koji može ploviti samo unutar kanala. Što vrijedi?",
		options: [
			{
				id: "a",
				text: "Ne smiješ mu ometati prolaz, makneš mu se na vrijeme",
				correct: true,
			},
			{ id: "b", text: "On se mora maknuti tebi jer je veći", correct: false },
			{
				id: "c",
				text: "Oba se zaustavljate na sredini kanala",
				correct: false,
			},
			{
				id: "d",
				text: "Prednost ima onaj tko je prvi ušao u kanal",
				correct: false,
			},
		],
		explanation:
			"Plovila kraća od 20 m i jedrilice ne smiju ometati plovilo koje sigurno može ploviti samo unutar kanala.",
		ruleRef: "COLREG, pravilo 9",
		difficulty: 2,
		source: "original",
	},
	{
		id: "izbjegavanje-sudara-033",
		area: "izbjegavanje-sudara",
		lesson: "uski-kanali-i-luke",
		level: "B",
		type: "single",
		prompt: "Moraš prijeći shemu odvojene plovidbe. Kako to radiš?",
		options: [
			{
				id: "a",
				text: "Što bliže pravim kutom na smjer prometa",
				correct: true,
			},
			{
				id: "b",
				text: "Pod oštrim kutom, da što duže ploviš s prometom",
				correct: false,
			},
			{
				id: "c",
				text: "Ploviš uz razdjelnu zonu dok ne nađeš prazninu",
				correct: false,
			},
			{ id: "d", text: "Prijelaz sheme je zabranjen", correct: false },
		],
		explanation:
			"Prelaziš kursom što bližim pravom kutu na smjer prometa. Tako si najkraće u prometnoj traci i drugi te jasno vide.",
		ruleRef: "COLREG, pravilo 10",
		difficulty: 2,
		source: "original",
	},
	{
		id: "izbjegavanje-sudara-034",
		area: "izbjegavanje-sudara",
		lesson: "uski-kanali-i-luke",
		level: "common",
		type: "single",
		prompt:
			"Na ulazu u luku susreću se plovilo koje izlazi i plovilo koje ulazi. Što se uči za ispit?",
		options: [
			{ id: "a", text: "Prednost ima plovilo koje izlazi", correct: true },
			{ id: "b", text: "Prednost ima plovilo koje ulazi", correct: false },
			{ id: "c", text: "Prednost ima manje plovilo", correct: false },
			{
				id: "d",
				text: "Oba se zaustavljaju i čekaju lučkog pilota",
				correct: false,
			},
		],
		explanation:
			"Ovo pravilo je u Pravilniku o sigurnosti pomorske plovidbe (čl. 46. st. 2), a ne u COLREG-u. Plovilo koje ulazi ne smije ometati ono koje izlazi.",
		ruleRef:
			"Pravilnik o sigurnosti pomorske plovidbe, čl. 46. st. 2 (NN 52/25)",
		difficulty: 2,
		source: "original",
	},
	{
		id: "izbjegavanje-sudara-035",
		area: "izbjegavanje-sudara",
		lesson: "uski-kanali-i-luke",
		level: "common",
		type: "true-false",
		prompt: "Sidriti se u uskom kanalu smiješ kad god je more mirno.",
		options: [
			{ id: "t", text: "Točno", correct: false },
			{ id: "f", text: "Netočno", correct: true },
		],
		explanation:
			"U uskom kanalu sidrenje treba izbjegavati kad god okolnosti dopuštaju, jer usidreno plovilo zatvara put drugima.",
		ruleRef: "COLREG, pravilo 9",
		difficulty: 1,
		source: "original",
	},
	{
		id: "izbjegavanje-sudara-036",
		area: "izbjegavanje-sudara",
		lesson: "plovidba-u-smanjenoj-vidljivosti",
		level: "B",
		type: "single",
		prompt:
			"U magli na radaru vidiš plovilo naprijed desno, ispred poprečnice, i približava se. Koji manevar trebaš izbjegavati?",
		options: [
			{ id: "a", text: "Skretanje ulijevo", correct: true },
			{ id: "b", text: "Skretanje udesno", correct: false },
			{ id: "c", text: "Smanjenje brzine", correct: false },
			{ id: "d", text: "Davanje signala za maglu", correct: false },
		],
		explanation:
			"Kad plovilo otkriješ samo radarom, a ono je ispred poprečnice, ne skrećeš ulijevo (osim ako ga pretječeš). Skretanje ulijevo moglo bi te dovesti ravno pred njega.",
		ruleRef: "COLREG, pravilo 19",
		difficulty: 3,
		source: "original",
	},
	{
		id: "izbjegavanje-sudara-037",
		area: "izbjegavanje-sudara",
		lesson: "plovidba-u-smanjenoj-vidljivosti",
		level: "B",
		type: "single",
		prompt:
			"U magli čuješ signal za maglu negdje ispred sebe, a plovilo ne vidiš. Što radiš?",
		options: [
			{
				id: "a",
				text: "Smanjiš brzinu na najmanju kojom još možeš upravljati, a po potrebi se zaustaviš",
				correct: true,
			},
			{
				id: "b",
				text: "Ubrzaš da što prije prođeš to područje",
				correct: false,
			},
			{ id: "c", text: "Oštro skreneš ulijevo", correct: false },
			{
				id: "d",
				text: "Nastaviš istom brzinom i pojačaš svoj signal",
				correct: false,
			},
		],
		explanation:
			"Ne znaš gdje je ni kamo ide. Zato usporiš na najmanju brzinu za kormilarenje, po potrebi potpuno staneš i ploviš oprezno dok opasnost ne prođe.",
		ruleRef: "COLREG, pravilo 19",
		difficulty: 2,
		source: "original",
	},
	{
		id: "izbjegavanje-sudara-038",
		area: "izbjegavanje-sudara",
		lesson: "plovidba-u-smanjenoj-vidljivosti",
		level: "B",
		type: "true-false",
		prompt:
			"Kad se u magli plovila ne vide, nijedno nema prednost: svako mora samo poduzeti radnju za izbjegavanje sudara.",
		options: [
			{ id: "t", text: "Točno", correct: true },
			{ id: "f", text: "Netočno", correct: false },
		],
		explanation:
			"Pravila o prednosti (križanje, susret, pretjecanje, jedrilice) vrijede kad se plovila vide. U magli svako plovilo samo procjenjuje rizik i na vrijeme poduzima radnju.",
		ruleRef: "COLREG, pravilo 19",
		difficulty: 3,
		source: "original",
	},
];

export default questions;
