import type { IQuestion } from "@/content/types";

const questions: IQuestion[] = [
	{
		id: "sigurnost-prva-pomoc-001",
		area: "sigurnost-prva-pomoc",
		lesson: "oprema-brodice",
		level: "B",
		type: "single",
		prompt:
			"Koliko prsluka za spašavanje mora biti na brodici za osobne potrebe?",
		options: [
			{
				id: "a",
				text: "Po jedan za svaku osobu na brodici, i za djecu",
				correct: true,
			},
			{ id: "b", text: "Jedan, za voditelja", correct: false },
			{ id: "c", text: "Dva, bez obzira na broj osoba", correct: false },
			{ id: "d", text: "Samo za djecu", correct: false },
		],
		explanation:
			"Prsluk mora imati svaka osoba koja je na brodici za vrijeme plovidbe, odrasli i djeca, u odgovarajućoj veličini.",
		ruleRef:
			"Pravilnik o brodicama, čamcima i jahtama (NN 13/20), tablica opreme",
		difficulty: 1,
		source: "original",
	},
	{
		id: "sigurnost-prva-pomoc-002",
		area: "sigurnost-prva-pomoc",
		lesson: "oprema-brodice",
		level: "B",
		type: "true-false",
		prompt:
			"Vodootporna baterijska svjetiljka obavezna je u svim područjima plovidbe, i u luci.",
		options: [
			{ id: "t", text: "Točno", correct: true },
			{ id: "f", text: "Netočno", correct: false },
		],
		explanation:
			"Vodootporna svjetiljka nalazi se na popisu opreme za sva područja, od IV do I.",
		ruleRef:
			"Pravilnik o brodicama, čamcima i jahtama (NN 13/20), tablica opreme",
		difficulty: 2,
		source: "original",
	},
	{
		id: "sigurnost-prva-pomoc-003",
		area: "sigurnost-prva-pomoc",
		lesson: "oprema-brodice",
		level: "B",
		type: "single",
		prompt:
			"Od kojeg područja plovidbe brodica za osobne potrebe mora imati GNSS prijemnik, kompas i dalekozor?",
		options: [
			{ id: "a", text: "Od područja III dalje", correct: true },
			{ id: "b", text: "Već u području IV", correct: false },
			{ id: "c", text: "Samo u području I", correct: false },
			{ id: "d", text: "Nikad, to je preporuka", correct: false },
		],
		explanation:
			"Navigacijska oprema (GNSS, osvijetljeni kompas, dalekozor, ažurirane karte) traži se kad ploviš u područje III ili dalje.",
		ruleRef:
			"Pravilnik o brodicama, čamcima i jahtama (NN 13/20), tablica opreme",
		difficulty: 3,
		source: "original",
	},
	{
		id: "sigurnost-prva-pomoc-004",
		area: "sigurnost-prva-pomoc",
		lesson: "oprema-brodice",
		level: "B",
		type: "single",
		prompt:
			"U kojim područjima brodica za osobne potrebe mora imati rakete s padobranom i ručne buktinje?",
		options: [
			{ id: "a", text: "U područjima II i I", correct: true },
			{ id: "b", text: "U svim područjima", correct: false },
			{ id: "c", text: "Samo u području IV", correct: false },
			{ id: "d", text: "Od IIIc dalje", correct: false },
		],
		explanation:
			"Pirotehnička sredstva za signalizaciju (rakete, buktinje, dimni signal) propisana su tek za plovidbu u područjima II i I.",
		ruleRef:
			"Pravilnik o brodicama, čamcima i jahtama (NN 13/20), tablica opreme",
		difficulty: 3,
		source: "original",
	},
	{
		id: "sigurnost-prva-pomoc-005",
		area: "sigurnost-prva-pomoc",
		lesson: "oprema-brodice",
		level: "B",
		type: "single",
		prompt: "Čemu služi sigurnosna narukvica na skuteru ili brzom gumenjaku?",
		options: [
			{
				id: "a",
				text: "Ugasi motor ako voditelj padne s plovila",
				correct: true,
			},
			{ id: "b", text: "Pali svjetlo kad padne mrak", correct: false },
			{ id: "c", text: "Šalje poziv u pomoć", correct: false },
			{ id: "d", text: "Mjeri brzinu plovila", correct: false },
		],
		explanation:
			"Narukvica je užetom spojena s prekidačem motora. Kad voditelj padne, uže izvuče prekidač i motor stane, pa plovilo ne odjuri bez njega.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "sigurnost-prva-pomoc-006",
		area: "sigurnost-prva-pomoc",
		lesson: "oprema-brodice",
		level: "B",
		type: "multi",
		prompt:
			"Što moraju imati na sebi osobe koje se voze na skuteru? Označi sve točne.",
		options: [
			{ id: "a", text: "Prsluk za spašavanje", correct: true },
			{ id: "b", text: "Sigurnosnu kacigu", correct: true },
			{ id: "c", text: "Ronilačko odijelo", correct: false },
			{ id: "d", text: "Ručnu buktinju", correct: false },
		],
		explanation:
			"Svi na skuteru nose prsluk i sigurnosnu kacigu, a voditelj ima pričvršćenu sigurnosnu narukvicu.",
		ruleRef: "Pravilnik o brodicama, čamcima i jahtama (NN 13/20)",
		difficulty: 2,
		source: "original",
	},
	{
		id: "sigurnost-prva-pomoc-007",
		area: "sigurnost-prva-pomoc",
		lesson: "sredstva-za-spasavanje",
		level: "B",
		type: "single",
		prompt: "Koje je od ovih sredstava zajedničko sredstvo za spašavanje?",
		options: [
			{ id: "a", text: "Splav za spašavanje", correct: true },
			{ id: "b", text: "Prsluk za spašavanje", correct: false },
			{ id: "c", text: "Kolut za spašavanje", correct: false },
			{ id: "d", text: "Odijelo za spašavanje", correct: false },
		],
		explanation:
			"Splav i čamac za spašavanje služe više ljudi odjednom, pa su zajednička sredstva. Prsluk, kolut i odijelo su osobna.",
		difficulty: 1,
		source: "original",
	},
	{
		id: "sigurnost-prva-pomoc-008",
		area: "sigurnost-prva-pomoc",
		lesson: "sredstva-za-spasavanje",
		level: "B",
		type: "single",
		prompt: "Kako se napuhuje prsluk na napuhavanje?",
		options: [
			{
				id: "a",
				text: "Povlačenjem ručice koja otvori bočicu s plinom, a dopunjuje se puhanjem",
				correct: true,
			},
			{ id: "b", text: "Samo pumpom na brodici", correct: false },
			{
				id: "c",
				text: "Napuhan je stalno i ne treba ništa raditi",
				correct: false,
			},
		],
		explanation:
			"Ručica otvara bočicu s CO2 i prsluk se napuni. Ako izgubi dio zraka, dopuniš ga puhanjem kroz cjevčicu.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "sigurnost-prva-pomoc-009",
		area: "sigurnost-prva-pomoc",
		lesson: "sredstva-za-spasavanje",
		level: "B",
		type: "single",
		prompt:
			"U kojim područjima prsluk mora imati zviždaljku i svjetlo koje se samo upali?",
		options: [
			{
				id: "a",
				text: "U područjima II i I, i na brodicama bržim od 20 čvorova noću",
				correct: true,
			},
			{ id: "b", text: "Samo u lukama", correct: false },
			{ id: "c", text: "Nigdje, to je dodatna oprema", correct: false },
			{ id: "d", text: "Samo na jedrilicama", correct: false },
		],
		explanation:
			"Pravilnik traži prsluk sa zviždaljkom i samoupaljivim svjetlom u područjima II i I, a bliže obali kad brodica brža od 20 čvorova plovi noću.",
		ruleRef:
			"Pravilnik o brodicama, čamcima i jahtama (NN 13/20), tablica opreme",
		difficulty: 3,
		source: "original",
	},
	{
		id: "sigurnost-prva-pomoc-010",
		area: "sigurnost-prva-pomoc",
		lesson: "signali-pogibelji",
		level: "common",
		type: "single",
		prompt:
			"Noću vidiš crvenu raketu koja se polako spušta na padobranu. Što to znači?",
		options: [
			{ id: "a", text: "Signal pogibelji, netko treba pomoć", correct: true },
			{ id: "b", text: "Vatromet u obližnjoj luci", correct: false },
			{ id: "c", text: "Ribari označavaju mreže", correct: false },
			{ id: "d", text: "Upozorenje na nevrijeme", correct: false },
		],
		explanation:
			"Crvena raketa s padobranom je međunarodni signal pogibelji. Javi to na VHF kanalu 16 ili na 195 i pomozi ako možeš bez opasnosti za sebe.",
		ruleRef: "COLREG, Dodatak IV",
		difficulty: 1,
		source: "original",
	},
	{
		id: "sigurnost-prva-pomoc-011",
		area: "sigurnost-prva-pomoc",
		lesson: "signali-pogibelji",
		level: "common",
		type: "single",
		prompt: "Kako izgleda signal SOS dan svjetlom ili zvukom?",
		media: { visual: "sound-signal-player", props: { pattern: "sos" } },
		options: [
			{ id: "a", text: "Tri kratka, tri duga, tri kratka", correct: true },
			{ id: "b", text: "Tri duga, tri kratka, tri duga", correct: false },
			{ id: "c", text: "Pet kratkih", correct: false },
			{ id: "d", text: "Jedan dugi svake dvije minute", correct: false },
		],
		explanation:
			'SOS je u Morseovoj abecedi tri točke, tri crte, tri točke. Pet kratkih znači "ne razumijem tvoju namjeru", a dugi svake dvije minute je signal u magli.',
		ruleRef: "COLREG, Dodatak IV",
		difficulty: 1,
		source: "original",
	},
	{
		id: "sigurnost-prva-pomoc-012",
		area: "sigurnost-prva-pomoc",
		lesson: "signali-pogibelji",
		level: "common",
		type: "single",
		prompt: "Koje je boje dim koji služi kao signal pogibelji?",
		options: [
			{ id: "a", text: "Narančaste", correct: true },
			{ id: "b", text: "Zelene", correct: false },
			{ id: "c", text: "Plave", correct: false },
			{ id: "d", text: "Bijele", correct: false },
		],
		explanation:
			"Dimna kutija za signal pogibelji ispušta narančasti dim, koji se danju dobro vidi s broda i iz zraka.",
		ruleRef: "COLREG, Dodatak IV",
		difficulty: 1,
		source: "original",
	},
	{
		id: "sigurnost-prva-pomoc-013",
		area: "sigurnost-prva-pomoc",
		lesson: "signali-pogibelji",
		level: "common",
		type: "single",
		prompt:
			"Čovjek na brodici polako i ponavljano diže i spušta raširene ruke. Što poručuje?",
		options: [
			{ id: "a", text: "Treba pomoć, to je signal pogibelji", correct: true },
			{ id: "b", text: "Pozdravlja te", correct: false },
			{ id: "c", text: "Pokazuje ti da ga zaobiđeš", correct: false },
			{
				id: "d",
				text: "Traži da smanjiš brzinu zbog ronilaca",
				correct: false,
			},
		],
		explanation:
			"Polagano dizanje i spuštanje raširenih ruku je službeni signal pogibelji. Nije mahanje u pozdrav.",
		ruleRef: "COLREG, Dodatak IV",
		difficulty: 2,
		source: "original",
	},
	{
		id: "sigurnost-prva-pomoc-014",
		area: "sigurnost-prva-pomoc",
		lesson: "signali-pogibelji",
		level: "common",
		type: "multi",
		prompt: "Koji su od ovih signala signali pogibelji? Označi sve točne.",
		options: [
			{ id: "a", text: "Crvena ručna buktinja", correct: true },
			{ id: "b", text: "Neprekidno trubljenje sirenom", correct: true },
			{ id: "c", text: "Jedan dugi zvučni signal", correct: false },
			{
				id: "d",
				text: "Pucnji u razmaku od otprilike jedne minute",
				correct: true,
			},
		],
		explanation:
			"Buktinja, neprekidan zvuk i pucnji svake minute su signali pogibelji. Jedan dugi zvučni signal je upozorenje, npr. kad se približavaš zavoju iza kojeg ne vidiš.",
		ruleRef: "COLREG, Dodatak IV",
		difficulty: 2,
		source: "original",
	},
	{
		id: "sigurnost-prva-pomoc-015",
		area: "sigurnost-prva-pomoc",
		lesson: "signali-pogibelji",
		level: "common",
		type: "true-false",
		prompt: "Za vatru kojom daješ signal pogibelji smiješ upotrijebiti benzin.",
		options: [
			{ id: "t", text: "Točno", correct: false },
			{ id: "f", text: "Netočno", correct: true },
		],
		explanation:
			"Benzin eksplozivno plane i može zapaliti cijelu brodicu. Za signalnu vatru koristi nešto što gori i daje gust dim, ali nikad benzin.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "sigurnost-prva-pomoc-016",
		area: "sigurnost-prva-pomoc",
		lesson: "signali-pogibelji",
		level: "common",
		type: "single",
		prompt: "Kako se signal pogibelji daje govorom preko radija?",
		options: [
			{
				id: "a",
				text: "MAYDAY, izgovoreno tri puta na VHF kanalu 16",
				correct: true,
			},
			{
				id: "b",
				text: "SECURITE, jednom na bilo kojem kanalu",
				correct: false,
			},
			{ id: "c", text: "PAN PAN na kanalu 70", correct: false },
			{ id: "d", text: "HELP na kanalu 10", correct: false },
		],
		explanation:
			"Pogibelj se javlja riječju MAYDAY, tri puta, na kanalu 16. PAN PAN je hitnost, a SECURITE sigurnosna obavijest.",
		ruleRef: "COLREG, Dodatak IV",
		difficulty: 1,
		source: "original",
	},
	{
		id: "sigurnost-prva-pomoc-017",
		area: "sigurnost-prva-pomoc",
		lesson: "signali-pogibelji",
		level: "common",
		type: "true-false",
		prompt:
			"Signal pogibelji smiješ dati kad ti samo ponestane goriva po mirnom moru, a nitko nije u opasnosti.",
		options: [
			{ id: "t", text: "Točno", correct: false },
			{ id: "f", text: "Netočno", correct: true },
		],
		explanation:
			"Signal pogibelji je za ozbiljnu opasnost po život. Za kvar ili prazan spremnik bez neposredne opasnosti traži pomoć drukčije, npr. pozivom za hitnost (PAN PAN) ili telefonom.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "sigurnost-prva-pomoc-018",
		area: "sigurnost-prva-pomoc",
		lesson: "sar-sluzba",
		level: "B",
		type: "single",
		prompt: "Na koji broj telefona zoveš MRCC Rijeka?",
		options: [
			{ id: "a", text: "195", correct: true },
			{ id: "b", text: "9155", correct: false },
			{ id: "c", text: "192", correct: false },
			{ id: "d", text: "1987", correct: false },
		],
		explanation:
			"MRCC Rijeka dobiva se na broju 195. Broj 9155 iz starih skripti više ne vrijedi.",
		difficulty: 1,
		source: "original",
	},
	{
		id: "sigurnost-prva-pomoc-019",
		area: "sigurnost-prva-pomoc",
		lesson: "sar-sluzba",
		level: "B",
		type: "multi",
		prompt:
			"Kako na moru možeš pozvati službu traganja i spašavanja? Označi sve točne.",
		options: [
			{ id: "a", text: "Telefonom na 195", correct: true },
			{ id: "b", text: "Telefonom na 112", correct: true },
			{ id: "c", text: "Preko VHF kanala 16", correct: true },
			{ id: "d", text: "Porukom na društvenim mrežama", correct: false },
		],
		explanation:
			"Pomoć zoveš na 195 (MRCC Rijeka), 112 ili VHF kanalu 16. Društvene mreže nisu način dojave pogibelji.",
		difficulty: 1,
		source: "original",
	},
	{
		id: "sigurnost-prva-pomoc-020",
		area: "sigurnost-prva-pomoc",
		lesson: "sar-sluzba",
		level: "B",
		type: "single",
		prompt: "Tko su pod-središnjice službe traganja i spašavanja na moru?",
		options: [
			{ id: "a", text: "Lučke kapetanije", correct: true },
			{ id: "b", text: "Marine", correct: false },
			{ id: "c", text: "Policijske postaje", correct: false },
			{ id: "d", text: "Turističke zajednice", correct: false },
		],
		explanation:
			"Nacionalna središnjica je MRCC Rijeka, a pod-središnjice su osam lučkih kapetanija. Njihove ispostave su obalne promatračke jedinice.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "sigurnost-prva-pomoc-021",
		area: "sigurnost-prva-pomoc",
		lesson: "sar-sluzba",
		level: "B",
		type: "true-false",
		prompt:
			"Kad primijetiš mrlju ulja na moru, trebaš je prijaviti s točnom pozicijom.",
		options: [
			{ id: "t", text: "Točno", correct: true },
			{ id: "f", text: "Netočno", correct: false },
		],
		explanation:
			"Svaki sudionik u plovidbi dužan je što prije javiti uočeno onečišćenje ili opasnost, s točnom pozicijom, i pričekati upute.",
		difficulty: 1,
		source: "original",
	},
	{
		id: "sigurnost-prva-pomoc-022",
		area: "sigurnost-prva-pomoc",
		lesson: "pozar",
		level: "B",
		type: "single",
		prompt: "Na brodici je izbio manji požar. Što radiš prvo?",
		options: [
			{
				id: "a",
				text: "Odmah gasiš, prvo prijenosnim aparatom",
				correct: true,
			},
			{
				id: "b",
				text: "Čekaš da se vidi hoće li se ugasiti sam",
				correct: false,
			},
			{ id: "c", text: "Odmah skačeš u more", correct: false },
			{ id: "d", text: "Dodaješ gas da vjetar ugasi plamen", correct: false },
		],
		explanation:
			"Požar na brodici gasi se odmah, dok je malen, svim sredstvima, a obavezno prijenosnim aparatom. Dodatni zrak od brzine ga samo raspiruje.",
		difficulty: 1,
		source: "original",
	},
	{
		id: "sigurnost-prva-pomoc-023",
		area: "sigurnost-prva-pomoc",
		lesson: "pozar",
		level: "B",
		type: "single",
		prompt: "Koji je prijenosni aparat obično najbolji za malu brodicu?",
		options: [
			{ id: "a", text: "Aparat s prahom", correct: true },
			{ id: "b", text: "Aparat s vodom", correct: false },
			{ id: "c", text: "Kanta morske vode", correct: false },
		],
		explanation:
			"Aparat s prahom gasi gorivo, ulje i električne instalacije, pa je za male brodice najčešće najbolji izbor.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "sigurnost-prva-pomoc-024",
		area: "sigurnost-prva-pomoc",
		lesson: "pozar",
		level: "B",
		type: "true-false",
		prompt: "Zapaljeni benzin najbolje je gasiti vodom.",
		options: [
			{ id: "t", text: "Točno", correct: false },
			{ id: "f", text: "Netočno", correct: true },
		],
		explanation:
			"Benzin pluta na vodi, pa ga voda samo raznese i požar se širi. Gasi ga prahom, pjenom ili ugušivanjem.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "sigurnost-prva-pomoc-025",
		area: "sigurnost-prva-pomoc",
		lesson: "prodor-nasukavanje-sudar",
		level: "B",
		type: "single",
		prompt: "U brodicu prodire more. Što radiš?",
		options: [
			{
				id: "a",
				text: "Izbacuješ vodu svim sredstvima i privremeno zatvaraš otvor",
				correct: true,
			},
			{ id: "b", text: "Odmah napuštaš brodicu", correct: false },
			{ id: "c", text: "Ubrzavaš da voda istječe kroz krmu", correct: false },
			{ id: "d", text: "Čekaš da voda prestane sama ulaziti", correct: false },
		],
		explanation:
			"Prvo pokušaj spasiti brodicu: izbacuj vodu pumpom i kablićem i zatvori rupu. Brodicu napuštaš tek kad to ne uspije, po naredbi voditelja.",
		difficulty: 1,
		source: "original",
	},
	{
		id: "sigurnost-prva-pomoc-026",
		area: "sigurnost-prva-pomoc",
		lesson: "prodor-nasukavanje-sudar",
		level: "B",
		type: "multi",
		prompt: "Brodica se nasukala. Što prvo utvrđuješ? Označi sve točne.",
		options: [
			{ id: "a", text: "Kakvo je dno", correct: true },
			{ id: "b", text: "Prodire li voda u brodicu", correct: true },
			{
				id: "c",
				text: "Koliko je velika šteta i koliki dio trupa je na dnu",
				correct: true,
			},
			{ id: "d", text: "Koliko je goriva potrošeno na putu", correct: false },
		],
		explanation:
			"Tek kad znaš dno, štetu i ulazi li voda, odlučuješ smiješ li se odvući s plićine ili je sigurnije ostati i tražiti pomoć.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "sigurnost-prva-pomoc-027",
		area: "sigurnost-prva-pomoc",
		lesson: "prodor-nasukavanje-sudar",
		level: "B",
		type: "single",
		prompt:
			"Brodica tone i ne uspijevaš je spasiti. Što voditelj nastoji napraviti?",
		options: [
			{
				id: "a",
				text: "Maknuti je s plovnog puta i nasukati na pogodno dno, pazeći na ljude",
				correct: true,
			},
			{
				id: "b",
				text: "Ostaviti je usred plovnog puta da je drugi vide",
				correct: false,
			},
			{ id: "c", text: "Ubrzati prema otvorenom moru", correct: false },
		],
		explanation:
			"Potonula brodica na plovnom putu opasna je za druge. Ako je moguće, nasuka se na pogodno dno, ali spašavanje ljudi ima prednost.",
		difficulty: 3,
		source: "original",
	},
	{
		id: "sigurnost-prva-pomoc-028",
		area: "sigurnost-prva-pomoc",
		lesson: "prodor-nasukavanje-sudar",
		level: "B",
		type: "single",
		prompt:
			"Sudario si se s drugom brodicom. Kada smiješ otići s mjesta sudara?",
		options: [
			{
				id: "a",
				text: "Kad utvrdiš da su ljudi na drugoj brodici sigurni i razmijenite podatke",
				correct: true,
			},
			{
				id: "b",
				text: "Odmah, ako tvoja brodica nije oštećena",
				correct: false,
			},
			{
				id: "c",
				text: "Kad dođe policija, bez obzira na drugu brodicu",
				correct: false,
			},
			{ id: "d", text: "Kad druga brodica prva ode", correct: false },
		],
		explanation:
			"Ne smiješ otići dok nisi siguran da su ljudi na drugom plovilu sigurni. Pomažeš koliko možeš i obavezno razmijenite podatke.",
		difficulty: 1,
		source: "original",
	},
	{
		id: "sigurnost-prva-pomoc-029",
		area: "sigurnost-prva-pomoc",
		lesson: "prodor-nasukavanje-sudar",
		level: "B",
		type: "single",
		prompt: "Pripada li naknada za spašavanje?",
		options: [
			{
				id: "a",
				text: "Za spašavanje ljudi ne pripada, za spašavanje imovine pripada pravična naknada",
				correct: true,
			},
			{
				id: "b",
				text: "Pripada uvijek, i za ljude i za imovinu",
				correct: false,
			},
			{ id: "c", text: "Ne pripada nikad", correct: false },
			{ id: "d", text: "Pripada samo za spašavanje ljudi", correct: false },
		],
		explanation:
			"Spašavanje ljudi je dužnost i za njega nema naknade. Za spašenu imovinu pripada pravična naknada, najviše do njezine vrijednosti.",
		ruleRef: "Pomorski zakonik",
		difficulty: 3,
		source: "original",
	},
	{
		id: "sigurnost-prva-pomoc-030",
		area: "sigurnost-prva-pomoc",
		lesson: "prezivljavanje-u-moru",
		level: "B",
		type: "single",
		prompt:
			"Završio si u hladnom moru s prslukom. Kako najbolje čuvaš toplinu?",
		options: [
			{
				id: "a",
				text: "Ostaneš u odjeći, miruješ, koljena privučeš prsima",
				correct: true,
			},
			{ id: "b", text: "Skineš odjeću da lakše plivaš", correct: false },
			{ id: "c", text: "Brzo plivaš da se zagriješ", correct: false },
			{ id: "d", text: "Skineš prsluk da se lakše krećeš", correct: false },
		],
		explanation:
			"Kretanje u vodi hladi tijelo brže. Odjeća i skupljen položaj čuvaju toplinu, a prsluk te drži na površini bez trošenja snage.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "sigurnost-prva-pomoc-031",
		area: "sigurnost-prva-pomoc",
		lesson: "prezivljavanje-u-moru",
		level: "B",
		type: "true-false",
		prompt:
			"Ako se brodica prevrnula, ali pluta, bolje je ostati uz nju nego plivati prema dalekoj obali.",
		options: [
			{ id: "t", text: "Točno", correct: true },
			{ id: "f", text: "Netočno", correct: false },
		],
		explanation:
			"Brodicu spasioci lakše vide nego glavu u moru, a plivanje troši snagu i toplinu. Ostani uz nju i drži se za nju.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "sigurnost-prva-pomoc-032",
		area: "sigurnost-prva-pomoc",
		lesson: "prva-pomoc-osnove",
		level: "B",
		type: "single",
		prompt:
			"Što ti na ispitu za voditelja brodice B vrijedi kao dokaz da ne moraš polagati prvu pomoć?",
		options: [
			{
				id: "a",
				text: "Vozačka dozvola ili druga isprava o položenoj prvoj pomoći",
				correct: true,
			},
			{ id: "b", text: "Osobna iskaznica", correct: false },
			{ id: "c", text: "Potvrda o tečaju plivanja", correct: false },
			{ id: "d", text: "Ništa, prvu pomoć polažu svi", correct: false },
		],
		explanation:
			"Tko ima pisani dokaz o položenoj prvoj pomoći kod drugog tijela, ne polaže je ponovno. U praksi se prilaže preslika vozačke dozvole.",
		ruleRef: "Pravilnik o brodicama i jahtama (NN 27/05 i izmjene), čl. 63",
		difficulty: 1,
		source: "original",
	},
	{
		id: "sigurnost-prva-pomoc-033",
		area: "sigurnost-prva-pomoc",
		lesson: "prva-pomoc-osnove",
		level: "B",
		type: "single",
		prompt: "Kiselina iz akumulatora je kakav izvor ozljede?",
		options: [
			{ id: "a", text: "Kemijski", correct: true },
			{ id: "b", text: "Mehanički", correct: false },
			{ id: "c", text: "Toplinski", correct: false },
		],
		explanation:
			"Ozljede na brodici dijelimo na toplinske (ispušna grana, požar), mehaničke (padovi, udarci) i kemijske (kiselina, plinovi izgaranja).",
		difficulty: 1,
		source: "original",
	},
	{
		id: "sigurnost-prva-pomoc-034",
		area: "sigurnost-prva-pomoc",
		lesson: "prva-pomoc-postupci",
		level: "B",
		type: "single",
		prompt:
			"Odrasla osoba ne reagira i ne diše normalno. U kojem omjeru izvodiš oživljavanje?",
		options: [
			{ id: "a", text: "30 pritisaka na prsa, pa 2 upuha", correct: true },
			{ id: "b", text: "5 pritisaka, pa 1 upuh", correct: false },
			{ id: "c", text: "15 upuha, pa 2 pritiska", correct: false },
			{ id: "d", text: "Samo upusi, bez pritisaka", correct: false },
		],
		explanation:
			"Prema smjernicama za oživljavanje odraslih radiš 30 pritisaka na sredinu prsa, pa 2 upuha, i ponavljaš dok ne stigne pomoć.",
		ruleRef: "Smjernice Europskog vijeća za reanimaciju (ERC)",
		difficulty: 2,
		source: "original",
	},
	{
		id: "sigurnost-prva-pomoc-035",
		area: "sigurnost-prva-pomoc",
		lesson: "prva-pomoc-postupci",
		level: "B",
		type: "single",
		prompt:
			"Izvukao si osobu iz mora. Nije pri svijesti, ali diše normalno. Što radiš?",
		options: [
			{
				id: "a",
				text: "Staviš je u bočni položaj i stalno pratiš disanje",
				correct: true,
			},
			{ id: "b", text: "Počneš s pritiscima na prsa", correct: false },
			{ id: "c", text: "Posjedneš je i daš joj vode", correct: false },
			{ id: "d", text: "Ostaviš je na leđima i odeš po pomoć", correct: false },
		],
		explanation:
			"Bočni položaj drži dišni put otvorenim. Pratiš je, a ako prestane normalno disati, počinješ oživljavanje.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "sigurnost-prva-pomoc-036",
		area: "sigurnost-prva-pomoc",
		lesson: "prva-pomoc-postupci",
		level: "B",
		type: "multi",
		prompt:
			"Što radiš s pothlađenom osobom koja je pri svijesti? Označi sve točne.",
		options: [
			{
				id: "a",
				text: "Skineš joj mokru odjeću i umotaš je u deke",
				correct: true,
			},
			{ id: "b", text: "Daš joj topao, sladak napitak", correct: true },
			{ id: "c", text: "Daš joj alkohol da se zagrije", correct: false },
			{ id: "d", text: "Snažno joj trljaš ruke i noge", correct: false },
		],
		explanation:
			"Pothlađenu osobu zagrijavaš polako: suho, umotano, uz topao napitak ako može gutati. Alkohol i trljanje šire krvne žile i ubrzavaju gubitak topline.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "sigurnost-prva-pomoc-037",
		area: "sigurnost-prva-pomoc",
		lesson: "prva-pomoc-postupci",
		level: "B",
		type: "single",
		prompt:
			"Član posade nakon cijelog dana na suncu ima glavobolju, crven je i zbunjen. Što radiš?",
		options: [
			{
				id: "a",
				text: "Premjestiš ga u hlad, hladiš mokrim ručnicima i zoveš pomoć",
				correct: true,
			},
			{ id: "b", text: "Pokriješ ga dekom da se ugrije", correct: false },
			{ id: "c", text: "Pustiš ga da se odmori na suncu", correct: false },
			{ id: "d", text: "Daš mu alkohol za opuštanje", correct: false },
		],
		explanation:
			"To su znakovi toplinskog udara. Treba ga što prije rashladiti, dati tekućinu ako je pri svijesti, a zbunjenost znači da treba liječnička pomoć.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "sigurnost-prva-pomoc-038",
		area: "sigurnost-prva-pomoc",
		lesson: "prva-pomoc-postupci",
		level: "B",
		type: "single",
		prompt: "Kako počinješ oživljavanje utopljenika?",
		options: [
			{
				id: "a",
				text: "S 5 upuha, zatim 30 pritisaka i 2 upuha",
				correct: true,
			},
			{ id: "b", text: "Okreneš ga naglavačke da izađe voda", correct: false },
			{ id: "c", text: "Čekaš da sam iskašlje vodu", correct: false },
		],
		explanation:
			"Kod utopljenika je glavni problem nedostatak kisika, pa smjernice preporučuju prvo 5 upuha. Ne gubi vrijeme na izbacivanje vode.",
		ruleRef: "Smjernice Europskog vijeća za reanimaciju (ERC)",
		difficulty: 3,
		source: "original",
	},
];

export default questions;
