import type { ILesson } from "@/content/types";

const lessons: ILesson[] = [
	{
		slug: "dozvole-pozivni-znak-dnevnik",
		area: "vhf-radio",
		order: 1,
		title: "Dozvole, pozivni znak i radio dnevnik",
		summary:
			"Tko smije rukovati VHF postajom, koje isprave trebaš i kako se brodica predstavlja preko radija.",
		level: "B",
		minutes: 5,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"**Tko mora imati VHF:** brodice za gospodarske i javne svrhe moraju imati VHF postaju odobrenog tipa i rezervnu bateriju za nju. Brodica za osobne potrebe ga ne mora imati, ali ako ga ugradiš, mora biti odobrenog tipa.\n\n**Tko smije rukovati:** najmanje voditelj brodice kategorije **B** (ili C). Radiotelefonija je zato poseban predmet na tvom ispitu.",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"**Dozvola za radijsku postaju na plovilu** izdaje **HAKOM**. U njoj su ime i oznaka plovila, pozivni znak, vlasnik i dopušteni kanali. Vrijedi trajno, dok se plovilo ili postaja ne otpišu. Novi vlasnik mora ishoditi novu dozvolu.",
			},
			{
				type: "remember",
				level: "B",
				title: "Isprave na brodici u plovidbi",
				items: [
					"Upisni list brodice.",
					"Uvjerenje o osposobljenosti za voditelja brodice.",
					"Dozvola za radijsku postaju na plovilu, ako imaš VHF.",
				],
			},
			{
				type: "table",
				level: "B",
				caption: "Kako se postaje predstavljaju",
				columns: ["Oznaka", "Izgled", "Primjer"],
				rows: [
					[
						"Pozivni znak brodice",
						"9A i četiri znamenke (9A znači Hrvatska)",
						"9A2817",
					],
					[
						"Pozivni znak obalne postaje",
						"9A i početno slovo grada",
						"9AS Split radio, 9AR Rijeka radio, 9AD Dubrovnik radio",
					],
					[
						"MMSI (za DSC)",
						"Devet znamenki, prve tri su država (238 za Hrvatsku)",
						"238xxxxxx",
					],
				],
			},
			{
				type: "text",
				level: "B",
				markdown:
					'Hrvatska ima tri obalne radijske postaje (kratica **ORP**) koje vodi **Plovput**: Split radio, Rijeka radio i Dubrovnik radio. Obalna postaja se predstavlja imenom grada i riječju "radio".',
			},
			{
				type: "text",
				level: "B",
				markdown:
					"**Radio dnevnik** je knjiga u koju upisuješ uključivanje i isključivanje postaje, provjere rada i sve signale pogibelji, žurnosti i sigurnosti koje čuješ ili šalješ. Prije prve upotrebe ovjeri ga lučka kapetanija. Pogrešan upis precrtaš tako da ostane čitljiv, jer dnevnik vrijedi kao dokaz.",
			},
			{ type: "check", level: "B", questionId: "vhf-radio-001" },
			{ type: "check", level: "B", questionId: "vhf-radio-003" },
		],
		cheatSheet: [
			"Dozvolu za radijsku postaju izdaje HAKOM, vrijedi do otpisa.",
			"Rukovati smije najmanje voditelj brodice B.",
			"Pozivni znak brodice: 9A i četiri znamenke.",
			"MMSI ima devet znamenki, Hrvatska počinje s 238.",
			"Radio dnevnik ovjerava kapetanija; greške se precrtavaju čitljivo.",
		],
		source: "original",
	},
	{
		slug: "vhf-uredaj",
		area: "vhf-radio",
		order: 2,
		title: "VHF uređaj i njegove tipke",
		summary:
			"Dijelovi postaje, čemu služe volume, squelch, dual watch i 1/25 W, i gdje postaviti antenu.",
		level: "B",
		minutes: 6,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"Brodska VHF postaja ima četiri dijela:\n\n- **primopredajnik** (prima i odašilje)\n- **mikrotelefon** (slušalica, mikrofon i tipka za govor)\n- **antena**\n- **izvor napajanja** (istosmjerna struja, obično akumulator od 12 V)\n\nAko je napajaš iz gradske mreže, ide preko ispravljača koji izmjeničnu struju pretvara u istosmjernu.",
			},
			{
				type: "visual",
				level: "B",
				visual: "vhf-radio-call",
				caption: "Isprobaj tipke na ploči uređaja.",
				props: { mode: "controls" },
			},
			{
				type: "table",
				level: "B",
				caption: "Glavne kontrole",
				columns: ["Kontrola", "Čemu služi"],
				rows: [
					[
						"Volume",
						"Pali i gasi uređaj i mijenja glasnoću. Nakon paljenja uređaj je na kanalu 16.",
					],
					[
						"Squelch",
						"Uklanja šum. Okreni ga samo toliko da šum nestane, nikad do kraja.",
					],
					["Dual watch", "Slušaš kanal 16 i još jedan kanal u isto vrijeme."],
					["16 (crvena tipka)", "Brzi prelazak na kanal 16."],
					["1/25 W (L/H)", "Mala ili velika snaga odašiljanja."],
					["Dimmer", "Jačina osvjetljenja zaslona."],
					[
						"Tipka na mikrofonu (PTT)",
						"Pritisnuta: govoriš i svijetli Tx. Otpuštena: slušaš.",
					],
				],
			},
			{
				type: "warning",
				level: "B",
				markdown:
					"Squelch postavljen na maksimum ne propušta slabe i daleke signale, a to mogu biti baš pozivi u pogibelji. Kad je prijem slab, smanji squelch.",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"**Snaga:** najveća dopuštena snaga brodske VHF postaje je **25 W**, a uređaj mora moći prijeći na **1 W**. Ručni uređaji obično imaju od 1 do 5 W. Malu snagu koristi za bliske razgovore (marina, susjedni brod), veliku za veće udaljenosti i za pogibelj, žurnost i sigurnost.\n\n**Domet** ovisi najviše o visini antene. Za brodicu se obično navodi 20 do 30 Nm.",
			},
			{
				type: "remember",
				level: "B",
				title: "Gdje postaviti postaju i antenu",
				items: [
					"Postaja nadohvat ruke s mjesta upravljanja.",
					"Antena (štapna, šalje i prima u svim smjerovima) što više.",
					"Postaja uzemljena, posebno na brodici od plastike.",
					"Dalje od uređaja koji stvaraju smetnje.",
					"Provjera rada se nikad ne radi na kanalu 16.",
				],
			},
			{ type: "check", level: "B", questionId: "vhf-radio-005" },
			{ type: "check", level: "B", questionId: "vhf-radio-007" },
		],
		cheatSheet: [
			"Dijelovi: primopredajnik, mikrotelefon, antena, napajanje (istosmjerno).",
			"Squelch samo dok šum ne nestane, nikad na maksimum.",
			"Dual watch: kanal 16 i radni kanal zajedno.",
			"Snaga 25 W ili 1 W; ručni 1 do 5 W.",
			"Antena što više; provjera rada nikad na kanalu 16.",
		],
		source: "original",
	},
	{
		slug: "kanali-i-bdijenje",
		area: "vhf-radio",
		order: 3,
		title: "Kanali i služba bdijenja",
		summary:
			"Zašto je kanal 16 poseban, tko sluša koji kanal i redoslijed prvenstva poruka.",
		level: "B",
		minutes: 6,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"Pomorski VHF radi u području od **156 do 174 MHz**. Kanali su označeni brojevima od **1 do 28** i od **60 do 88**. Kanal **70** nije za govor, on služi za digitalno pozivanje (DSC).\n\n**Kanal 16 (156,8 MHz)** je međunarodni kanal za **pogibelj, sigurnost i pozivanje**. Obalne postaje ga slušaju neprekidno.",
			},
			{
				type: "table",
				level: "B",
				caption: "Tko sluša koji kanal",
				columns: ["Postaja", "Kanal", "Kada"],
				rows: [
					["Obalne radijske postaje", "16", "Neprekidno"],
					["Lučka kapetanija", "10", "Neprekidno (24 h)"],
					["Ispostava kapetanije", "10", "U radno vrijeme"],
					["Marine i lučice", "17", "Neprekidno, snaga do 1 W"],
					["Lučke uprave (lučki operativni centar)", "09", "Neprekidno"],
					["Peljari", "12", "Dežurstvo"],
				],
			},
			{
				type: "text",
				level: "B",
				markdown:
					"**Pravilo jedne minute:** pozivanje na kanalu 16 smije trajati najviše **jednu minutu**. Čim uspostaviš vezu, prelazite na radni kanal. Ako znaš radni kanal druge strane, zovi je izravno na njemu. Kršenje je pomorski prekršaj: slijedi novčana kazna, a može ti se i oduzeti uvjerenje.",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"U plovidbi drži VHF uključen i slušaj kanal 16 (uz dual watch možeš pratiti i drugi kanal). U luci VHF smiješ koristiti samo za lučke operacije, manevar i za pogibelj, žurnost i sigurnost.",
			},
			{
				type: "remember",
				level: "B",
				title: "Red prvenstva poruka",
				items: [
					"1. MAYDAY: pogibelj.",
					"2. PAN PAN: žurnost (i PAN PAN MEDICO, liječnički savjet).",
					"3. SECURITE: sigurnost plovidbe.",
					"4. Sve ostalo (rutinski razgovori).",
				],
			},
			{
				type: "text",
				level: "B",
				markdown:
					'Lučke kapetanije neprekidno emitiraju vremensku prognozu na posebnim VHF kanalima (na primjer, za srednji Jadran kanal 67). Kanale i termine za svoje područje provjeri u priručniku "Radio služba" ili na stranicama Plovputa.',
			},
			{
				type: "source-note",
				level: "B",
				markdown:
					'ITU Dodatak 18 ima 57 brojeva kanala (1 do 28 i 60 do 88). Bez kanala 70 (samo DSC) je 56 govornih kanala, a bez zaštitnih kanala 75 i 76 ostaje 55. Zato skripte broje različito. Za ispit je važno znati raspone 1 do 28 i 60 do 88 i da kanal 70 nije za govor. Ponegdje piše i da Rijeka kapetanija ima poseban kanal za SECURITE obavijesti: to provjeri u aktualnom izdanju priručnika "Radio služba".',
			},
			{ type: "check", level: "B", questionId: "vhf-radio-010" },
			{ type: "check", level: "B", questionId: "vhf-radio-012" },
		],
		cheatSheet: [
			"Kanal 16 (156,8 MHz): pogibelj, sigurnost, pozivanje.",
			"Kapetanija 10, marine 17, lučke uprave 09, peljari 12.",
			"Poziv na 16 najviše jednu minutu, zatim radni kanal.",
			"Kanal 70 je DSC, nije za govor.",
			"Prvenstvo: MAYDAY, PAN PAN, SECURITE, ostalo.",
		],
		source: "original",
	},
	{
		slug: "sricanje",
		area: "vhf-radio",
		order: 4,
		title: "Sricanje slova i brojeva",
		summary:
			"Međunarodna tablica sricanja: slova i brojke kako ih pišu ITU i naše skripte i kako se izgovaraju.",
		level: "B",
		minutes: 8,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"Kad je veza loša ili je riječ teška (ime brodice, otoka, pozivni znak), riječ **sričeš**: svako slovo zamijeniš dogovorenom riječi. Tako nitko ne pobrka B i P ili M i N. Koristi se isključivo **međunarodna tablica**, a na ispitu ćeš vjerojatno sricati svoje ime ili ime nekog otoka.",
			},
			{
				type: "visual",
				level: "B",
				visual: "phonetic-alphabet",
				caption: "Dotakni slovo ili znamenku i vidi kako se izgovara.",
				props: { mode: "letters" },
			},
			{
				type: "table",
				level: "B",
				caption: "Slova: službeni zapis (ITU) i izgovor",
				columns: ["Slovo", "ITU zapis", "Izgovor"],
				rows: [
					["A", "Alfa", "Alfa"],
					["B", "Bravo", "Bravo"],
					["C", "Charlie", "Čarli"],
					["D", "Delta", "Delta"],
					["E", "Echo", "Eko"],
					["F", "Foxtrot", "Fokstrot"],
					["G", "Golf", "Golf"],
					["H", "Hotel", "Hotel"],
					["I", "India", "Indija"],
					["J", "Juliett", "Džulijet"],
					["K", "Kilo", "Kilo"],
					["L", "Lima", "Lima"],
					["M", "Mike", "Majk"],
					["N", "November", "November"],
					["O", "Oscar", "Oskar"],
					["P", "Papa", "Papa"],
					["Q", "Quebec", "Kvibek"],
					["R", "Romeo", "Romio"],
					["S", "Sierra", "Siera"],
					["T", "Tango", "Tango"],
					["U", "Uniform", "Juniform"],
					["V", "Victor", "Viktor"],
					["W", "Whiskey", "Viski"],
					["X", "X-ray", "Iksrej"],
					["Y", "Yankee", "Jenki"],
					["Z", "Zulu", "Zulu"],
				],
			},
			{
				type: "table",
				level: "B",
				caption:
					"Brojke: ITU kodna riječ, izgovor iz skripte i engleski izgovor",
				columns: ["Brojka", "ITU zapis", "Izgovor (skripta)", "Engleski"],
				rows: [
					["0", "Nadazero", "Nada", "Ziro"],
					["1", "Unaone", "Una", "Uan"],
					["2", "Bissotwo", "Biso", "Tu"],
					["3", "Terrathree", "Tera", "Tri"],
					["4", "Kartefour", "Karte", "For"],
					["5", "Pantafive", "Panta", "Fajv"],
					["6", "Soxisix", "Soksi", "Siks"],
					["7", "Setteseven", "Sete", "Seven"],
					["8", "Oktoeight", "Okto", "Eit"],
					["9", "Novenine", "Nove", "Najn"],
				],
			},
			{
				type: "example",
				level: "B",
				title: "Primjer: brodica Galeb, pozivni znak 9A2817",
				markdown:
					"**Galeb:** Golf, Alfa, Lima, Eko, Bravo.\n\n**9A2817:** Nove Najn, Alfa, Biso Tu, Okto Eit, Una Uan, Sete Seven.\n\nBrojke možeš izgovoriti kodnom riječi s engleskim nastavkom (Nove Najn) ili samo engleski (Najn). Važno je da govoriš polako i jasno.",
			},
			{
				type: "remember",
				level: "B",
				items: [
					"Sriči uvijek po međunarodnoj tablici, nikad izmišljenim riječima (Havana, Roma).",
					"Otok Vis: Viktor, Indija, Siera.",
					"Tablica nema slova Č, Ć, Đ, Š i Ž: sriči osnovno slovo (za Š kažeš Siera) i po potrebi reci da ima kvačicu.",
					"Brojke izgovori kodnom riječi ili engleski, polako i jasno.",
				],
			},
			{
				type: "visual",
				level: "B",
				visual: "phonetic-alphabet",
				caption: "Vježba: sriči imena otoka.",
				props: {
					mode: "drill",
					words: ["Vis", "Hvar", "Krk", "Mljet", "Lastovo"],
				},
			},
			{
				type: "source-note",
				level: "B",
				markdown:
					"Naše skripte pišu slova onako kako se izgovaraju (Čarli, Džulijet, Kvibek), a službena ITU tablica ih piše engleski (Charlie, Juliett, Quebec). Riječ je ista, samo zapis drukčiji. Uči izgovor, a prepoznaj i engleski zapis.",
			},
			{ type: "check", level: "B", questionId: "vhf-radio-015" },
			{ type: "check", level: "B", questionId: "vhf-radio-017" },
		],
		cheatSheet: [
			"Sriči kad je veza loša ili je riječ teška.",
			"A Alfa, B Bravo, C Čarli, D Delta, E Eko ... Z Zulu.",
			"Brojke: nada, una, biso, tera, karte, panta, soksi, sete, okto, nove.",
			"Č, Ć, Đ, Š, Ž: sriči osnovno slovo i po potrebi reci da ima kvačicu.",
		],
		source: "original",
	},
	{
		slug: "mayday",
		area: "vhf-radio",
		order: 5,
		title: "MAYDAY: poziv u pogibelji",
		summary:
			"Kada se šalje MAYDAY, kojim redom ide poziv i poruka, kako potvrditi prijem i što je MAYDAY RELAY.",
		level: "B",
		minutes: 8,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"**MAYDAY** (izgovor: mejdej) šalješ samo kad su **ljudi i plovilo u neposrednoj životnoj opasnosti**: požar koji ne možeš ugasiti, prodor mora, sudar, nasukavanje s oštećenjem, eksplozija, napuštanje plovila, pad čovjeka u more. Odluku donosi isključivo voditelj. Šalje se na **kanalu 16**, punom snagom (25 W), svim postajama.",
			},
			{
				type: "remember",
				level: "B",
				title: "Redoslijed",
				items: [
					"MAYDAY, MAYDAY, MAYDAY.",
					"Ovdje (THIS IS) i tri puta ime brodice, pa pozivni znak (i MMSI ako ga imaš).",
					"MAYDAY i jednom ime brodice i pozivni znak.",
					"Pozicija.",
					"Vrsta opasnosti.",
					"Vrsta pomoći koju trebaš.",
					"Broj osoba i ostale važne informacije.",
					"Prijem (OVER).",
				],
			},
			{
				type: "visual",
				level: "B",
				visual: "vhf-radio-call",
				caption: "Složi MAYDAY poziv pravim redom.",
				props: { call: "mayday" },
			},
			{
				type: "example",
				level: "B",
				title: "Cijeli MAYDAY poziv",
				markdown:
					'*Kanal 16, snaga 25 W.*\n\n"MAYDAY, MAYDAY, MAYDAY.\n\nOvdje brodica Galeb, Galeb, Galeb, pozivni znak Nove Najn Alfa Biso Tu Okto Eit Una Uan Sete Seven.\n\nMAYDAY, brodica Galeb, pozivni znak 9A2817.\n\nPozicija: 43 stupnja 20 minuta sjever, 016 stupnjeva 18 minuta istok, južno od otoka Šolte.\n\nPožar u prostoru motora, ne možemo ga ugasiti.\n\nTrebamo hitnu pomoć, spremamo se napustiti brodicu.\n\nNa brodici su četiri osobe, svi imaju prsluke.\n\nPrijem."',
			},
			{
				type: "example",
				level: "B",
				title: "Ako primiš MAYDAY",
				markdown:
					'Zapiši podatke, pa potvrdi prijem (u priobalju prvo pričekaj kratko da se javi obalna postaja). Kreni u pomoć, javi plovilu u pogibelji da dolaziš i za koliko vremena, i obavijesti kapetaniju izravno ili preko obalne postaje. Ne moraš krenuti samo ako bi time doveo u opasnost svoje plovilo i ljude, a to moraš moći dokazati (radio dnevnik, svjedoci).\n\n**Potvrda prijema:**\n\n"MAYDAY, Galeb, Galeb, Galeb.\n\nOvdje brodica Luna, Luna, Luna.\n\nPrimljen MAYDAY (RECEIVED MAYDAY).\n\nNalazimo se dvije milje sjeverno od vas, krećemo prema vama, stižemo za oko 15 minuta.\n\nPrijem."',
			},
			{
				type: "example",
				level: "B",
				title: "MAYDAY RELAY",
				markdown:
					'**MAYDAY RELAY** (mejdej rilej) šalje postaja koja je vidjela ili čula signal pogibelji, a plovilo u nevolji se samo ne može javiti (npr. vidiš crvenu raketu). Poziv ide na kanalu 16, s približnom pozicijom.\n\n"MAYDAY RELAY, MAYDAY RELAY, MAYDAY RELAY.\n\nOvdje brodica Luna, Luna, Luna, pozivni znak 9A5306.\n\nU 14 sati i 20 minuta vidjeli smo crvenu raketu s padobranom, oko dvije milje zapadno od rta Ploča. Plovilo je nepoznato.\n\nLuna ide prema tom mjestu.\n\nPrijem."',
			},
			{
				type: "text",
				level: "B",
				markdown:
					"Dok traje akcija, na kanalu 16 su zabranjeni svi drugi pozivi. Postaja koja vodi akciju traži tišinu riječima **SEELONCE MAYDAY** (silons mejdej), a na kraju je ukida s **SEELONCE FEENEE** (silons fini). Tek tada kanal 16 opet služi za obične pozive.",
			},
			{
				type: "source-note",
				level: "B",
				markdown:
					"Pogibelj možeš javiti i telefonom: **MRCC Rijeka na 195** ili na **112**. Stara verzija pitanja i odgovora navodi broj 9155. Taj broj više ne vrijedi, danas je 195.",
			},
			{ type: "check", level: "B", questionId: "vhf-radio-019" },
			{ type: "check", level: "B", questionId: "vhf-radio-022" },
		],
		cheatSheet: [
			"MAYDAY samo kad su ljudi i plovilo u neposrednoj životnoj opasnosti.",
			"Kanal 16, 25 W: 3x MAYDAY, ovdje, 3x ime, pozivni znak.",
			"Poruka: ime, pozicija, opasnost, pomoć, broj osoba, prijem.",
			"MAYDAY RELAY: javljaš pogibelj umjesto drugoga.",
			"SEELONCE MAYDAY: tišina. SEELONCE FEENEE: kraj tišine.",
			"Telefon: MRCC Rijeka 195 ili 112.",
		],
		source: "original",
	},
	{
		slug: "pan-pan-i-securite",
		area: "vhf-radio",
		order: 6,
		title: "PAN PAN i SECURITE",
		summary:
			"Poruke žurnosti i sigurnosti: kada ih šalješ, kako zvuče i kako tražiti liječnički savjet.",
		level: "B",
		minutes: 7,
		blocks: [
			{
				type: "table",
				level: "B",
				caption: "Tri razine poziva",
				columns: ["Signal", "Značenje", "Primjeri"],
				rows: [
					[
						"MAYDAY",
						"Pogibelj: neposredna životna opasnost",
						"Požar koji se širi, prodor mora, napuštanje plovila",
					],
					[
						"PAN PAN",
						"Žurnost: ozbiljan problem, ali bez neposredne opasnosti za život",
						"Kvar motora, gubitak vijka ili kormila, manji požar, teška ozljeda ili bolest",
					],
					[
						"SECURITE",
						"Sigurnost: upozorenje drugima",
						"Plutajući balvan, odvezana brodica, ugašeno svjetlo, nevrijeme jače od prognoze",
					],
				],
			},
			{
				type: "text",
				level: "B",
				markdown:
					"**PAN PAN** (izgovor: pan pan) šalješ na kanalu 16, svim postajama ili samo jednoj. Redoslijed je kao kod MAYDAY poziva: tri puta signal, ovdje, tri puta ime, pozicija, problem i pomoć koju trebaš. Kad se netko javi, prelazite na radni kanal.",
			},
			{
				type: "visual",
				level: "B",
				visual: "vhf-radio-call",
				caption: "Složi PAN PAN poziv.",
				props: { call: "pan-pan" },
			},
			{
				type: "example",
				level: "B",
				title: "PAN PAN: kvar motora",
				markdown:
					'*Kanal 16.*\n\n"PAN PAN, PAN PAN, PAN PAN.\n\nSvim postajama, svim postajama, svim postajama (ALL STATIONS).\n\nOvdje brodica Galeb, Galeb, Galeb, pozivni znak 9A2817.\n\nPozicija: pola milje istočno od rta Ploča.\n\nKvar motora, ne možemo ga upaliti. Usidreni smo, nema neposredne opasnosti.\n\nTrebamo tegalj do Rogoznice.\n\nNa brodici su tri osobe.\n\nPrijem."',
			},
			{
				type: "example",
				level: "B",
				title: "PAN PAN MEDICO: liječnički savjet",
				markdown:
					'"PAN PAN, PAN PAN, PAN PAN.\n\nSplit radio, Split radio, Split radio.\n\nOvdje brodica Galeb, Galeb, Galeb, pozivni znak 9A2817.\n\nMEDICO. Trebamo liječnički savjet.\n\nMuškarac, 58 godina, jaka bol u prsima i otežano disanje zadnjih 20 minuta. Pri svijesti je.\n\nPozicija: luka Maslinica na Šolti.\n\nPrijem."',
			},
			{
				type: "visual",
				level: "B",
				visual: "vhf-radio-call",
				caption: "Složi SECURITE poziv.",
				props: { call: "securite" },
			},
			{
				type: "example",
				level: "B",
				title: "SECURITE: plutajući balvan",
				markdown:
					'**SECURITE** (izgovor: sekurite) najaviš na kanalu 16 i odmah kažeš na kojem radnom kanalu daješ obavijest. Samu obavijest daješ na tom kanalu: što si vidio, gdje i kada.\n\n*Kanal 16, najava:*\n\n"SECURITE, SECURITE, SECURITE.\n\nSvim postajama, svim postajama, svim postajama.\n\nOvdje brodica Galeb, Galeb, Galeb.\n\nSlušajte navigacijsko upozorenje na kanalu 72.\n\nGotovo."\n\n*Kanal 72, obavijest:*\n\n"SECURITE, SECURITE, SECURITE.\n\nSvim postajama, ovdje brodica Galeb.\n\nU 10 sati i 15 minuta uočen plutajući balvan, dug oko 5 metara, na poziciji 43 stupnja 25 minuta sjever, 016 stupnjeva 20 minuta istok, na sredini Splitskog kanala. Opasnost za plovidbu.\n\nGotovo."',
			},
			{
				type: "remember",
				level: "B",
				items: [
					"PAN PAN: ozbiljan problem, ljudi nisu u neposrednoj opasnosti.",
					"MEDICO ide uz PAN PAN kad trebaš liječnički savjet.",
					"SECURITE: upozorenje, najava na 16, obavijest na radnom kanalu.",
					"Uvijek: tko si, gdje si, što se događa.",
				],
			},
			{ type: "check", level: "B", questionId: "vhf-radio-025" },
			{ type: "check", level: "B", questionId: "vhf-radio-027" },
		],
		cheatSheet: [
			"PAN PAN: kvar motora, gubitak kormila ili vijka, teška ozljeda.",
			"PAN PAN MEDICO: liječnički savjet, opiši osobu i stanje.",
			"SECURITE: opasnost za plovidbu, najava na 16, obavijest na radnom kanalu.",
			"Redoslijed kao MAYDAY: 3x signal, ovdje, 3x ime, pozicija, problem.",
		],
		source: "original",
	},
	{
		slug: "rutinski-poziv",
		area: "vhf-radio",
		order: 7,
		title: "Rutinski poziv",
		summary:
			"Kako pozvati marinu ili drugu brodicu, prijeći na radni kanal i pravilno završiti razgovor.",
		level: "B",
		minutes: 5,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"Prije nego što pritisneš tipku, **poslušaj** je li kanal slobodan. Govori polako, jasno, kratko. Na jednom kanalu (simpleks) ne možete govoriti u isto vrijeme, zato riječju **Prijem (OVER)** predaješ riječ drugoj strani, a s **Gotovo (OUT)** završavaš razgovor.",
			},
			{
				type: "visual",
				level: "B",
				visual: "vhf-radio-call",
				caption: "Pozovi marinu i dogovori vez.",
				props: { call: "routine" },
			},
			{
				type: "example",
				level: "B",
				title: "Poziv marini (kanal 17, mala snaga)",
				markdown:
					'**Galeb:** "Marina Kaštela, Marina Kaštela, ovdje brodica Galeb, Galeb. Prijem."\n\n**Marina:** "Galeb, ovdje Marina Kaštela. Prijem."\n\n**Galeb:** "Stižemo za oko 20 minuta. Brodica je duga 8 metara, trebamo vez za jednu noć. Prijem."\n\n**Marina:** "Galeb, primljeno. Vez na gatu B, mornar vas čeka na ulazu. Prijem."\n\n**Galeb:** "Primljeno, gat B. Hvala, gotovo."',
			},
			{
				type: "example",
				level: "B",
				title: "Poziv drugoj brodici preko kanala 16",
				markdown:
					'*Kanal 16, najviše jedna minuta:*\n\n**Galeb:** "Luna, Luna, Luna, ovdje Galeb, Galeb. Prijem."\n\n**Luna:** "Galeb, ovdje Luna. Prijeđi na kanal 72. Prijem."\n\n**Galeb:** "Kanal 72. Prijem."\n\n*Obje brodice prelaze na kanal 72 i tamo razgovaraju.*\n\n**Galeb:** "Luna, ovdje Galeb na 72. Prijem."',
			},
			{
				type: "remember",
				level: "B",
				items: [
					'Ime pozvane postaje do tri puta, pa "ovdje" i svoje ime.',
					"Na 16 se samo pozoveš, razgovor ide na radnom kanalu.",
					"Prijem (OVER): tvoj red je gotov, govori druga strana.",
					"Gotovo (OUT): razgovor je završen.",
					"Za bliske postaje koristi malu snagu (1 W).",
				],
			},
			{
				type: "source-note",
				level: "B",
				markdown:
					'Skripte završetak razgovora pišu kao "gotovo i prekid rada" ili "over and out". U službenom postupku se na kraju kaže samo OUT (gotovo), jer OVER znači da očekuješ odgovor. Na ispitu prihvaćaju oba oblika, ali razumij razliku.',
			},
			{ type: "check", level: "B", questionId: "vhf-radio-029" },
			{ type: "check", level: "B", questionId: "vhf-radio-030" },
		],
		cheatSheet: [
			"Prvo slušaj, pa zovi.",
			"Poziv na 16 najviše jednu minutu, razgovor na radnom kanalu.",
			"Prijem (OVER) predaje riječ, Gotovo (OUT) završava.",
			"Marina: kanal 17, mala snaga.",
		],
		source: "original",
	},
	{
		slug: "dsc-i-gmdss",
		area: "vhf-radio",
		order: 8,
		title: "DSC i GMDSS",
		summary:
			"Digitalno pozivanje na kanalu 70, crvena DISTRESS tipka, GMDSS područja i radio-plutače.",
		level: "B",
		minutes: 6,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"**GMDSS** je svjetski pomorski sustav za pogibelj i sigurnost. U punoj je primjeni od 01.02.1999. i povezuje satelitske i zemaljske veze tako da poziv u pogibelji uvijek negdje stigne.",
			},
			{
				type: "table",
				level: "B",
				caption: "GMDSS područja",
				columns: ["Područje", "Pokrivenost"],
				rows: [
					["A1", "Domet VHF obalne postaje s DSC-om"],
					["A2", "Domet MF obalne postaje (izvan A1)"],
					["A3", "Pokrivenost satelita Inmarsat, otprilike od 70° S do 70° J"],
					["A4", "Sve ostalo (polarna područja)"],
				],
			},
			{
				type: "text",
				level: "B",
				markdown:
					"Hrvatsko more je područje **A1**, dakle dovoljan je VHF. **DSC** (digitalno selektivno pozivanje) šalje kratku digitalnu poruku na **kanalu 70**. Svaka DSC postaja ima svoj **MMSI** broj (devet znamenki). Vrste DSC poziva:\n\n- **Distress**: pogibelj\n- **Urgency**: žurnost\n- **Safety**: sigurnost\n- **Routine**: obični poziv\n- **Ship's business**: brodski poslovi",
			},
			{
				type: "example",
				level: "B",
				title: "DSC poziv u pogibelji",
				markdown:
					"1. Podigni poklopac crvene tipke **DISTRESS**.\n2. Ako stigneš, izaberi vrstu opasnosti (požar, prodor mora...).\n3. Drži tipku pritisnutu nekoliko sekundi, koliko piše u uputi uređaja.\n4. Uređaj šalje tvoj MMSI i poziciju (ako je spojen GPS).\n5. Odmah zatim na **kanalu 16** izgovori MAYDAY poziv glasom.",
			},
			{
				type: "warning",
				level: "B",
				markdown:
					"Ako si DSC pogibelj poslao greškom, nemoj samo ugasiti uređaj. Prekini uzbunu na uređaju i odmah na kanalu 16 javi svim postajama svoje ime, pozivni znak i MMSI i da poništavaš lažnu uzbunu. Tako spasioci ne kreću uzalud.",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"Kad primiš DSC poziv, uređaj se oglasi alarmom. Pogledaj na zaslonu o čemu se radi i javi se na kanalu 16. U obalnom moru na DSC pogibelj prve reagiraju obalne postaje.",
			},
			{
				type: "table",
				level: "B",
				caption: "Uređaji za pronalazak",
				columns: ["Uređaj", "Što radi"],
				rows: [
					[
						"EPIRB",
						"Plutajuća radio-plutača koja preko satelita (406 MHz) javlja pogibelj i poziciju",
					],
					[
						"SART",
						"Radarski odzivnik: na radaru spasioca pokaže niz točaka koji vodi do tebe",
					],
				],
			},
			{
				type: "remember",
				level: "B",
				items: [
					"Hrvatska je GMDSS područje A1 (domet VHF-a).",
					"DSC radi na kanalu 70, nakon DSC pogibelji slijedi MAYDAY glasom na 16.",
					"MRCC Rijeka vodi traganje i spašavanje na moru u Hrvatskoj (tel. 195).",
					"Lažnu uzbunu odmah poništi na kanalu 16.",
				],
			},
			{ type: "check", level: "B", questionId: "vhf-radio-031" },
			{ type: "check", level: "B", questionId: "vhf-radio-033" },
		],
		cheatSheet: [
			"GMDSS od 01.02.1999.; Hrvatska je područje A1.",
			"DSC na kanalu 70: Distress, Urgency, Safety, Routine, Ship's business.",
			"DISTRESS tipka, pa MAYDAY glasom na 16.",
			"EPIRB javlja preko satelita, SART se vidi na radaru.",
		],
		source: "original",
	},
];

export default lessons;
