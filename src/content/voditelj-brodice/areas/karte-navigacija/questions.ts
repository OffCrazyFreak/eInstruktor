import type { IQuestion } from "@/content/types";

const questions: IQuestion[] = [
	{
		id: "karte-navigacija-001",
		area: "karte-navigacija",
		lesson: "pomorska-karta",
		level: "common",
		type: "single",
		prompt: "Tko u Hrvatskoj izdaje službene pomorske karte?",
		options: [
			{
				id: "a",
				text: "Hrvatski hidrografski institut (HHI) u Splitu",
				correct: true,
			},
			{ id: "b", text: "Plovput d.o.o.", correct: false },
			{ id: "c", text: "Lučka kapetanija", correct: false },
			{ id: "d", text: "Državni hidrometeorološki zavod", correct: false },
		],
		explanation:
			"Karte, peljare, Popis svjetala i Oglase za pomorce izdaje HHI iz Splita. Plovput postavlja i održava oznake i svjetla na moru.",
		difficulty: 1,
		source: "original",
	},
	{
		id: "karte-navigacija-002",
		area: "karte-navigacija",
		lesson: "pomorska-karta",
		level: "common",
		type: "single",
		prompt: "Karta ima mjerilo 1:100 000. Koliko je u prirodi 1 cm na karti?",
		options: [
			{ id: "a", text: "100 m", correct: false },
			{ id: "b", text: "1 km", correct: true },
			{ id: "c", text: "10 km", correct: false },
			{ id: "d", text: "1 nautička milja", correct: false },
		],
		explanation:
			"1 cm na karti je 100 000 cm u prirodi, a to je 1000 m, odnosno 1 km.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "karte-navigacija-003",
		area: "karte-navigacija",
		lesson: "pomorska-karta",
		level: "common",
		type: "single",
		prompt: "Koja od ovih karata prikazuje najviše detalja?",
		options: [
			{ id: "a", text: "Karta mjerila 1:1 000 000", correct: false },
			{ id: "b", text: "Karta mjerila 1:300 000", correct: false },
			{ id: "c", text: "Karta mjerila 1:100 000", correct: false },
			{ id: "d", text: "Plan luke mjerila 1:5 000", correct: true },
		],
		explanation:
			"Što je broj iza dvotočke manji, karta je krupnija: pokriva manje područje, ali s više detalja. Planovi luka imaju najkrupnije mjerilo.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "karte-navigacija-004",
		area: "karte-navigacija",
		lesson: "pomorska-karta",
		level: "common",
		type: "single",
		prompt:
			"Što na karti znači plavo područje omeđeno točkastom crtom s križićem u sredini?",
		options: [
			{ id: "a", text: "Dubina manja od 2 m", correct: true },
			{ id: "b", text: "Preporučeno sidrište", correct: false },
			{ id: "c", text: "Zona zabrane ribolova", correct: false },
			{
				id: "d",
				text: "Mjesto gdje je položen podmorski kabel",
				correct: false,
			},
		],
		explanation:
			"Taj znak označava vrlo plitko mjesto, dubinu manju od 2 m. Brodicom ga zaobiđi.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "karte-navigacija-005",
		area: "karte-navigacija",
		lesson: "pomorska-karta",
		level: "common",
		type: "multi",
		prompt:
			"Koje oznake vrste dna na karti upućuju na dobro dno za sidrenje? Odaberi sve točne.",
		options: [
			{ id: "a", text: "M (mulj)", correct: true },
			{ id: "b", text: "P (pijesak)", correct: true },
			{ id: "c", text: "K (kamen)", correct: false },
			{ id: "d", text: "Hr (hrid)", correct: false },
		],
		explanation:
			"U mulj i pijesak se sidro dobro ukopa i drži. Na kamenu i hridi sidro klizi ili zapne pa ga teško izvadiš.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "karte-navigacija-006",
		area: "karte-navigacija",
		lesson: "pomorska-karta",
		level: "common",
		type: "single",
		prompt:
			"Imaš kartu kupljenu prije nekoliko godina koju nitko nije ispravljao. Što vrijedi?",
		options: [
			{
				id: "a",
				text: "Smije se koristiti jer se more i obala ne mijenjaju",
				correct: false,
			},
			{
				id: "b",
				text: "Nije pouzdana dok je ne ispraviš prema Oglasima za pomorce",
				correct: true,
			},
			{ id: "c", text: "Vrijedi samo za dnevnu plovidbu", correct: false },
			{
				id: "d",
				text: "Vrijedi ako je mjerilo krupnije od 1:100 000",
				correct: false,
			},
		],
		explanation:
			"Svjetla, plutače, kabeli i lukobrani se mijenjaju. Karta se ispravlja prema Oglasima za pomorce (OZP), inače nije za plovidbu.",
		ruleRef: "Oglasi za pomorce, HHI",
		difficulty: 2,
		source: "original",
	},
	{
		id: "karte-navigacija-007",
		area: "karte-navigacija",
		lesson: "pomorska-karta",
		level: "common",
		type: "single",
		prompt: 'Na karti uz jednu uvalu piše "V pl". Što to znači?',
		options: [
			{
				id: "a",
				text: "Vidi plan: za to mjesto postoji prikaz u krupnijem mjerilu",
				correct: true,
			},
			{
				id: "b",
				text: "Visoka plima: mjesto je plitko za oseke",
				correct: false,
			},
			{ id: "c", text: "Vezovi za plovila", correct: false },
			{ id: "d", text: "Vojno područje, plovidba zabranjena", correct: false },
		],
		explanation:
			'"V pl" upućuje na plan, detaljniji prikaz malog područja (luke, prolaza, uvale). Ako uz kraticu stoji broj, to je broj plana koji treba nabaviti.',
		difficulty: 1,
		source: "original",
	},
	{
		id: "karte-navigacija-008",
		area: "karte-navigacija",
		lesson: "znakovi-na-karti",
		level: "common",
		type: "single",
		prompt: "Što na pomorskoj karti označava crvena vijugava crta u moru?",
		options: [
			{ id: "a", text: "Trajektnu liniju", correct: false },
			{ id: "b", text: "Podmorski kabel", correct: true },
			{ id: "c", text: "Granicu teritorijalnog mora", correct: false },
			{ id: "d", text: "Preporučeni put za male brodice", correct: false },
		],
		explanation:
			"Vijugava crvena crta je podmorski kabel (struja, telefon). Podmorski cjevovod crta se crveno-crnom isprekidanom crtom.",
		difficulty: 1,
		source: "original",
	},
	{
		id: "karte-navigacija-009",
		area: "karte-navigacija",
		lesson: "znakovi-na-karti",
		level: "common",
		type: "single",
		prompt:
			"Što je zabranjeno na mjestu gdje je na karti ucrtan podmorski kabel ili cjevovod?",
		options: [
			{ id: "a", text: "Plovidba noću", correct: false },
			{ id: "b", text: "Kupanje i ronjenje", correct: false },
			{ id: "c", text: "Sidrenje i koćarenje", correct: true },
			{ id: "d", text: "Plovidba brzinom većom od 5 čvorova", correct: false },
		],
		explanation:
			"Sidro ili koća mogu zakačiti i oštetiti instalaciju na dnu. Zato je tamo zabranjeno sidrenje, koćarenje i slične radnje.",
		difficulty: 1,
		source: "original",
	},
	{
		id: "karte-navigacija-010",
		area: "karte-navigacija",
		lesson: "znakovi-na-karti",
		level: "common",
		type: "single",
		prompt:
			"Na obali vidiš bijelu ploču s nacrtanim crnim sidrom okrenutim naopako. Što ona znači?",
		options: [
			{ id: "a", text: "Ovdje je preporučeno sidrište", correct: false },
			{
				id: "b",
				text: "Zabranjeno sidrenje, ovdje kreće podmorska instalacija",
				correct: true,
			},
			{ id: "c", text: "Privezište za brodice", correct: false },
			{ id: "d", text: "Mjesto za opskrbu gorivom", correct: false },
		],
		explanation:
			"Na svakom kraju podmorskog kabela ili cjevovoda stoji bijela ploča s crnim naopakim sidrom. Vidi se s mora i znači zabranu sidrenja.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "karte-navigacija-011",
		area: "karte-navigacija",
		lesson: "znakovi-na-karti",
		level: "common",
		type: "single",
		prompt:
			"Što na karti znači crveno uspravno sidro unutar uokvirenog područja?",
		options: [
			{
				id: "a",
				text: "Sidrište za brodove koji prevoze opasne terete",
				correct: true,
			},
			{ id: "b", text: "Sidrište samo za brodice", correct: false },
			{ id: "c", text: "Zabrana sidrenja", correct: false },
			{ id: "d", text: "Sidrište za vrijeme bure", correct: false },
		],
		explanation:
			"Crveno uspravno sidro u okviru je sidrište za brodove s opasnim teretom. Crno uspravno sidro je preporučeno sidrište za ostale, a crveno prekriženo sidro je zabrana.",
		difficulty: 3,
		source: "original",
	},
	{
		id: "karte-navigacija-012",
		area: "karte-navigacija",
		lesson: "znakovi-na-karti",
		level: "common",
		type: "true-false",
		prompt: "Crno uspravno sidro na moru na karti označava zabranu sidrenja.",
		options: [
			{ id: "t", text: "Točno", correct: false },
			{ id: "f", text: "Netočno", correct: true },
		],
		explanation:
			"Crno uspravno sidro je preporučeno sidrište. Zabranu sidrenja na karti označava crveno prekriženo sidro.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "karte-navigacija-013",
		area: "karte-navigacija",
		lesson: "koordinate-i-udaljenost",
		level: "common",
		type: "single",
		prompt: "Koliko metara ima jedna nautička milja?",
		options: [
			{ id: "a", text: "1000 m", correct: false },
			{ id: "b", text: "1609 m", correct: false },
			{ id: "c", text: "1852 m", correct: true },
			{ id: "d", text: "1952 m", correct: false },
		],
		explanation:
			"Nautička milja ima 1852 m i jednaka je jednoj minuti geografske širine. 1609 m je kopnena (engleska) milja.",
		difficulty: 1,
		source: "original",
	},
	{
		id: "karte-navigacija-014",
		area: "karte-navigacija",
		lesson: "koordinate-i-udaljenost",
		level: "common",
		type: "single",
		prompt: "Gdje na karti očitavaš udaljenost koju si uzeo u šestar?",
		options: [
			{
				id: "a",
				text: "Na skali geografske širine, uz lijevi ili desni rub karte",
				correct: true,
			},
			{
				id: "b",
				text: "Na skali geografske dužine, uz gornji ili donji rub karte",
				correct: false,
			},
			{ id: "c", text: "Na ruži kompasa", correct: false },
			{
				id: "d",
				text: "Ravnalom u centimetrima pa preračunaš prema mjerilu",
				correct: false,
			},
		],
		explanation:
			"Jedna minuta širine je jedna nautička milja, pa razmak šestara prebaciš na bočnu skalu širine i očitaš milje i kabele.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "karte-navigacija-015",
		area: "karte-navigacija",
		lesson: "koordinate-i-udaljenost",
		level: "common",
		type: "single",
		prompt: "Zašto udaljenost ne mjeriš na skali geografske dužine?",
		options: [
			{
				id: "a",
				text: "Zato što je skala dužine u kilometrima",
				correct: false,
			},
			{
				id: "b",
				text: "Zato što minuta dužine nije jednaka milji, ona se smanjuje prema polovima",
				correct: true,
			},
			{
				id: "c",
				text: "Zato što skala dužine služi samo za mjerenje dubine",
				correct: false,
			},
			{
				id: "d",
				text: "Smiješ, obje skale daju isti rezultat",
				correct: false,
			},
		],
		explanation:
			"Meridijani se prema polovima približavaju, pa minuta dužine na Jadranu iznosi manje od milje. Samo minuta širine je uvijek jedna milja.",
		difficulty: 3,
		source: "original",
	},
	{
		id: "karte-navigacija-016",
		area: "karte-navigacija",
		lesson: "koordinate-i-udaljenost",
		level: "common",
		type: "single",
		prompt:
			"Brodica je prešla 18 nautičkih milja za 3 sata. Kolika joj je prosječna brzina?",
		options: [
			{ id: "a", text: "3 čvora", correct: false },
			{ id: "b", text: "6 čvorova", correct: true },
			{ id: "c", text: "9 čvorova", correct: false },
			{ id: "d", text: "54 čvora", correct: false },
		],
		explanation:
			"Brzina je put podijeljen s vremenom: 18 milja kroz 3 sata je 6 milja na sat, a to je 6 čvorova.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "karte-navigacija-017",
		area: "karte-navigacija",
		lesson: "koordinate-i-udaljenost",
		level: "common",
		type: "single",
		prompt:
			"Do luke imaš 15 nautičkih milja i ploviš brzinom 6 čvorova. Koliko ti treba?",
		options: [
			{ id: "a", text: "1 sat i 30 minuta", correct: false },
			{ id: "b", text: "2 sata i 15 minuta", correct: false },
			{ id: "c", text: "2 sata i 30 minuta", correct: true },
			{ id: "d", text: "3 sata", correct: false },
		],
		explanation:
			"Vrijeme je put podijeljen s brzinom: 15 / 6 = 2,5 sata, a to je 2 sata i 30 minuta.",
		difficulty: 3,
		source: "original",
	},
	{
		id: "karte-navigacija-018",
		area: "karte-navigacija",
		lesson: "koordinate-i-udaljenost",
		level: "common",
		type: "true-false",
		prompt:
			"Za bilo koju točku na Jadranu geografska širina je sjeverna (N), a dužina istočna (E).",
		options: [
			{ id: "t", text: "Točno", correct: true },
			{ id: "f", text: "Netočno", correct: false },
		],
		explanation:
			"Jadran je sjeverno od ekvatora i istočno od Greenwicha, pa je širina uvijek N, a dužina uvijek E.",
		difficulty: 1,
		source: "original",
	},
	{
		id: "karte-navigacija-019",
		area: "karte-navigacija",
		lesson: "koordinate-i-udaljenost",
		level: "common",
		type: "single",
		prompt:
			"Razmak šestara prebacio si na skalu širine i on pokriva od 43° 10,0' do 43° 14,5'. Kolika je udaljenost?",
		options: [
			{ id: "a", text: "0,45 nautičke milje", correct: false },
			{ id: "b", text: "4,5 nautičke milje", correct: true },
			{ id: "c", text: "4,5 kilometra", correct: false },
			{ id: "d", text: "45 nautičkih milja", correct: false },
		],
		explanation:
			"Razlika je 4,5 minute širine. Svaka minuta širine je jedna milja, pa je udaljenost 4,5 milje (4 milje i 5 kabela).",
		difficulty: 3,
		source: "original",
	},
	{
		id: "karte-navigacija-020",
		area: "karte-navigacija",
		lesson: "kurs-i-azimut",
		level: "common",
		type: "single",
		prompt: "Što je kurs broda?",
		options: [
			{
				id: "a",
				text: "Kut između meridijana (smjera sjevera) i uzdužnice broda, mjeren u smjeru kazaljke na satu",
				correct: true,
			},
			{
				id: "b",
				text: "Kut između uzdužnice broda i smjera prema nekom objektu",
				correct: false,
			},
			{
				id: "c",
				text: "Udaljenost od polazne do dolazne luke",
				correct: false,
			},
			{ id: "d", text: "Kut između smjera vjetra i pramca", correct: false },
		],
		explanation:
			"Kurs je smjer kojim brod plovi, izražen kao kut od sjevera do pramca, od 0 do 360 stupnjeva u smjeru kazaljke na satu.",
		difficulty: 1,
		source: "original",
	},
	{
		id: "karte-navigacija-021",
		area: "karte-navigacija",
		lesson: "kurs-i-azimut",
		level: "common",
		type: "single",
		prompt: "Ploviš kursom 135°. Prema kojoj strani svijeta ide brodica?",
		media: {
			visual: "compass-course-calculator",
			props: { mode: "course", trueCourse: 135 },
		},
		options: [
			{ id: "a", text: "Prema sjeveroistoku (NE)", correct: false },
			{ id: "b", text: "Prema jugoistoku (SE)", correct: true },
			{ id: "c", text: "Prema jugozapadu (SW)", correct: false },
			{ id: "d", text: "Prema sjeverozapadu (NW)", correct: false },
		],
		explanation:
			"135° je u drugom kvadrantu (od 90° do 180°), točno između istoka i juga, dakle jugoistok.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "karte-navigacija-022",
		area: "karte-navigacija",
		lesson: "kurs-i-azimut",
		level: "common",
		type: "single",
		prompt: "Kako na karti očitavaš kurs između dvije točke?",
		options: [
			{
				id: "a",
				text: "Šestarom izmjeriš razmak i očitaš ga na skali širine",
				correct: false,
			},
			{
				id: "b",
				text: "Jednim trokutom pokriješ crtu kursa, drugim ga kliziš do središta ruže i očitaš kut na rubu ruže",
				correct: true,
			},
			{ id: "c", text: "Očitaš ga sa skale geografske dužine", correct: false },
			{
				id: "d",
				text: "Kurs se ne može očitati s karte, samo s kompasa",
				correct: false,
			},
		],
		explanation:
			"Dva navigacijska trokuta služe za paralelni pomak crte kursa do najbliže ruže. Na rubu ruže očitaš kut u stupnjevima.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "karte-navigacija-023",
		area: "karte-navigacija",
		lesson: "kurs-i-azimut",
		level: "common",
		type: "single",
		prompt: 'Što znače izrazi "sjeverni vjetar" i "sjeverna struja"?',
		options: [
			{ id: "a", text: "Oba dolaze sa sjevera", correct: false },
			{ id: "b", text: "Oba idu prema sjeveru", correct: false },
			{
				id: "c",
				text: "Vjetar puše sa sjevera, a struja teče prema sjeveru",
				correct: true,
			},
			{
				id: "d",
				text: "Vjetar puše prema sjeveru, a struja dolazi sa sjevera",
				correct: false,
			},
		],
		explanation:
			"Vjetar se imenuje po smjeru odakle dolazi, a struja po smjeru kamo teče. Zato se isti naziv razlikuje za 180°.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "karte-navigacija-024",
		area: "karte-navigacija",
		lesson: "kurs-i-azimut",
		level: "common",
		type: "single",
		prompt: "Što je azimut?",
		options: [
			{
				id: "a",
				text: "Kut od sjevera do smjera prema nekom objektu, mjeren u smjeru kazaljke na satu",
				correct: true,
			},
			{ id: "b", text: "Kut između pramca i krme", correct: false },
			{ id: "c", text: "Visina objekta iznad mora", correct: false },
			{
				id: "d",
				text: "Razlika između pravog i kompasnog kursa",
				correct: false,
			},
		],
		explanation:
			"Azimut je smjer prema objektu (svjetioniku, rtu, crkvi) gledano od sjevera. Kurs je smjer tvog pramca.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "karte-navigacija-025",
		area: "karte-navigacija",
		lesson: "kurs-i-azimut",
		level: "common",
		type: "single",
		prompt:
			"Ploviš kursom 090° (prema istoku), a jak vjetar puše sa sjevera. Što će se dogoditi ako ništa ne ispraviš?",
		options: [
			{ id: "a", text: "Vjetar će te zanositi prema jugu", correct: true },
			{ id: "b", text: "Vjetar će te zanositi prema sjeveru", correct: false },
			{ id: "c", text: "Samo ćeš usporiti", correct: false },
			{ id: "d", text: "Samo ćeš ubrzati", correct: false },
		],
		explanation:
			"Vjetar s boka gura brodicu u stranu, u smjeru kamo puše. Sjeverni vjetar puše prema jugu, pa te zanosi južno od crte kursa.",
		difficulty: 3,
		source: "original",
	},
	{
		id: "karte-navigacija-026",
		area: "karte-navigacija",
		lesson: "kurs-i-azimut",
		level: "common",
		type: "single",
		prompt:
			"Iz točke A u točku B ploviš kursom 045°. Kojim kursom se vraćaš iz B u A?",
		options: [
			{ id: "a", text: "135°", correct: false },
			{ id: "b", text: "225°", correct: true },
			{ id: "c", text: "315°", correct: false },
			{ id: "d", text: "045°", correct: false },
		],
		explanation:
			"Povratni kurs je suprotan, razlikuje se za 180°: 45 + 180 = 225°.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "karte-navigacija-027",
		area: "karte-navigacija",
		lesson: "magnetski-kompas",
		level: "B",
		type: "single",
		prompt: "Što je varijacija?",
		options: [
			{
				id: "a",
				text: "Otklon igle kompasa zbog zemaljskog magnetizma, razlika između pravog i magnetskog sjevera",
				correct: true,
			},
			{
				id: "b",
				text: "Otklon igle kompasa zbog željeza i elektrike na samoj brodici",
				correct: false,
			},
			{ id: "c", text: "Pogreška zbog ljuljanja brodice", correct: false },
			{ id: "d", text: "Razlika između kursa i azimuta", correct: false },
		],
		explanation:
			"Varijacija dolazi od Zemlje: magnetski sjever nije na istom mjestu kao pravi (geografski) sjever. Upisana je uz ružu na karti.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "karte-navigacija-028",
		area: "karte-navigacija",
		lesson: "magnetski-kompas",
		level: "B",
		type: "single",
		prompt: "Što uzrokuje devijaciju kompasa?",
		options: [
			{ id: "a", text: "Magnetsko polje Zemlje", correct: false },
			{
				id: "b",
				text: "Magnetizam same brodice (motor, željezo, elektrika)",
				correct: true,
			},
			{ id: "c", text: "Morske struje", correct: false },
			{ id: "d", text: "Temperatura tekućine u kotlu", correct: false },
		],
		explanation:
			"Devijacija je otklon zbog magnetskih masa i struja na brodu. Mijenja se s kursom, pa se za brod radi tablica devijacije.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "karte-navigacija-029",
		area: "karte-navigacija",
		lesson: "magnetski-kompas",
		level: "B",
		type: "single",
		prompt:
			"Pravi kurs s karte je 090°. Varijacija je +3° (istočna), a devijacija na tom kursu -2° (zapadna). Koji kompasni kurs držiš?",
		media: {
			visual: "compass-course-calculator",
			props: {
				mode: "variation-deviation",
				trueCourse: 90,
				variation: 3,
				deviation: -2,
			},
		},
		options: [
			{ id: "a", text: "085°", correct: false },
			{ id: "b", text: "089°", correct: true },
			{ id: "c", text: "091°", correct: false },
			{ id: "d", text: "095°", correct: false },
		],
		explanation:
			"Od pravog kursa oduzmeš varijaciju: 90 - 3 = 87° (magnetski). Zatim oduzmeš devijaciju: 87 - (-2) = 89° (kompasni).",
		difficulty: 3,
		source: "original",
	},
	{
		id: "karte-navigacija-030",
		area: "karte-navigacija",
		lesson: "magnetski-kompas",
		level: "B",
		type: "true-false",
		prompt: "Devijacija kompasa jednaka je na svim kursevima.",
		options: [
			{ id: "t", text: "Točno", correct: false },
			{ id: "f", text: "Netočno", correct: true },
		],
		explanation:
			"Kad brod okreće, mijenja se položaj njegovih magnetskih masa prema igli, pa se mijenja i devijacija. Zato tablica devijacije ima vrijednost za svaki kurs.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "karte-navigacija-031",
		area: "karte-navigacija",
		lesson: "magnetski-kompas",
		level: "B",
		type: "multi",
		prompt:
			"Koje predmete ne smiješ ostaviti uz magnetski kompas? Odaberi sve točne.",
		options: [
			{ id: "a", text: "Mobitel", correct: true },
			{ id: "b", text: "Čelični alat (ključ, odvijač)", correct: true },
			{ id: "c", text: "Plastičnu bocu vode", correct: false },
			{ id: "d", text: "Pamučni ručnik", correct: false },
		],
		explanation:
			"Željezo, magneti i elektronika (zvučnici u mobitelu) skreću iglu i stvaraju dodatnu devijaciju. Plastika i tkanina ne utječu na kompas.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "karte-navigacija-032",
		area: "karte-navigacija",
		lesson: "odredivanje-pozicije",
		level: "B",
		type: "single",
		prompt:
			"Istovremeno si izmjerio azimute na dva poznata objekta i ucrtao ih na kartu. Gdje je tvoja pozicija?",
		options: [
			{ id: "a", text: "U sjecištu dviju crta azimuta", correct: true },
			{
				id: "b",
				text: "Na polovini udaljenosti između dvaju objekata",
				correct: false,
			},
			{ id: "c", text: "Na bližem objektu", correct: false },
			{ id: "d", text: "Na crti kursa, jednu milju od obale", correct: false },
		],
		explanation:
			"Svaka crta azimuta je crta na kojoj se nalaziš. Brodica je na obje crte istovremeno samo u njihovom sjecištu.",
		difficulty: 1,
		source: "original",
	},
	{
		id: "karte-navigacija-033",
		area: "karte-navigacija",
		lesson: "odredivanje-pozicije",
		level: "B",
		type: "single",
		prompt:
			"Svjetionik je u 10:00 pod pramčanim kutom 45°, a u 10:30 točno po boku (90°). Ploviš 8 čvorova. Koliko si udaljen od svjetionika u 10:30?",
		options: [
			{ id: "a", text: "2 nautičke milje", correct: false },
			{ id: "b", text: "4 nautičke milje", correct: true },
			{ id: "c", text: "8 nautičkih milja", correct: false },
			{ id: "d", text: "Ne može se odrediti bez radara", correct: false },
		],
		explanation:
			"Prema pravilu 45° i 90°, put prevaljen između dva opažanja jednak je udaljenosti od objekta kad je po boku. Za pola sata pri 8 čvorova prijeđeš 4 milje.",
		difficulty: 3,
		source: "original",
	},
	{
		id: "karte-navigacija-034",
		area: "karte-navigacija",
		lesson: "odredivanje-pozicije",
		level: "B",
		type: "single",
		prompt: "Iz čega dobivaš zbrojenu poziciju?",
		options: [
			{ id: "a", text: "Iz dva istovremena azimuta", correct: false },
			{
				id: "b",
				text: "Iz poznatog kursa, brzine i proteklog vremena od zadnje sigurne pozicije",
				correct: true,
			},
			{ id: "c", text: "Samo iz GPS uređaja", correct: false },
			{ id: "d", text: "Iz dubine očitane na dubinomjeru", correct: false },
		],
		explanation:
			"Zbrojena pozicija je račun: od zadnje sigurne točke ucrtaš kurs i udaljenost (brzina puta vrijeme). Kad uračunaš i vjetar i struju, dobiješ procijenjenu poziciju.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "karte-navigacija-035",
		area: "karte-navigacija",
		lesson: "odredivanje-pozicije",
		level: "B",
		type: "true-false",
		prompt:
			"Azimut izmjeren magnetskim kompasom smiješ odmah ucrtati na kartu, bez ispravka.",
		options: [
			{ id: "t", text: "Točno", correct: false },
			{ id: "f", text: "Netočno", correct: true },
		],
		explanation:
			"Karta je orijentirana prema pravom sjeveru. Kompasni azimut prvo ispraviš za devijaciju i varijaciju, pa tek onda crtaš.",
		difficulty: 3,
		source: "original",
	},
	{
		id: "karte-navigacija-036",
		area: "karte-navigacija",
		lesson: "elektronicka-pomagala",
		level: "B",
		type: "single",
		prompt: "Kako dubinomjer (ehosonder) određuje dubinu?",
		options: [
			{ id: "a", text: "Mjeri tlak vode na dnu brodice", correct: false },
			{
				id: "b",
				text: "Šalje ultrazvučni impuls i mjeri vrijeme dok se jeka ne vrati s dna",
				correct: true,
			},
			{ id: "c", text: "Očitava dubinu sa satelita", correct: false },
			{ id: "d", text: "Spušta uteg na užetu", correct: false },
		],
		explanation:
			"Uređaj mjeri vrijeme puta impulsa do dna i natrag, dijeli ga s dva i množi brzinom zvuka u vodi (oko 1500 m/s). Pokazuje dubinu ispod kobilice ili sonde.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "karte-navigacija-037",
		area: "karte-navigacija",
		lesson: "elektronicka-pomagala",
		level: "B",
		type: "single",
		prompt:
			"Struja ti dolazi u pramac brzinom 2 čvora. Brzinomjer koji mjeri brzinu kroz vodu pokazuje 6 čvorova. Koliku brzinu preko dna pokazuje GPS?",
		options: [
			{ id: "a", text: "4 čvora", correct: true },
			{ id: "b", text: "6 čvorova", correct: false },
			{ id: "c", text: "8 čvorova", correct: false },
			{ id: "d", text: "2 čvora", correct: false },
		],
		explanation:
			"Struja u pramac oduzima svoju brzinu: 6 - 2 = 4 čvora preko dna. Brzinomjer kroz vodu struju ne vidi, GPS je vidi.",
		difficulty: 3,
		source: "original",
	},
	{
		id: "karte-navigacija-038",
		area: "karte-navigacija",
		lesson: "nauticke-publikacije",
		level: "B",
		type: "single",
		prompt:
			"U kojoj publikaciji tražiš opis luke, sidrišta, upute za uplovljavanje i gdje se može uzeti gorivo?",
		options: [
			{ id: "a", text: "U Peljaru", correct: true },
			{ id: "b", text: "U Tablicama morskih mijena", correct: false },
			{ id: "c", text: "U Radio-službi", correct: false },
			{ id: "d", text: "U Katalogu pomorskih karata", correct: false },
		],
		explanation:
			"Peljar (Peljar Jadranskog mora ili Peljar za male brodove) je vodič kroz luke, uvale, kanale i sidrišta s uputama za plovidbu i opskrbu.",
		difficulty: 1,
		source: "original",
	},
	{
		id: "karte-navigacija-039",
		area: "karte-navigacija",
		lesson: "nauticke-publikacije",
		level: "B",
		type: "single",
		prompt: "Gdje ćeš naći visinu, domet, boju i sektore nekog svjetionika?",
		options: [
			{ id: "a", text: "U Popisu svjetala i signala za maglu", correct: true },
			{ id: "b", text: "U Oglasima za pomorce", correct: false },
			{ id: "c", text: "U Radio-službi", correct: false },
			{ id: "d", text: "U Tablicama morskih mijena", correct: false },
		],
		explanation:
			"Popis svjetala i signala za maglu ima za svako svjetlo broj, poziciju, visinu, boju, period, domet, sektore i zvučni signal za maglu ako ga ima.",
		difficulty: 2,
		source: "original",
	},
	{
		id: "karte-navigacija-040",
		area: "karte-navigacija",
		lesson: "nauticke-publikacije",
		level: "B",
		type: "single",
		prompt: "Čemu služe Oglasi za pomorce (OZP)?",
		options: [
			{ id: "a", text: "Za prodaju i najam brodica", correct: false },
			{
				id: "b",
				text: "Za ispravljanje karata i priručnika, npr. novo ili ugašeno svjetlo, nova plutača",
				correct: true,
			},
			{ id: "c", text: "Za vremensku prognozu za Jadran", correct: false },
			{
				id: "d",
				text: "Za popis ispitnih termina u lučkim kapetanijama",
				correct: false,
			},
		],
		explanation:
			"OZP izlaze redovito (mjesečno) i javljaju promjene: nova ili ugašena svjetla, instalacije, plutače, lukobrani. Ispravke mogu biti privremene ili trajne.",
		difficulty: 2,
		source: "original",
	},
];

export default questions;
