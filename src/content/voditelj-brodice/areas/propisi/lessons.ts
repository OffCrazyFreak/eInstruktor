import type { ILesson } from "@/content/types";

const lessons: ILesson[] = [
	{
		slug: "propisi-i-nadleznost",
		area: "propisi",
		order: 1,
		title: "Koji propisi vrijede i tko ih provodi",
		summary:
			"Koji pravilnici uređuju brodice i voditelje brodica i tko na moru pazi da se poštuju.",
		level: "B",
		minutes: 4,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"Pravila za plovidbu dolaze iz **Pomorskog zakonika** i pravilnika koji ga razrađuju.\n\nZa brodice su danas važna dva pravilnika:\n\n- **Pravilnik o brodicama, čamcima i jahtama** (NN 13/20, izmjena NN 52/20): tehnička pravila, područja plovidbe, upis, pregledi i oprema.\n- **Stari Pravilnik o brodicama i jahtama** (NN 27/05 i izmjene): iz njega i dalje vrijedi dio o posadi, dakle kategorije A, B i C, uvjeti i programi ispita. Taj dio vrijedi dok se ne donese novi propis o zvanjima.",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"**Tko provodi pravila?**\n\n- **Ministarstvo mora, prometa i infrastrukture** donosi propise i organizira ispite.\n- **Lučke kapetanije** (Pula, Rijeka, Senj, Zadar, Šibenik, Split, Ploče i Dubrovnik) i njihove **ispostave** upisuju i pregledavaju brodice, provode nadzor i primaju prijave nezgoda.\n- **Inspektori sigurnosti plovidbe** kapetanije smiju na moru provjeriti brodicu, opremu, isprave i posadu.\n- **Hrvatski registar brodova (HRB)** u Splitu pregledava jahte.\n\nSvaka kapetanija je nadležna za svoje područje obale.",
			},
			{
				type: "remember",
				level: "B",
				title: "Zapamti",
				items: [
					"Tehnička pravila za brodice: Pravilnik o brodicama, čamcima i jahtama (NN 13/20).",
					"Kategorije A, B i C i dalje su u starom Pravilniku o brodicama i jahtama.",
					"Brodice nadzire lučka kapetanija ili ispostava, jahte pregledava HRB.",
				],
			},
			{
				type: "source-note",
				level: "B",
				markdown:
					'Stara skripta s pitanjima i odgovorima opisuje samo "Pravilnik o brodicama i jahtama" kao propis koji uređuje sve o brodicama. Od 01.02.2020. tehnički dio zamijenio je Pravilnik o brodicama, čamcima i jahtama (NN 13/20). Stari pravilnik vrijedi još samo za posadu i ispite.',
			},
			{
				type: "warning",
				level: "B",
				markdown:
					"Najavljena je reforma: računalni dio ispita i obavezna praktična nastava za kategoriju B. Na dan 23.11.2026. nije donesena i ne vrijedi. Prije prijave ispita provjeri stanje kod lučke kapetanije ili Ministarstva.",
			},
			{ type: "check", level: "B", questionId: "propisi-031" },
		],
		cheatSheet: [
			"Tehnička pravila: Pravilnik o brodicama, čamcima i jahtama (NN 13/20).",
			"Posada i ispiti: dio starog Pravilnika o brodicama i jahtama.",
			"Nadzor: lučke kapetanije i ispostave; jahte pregledava HRB.",
			"Reforma ispita je najavljena, ali još ne vrijedi.",
		],
		source: "original",
	},
	{
		slug: "pojmovi",
		area: "propisi",
		order: 2,
		title: "Brod, jahta, brodica",
		summary:
			"Po čemu se razlikuju brod, jahta i brodica i što još propis zove posebnim imenom.",
		level: "B",
		minutes: 5,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"Pravila koja vrijede za tebe ovise o tome čime plovite. Zato prvo treba znati imena.\n\n**Brodica** je plovilo za more koje smije prevoziti najviše 12 putnika, a trup mu je dulji od 2,5 m i najviše 15 m. Brodica je i manje plovilo ako mu motori ukupno imaju više od 5 kW.",
			},
			{
				type: "table",
				level: "B",
				caption: "Tri osnovna pojma",
				columns: ["Pojam", "Duljina", "Putnici", "Namjena"],
				rows: [
					[
						"Brodica",
						"više od 2,5 m, najviše 15 m (ili više od 5 kW)",
						"najviše 12",
						"osobne, gospodarske ili javne potrebe",
					],
					[
						"Jahta",
						"više od 15 m",
						"uz posadu najviše 12",
						"sport i razonoda, i kad se iznajmljuje",
					],
					[
						"Brod",
						"više od 15 m",
						"ili ovlašten za više od 12",
						"sve ostalo što nije brodica ni jahta",
					],
				],
			},
			{
				type: "text",
				level: "B",
				markdown:
					"Još nekoliko pojmova koje ispit voli:\n\n- **Gliser**: brodica koja zbog motora klizi po površini mora.\n- **Osobno plovilo na vodomlazni pogon** (skuter, jet ski): brodica kraća od 4 m s mlaznom pumpom, na kojoj se sjedi, stoji ili kleči.\n- **Putnik**: svaka osoba na plovilu osim djece mlađe od jedne godine i ljudi koji na njemu rade.\n- **Bruto tonaža (BT)**: zapremnina plovila izmjerena baždarenjem. Nema mjerne jedinice.\n\nBrodicom se **ne** smatraju kanui, kajaci, gondole, pedaline, daske za jedrenje i surf, plovila samo za natjecanja i pomoćni čamci drugog broda.",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"Po namjeni brodica može biti:\n\n- **za osobne potrebe**: sport i razonoda, bez zarade;\n- **za gospodarske namjene**: prijevoz putnika ili tereta, ribarske, radne i brodice za najam;\n- **javna**: koristi je država, npr. policija ili kapetanija.",
			},
			{
				type: "example",
				level: "B",
				title: "Je li ovo brodica?",
				markdown:
					"Mali gumenjak dug 2,3 m ima vanbrodski motor od 6 kW. Kraći je od 2,5 m, ali motor ima više od 5 kW, pa je po propisu **brodica**.\n\nPlovilo dugo do 2,5 m smije istovremeno voziti najviše **dvije osobe**.",
			},
			{
				type: "remember",
				level: "B",
				title: "Zapamti",
				items: [
					"Brodica: više od 2,5 m i najviše 15 m, ili više od 5 kW; najviše 12 putnika.",
					"Jahta: više od 15 m, za sport i razonodu, uz posadu najviše 12 putnika.",
					"Brod: više od 15 m ili ovlašten za više od 12 putnika.",
					"Skuter je brodica kraća od 4 m s mlaznim pogonom.",
				],
			},
			{ type: "check", level: "B", questionId: "propisi-001" },
			{ type: "check", level: "B", questionId: "propisi-005" },
		],
		cheatSheet: [
			"Brodica: 2,5 do 15 m (ili više od 5 kW), najviše 12 putnika.",
			"Jahta: više od 15 m, sport i razonoda, najviše 12 putnika.",
			"Brod: više od 15 m ili više od 12 putnika.",
			"Plovilo do 2,5 m: najviše dvije osobe.",
			"Dijete mlađe od godine dana ne broji se kao putnik.",
		],
		source: "original",
	},
	{
		slug: "podrucja-i-ovlasti",
		area: "propisi",
		order: 3,
		title: "Područja plovidbe i ovlasti A, B i C",
		summary:
			"Koliko daleko od obale smiješ i što ti dopušta koja kategorija voditelja brodice.",
		level: "common",
		minutes: 7,
		blocks: [
			{
				type: "text",
				level: "common",
				markdown:
					"More je podijeljeno na **područja plovidbe** prema tome koliko si daleko od **najbliže obale kopna ili otoka**. Udaljenost se mjeri u nautičkim miljama (NM, 1 NM = 1852 m).\n\nŠto je brojka manja, to smiješ dalje. Područje I je cijeli svijet, područje IV su luke i zaljevi.",
			},
			{
				type: "visual",
				level: "common",
				visual: "navigation-areas-map",
				caption: "Povuci brodicu od obale i gledaj u kojem si području.",
				props: { rings: ["1", "3", "6", "12", "20"], showCertificate: true },
			},
			{
				type: "table",
				level: "common",
				caption: "Područja plovidbe",
				columns: ["Područje", "Granica"],
				rows: [
					["I", "sva mora"],
					["II", "do 20 NM od najbliže obale"],
					["III", "do 12 NM od najbliže obale"],
					["IIIa", "do 6 NM od obale"],
					["IIIb", "do 3 NM od obale"],
					["IIIc", "do 1 NM od obale"],
					["IV", "luke, zaljevi, ušća rijeka i rijeke dokle su plovne s mora"],
				],
			},
			{
				type: "text",
				level: "A",
				markdown:
					"**Kategorija A** (od navršenih 15 godina) smije upravljati brodicom **za osobne potrebe** dugom **do 7 m** s motorom **do 15 kW**, u područjima **IIIa, IIIb, IIIc i IV**. Dakle najviše 6 NM od obale.",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"**Kategorija B** (od navršenih 16 godina) smije upravljati brodicom za osobne potrebe u području **III i IV** (do 12 NM od obale) i zapovijedati **jahtom do 18 m** za osobne potrebe ili iznajmljenom bez posade. B pokriva sve što smije A.\n\nPazi: brodicom s motorom jačim od **15 kW** smiješ upravljati tek kad navršiš **18 godina**.\n\n**Skuter** smije samo u području **IIIc**, i to u unutarnjim morskim vodama i teritorijalnom moru RH.\n\n**Projektna kategorija** plovila (A, B, C, D) je oznaka gradnje, ne tvoja dozvola. Brodica projektne kategorije D smije samo u područje IV, kategorije C najdalje u III. Ograničenja za tvoju brodicu pišu u upisnom listu.",
			},
			{
				type: "text",
				level: "common",
				markdown:
					"**Kategorija C** traži 18 godina, liječničku potvrdu i obaveznu izobrazbu. Treba za plovidbu dalje od 12 NM (područja I i II) i za dio gospodarskih brodica, npr. prijevoz putnika u području III. Brodicom na vesla za osobne potrebe smije upravljati svatko stariji od 12 godina.",
			},
			{
				type: "source-note",
				level: "common",
				markdown:
					'Stara skripta s pitanjima i odgovorima kaže da je područje II "Jadransko more", a III "unutarnje i teritorijalne vode". To je stara podjela. Danas vrijedi: II do 20 NM, III do 12 NM od najbliže obale (Pravilnik NN 13/20, čl. 37). Neki tekstovi pišu i "B do 30 BT"; propis je tu granicu zamijenio s 18 m za jahte.',
			},
			{
				type: "remember",
				level: "common",
				title: "Zapamti",
				items: [
					"II: 20 NM, III: 12 NM, IIIa: 6 NM, IIIb: 3 NM, IIIc: 1 NM, IV: luke i zaljevi.",
					"A: od 15 godina, do 7 m i 15 kW, IIIa do IV.",
					"B: od 16 godina, III i IV, jahte do 18 m; preko 15 kW tek s 18 godina.",
				],
			},
			{ type: "check", level: "common", questionId: "propisi-009" },
			{ type: "check", level: "A", questionId: "propisi-013" },
		],
		cheatSheet: [
			"II 20 NM, III 12 NM, IIIa 6 NM, IIIb 3 NM, IIIc 1 NM, IV luke i zaljevi.",
			"A: 15 godina, brodica do 7 m i 15 kW, područja IIIa, IIIb, IIIc, IV.",
			"B: 16 godina, područja III i IV, jahte do 18 m za osobne potrebe.",
			"Motor jači od 15 kW: B i navršenih 18 godina.",
			"Skuter: samo IIIc.",
		],
		source: "original",
	},
	{
		slug: "isprave-i-upis",
		area: "propisi",
		order: 4,
		title: "Isprave, upis i oznake brodice",
		summary:
			"Što moraš imati na brodici, kad se brodica upisuje i kako se čita njezina oznaka.",
		level: "B",
		minutes: 5,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"U plovidbi na brodici uvijek moraju biti:\n\n1. **Upisni list brodice**: osobna iskaznica brodice. Kapetanija ga izdaje kad brodicu upiše i pregledom utvrdi da je sposobna za plovidbu.\n2. **Uvjerenje o osposobljenosti** za voditelja brodice (tvoja dozvola).\n\nAko brodica ima VHF postaju, treba i dozvola za radijsku postaju (više u lekcijama o VHF-u).",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"U upisnom listu piše, među ostalim: oznaka i ime brodice, vlasnik, namjena, duljina, motor i snaga, najveći broj osoba, područje plovidbe i rok valjanosti pregleda. Tu su upisana i ograničenja, npr. plovidba samo po lijepom vremenu.\n\n**Upis je obavezan** za brodicu dulju od 2,5 m ili s motorom jačim od 5 kW kad je vlasnik osoba s prebivalištem ili sjedištem u Hrvatskoj.",
			},
			{
				type: "table",
				level: "B",
				caption: "Oznaka brodice (ST je luka upisa, broj je NIB)",
				columns: ["Namjena", "Primjer oznake"],
				rows: [
					["Osobne potrebe", "ST 123456"],
					["Gospodarske namjene", "123456 ST"],
					["Javna brodica", "RH 123456 ST"],
				],
			},
			{
				type: "text",
				level: "B",
				markdown:
					"**NIB** je nacionalni identifikacijski broj brodice. Kod osobnih brodica slova luke upisa stoje ispred broja, kod gospodarskih iza.\n\nBrodica s motorom jačim od **15 kW** mora imati valjanu **policu obveznog osiguranja od odgovornosti**.",
			},
			{
				type: "warning",
				level: "B",
				markdown:
					"Ploviti bez upisnog lista ili bez uvjerenja je prekršaj. Slijedi novčana kazna, a uvjerenje ti mogu i oduzeti.",
			},
			{
				type: "source-note",
				level: "B",
				markdown:
					'Stara skripta s pitanjima i odgovorima taj dokument zove "dozvola za plovidbu". Danas se zove **upisni list brodice**.',
			},
			{
				type: "remember",
				level: "B",
				title: "Zapamti",
				items: [
					"Na brodici uvijek: upisni list i uvjerenje voditelja.",
					"ST 123456 je osobna brodica, 123456 ST gospodarska.",
					"Motor jači od 15 kW: obavezno osiguranje od odgovornosti.",
				],
			},
			{ type: "check", level: "B", questionId: "propisi-020" },
			{ type: "check", level: "B", questionId: "propisi-021" },
		],
		cheatSheet: [
			"Upisni list + uvjerenje voditelja uvijek na brodici.",
			"Upis: brodica dulja od 2,5 m ili jača od 5 kW.",
			"Osobna: ST 123456; gospodarska: 123456 ST; javna: RH 123456 ST.",
			"Više od 15 kW: polica obveznog osiguranja.",
		],
		source: "original",
	},
	{
		slug: "pregledi",
		area: "propisi",
		order: 5,
		title: "Pregledi brodice",
		summary:
			"Osnovni, redovni i izvanredni pregled: kad koji i tko ga obavlja.",
		level: "B",
		minutes: 4,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"Pregledom kapetanija utvrđuje je li brodica **sposobna za plovidbu**. Pregled obavlja lučka kapetanija ili ispostava, uz naknadu. Jahte pregledava **Hrvatski registar brodova** i izdaje im svjedodžbu o sposobnosti jahte za plovidbu.",
			},
			{
				type: "table",
				level: "B",
				caption: "Tri vrste pregleda",
				columns: ["Pregled", "Kada"],
				rows: [
					[
						"Osnovni",
						"prije prvog upisa, nakon obnove i nakon promjene namjene",
					],
					[
						"Redovni",
						"u propisanim razmacima, ovisno o namjeni, duljini i starosti brodice",
					],
					[
						"Izvanredni",
						"nakon nesreće, većeg popravka ili preinake, promjene namjene ili područja, kad je redovni odgođen ili postoji sumnja u sigurnost",
					],
				],
			},
			{
				type: "text",
				level: "B",
				markdown:
					"**Redovni pregled** za brodice do 20 godina starosti:\n\n- gospodarske i javne brodice: **svake 2 godine**, a na suhom svake 4 godine;\n- brodice za osobne potrebe dulje od **7 m** ili s motorom jačim od **15 kW**: **svakih 5 godina**, ako imaju nešto od ovoga: zahod, zatvorenu kuhinju s plinom, ležajeve za više dana, motor u potpalublju ili ugrađeni spremnik benzina.\n\nKod brodica starijih od 20 godina svaki redovni pregled radi se **na suhom**.",
			},
			{
				type: "source-note",
				level: "B",
				markdown:
					'Stara skripta s pitanjima i odgovorima kaže "brodice za rekreaciju svake pete godine" i "putničke svake godine". To je pojednostavljeno. Današnji razmaci su gore u tekstu; za svoju brodicu točan rok vidiš u upisnom listu.',
			},
			{
				type: "remember",
				level: "B",
				title: "Zapamti",
				items: [
					"Osnovni pregled je prije upisa.",
					"Gospodarske i javne: redovni svake 2 godine.",
					"Nakon nesreće: izvanredni pregled prije daljnje plovidbe.",
				],
			},
			{ type: "check", level: "B", questionId: "propisi-026" },
		],
		cheatSheet: [
			"Osnovni: prije upisa, nakon obnove ili promjene namjene.",
			"Redovni: gospodarske i javne svake 2 godine, osobne (veće od 7 m ili 15 kW) svakih 5.",
			"Brodice starije od 20 godina: svaki redovni pregled na suhom.",
			"Izvanredni: nakon nesreće, preinake ili promjene namjene.",
			"Jahte pregledava HRB.",
		],
		source: "original",
	},
	{
		slug: "nezgode-i-nadzor",
		area: "propisi",
		order: 6,
		title: "Nezgode, prijava i nadzor",
		summary:
			"Što moraš prijaviti kapetaniji, u kojem roku i što inspektor smije na moru.",
		level: "B",
		minutes: 4,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"**Pomorska nesreća ili nezgoda** je npr. požar, eksplozija, sudar, nasukavanje, oštećenje trupa u nevremenu, kvar motora zbog kojeg trebaš tegljenje, ili onečišćenje mora.\n\n- **Nesreću** (teži događaj) prijavi lučkoj kapetaniji ili ispostavi **odmah**, bez odgađanja.\n- **Nezgodu** prijavi najkasnije **12 sati** od događaja ili od kad si saznao za nju.\n\nObveza vrijedi za voditelja, ali i za svakoga tko sazna za događaj. Prijava ide na obrascu s mrežnih stranica Ministarstva.",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"Poslije nesreće vlasnik mora prije nastavka plovidbe zatražiti **izvanredni pregled**. Kapetanija tada provjerava je li brodica sposobna za plovidbu i istražuje je li netko prekršio propise.",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"**Nadzor na moru:** inspektor kapetanije smije pregledati brodicu, opremu, isprave i posadu. Ako nađe nedostatke, daje rok da ih ukloniš. Ako je brodica opasna za ljude ili okoliš, može zabraniti plovidbu i oduzeti upisni list.",
			},
			{
				type: "example",
				level: "B",
				title: "Primjer",
				markdown:
					"Navečer si dodirnuo hrid i oštetio vijak, ali si sam doplovio u luku. To je nezgoda: prijavi je kapetaniji najkasnije 12 sati poslije i ne isplovljavaj dok brodica ne prođe izvanredni pregled.",
			},
			{
				type: "remember",
				level: "B",
				title: "Zapamti",
				items: [
					"Nesreća: prijavi odmah. Nezgoda: najkasnije u 12 sati.",
					"Prije nastavka plovidbe: izvanredni pregled.",
					"Inspektor može zabraniti plovidbu i oduzeti upisni list.",
				],
			},
			{ type: "check", level: "B", questionId: "propisi-024" },
		],
		cheatSheet: [
			"Nesreća se prijavljuje odmah, nezgoda u roku od 12 sati.",
			"Prijavljuje voditelj i svatko tko sazna za događaj.",
			"Nakon nesreće obavezan izvanredni pregled.",
			"Inspektor kapetanije provjerava brodicu, opremu, isprave i posadu.",
		],
		source: "original",
	},
	{
		slug: "plovidba-uz-obalu",
		area: "propisi",
		order: 7,
		title: "Plovidba uz obalu i kupališta",
		summary:
			"Koliko blizu obale smiješ, gdje smiješ glisirati i kako se ponašati kraj ronilaca.",
		level: "B",
		minutes: 5,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"Ljeti je uz obalu puno kupača, ronilaca i malih plovila. Zato propis traži najmanju udaljenost od obale ovisno o duljini plovila.",
			},
			{
				type: "table",
				level: "B",
				caption: "Najmanja udaljenost od obale",
				columns: ["Plovilo", "Ne bliže od"],
				rows: [
					["Plovila 30 m i dulja, hidroavioni", "300 m"],
					["Plovila od 15 m do 30 m", "150 m"],
					["Plovila kraća od 15 m (brodice)", "50 m"],
					["Glisiranje (gliseri, skuteri)", "samo dalje od 300 m"],
					[
						"Ograda uređene plaže",
						"50 m (plovila do 15 m), 100 m (15 do 30 m), 300 m (30 m i dulja)",
					],
				],
			},
			{
				type: "text",
				level: "B",
				markdown:
					"Bliže smiješ samo kad uplovljavaš u luku, ulaziš na sidrište ili pristaješ, i tada moraš usporiti toliko da možeš brzo skrenuti ili stati. Brodice na vesla, kajaci, kanui, pedaline i daske smiju i bliže od 50 m.\n\n**Brzina:** ako nije drukčije propisano, u pojasu do **300 m** od obale, u uskim kanalima te na prilazima luka i sidrišta plovi se najviše **8 čvorova**, uz posebnu pažnju (NN 52/25, čl. 50). Na nekim mjestima (npr. Pelješki kanal, Mali Ždrelac) vrijede posebna ograničenja.\n\n**Sidrenje:** ne sidri bliže od **150 m** od obale prirodnog kupališta ni bliže od **50 m** od ograde uređenog kupališta (NN 52/25, čl. 53. st. 9).",
			},
			{
				type: "warning",
				level: "B",
				markdown:
					"**Ronilac** na površini vuče **žuti ili narančasti balon** promjera najmanje 30 cm. Kad ga vidiš, uspori i zaobiđi ga u širokom luku: ronilac je negdje ispod, a ne nužno točno ispod balona.",
			},
			{
				type: "source-note",
				level: "B",
				markdown:
					'Stara skripta s pitanjima i odgovorima piše "glisiranje 300 m, ostali 200 m od obale". Brojke 200 m u propisu nema: plovila kraća od 15 m drže najmanje 50 m, od 15 do 30 m 150 m, a 30 m i dulja 300 m.',
			},
			{
				type: "source-note",
				level: "B",
				markdown:
					'Starije skripte, i Diverso iz 2025., još prepisuju pravilnik iz 2013. (NN 79/13 i izmjene): "do 150 m od obale 5 čvorova", "jahte 150 m" i "plovila kraća od 24 m". Taj je pravilnik zamijenjen. Danas vrijedi Pravilnik o sigurnosti pomorske plovidbe (NN 52/25): do 300 m od obale najviše 8 čvorova, udaljenost od obale ovisi o duljini plovila, a na ulazu u luku sklanjaju se plovila do 20 m.',
			},
			{
				type: "remember",
				level: "B",
				title: "Zapamti",
				items: [
					"Plovilo kraće od 15 m: najmanje 50 m od obale.",
					"Glisiranje samo dalje od 300 m.",
					"Do 300 m od obale najviše 8 čvorova.",
					"Ronilački balon: žuti ili narančasti, najmanje 30 cm.",
				],
			},
			{ type: "check", level: "B", questionId: "propisi-028" },
			{ type: "check", level: "B", questionId: "propisi-030" },
		],
		cheatSheet: [
			"Od obale: kraće od 15 m 50 m, 15 do 30 m 150 m, 30 m i dulje 300 m.",
			"Uređena plaža: 50 m od ograde (plovila do 15 m).",
			"Glisiranje samo dalje od 300 m od obale.",
			"Brzina: do 300 m od obale najviše 8 čv.",
			"Ronilac: žuti ili narančasti balon od najmanje 30 cm.",
		],
		source: "original",
	},
	{
		slug: "red-u-lukama",
		area: "propisi",
		order: 8,
		title: "Red u lukama i kanalima",
		summary:
			"Što je u luci zabranjeno, kad se toči gorivo i tko se kome sklanja na ulazu u luku.",
		level: "B",
		minutes: 5,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"Red u luci provodi **tijelo koje upravlja lukom** (lučka uprava, koncesionar), a nadzor nad redom na moru i u lukama ima **lučka kapetanija**.",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"U luci je, među ostalim, **zabranjeno**:\n\n- kupati se, plivati i roniti bez odobrenja kapetanije (to vrijedi i za prilaze luci i kanale kojima se plovi);\n- glisirati, jedriti na dasci i vući skijaše;\n- dirati, premještati ili micati tuđe vezove i sidra, osim da spriječiš štetu;\n- vezati se za plovidbene oznake ili naprave koje nisu za vez;\n- ložiti vatru, zavarivati i spaljivati otpad;\n- strugati i bojati trup u moru;\n- držati vijak (propeler) u pogonu kad ne manevriraš.",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"**Gorivo:** točenje goriva ne smije početi dok se putnici ne iskrcaju, a putnici se ukrcavaju tek kad je gorivo natočeno.\n\n**Na ulazu u luku:** plovila duljine do **20 m** moraju se u luci i u polukrugu od **1 NM** od ulaza u luku sklanjati s puta većim plovilima. Skripte uče da kanal ili tjesnac prelaziš **najkraćim putem**, okomito na njegov smjer. U propisu to pravilo nismo našli (COLREG ga traži za sustave odijeljenog prometa), pa lokalna pravila provjeri kod lučke kapetanije.",
			},
			{
				type: "example",
				level: "B",
				title: "Situacija",
				markdown:
					"Vraćaš se brodicom od 8 m u Split i pola milje od ulaza vidiš trajekt koji isplovljava. Ti se sklanjaš njemu, iako bi ti po pravilima o križanju možda imao prednost. Unutar 1 NM od ulaza manji ustupa većem.",
			},
			{
				type: "remember",
				level: "B",
				title: "Zapamti",
				items: [
					"Gorivo tek kad se putnici iskrcaju, putnici tek kad je gorivo natočeno.",
					"Plovilo do 20 m sklanja se većem unutar 1 NM od ulaza u luku.",
					"U luci nema kupanja, vatre ni vezivanja za plovidbene oznake.",
				],
			},
			{ type: "check", level: "B", questionId: "propisi-033" },
			{ type: "check", level: "B", questionId: "propisi-034" },
		],
		cheatSheet: [
			"Red u luci: upravitelj luke; nadzor: kapetanija.",
			"U luci zabranjeno kupanje, glisiranje, vatra, vez za plovidbene oznake.",
			"Gorivo prije ukrcaja putnika, nikad s putnicima na brodici.",
			"Do 20 m: sklanjaj se većima unutar 1 NM od ulaza u luku.",
			"Kanal prelazi okomito, najkraćim putem (lokalna pravila provjeri kod lučke kapetanije).",
		],
		source: "original",
	},
];

export default lessons;
