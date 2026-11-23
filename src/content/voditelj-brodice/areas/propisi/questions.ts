import type { IQuestion } from "@/content/types";

const questions: IQuestion[] = [
	{
		id: "propisi-001",
		area: "propisi",
		lesson: "pojmovi",
		level: "B",
		type: "single",
		prompt: "Koja duljina trupa odgovara pojmu brodica?",
		options: [
			{ id: "a", text: "Više od 2,5 m i najviše 15 m", correct: true },
			{ id: "b", text: "Više od 5 m i najviše 24 m", correct: false },
			{
				id: "c",
				text: "Bilo koja duljina, ako plovilo ima motor",
				correct: false,
			},
			{ id: "d", text: "Najviše 12 m", correct: false },
		],
		explanation:
			"Brodica je plovilo za more dulje od 2,5 m i najviše 15 m, ili s motorima jačim od 5 kW, koje smije voziti najviše 12 putnika.",
		ruleRef: "Pravilnik o brodicama, čamcima i jahtama (NN 13/20), čl. 4",
		difficulty: 1,
		source: "original",
	},
	{
		id: "propisi-002",
		area: "propisi",
		lesson: "pojmovi",
		level: "B",
		type: "single",
		prompt: "Što je jahta?",
		options: [
			{ id: "a", text: "Svako plovilo s kabinom", correct: false },
			{
				id: "b",
				text: "Plovilo za sport i razonodu dulje od 15 m koje uz posadu smije voziti najviše 12 putnika",
				correct: true,
			},
			{ id: "c", text: "Jedrilica dulja od 10 m", correct: false },
			{
				id: "d",
				text: "Plovilo ovlašteno za više od 12 putnika",
				correct: false,
			},
		],
		explanation:
			"Jahta je namijenjena sportu i razonodi, dulja je od 15 m i uz posadu smije voziti najviše 12 putnika, bez obzira iznajmljuje li se.",
		ruleRef: "Pravilnik o brodicama, čamcima i jahtama (NN 13/20), čl. 4",
		difficulty: 1,
		source: "original",
	},
	{
		id: "propisi-003",
		area: "propisi",
		lesson: "pojmovi",
		level: "B",
		type: "single",
		prompt:
			"Plovilo dugo 12 m ovlašteno je prevoziti 40 putnika. Što je ono po propisu?",
		options: [
			{ id: "a", text: "Brodica, jer je kraće od 15 m", correct: false },
			{ id: "b", text: "Jahta", correct: false },
			{
				id: "c",
				text: "Brod, jer smije voziti više od 12 putnika",
				correct: true,
			},
		],
		explanation:
			"Brod je plovilo dulje od 15 m ili ovlašteno za više od 12 putnika. Dovoljan je jedan od ta dva uvjeta, pa i kraće plovilo može biti brod.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "propisi-004",
		area: "propisi",
		lesson: "pojmovi",
		level: "B",
		type: "single",
		prompt: "Koliko osoba smije istovremeno voziti plovilo dugo najviše 2,5 m?",
		options: [
			{ id: "a", text: "Jednu", correct: false },
			{ id: "b", text: "Dvije", correct: true },
			{ id: "c", text: "Tri", correct: false },
			{ id: "d", text: "Koliko stane", correct: false },
		],
		explanation:
			"Plovilom dugim 2,5 m ili kraćim smiju se istovremeno voziti najviše dvije osobe.",
		ruleRef: "Pravilnik o brodicama, čamcima i jahtama (NN 13/20), čl. 6",
		difficulty: 1,
		source: "original",
	},
	{
		id: "propisi-005",
		area: "propisi",
		lesson: "pojmovi",
		level: "B",
		type: "true-false",
		prompt: "Gumenjak dug 2,3 m s motorom od 6 kW po propisu je brodica.",
		options: [
			{ id: "t", text: "Točno", correct: true },
			{ id: "f", text: "Netočno", correct: false },
		],
		explanation:
			"Kraći je od 2,5 m, ali ukupna snaga motora veća je od 5 kW, a to je dovoljno da bude brodica.",
		ruleRef: "Pravilnik o brodicama, čamcima i jahtama (NN 13/20), čl. 4",
		difficulty: 3,
		source: "original",
	},
	{
		id: "propisi-006",
		area: "propisi",
		lesson: "pojmovi",
		level: "B",
		type: "single",
		prompt: "Tko se ne ubraja u putnike?",
		options: [
			{ id: "a", text: "Dijete mlađe od jedne godine", correct: true },
			{ id: "b", text: "Dijete mlađe od 12 godina", correct: false },
			{ id: "c", text: "Vlasnik brodice kad ne upravlja", correct: false },
			{ id: "d", text: "Prijatelj koji ne plaća vožnju", correct: false },
		],
		explanation:
			"Putnik je svaka osoba na plovilu osim djece mlađe od jedne godine i ljudi zaposlenih na plovilu.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "propisi-007",
		area: "propisi",
		lesson: "pojmovi",
		level: "B",
		type: "true-false",
		prompt: "Kajak dug 4 m po propisu je brodica.",
		options: [
			{ id: "t", text: "Točno", correct: false },
			{ id: "f", text: "Netočno", correct: true },
		],
		explanation:
			"Kanui, kajaci, gondole, pedaline i daske izričito nisu brodice, bez obzira na duljinu.",
		ruleRef: "Pravilnik o brodicama, čamcima i jahtama (NN 13/20), čl. 4",
		difficulty: 1,
		source: "original",
	},
	{
		id: "propisi-008",
		area: "propisi",
		lesson: "pojmovi",
		level: "B",
		type: "single",
		prompt: "Osobno plovilo na vodomlazni pogon (skuter) je brodica kraća od:",
		options: [
			{ id: "a", text: "2,5 m", correct: false },
			{ id: "b", text: "4 m", correct: true },
			{ id: "c", text: "6 m", correct: false },
			{ id: "d", text: "7 m", correct: false },
		],
		explanation:
			"Skuter je brodica kraća od 4 m s motorom i mlaznom pumpom, na kojoj osoba sjedi, stoji ili kleči.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "propisi-009",
		area: "propisi",
		lesson: "podrucja-i-ovlasti",
		level: "common",
		type: "single",
		prompt: "Koliko se daleko od najbliže obale proteže područje plovidbe III?",
		media: { visual: "navigation-areas-map", props: { highlight: "III" } },
		options: [
			{ id: "a", text: "6 NM", correct: false },
			{ id: "b", text: "12 NM", correct: true },
			{ id: "c", text: "20 NM", correct: false },
			{ id: "d", text: "Do granice teritorijalnog mora", correct: false },
		],
		explanation:
			"Područje III ide do 12 NM od najbliže obale kopna ili otoka. Unutar njega su uža područja IIIa (6 NM), IIIb (3 NM) i IIIc (1 NM).",
		ruleRef: "Pravilnik o brodicama, čamcima i jahtama (NN 13/20), čl. 37",
		difficulty: 1,
		source: "original",
	},
	{
		id: "propisi-010",
		area: "propisi",
		lesson: "podrucja-i-ovlasti",
		level: "common",
		type: "single",
		prompt: "Koja je granica područja plovidbe II?",
		media: { visual: "navigation-areas-map", props: { highlight: "II" } },
		options: [
			{ id: "a", text: "Cijelo Jadransko more", correct: false },
			{
				id: "b",
				text: "20 NM od najbliže obale kopna ili otoka",
				correct: true,
			},
			{ id: "c", text: "12 NM od obale kopna", correct: false },
			{ id: "d", text: "Unutarnje morske vode RH", correct: false },
		],
		explanation:
			'Danas je područje II plovidba do 20 NM od najbliže obale. Stari opis "Jadransko more" više ne vrijedi.',
		ruleRef: "Pravilnik o brodicama, čamcima i jahtama (NN 13/20), čl. 37",
		difficulty: 1,
		source: "original",
	},
	{
		id: "propisi-011",
		area: "propisi",
		lesson: "podrucja-i-ovlasti",
		level: "common",
		type: "single",
		prompt: "Do koje udaljenosti od obale seže područje IIIb?",
		media: { visual: "navigation-areas-map", props: { highlight: "IIIb" } },
		options: [
			{ id: "a", text: "1 NM", correct: false },
			{ id: "b", text: "3 NM", correct: true },
			{ id: "c", text: "6 NM", correct: false },
			{ id: "d", text: "12 NM", correct: false },
		],
		explanation:
			"IIIa je do 6 NM, IIIb do 3 NM, a IIIc do 1 NM od obale kopna ili otoka.",
		ruleRef: "Pravilnik o brodicama, čamcima i jahtama (NN 13/20), čl. 37",
		difficulty: 2,
		source: "original",
	},
	{
		id: "propisi-012",
		area: "propisi",
		lesson: "podrucja-i-ovlasti",
		level: "common",
		type: "single",
		prompt: "Što obuhvaća područje plovidbe IV?",
		options: [
			{ id: "a", text: "More do 1 NM od obale", correct: false },
			{
				id: "b",
				text: "Luke, zaljeve, ušća rijeka i rijeke dokle su plovne s mora",
				correct: true,
			},
			{ id: "c", text: "Samo marine", correct: false },
			{ id: "d", text: "Sva jezera i rijeke u Hrvatskoj", correct: false },
		],
		explanation:
			"Područje IV su luke, zaljevi, ušća rijeka i rijeke do granice do koje su plovne s morske strane.",
		ruleRef: "Pravilnik o brodicama, čamcima i jahtama (NN 13/20), čl. 37",
		difficulty: 1,
		source: "original",
	},
	{
		id: "propisi-013",
		area: "propisi",
		lesson: "podrucja-i-ovlasti",
		level: "A",
		type: "single",
		prompt: "Kakvom brodicom smije upravljati voditelj brodice kategorije A?",
		options: [
			{
				id: "a",
				text: "Brodicom za osobne potrebe do 7 m s motorom do 15 kW",
				correct: true,
			},
			{ id: "b", text: "Brodicom do 12 m s motorom do 30 kW", correct: false },
			{ id: "c", text: "Bilo kojom brodicom, ali samo u luci", correct: false },
			{ id: "d", text: "Jahtom do 18 m", correct: false },
		],
		explanation:
			"Kategorija A pokriva brodice za osobne potrebe duge do 7 m s porivnim motorom do 15 kW.",
		ruleRef: "Pravilnik o brodicama i jahtama (NN 27/05 i izmjene), čl. 70",
		difficulty: 1,
		source: "original",
	},
	{
		id: "propisi-014",
		area: "propisi",
		lesson: "podrucja-i-ovlasti",
		level: "A",
		type: "multi",
		prompt:
			"U kojim područjima smije ploviti voditelj brodice kategorije A? Označi sve točne.",
		media: { visual: "navigation-areas-map", props: { certificate: "A" } },
		options: [
			{ id: "a", text: "IIIa", correct: true },
			{ id: "b", text: "IIIc", correct: true },
			{ id: "c", text: "IV", correct: true },
			{ id: "d", text: "III (do 12 NM)", correct: false },
		],
		explanation:
			"Kategorija A smije u područja IIIa, IIIb, IIIc i IV, dakle najviše 6 NM od obale. Za područje III do 12 NM treba B.",
		ruleRef: "Pravilnik o brodicama i jahtama (NN 27/05 i izmjene), čl. 70",
		difficulty: 2,
		source: "original",
	},
	{
		id: "propisi-015",
		area: "propisi",
		lesson: "podrucja-i-ovlasti",
		level: "B",
		type: "true-false",
		prompt:
			"Šesnaestogodišnjak s uvjerenjem B smije upravljati brodicom s motorom od 20 kW.",
		options: [
			{ id: "t", text: "Točno", correct: false },
			{ id: "f", text: "Netočno", correct: true },
		],
		explanation:
			"Brodicom s motorom jačim od 15 kW smije upravljati voditelj B tek kad navrši 18 godina. Do tada je ograničen na 15 kW.",
		ruleRef: "Pravilnik o brodicama i jahtama (NN 27/05 i izmjene), čl. 70",
		difficulty: 2,
		source: "original",
	},
	{
		id: "propisi-016",
		area: "propisi",
		lesson: "podrucja-i-ovlasti",
		level: "B",
		type: "single",
		prompt:
			"Koliko godina moraš imati da bi stekao uvjerenje za voditelja brodice kategorije B?",
		options: [
			{ id: "a", text: "Najmanje 15", correct: false },
			{ id: "b", text: "Najmanje 16", correct: true },
			{ id: "c", text: "Najmanje 18", correct: false },
			{ id: "d", text: "Najmanje 21", correct: false },
		],
		explanation:
			"Za kategoriju B treba najmanje 16 godina, za A 15, a za C 18 godina.",
		ruleRef: "Pravilnik o brodicama i jahtama (NN 27/05 i izmjene), čl. 52",
		difficulty: 1,
		source: "original",
	},
	{
		id: "propisi-017",
		area: "propisi",
		lesson: "podrucja-i-ovlasti",
		level: "B",
		type: "single",
		prompt:
			"Do koje duljine smije voditelj brodice B zapovijedati jahtom za osobne potrebe?",
		options: [
			{ id: "a", text: "Do 15 m", correct: false },
			{ id: "b", text: "Do 18 m", correct: true },
			{ id: "c", text: "Do 24 m", correct: false },
			{ id: "d", text: "Ne smije zapovijedati jahtom", correct: false },
		],
		explanation:
			'Uvjerenje B dopušta zapovijedanje jahtom do 18 m za osobne potrebe ili iznajmljenom bez posade. Stara granica "30 BT" zamijenjena je s 18 m.',
		ruleRef:
			"Pravilnik o brodicama i jahtama (NN 27/05 i izmjene), čl. 81 u vezi s NN 13/20, čl. 48",
		difficulty: 2,
		source: "original",
	},
	{
		id: "propisi-018",
		area: "propisi",
		lesson: "podrucja-i-ovlasti",
		level: "B",
		type: "single",
		prompt:
			"U kojem području plovidbe smije ploviti skuter (osobno plovilo na vodomlazni pogon)?",
		options: [
			{ id: "a", text: "Samo u IIIc", correct: true },
			{ id: "b", text: "Do IIIa", correct: false },
			{ id: "c", text: "U cijelom području III", correct: false },
			{ id: "d", text: "Samo u lukama", correct: false },
		],
		explanation:
			"Skuter smije samo u području IIIc, do 1 NM od obale, i to u unutarnjim morskim vodama i teritorijalnom moru RH.",
		ruleRef: "Pravilnik o brodicama, čamcima i jahtama (NN 13/20), čl. 37",
		difficulty: 2,
		source: "original",
	},
	{
		id: "propisi-019",
		area: "propisi",
		lesson: "podrucja-i-ovlasti",
		level: "B",
		type: "single",
		prompt: "Brodica je građena u projektnoj kategoriji D. Gdje smije ploviti?",
		options: [
			{ id: "a", text: "Samo u području IV", correct: true },
			{ id: "b", text: "Do područja III", correct: false },
			{
				id: "c",
				text: "Svugdje, ako voditelj ima kategoriju B",
				correct: false,
			},
		],
		explanation:
			"Projektna kategorija govori za kakvo je more plovilo građeno. Kategorija D odgovara samo području IV, bez obzira na dozvolu voditelja.",
		ruleRef: "Pravilnik o brodicama, čamcima i jahtama (NN 13/20), čl. 37",
		difficulty: 3,
		source: "original",
	},
	{
		id: "propisi-020",
		area: "propisi",
		lesson: "isprave-i-upis",
		level: "B",
		type: "multi",
		prompt:
			"Koje isprave moraju biti na brodici za osobne potrebe dok plovi? Označi sve točne.",
		options: [
			{ id: "a", text: "Upisni list brodice", correct: true },
			{
				id: "b",
				text: "Uvjerenje o osposobljenosti voditelja brodice",
				correct: true,
			},
			{ id: "c", text: "Račun za kupnju brodice", correct: false },
			{ id: "d", text: "Svjedodžba o gradnji", correct: false },
		],
		explanation:
			"Upisni list i uvjerenje voditelja uvijek moraju biti na brodici. Račun i svjedodžba o gradnji trebaju za upis, ne u plovidbi.",
		difficulty: 1,
		source: "original",
	},
	{
		id: "propisi-021",
		area: "propisi",
		lesson: "isprave-i-upis",
		level: "B",
		type: "single",
		prompt: 'Na brodici piše oznaka "ST 123456". Kakva je to brodica?',
		options: [
			{
				id: "a",
				text: "Brodica za osobne potrebe upisana u Splitu",
				correct: true,
			},
			{ id: "b", text: "Gospodarska brodica upisana u Splitu", correct: false },
			{ id: "c", text: "Javna brodica", correct: false },
			{
				id: "d",
				text: "Strana brodica na privremenom boravku",
				correct: false,
			},
		],
		explanation:
			'Kod brodice za osobne potrebe slova luke upisa stoje ispred NIB-a. Gospodarska bi imala oznaku "123456 ST", a javna "RH 123456 ST".',
		difficulty: 2,
		source: "original",
	},
	{
		id: "propisi-022",
		area: "propisi",
		lesson: "isprave-i-upis",
		level: "B",
		type: "single",
		prompt:
			"Koja brodica mora imati policu obveznog osiguranja od odgovornosti?",
		options: [
			{ id: "a", text: "Svaka brodica dulja od 5 m", correct: false },
			{
				id: "b",
				text: "Brodica s motorom ukupne snage veće od 15 kW",
				correct: true,
			},
			{ id: "c", text: "Samo brodica za gospodarske namjene", correct: false },
			{
				id: "d",
				text: "Samo brodica koja plovi u području III",
				correct: false,
			},
		],
		explanation:
			"Sve domaće i strane brodice s porivnim motorom jačim od 15 kW u našim vodama moraju imati valjanu policu osiguranja od odgovornosti.",
		ruleRef: "Pravilnik o brodicama, čamcima i jahtama (NN 13/20), čl. 8",
		difficulty: 2,
		source: "original",
	},
	{
		id: "propisi-023",
		area: "propisi",
		lesson: "isprave-i-upis",
		level: "B",
		type: "single",
		prompt:
			"Koju brodicu vlasnik s prebivalištem u Hrvatskoj mora upisati u očevidnik brodica?",
		options: [
			{ id: "a", text: "Samo brodicu dulju od 7 m", correct: false },
			{
				id: "b",
				text: "Brodicu dulju od 2,5 m ili s motorom jačim od 5 kW",
				correct: true,
			},
			{ id: "c", text: "Samo brodicu s ugrađenim motorom", correct: false },
			{ id: "d", text: "Samo brodicu koju iznajmljuje", correct: false },
		],
		explanation:
			"Upis je obavezan za brodicu dulju od 2,5 m ili s ukupnom snagom motora većom od 5 kW, kad je vlasnik iz Hrvatske.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "propisi-024",
		area: "propisi",
		lesson: "nezgode-i-nadzor",
		level: "B",
		type: "single",
		prompt: "U kojem roku moraš lučkoj kapetaniji prijaviti pomorsku nezgodu?",
		options: [
			{ id: "a", text: "Najkasnije 12 sati od nezgode", correct: true },
			{ id: "b", text: "Najkasnije 3 dana", correct: false },
			{ id: "c", text: "Do kraja sezone", correct: false },
			{ id: "d", text: "Samo ako je netko ozlijeđen", correct: false },
		],
		explanation:
			"Nezgoda se prijavljuje u roku ne duljem od 12 sati od događaja ili od kad si saznao za nju. Težu nesreću prijavljuješ odmah.",
		ruleRef: "Pravilnik o brodicama, čamcima i jahtama (NN 13/20), čl. 7",
		difficulty: 1,
		source: "original",
	},
	{
		id: "propisi-025",
		area: "propisi",
		lesson: "nezgode-i-nadzor",
		level: "B",
		type: "single",
		prompt:
			"Brodica je imala pomorsku nesreću. Što vlasnik mora napraviti prije nastavka plovidbe?",
		options: [
			{ id: "a", text: "Zatražiti izvanredni pregled", correct: true },
			{ id: "b", text: "Pričekati sljedeći redovni pregled", correct: false },
			{ id: "c", text: "Samo obavijestiti osiguranje", correct: false },
			{ id: "d", text: "Ništa, ako brodica još plovi", correct: false },
		],
		explanation:
			"Nakon nesreće sposobnost za plovidbu treba ponovno utvrditi. Zato vlasnik prije daljnje plovidbe traži izvanredni pregled.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "propisi-026",
		area: "propisi",
		lesson: "pregledi",
		level: "B",
		type: "single",
		prompt:
			"Koliko često ide na redovni pregled brodica za gospodarske namjene mlađa od 20 godina?",
		options: [
			{ id: "a", text: "Svake godine", correct: false },
			{ id: "b", text: "Svake 2 godine", correct: true },
			{ id: "c", text: "Svakih 5 godina", correct: false },
			{ id: "d", text: "Samo kad se mijenja vlasnik", correct: false },
		],
		explanation:
			"Gospodarske i javne brodice do 20 godina starosti imaju redovni pregled svake 2 godine, a na suhom svake 4 godine.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "propisi-027",
		area: "propisi",
		lesson: "pregledi",
		level: "B",
		type: "single",
		prompt: "Tko pregledava jahte i utvrđuje njihovu sposobnost za plovidbu?",
		options: [
			{ id: "a", text: "Hrvatski registar brodova (HRB)", correct: true },
			{ id: "b", text: "Lučka uprava", correct: false },
			{ id: "c", text: "Hrvatski hidrografski institut", correct: false },
			{ id: "d", text: "Plovput", correct: false },
		],
		explanation:
			"Brodice pregledava lučka kapetanija ili ispostava, a jahte Hrvatski registar brodova, koji izdaje svjedodžbu o sposobnosti jahte za plovidbu.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "propisi-028",
		area: "propisi",
		lesson: "plovidba-uz-obalu",
		level: "B",
		type: "single",
		prompt:
			"Koliko se najbliže obali smije približiti motorna brodica u normalnoj plovidbi?",
		options: [
			{ id: "a", text: "20 m", correct: false },
			{ id: "b", text: "50 m", correct: true },
			{ id: "c", text: "150 m", correct: false },
			{ id: "d", text: "200 m", correct: false },
		],
		explanation:
			"Plovila kraća od 15 m ne smiju ploviti bliže od 50 m od obale, plovila od 15 do 30 m 150 m, a duža od 30 m 300 m. Bliže smiješ samo radi uplovljavanja ili pristajanja, uz smanjenu brzinu.",
		ruleRef:
			"Pravilnik o sigurnosti pomorske plovidbe u unutarnjim morskim vodama i teritorijalnom moru RH",
		difficulty: 1,
		source: "original",
	},
	{
		id: "propisi-029",
		area: "propisi",
		lesson: "plovidba-uz-obalu",
		level: "B",
		type: "single",
		prompt: "Gdje smije glisirati gliser ili skuter?",
		options: [
			{ id: "a", text: "Dalje od 50 m od obale", correct: false },
			{ id: "b", text: "Dalje od 150 m od obale", correct: false },
			{
				id: "c",
				text: "Dalje od 300 m od obale, gdje glisiranje nije zabranjeno",
				correct: true,
			},
			{ id: "d", text: "Svugdje izvan luke", correct: false },
		],
		explanation:
			"Glisirati se smije samo dalje od 300 m od obale i samo tamo gdje kapetanija to nije zabranila.",
		ruleRef:
			"Pravilnik o sigurnosti pomorske plovidbe u unutarnjim morskim vodama i teritorijalnom moru RH",
		difficulty: 1,
		source: "original",
	},
	{
		id: "propisi-030",
		area: "propisi",
		lesson: "plovidba-uz-obalu",
		level: "B",
		type: "single",
		prompt:
			"Kojom najvećom brzinom smiješ ploviti u pojasu do 300 m od obale, ako nije drukčije propisano?",
		options: [
			{ id: "a", text: "3 čvora", correct: false },
			{ id: "b", text: "5 čvorova", correct: false },
			{ id: "c", text: "8 čvorova", correct: true },
			{ id: "d", text: "10 čvorova", correct: false },
		],
		explanation:
			"U pojasu do 300 m od obale najviše 8 čvorova, uz posebnu pažnju (NN 52/25, čl. 50).",
		ruleRef: "Pravilnik o sigurnosti pomorske plovidbe, čl. 50 (NN 52/25)",
		difficulty: 2,
		source: "original",
	},
	{
		id: "propisi-031",
		area: "propisi",
		lesson: "propisi-i-nadleznost",
		level: "B",
		type: "single",
		prompt:
			"Tko provodi nadzor nad brodicom, njezinom opremom, ispravama i posadom?",
		options: [
			{ id: "a", text: "Lučka kapetanija i njezine ispostave", correct: true },
			{ id: "b", text: "Turistička zajednica", correct: false },
			{ id: "c", text: "Marina u kojoj je brodica vezana", correct: false },
			{ id: "d", text: "Hrvatski hidrografski institut", correct: false },
		],
		explanation:
			"Nadzor nad brodicama obavljaju ovlašteni službenici i inspektori lučkih kapetanija i ispostava.",
		difficulty: 1,
		source: "original",
	},
	{
		id: "propisi-032",
		area: "propisi",
		lesson: "plovidba-uz-obalu",
		level: "B",
		type: "single",
		prompt: "Kakav balon vuče ronilac na površini mora?",
		options: [
			{ id: "a", text: "Crveni, promjera najmanje 20 cm", correct: false },
			{
				id: "b",
				text: "Žuti ili narančasti, promjera najmanje 30 cm",
				correct: true,
			},
			{
				id: "c",
				text: "Bijeli s crvenom crtom, bilo koje veličine",
				correct: false,
			},
			{ id: "d", text: "Zeleni, promjera najmanje 50 cm", correct: false },
		],
		explanation:
			"Podvodni ribolovac ili ronilac mora za sobom vući žuti ili narančasti balon promjera najmanje 30 cm. Kad ga vidiš, uspori i zaobiđi ga široko.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "propisi-033",
		area: "propisi",
		lesson: "red-u-lukama",
		level: "B",
		type: "true-false",
		prompt:
			"Točenje goriva smije početi tek kad se putnici iskrcaju s brodice.",
		options: [
			{ id: "t", text: "Točno", correct: true },
			{ id: "f", text: "Netočno", correct: false },
		],
		explanation:
			"Opskrba gorivom ne smije početi prije iskrcaja putnika, a putnici se ukrcavaju tek nakon što je gorivo natočeno.",
		difficulty: 1,
		source: "original",
	},
	{
		id: "propisi-034",
		area: "propisi",
		lesson: "red-u-lukama",
		level: "B",
		type: "single",
		prompt:
			"Brodica od 9 m plovi 0,5 NM od ulaza u luku i susreće veliki trajekt. Što vrijedi?",
		options: [
			{
				id: "a",
				text: "Brodica se mora skloniti trajektu s puta",
				correct: true,
			},
			{
				id: "b",
				text: "Prednost ima onaj tko je s desne strane",
				correct: false,
			},
			{ id: "c", text: "Trajekt se mora skloniti jer je brži", correct: false },
			{ id: "d", text: "Prednost ima onaj tko prvi zatrubi", correct: false },
		],
		explanation:
			"Plovila duljine do 20 m u lukama i u polukrugu od 1 NM od ulaza u luku moraju se sklanjati većim plovilima (NN 52/25, čl. 46).",
		ruleRef: "Pravilnik o sigurnosti pomorske plovidbe, čl. 46 (NN 52/25)",
		difficulty: 3,
		source: "original",
	},
	{
		id: "propisi-035",
		area: "propisi",
		lesson: "red-u-lukama",
		level: "B",
		type: "multi",
		prompt: "Što je zabranjeno u luci? Označi sve točne.",
		options: [
			{ id: "a", text: "Vezati brodicu za plovidbenu oznaku", correct: true },
			{ id: "b", text: "Kupati se bez odobrenja kapetanije", correct: true },
			{ id: "c", text: "Ploviti smanjenom brzinom prema vezu", correct: false },
			{
				id: "d",
				text: "Držati vijak u pogonu kad ne manevriraš",
				correct: true,
			},
		],
		explanation:
			"U luci je zabranjeno vezivanje za plovidbene oznake, kupanje bez odobrenja i rad vijka izvan manevra. Sporo ploviti prema vezu je upravo ono što treba.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "propisi-036",
		area: "propisi",
		lesson: "plovidba-uz-obalu",
		level: "B",
		type: "single",
		prompt: "Koliko najmanje od obale prirodnog kupališta smiješ sidriti?",
		options: [
			{ id: "a", text: "50 m", correct: false },
			{ id: "b", text: "100 m", correct: false },
			{ id: "c", text: "150 m", correct: true },
			{ id: "d", text: "300 m", correct: false },
		],
		explanation:
			"Čl. 53. st. 9. NN 52/25 zabranjuje sidrenje bliže od 150 m od obale prirodnog kupališta.",
		ruleRef:
			"Pravilnik o sigurnosti pomorske plovidbe, čl. 53. st. 9 (NN 52/25)",
		difficulty: 2,
		source: "original",
	},
	{
		id: "propisi-037",
		area: "propisi",
		lesson: "propisi-i-nadleznost",
		level: "B",
		type: "true-false",
		prompt: "Za kategoriju B već je obavezna praktična nastava prije ispita.",
		options: [
			{ id: "t", text: "Točno", correct: false },
			{ id: "f", text: "Netočno", correct: true },
		],
		explanation:
			"Praktična nastava za B samo je najavljena reformom. Na dan 23.11.2026. propis nije donesen, pa za A i B vrijede dob i položen ispit.",
		difficulty: 1,
		source: "original",
	},
];

export default questions;
