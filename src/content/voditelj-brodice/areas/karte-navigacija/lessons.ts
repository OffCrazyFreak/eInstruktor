import type { ILesson } from "@/content/types";

const lessons: ILesson[] = [
	{
		slug: "pomorska-karta",
		area: "karte-navigacija",
		order: 1,
		title: "Pomorska karta",
		summary:
			"Što je pomorska karta i kako čitaš mjerilo, boje, dubine i vrstu dna.",
		level: "common",
		minutes: 6,
		blocks: [
			{
				type: "text",
				level: "common",
				markdown:
					"Pomorska karta je slika mora odozgo. Na njoj vidiš obalu, dubine, opasnosti, svjetla i oznake.\n\nU Hrvatskoj karte izdaje **Hrvatski hidrografski institut (HHI)** iz Splita. Karte su u **Merkatorovoj projekciji**: meridijani i paralele su ravne crte pod pravim kutom, pa stalni kurs crtaš kao ravnu crtu.",
			},
			{
				type: "text",
				level: "common",
				markdown:
					"**Mjerilo** kaže koliko je stvarnost umanjena. Kod 1:200 000 jedan milimetar na karti je 200 000 mm, a to je 200 m u prirodi.\n\nŠto je broj iza dvotočke manji, karta je **krupnija**: pokriva manje područje, ali ima više detalja. Od najsitnijih prema najkrupnijima idu generalne karte, kursne karte, obalne karte i planovi luka.",
			},
			{
				type: "example",
				level: "common",
				title: "Koju kartu uzeti?",
				markdown:
					'Za prijelaz kanala dovoljna je obalna karta, npr. 1:100 000. Za ulaz u nepoznatu luku uzmi plan, npr. 1:10 000, jer na njemu vidiš svaki gat i plićinu.\n\nKratica **V pl** znači "vidi plan": za to mjesto postoji detaljniji prikaz.',
			},
			{
				type: "table",
				level: "common",
				caption: "Boje i brojevi na karti",
				columns: ["Što vidiš", "Što znači"],
				rows: [
					["Žuto područje", "Kopno"],
					["Plavo more", "Plića voda"],
					["Bijelo more", "Dublja voda"],
					["Plavo s točkastim rubom i križićem", "Dubina manja od 2 m"],
					["Broj u moru", "Dubina u metrima"],
					["Broj na kopnu", "Visina iznad mora u metrima"],
				],
			},
			{
				type: "table",
				level: "common",
				caption: "Slova u moru: vrsta dna",
				columns: ["Slovo", "Dno"],
				rows: [
					["M", "mulj"],
					["P", "pijesak"],
					["Š", "šljunak"],
					["K", "kamen"],
					["Šk", "školjke"],
					["Kor", "koralji"],
					["T", "trava"],
					["Hr", "hrid"],
				],
			},
			{
				type: "source-note",
				level: "common",
				markdown:
					'Skripte se ne slažu gdje prestaje plavo: jedna kaže 10 m, bilješke za ispit B kažu 20 m. Granica ovisi o samoj karti, pa pogledaj legendu karte koju koristiš. Za ispit je dovoljno: plavo je plitko, bijelo je dublje.\n\nNeke bilješke čitaju "ŠK" kao šljunkovito dno. Na hrvatskim kartama Š je šljunak, a Šk su školjke.',
			},
			{
				type: "warning",
				level: "common",
				markdown:
					"Karta koja nije ispravljena prema **Oglasima za pomorce (OZP)** nije pouzdana za plovidbu. Novo svjetlo, nova plutača ili novi kabel na staroj karti ne postoje.",
			},
			{
				type: "remember",
				level: "common",
				items: [
					"Manji broj iza 1: znači krupniju kartu s više detalja.",
					"Brojevi u moru su dubine, brojevi na kopnu visine, oboje u metrima.",
					"Za sidrenje su najbolji mulj (M) i pijesak (P), najlošiji kamen (K).",
					"Kartu uvijek drži ispravljenom prema OZP.",
				],
			},
			{ type: "check", level: "common", questionId: "karte-navigacija-002" },
			{ type: "check", level: "common", questionId: "karte-navigacija-005" },
		],
		cheatSheet: [
			"Karte izdaje HHI Split, Merkatorova projekcija.",
			"1:200 000 znači 1 mm na karti = 200 m u prirodi.",
			"Plavo plitko, bijelo dublje, točkasti krug s križićem ispod 2 m.",
			"M mulj, P pijesak, Š šljunak, K kamen, Šk školjke, Hr hrid.",
			"Neispravljena karta nije za plovidbu (ispravci iz OZP).",
		],
		source: "original",
	},
	{
		slug: "znakovi-na-karti",
		area: "karte-navigacija",
		order: 2,
		title: "Znakovi na karti",
		summary:
			"Kabeli, cjevovodi, sidrišta i zabrane sidrenja na karti i na obali.",
		level: "common",
		minutes: 4,
		blocks: [
			{
				type: "text",
				level: "common",
				markdown:
					"Na dnu mora leže kabeli (struja, telefon) i cjevovodi (voda, plin, kanalizacija). Sidro ih može zakačiti i prekinuti, a ti možeš izgubiti sidro.\n\nZato karta pokazuje gdje leže i gdje smiješ, a gdje ne smiješ sidriti.",
			},
			{
				type: "table",
				level: "common",
				caption: "Znakovi koje moraš prepoznati",
				columns: ["Znak", "Značenje"],
				rows: [
					["Crvena vijugava crta", "Podmorski kabel"],
					["Crveno-crna isprekidana crta", "Podmorski cjevovod"],
					["Crveno prekriženo sidro", "Zabranjeno sidrenje"],
					["Crno uspravno sidro", "Preporučeno sidrište"],
					[
						"Crveno uspravno sidro u okviru",
						"Sidrište za brodove s opasnim teretom",
					],
				],
			},
			{
				type: "text",
				level: "common",
				markdown:
					"I na obali postoji znak. Na svakom kraju podmorske instalacije stoji **bijela ploča s crnim sidrom okrenutim naopako**. Vidi se s mora i znači: ovdje ne sidri.",
			},
			{
				type: "example",
				level: "common",
				title: "Situacija u uvali",
				markdown:
					"Ulaziš u uvalu i na rtu vidiš bijelu ploču s naopakim sidrom. Na karti kroz uvalu ide crvena vijugava crta. Sidri dalje od te crte, u dijelu uvale gdje nema instalacija.",
			},
			{
				type: "remember",
				level: "common",
				items: [
					"Iznad kabela i cjevovoda zabranjeno je sidrenje i koćarenje.",
					"Naopako sidro na bijeloj ploči i crveno prekriženo sidro znače zabranu sidrenja.",
					"Crno uspravno sidro je preporučeno sidrište.",
				],
			},
			{ type: "check", level: "common", questionId: "karte-navigacija-010" },
		],
		cheatSheet: [
			"Crvena vijugava crta: kabel. Crveno-crna isprekidana: cjevovod.",
			"Iznad instalacija: zabrana sidrenja i koćarenja.",
			"Bijela ploča s naopakim crnim sidrom na obali: ne sidri.",
			"Crno sidro sidrište, crveno prekriženo zabrana, crveno u okviru opasni teret.",
		],
		source: "original",
	},
	{
		slug: "koordinate-i-udaljenost",
		area: "karte-navigacija",
		order: 3,
		title: "Koordinate, udaljenost i brzina",
		summary:
			"Geografska širina i dužina, nautička milja, mjerenje šestarom i računanje brzine.",
		level: "common",
		minutes: 7,
		blocks: [
			{
				type: "text",
				level: "common",
				markdown:
					"Svaku točku na moru opisuju dva broja.\n\n**Geografska širina** kaže koliko si sjeverno ili južno od ekvatora (0° do 90°, N ili S). **Geografska dužina** kaže koliko si istočno ili zapadno od Greenwicha (0° do 180°, E ili W).\n\nNa Jadranu je širina uvijek N, a dužina uvijek E.",
			},
			{
				type: "example",
				level: "common",
				title: "Kako se piše pozicija",
				markdown:
					"43° 25,6' N, 16° 38,7' E\n\nPrvo širina, zatim dužina. Jedan stupanj ima 60 minuta, a minute pišemo s jednom decimalom (desetinke minute).",
			},
			{
				type: "text",
				level: "common",
				markdown:
					"Karta je okrenuta sjeverom gore. **Skala širine** je uz lijevi i desni rub, **skala dužine** uz gornji i donji rub.\n\nUdaljenost se mjeri u **nautičkim miljama (NM)**. Jedna milja je jedna minuta širine.",
			},
			{
				type: "table",
				level: "common",
				caption: "Jedinice u navigaciji",
				columns: ["Jedinica", "Vrijednost"],
				rows: [
					["1 nautička milja", "1852 m = 1 minuta širine"],
					["1 kabel", "desetina milje, oko 185 m"],
					["1 čvor", "1 milja na sat"],
					["Dubina i visina", "u metrima"],
				],
			},
			{
				type: "text",
				level: "common",
				markdown:
					"**Mjerenje udaljenosti:** jedan krak šestara staviš na polaznu točku, drugi na dolaznu. Ne mijenjaš razmak i preneseš šestar na **skalu širine**, otprilike u visini svoje rute. Očitaš milje i kabele.\n\nNa skali dužine nikad ne mjeriš udaljenost: minuta dužine je kraća od milje.",
			},
			{
				type: "example",
				level: "common",
				title: "Brzina, put i vrijeme",
				markdown:
					"Put = brzina x vrijeme.\n\n- 20 NM za 4 sata: brzina je 20 / 4 = **5 čvorova**.\n- 12 NM pri 6 čvorova: vrijeme je 12 / 6 = **2 sata**.\n- 3 sata pri 7 čvorova: put je 3 x 7 = **21 NM**.",
			},
			{
				type: "remember",
				level: "common",
				items: [
					"1 NM = 1852 m = 1 minuta širine = 10 kabela.",
					"Udaljenost očitavaš na bočnoj skali širine, nikad na skali dužine.",
					"Čvor je milja na sat.",
					"Pozicija: prvo širina (N), pa dužina (E).",
				],
			},
			{ type: "check", level: "common", questionId: "karte-navigacija-014" },
			{ type: "check", level: "common", questionId: "karte-navigacija-017" },
		],
		cheatSheet: [
			"Širina N/S od ekvatora, dužina E/W od Greenwicha.",
			"1 NM = 1852 m = 1' širine = 10 kabela.",
			"Šestar na skalu širine (lijevi ili desni rub).",
			"Brzina = put / vrijeme, u čvorovima.",
		],
		source: "original",
	},
	{
		slug: "kurs-i-azimut",
		area: "karte-navigacija",
		order: 4,
		title: "Kurs, azimut i ruža",
		summary:
			"Kako na karti očitaš kurs i azimut i zašto vjetar i struja imenuju smjer obrnuto.",
		level: "common",
		minutes: 6,
		blocks: [
			{
				type: "text",
				level: "common",
				markdown:
					"**Kurs** je kut između smjera sjevera (meridijana) i pramca brodice. **Azimut** je kut između smjera sjevera i smjera prema nekom objektu, npr. svjetioniku.\n\nOba se broje od 0° do 360° u smjeru kazaljke na satu.",
			},
			{
				type: "table",
				level: "common",
				caption: "Glavni smjerovi i kvadranti",
				columns: ["Kut", "Smjer", "Kvadrant"],
				rows: [
					["0° (360°)", "sjever (N)", "I: od 0° do 90°"],
					["90°", "istok (E)", "II: od 90° do 180°"],
					["180°", "jug (S)", "III: od 180° do 270°"],
					["270°", "zapad (W)", "IV: od 270° do 360°"],
				],
			},
			{
				type: "visual",
				level: "common",
				visual: "compass-course-calculator",
				caption: "Pomakni pramac i gledaj kako se mijenja kurs i kvadrant.",
				props: { mode: "course" },
			},
			{
				type: "text",
				level: "common",
				markdown:
					"**Kurs s karte očitaš s dva trokuta.** Jednim pokriješ crtu kursa od polazne do dolazne točke. Drugim ga kliziš, bez okretanja, dok rub ne prođe kroz središte najbliže ruže. Na rubu ruže očitaš kut.\n\nDa ne pogriješiš za 180°, zamisli pramac u središtu ruže okrenut kamo ploviš.",
			},
			{
				type: "text",
				level: "common",
				markdown:
					"**Vjetar** se imenuje po smjeru **odakle puše**, a **struja** po smjeru **kamo teče**. Sjeverni vjetar dolazi sa sjevera, a sjeverna struja ide prema sjeveru.\n\nVjetar ili struja u pramac usporavaju te, u krmu ubrzavaju, a s boka te zanose u stranu.",
			},
			{
				type: "example",
				level: "common",
				title: "Povratni kurs",
				markdown:
					"Do otoka ploviš kursom 045°. Natrag ploviš suprotnim smjerom: 45 + 180 = **225°**. Ako je zbroj veći od 360, oduzmi 360.",
			},
			{
				type: "remember",
				level: "common",
				items: [
					"Kurs: od sjevera do pramca. Azimut: od sjevera do objekta.",
					"0° N, 90° E, 180° S, 270° W, u smjeru kazaljke.",
					"Vjetar: odakle puše. Struja: kamo teče.",
					"Povratni kurs: dodaj ili oduzmi 180°.",
				],
			},
			{ type: "check", level: "common", questionId: "karte-navigacija-021" },
			{ type: "check", level: "common", questionId: "karte-navigacija-023" },
		],
		cheatSheet: [
			"Kurs i azimut: 0° do 360° od sjevera, u smjeru kazaljke.",
			"Kurs s karte: dva trokuta do središta ruže.",
			"Vjetar se imenuje odakle puše, struja kamo teče (razlika 180°).",
			"Vjetar s boka zanosi, u pramac usporava, u krmu ubrzava.",
		],
		source: "original",
	},
	{
		slug: "magnetski-kompas",
		area: "karte-navigacija",
		order: 5,
		title: "Magnetski kompas",
		summary:
			"Dijelovi kompasa, varijacija, devijacija i preračun pravog kursa u kompasni.",
		level: "B",
		minutes: 7,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"Magnetski kompas služi da održiš kurs. U **kotlu** od nemagnetskog materijala, u tekućini (destilirana voda i alkohol), pluta ruža s magnetskim štapićima koji drže 0° prema kompasnom sjeveru.\n\nKotao visi u **kardanskom ovjesu**, pa ruža ostaje vodoravna kad se brodica ljulja. Na kotlu je **pramčanica**, crtica ispod koje čitaš kurs. Kompas ima rasvjetu za noć i zaštitnu kapu.",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"Kompas ne pokazuje točno pravi sjever s karte. Dvije su pogreške:\n\n- **Varijacija** dolazi od Zemlje: magnetski i pravi sjever nisu na istom mjestu. Iznos i godišnja promjena piše uz ružu na karti.\n- **Devijacija** dolazi od same brodice: motor, željezo, elektrika. Mijenja se s kursom, pa za brod postoji **tablica devijacije**.\n\nIstočna (E) pogreška je plus, zapadna (W) minus.",
			},
			{
				type: "table",
				level: "B",
				caption: "Tri kursa",
				columns: ["Kurs", "Odnosi se na"],
				rows: [
					["Pravi kurs (Kp)", "pravi sjever, crtaš ga na karti"],
					["Magnetski kurs (Km)", "magnetski sjever: Kp bez varijacije"],
					["Kompasni kurs (Kk)", "ono što držiš na kompasu: Km bez devijacije"],
				],
			},
			{
				type: "example",
				level: "B",
				title: "S karte na kompas",
				markdown:
					"Kp = 090°, varijacija +3° (E), devijacija -2° (W).\n\n1. Km = Kp - varijacija = 90 - 3 = **87°**\n2. Kk = Km - devijacija = 87 - (-2) = **89°**\n\nObrnuto, s kompasa na kartu, zbrajaš: Kp = Kk + devijacija + varijacija.",
			},
			{
				type: "visual",
				level: "B",
				visual: "compass-course-calculator",
				caption:
					"Mijenjaj varijaciju i devijaciju i prati kako se mijenja kompasni kurs.",
				props: {
					mode: "variation-deviation",
					trueCourse: 90,
					variation: 3,
					deviation: -2,
				},
			},
			{
				type: "warning",
				level: "B",
				markdown:
					"Uz kompas ne ostavljaj mobitel, zvučnike, alat ni drugo željezo. Svaki takav predmet stvara novu devijaciju koju tablica ne zna.",
			},
			{
				type: "remember",
				level: "B",
				items: [
					"Varijacija: Zemljin magnetizam, piše uz ružu na karti.",
					"Devijacija: brodski magnetizam, mijenja se s kursom.",
					"Istočno plus, zapadno minus.",
					"S karte na kompas oduzimaš, s kompasa na kartu zbrajaš.",
				],
			},
			{ type: "check", level: "B", questionId: "karte-navigacija-029" },
			{ type: "check", level: "B", questionId: "karte-navigacija-028" },
		],
		cheatSheet: [
			"Kotao nemagnetski, kardanski ovjes, pramčanica, rasvjeta.",
			"Varijacija od Zemlje, devijacija od broda.",
			"Kp = Kk + devijacija + varijacija (E plus, W minus).",
			"Mobitel i željezo dalje od kompasa.",
		],
		source: "original",
	},
	{
		slug: "odredivanje-pozicije",
		area: "karte-navigacija",
		order: 6,
		title: "Određivanje pozicije",
		summary:
			"Pozicija iz dva azimuta, azimut i udaljenost, pravilo 45° i 90°, zbrojena i procijenjena pozicija.",
		level: "B",
		minutes: 7,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"Uz obalu poziciju dobiješ iz objekata koje vidiš i koji su ucrtani na karti: svjetionik, rt, zvonik.\n\n**Istovremeno opažanje:** izmjeriš azimute na dva ili više objekata u isto vrijeme. Svaki azimut ucrtaš kao crtu od objekta. Tamo gdje se crte sijeku, tu si.",
			},
			{
				type: "remember",
				level: "B",
				title: "Da pozicija bude dobra",
				items: [
					"Kompasni azimut prvo ispravi za devijaciju i varijaciju, pa crtaj.",
					"Biraj objekte čije se crte sijeku što bliže pravom kutu.",
					"S tri azimuta dobiješ mali trokut, a pozicija je u njemu.",
				],
			},
			{
				type: "text",
				level: "B",
				markdown:
					"**Azimut i udaljenost:** ako imaš radar, dovoljan je jedan poznati objekt. Radar daje udaljenost, kompas ili radar azimut. To je najbrži način.\n\n**Opažanje u razmaku vremena:** kad vidiš samo jedan objekt, mjeriš ga dvaput i koristiš put koji si prešao između.",
			},
			{
				type: "example",
				level: "B",
				title: "Pravilo 45° i 90°",
				markdown:
					"Svjetionik je u 10:00 pod pramčanim kutom 45°. U 10:30 je točno po boku (90°). Ploviš 8 čvorova.\n\nZa pola sata prešao si 4 NM. Toliko si udaljen od svjetionika kad je po boku: **4 NM**.",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"**Zbrojena pozicija:** od zadnje sigurne pozicije ucrtaš kurs i prijeđeni put (brzina x vrijeme). **Procijenjena pozicija** je zbrojena pozicija ispravljena za vjetar i struju.\n\nGPS ti poziciju daje izravno, ali zbrojenu poziciju moraš znati izračunati kad GPS zakaže.",
			},
			{ type: "check", level: "B", questionId: "karte-navigacija-033" },
		],
		cheatSheet: [
			"Dva istovremena azimuta: pozicija u sjecištu.",
			"Radar: azimut i udaljenost na jedan objekt.",
			"45° pa 90°: prijeđeni put = udaljenost po boku.",
			"Zbrojena: kurs, brzina, vrijeme. Procijenjena: plus vjetar i struja.",
		],
		source: "original",
	},
	{
		slug: "elektronicka-pomagala",
		area: "karte-navigacija",
		order: 7,
		title: "Elektronička pomagala",
		summary: "Radar, dubinomjer, brzinomjer, GPS i elektroničke karte.",
		level: "B",
		minutes: 5,
		blocks: [
			{
				type: "table",
				level: "B",
				caption: "Što koji uređaj radi",
				columns: ["Uređaj", "Kako radi", "Što ti daje"],
				rows: [
					[
						"Radar",
						"šalje radio valove i hvata odraz",
						"sliku obale i plovila, azimut i udaljenost, također u magli i noću",
					],
					[
						"Dubinomjer (ehosonder)",
						"ultrazvučni impuls do dna i natrag",
						"dubinu ispod sonde",
					],
					["Brzinomjer (log)", "mjeri protok vode uz trup", "brzinu kroz vodu"],
					[
						"GPS (GNSS)",
						"signali tridesetak satelita",
						"poziciju, vrijeme, brzinu preko dna",
					],
					[
						"Elektronička karta (ENC, ECDIS)",
						"karta na zaslonu",
						"tvoju poziciju na karti u stvarnom vremenu",
					],
				],
			},
			{
				type: "text",
				level: "B",
				markdown:
					"**Radar** je jedini uređaj na brodici koji mjeri udaljenost do objekta. Najviše vrijedi kad je vidljivost slaba, za izbjegavanje sudara.\n\n**Dubinomjer** mjeri vrijeme puta impulsa do dna i natrag, dijeli ga s dva i množi s brzinom zvuka u vodi, oko 1500 m/s.",
			},
			{
				type: "example",
				level: "B",
				title: "Brzina kroz vodu i preko dna",
				markdown:
					"Brzinomjer pokazuje 6 čvorova, a struja ti dolazi u pramac 2 čvora. GPS pokazuje 6 - 2 = **4 čvora** preko dna. Za vrijeme dolaska računaj s brzinom preko dna.",
			},
			{
				type: "warning",
				level: "B",
				markdown:
					"Elektronika može zakazati (baterija, osigurač, signal). Uvijek imaj papirnatu kartu i znaj odrediti poziciju bez GPS-a. I elektroničke karte se moraju redovito ažurirati.",
			},
			{
				type: "remember",
				level: "B",
				items: [
					"Radar: jedini mjeri udaljenost, glavna pomoć u magli.",
					"Ehosonder: vrijeme jeke / 2 x oko 1500 m/s.",
					"Brzinomjer: kroz vodu. GPS: preko dna.",
				],
			},
			{ type: "check", level: "B", questionId: "karte-navigacija-037" },
		],
		cheatSheet: [
			"Radar mjeri azimut i udaljenost, radi u magli.",
			"Dubinomjer radi na jeku ultrazvuka.",
			"Brzinomjer kroz vodu, GPS preko dna.",
			"ENC karte se ažuriraju kao i papirnate.",
		],
		source: "original",
	},
	{
		slug: "nauticke-publikacije",
		area: "karte-navigacija",
		order: 8,
		title: "Nautičke publikacije",
		summary:
			"Peljar, Popis svjetala, Radio-služba, Tablice morskih mijena i Oglasi za pomorce.",
		level: "B",
		minutes: 4,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"Uz kartu, HHI izdaje priručnike za plovidbu. Kartu za svoje područje biraš iz **Kataloga pomorskih karata**. Svaka karta ima svoj broj, otisnut u gornjem lijevom i donjem desnom kutu.",
			},
			{
				type: "table",
				level: "B",
				caption: "Što gdje tražiš",
				columns: ["Publikacija", "Što ima"],
				rows: [
					[
						"Peljar (Jadranskog mora, za male brodove)",
						"luke, uvale, kanale, sidrišta, upute za uplovljavanje, vjetrove, struje, opskrbu",
					],
					[
						"Popis svjetala i signala za maglu",
						"za svako svjetlo: broj, poziciju, visinu, boju, period, domet, sektore, signal za maglu",
					],
					["Radio-služba", "obalne radio postaje, kanale, upute za VHF promet"],
					["Tablice morskih mijena", "vrijeme i visinu plime i oseke"],
					[
						"Oglasi za pomorce (OZP)",
						"ispravke karata i priručnika, privremene i trajne",
					],
				],
			},
			{
				type: "text",
				level: "B",
				markdown:
					"**OZP** izlaze redovito, mjesečno. Javljaju novo ili ugašeno svjetlo, promjenu karakteristike svjetla, nove plutače, kabele i lukobrane. Prema njima ispravljaš karte i priručnike.",
			},
			{
				type: "remember",
				level: "B",
				items: [
					"Peljar: vodič kroz luke i sidrišta.",
					"Popis svjetala: sve o svakom svjetlu.",
					"OZP: ispravci, mjesečno.",
				],
			},
			{ type: "check", level: "B", questionId: "karte-navigacija-039" },
		],
		cheatSheet: [
			"Sve publikacije izdaje HHI Split.",
			"Peljar: luke, sidrišta, upute.",
			"Popis svjetala i signala za maglu: podaci o svjetlima.",
			"OZP: mjesečni ispravci karata.",
		],
		source: "original",
	},
];

export default lessons;
