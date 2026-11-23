import type { ILesson } from "@/content/types";

const lessons: ILesson[] = [
	{
		slug: "tipovi-brodica",
		area: "pomorstvo-manevriranje",
		order: 1,
		title: "Tipovi brodica i gradnja",
		summary:
			"Pasara, gajeta, leut i ostale: po čemu ih prepoznaješ i od čega se grade.",
		level: "B",
		minutes: 5,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"Brodice dijelimo na više načina:\n\n- po **namjeni**: osobne, gospodarske, javne;\n- po **pogonu**: vesla, jedra, motor;\n- po **obliku trupa**: deplasmanske (plove kroz vodu), gliserske (izdignu se i klize po površini), katamarani;\n- po **tipu**, a tu su naše tradicijske brodice.",
			},
			{
				type: "table",
				level: "B",
				caption: "Tradicijski tipovi brodica",
				columns: ["Tip", "Kako ga prepoznaješ"],
				rows: [
					[
						"Pasara",
						"ravno odsječena krma (zrcalo), šiljast pramac; česta brodica za izlete",
					],
					[
						"Gajeta",
						"šiljast pramac i šiljasta krma, široka i stabilna; ribarska",
					],
					["Guc", "sličan gajeti, ali uži"],
					["Leut", "šiljast pramac i krma, na pramcu istaknut kljun (rilo)"],
					["Batana", "ravno dno i ravna krma; mala ribarska brodica"],
				],
			},
			{
				type: "text",
				level: "B",
				markdown:
					"Uz njih su tu **gliseri**, **skuteri** i **jedrilice**.\n\n**Materijali:** najčešće **stakloplastika** i **drvo**. Manje brodice rade se od **gume** (gumenjaci, često s tvrdim dnom i zračnim cijevima, tubusima), a ima i aluminija, čelika i vodootporne šperploče.\n\nDrvene brodice mogu imati daske slagane jednu uz drugu ili preklopljene, a gumene se lijepe.",
			},
			{
				type: "remember",
				level: "B",
				title: "Zapamti",
				items: [
					"Pasara ima zrcalo, ravno odsječenu krmu.",
					"Gajeta i leut imaju šiljast pramac i krmu.",
					"Batana ima ravno dno.",
					"Najčešći materijali: stakloplastika i drvo.",
				],
			},
			{ type: "check", level: "B", questionId: "pomorstvo-manevriranje-001" },
		],
		cheatSheet: [
			"Pasara: zrcalo na krmi.",
			"Gajeta: šiljast pramac i krma, široka.",
			"Guc: uža gajeta; leut: istaknut kljun na pramcu.",
			"Batana: ravno dno, ravna krma.",
			"Materijali: stakloplastika, drvo, guma, aluminij.",
		],
		source: "original",
	},
	{
		slug: "dimenzije-i-stabilnost",
		area: "pomorstvo-manevriranje",
		order: 2,
		title: "Dimenzije i stabilnost",
		summary:
			"Duljina, širina, visina i gaz, i zašto brodica ne smije biti krivo nakrcana.",
		level: "B",
		minutes: 5,
		blocks: [
			{
				type: "table",
				level: "B",
				caption: "Glavne dimenzije",
				columns: ["Dimenzija", "Što mjeri"],
				rows: [
					[
						"Duljina preko svega",
						"od krajnje točke krme do krajnje točke pramca",
					],
					["Širina", "najveća udaljenost između bokova"],
					["Visina", "od kobilice do palube ili ruba boka"],
					["Gaz", "od kobilice do vodene linije, koliko je brodica uronjena"],
				],
			},
			{
				type: "text",
				level: "B",
				markdown:
					"**Stabilnost** je sposobnost brodice da se sama vrati u uspravan položaj kad je val, vjetar ili naglo skretanje nagne.\n\nNajveći neprijatelj stabilnosti male brodice su **ljudi koji se rasporede na jednu stranu** ili svi odjednom ustanu. Isto vrijedi za teret koji klizi.",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"Kako krcati:\n\n- teret rasporedi ravnomjerno po duljini i širini;\n- **teže stvari dolje**, lakše gore;\n- učvrsti teret da se ne pomiče;\n- ne krcaj više ljudi ni tereta nego što piše u upisnom listu.\n\nGospodarske brodice imaju na oba boka ucrtanu **teretnu vodenu liniju**. Ako je ona pod vodom, brodica je prekrcana.",
			},
			{
				type: "warning",
				level: "B",
				markdown:
					"Plovidba nagnuta na jedan bok ili s pramcem previše uronjenim ili izdignutim je opasna, neudobna i troši više goriva. Prije isplovljenja rasporedi ljude tako da brodica bude ravna.",
			},
			{
				type: "remember",
				level: "B",
				title: "Zapamti",
				items: [
					"Gaz je udaljenost od kobilice do vodene linije.",
					"Teže stvari idu dolje i u sredinu.",
					"Kod male brodice najopasnije je kad su ljudi na jednoj strani.",
				],
			},
			{ type: "check", level: "B", questionId: "pomorstvo-manevriranje-005" },
			{ type: "check", level: "B", questionId: "pomorstvo-manevriranje-007" },
		],
		cheatSheet: [
			"Dimenzije: duljina, širina, visina, gaz.",
			"Stabilnost: brodica se sama vraća u ravan položaj.",
			"Teret dolje, ravnomjerno, učvršćen.",
			"Gospodarske brodice: teretna vodena linija na oba boka.",
		],
		source: "original",
	},
	{
		slug: "konopi",
		area: "pomorstvo-manevriranje",
		order: 3,
		title: "Konopi i briga o njima",
		summary: "Od čega su konopi, kako ih čuvati i kad ih baciti.",
		level: "common",
		minutes: 3,
		blocks: [
			{
				type: "text",
				level: "common",
				markdown:
					"Na brodici konopima vežeš brodicu, sidriš se, tegliš i spašavaš. Danas su gotovo svi konopi od **umjetnih vlakana**: jaki su, ne trunu i ne upijaju puno vode. Mnogi i plutaju, pa ne završe u vijku.\n\n**Čelična užad** viđaš na ribarskim i teretnim brodicama i na jedrilicama. Konopi od biljnih vlakana danas su rijetki jer trunu.",
			},
			{
				type: "text",
				level: "common",
				markdown:
					"Kako čuvati konop:\n\n- skloni ga od **sunca**, jer UV zrake slabe vlakna;\n- isperi ga i osuši prije spremanja;\n- ne vuci ga preko oštrih rubova;\n- slagaj ga u krug da se ne zapetlja.\n\nKad vidiš **puknute niti**, istrošen dio ili tvrdo, ispucalo mjesto, konop zamijeni.",
			},
			{
				type: "remember",
				level: "common",
				title: "Zapamti",
				items: [
					"Konopi su danas od umjetnih vlakana.",
					"Sunce i trenje su glavni neprijatelji konopa.",
					"Puknute niti znače: zamijeni konop.",
				],
			},
			{
				type: "check",
				level: "common",
				questionId: "pomorstvo-manevriranje-009",
			},
		],
		cheatSheet: [
			"Konopi od umjetnih vlakana: jaki, ne trunu.",
			"Čelična užad: ribarske, teretne brodice i jedrilice.",
			"Čuvaj od sunca i oštrih rubova.",
			"Puknute niti: konop odmah zamijeni.",
		],
		source: "original",
	},
	{
		slug: "uzlovi",
		area: "pomorstvo-manevriranje",
		order: 4,
		title: "Uzlovi koje moraš znati",
		summary:
			"Pašnjak, muški, zastavni, vrzni, sidreni uzao i osmica: kako se vežu i čemu služe.",
		level: "common",
		minutes: 8,
		blocks: [
			{
				type: "text",
				level: "common",
				markdown:
					"Na ispitu ćeš vjerojatno vezati jedan ili dva uzla, najčešće **pašnjak**. Dobar pomorski uzao drži pod opterećenjem, a lako se odveže kad ga rasteretiš.\n\nDva naziva koja ćeš čuti: **slobodni kraj** je kraj konopa kojim vežeš, a **stojeći dio** je ostatak konopa.",
			},
			{
				type: "visual",
				level: "common",
				visual: "knot-steps",
				caption: "Pašnjak korak po korak",
				props: { knot: "pasnjak" },
			},
			{
				type: "example",
				level: "common",
				title: "Pašnjak u tri koraka",
				markdown:
					'1. Na stojećem dijelu napravi malu petlju ("rupu").\n2. Slobodni kraj provuci kroz petlju odozdo, obiđi njime stojeći dio sa stražnje strane.\n3. Vrati kraj natrag kroz istu petlju i zategni.\n\nPomoć za pamćenje: zec izađe iz rupe, obiđe drvo i vrati se u rupu.',
			},
			{
				type: "table",
				level: "common",
				caption: "Koji uzao za što",
				columns: ["Uzao", "Čemu služi"],
				rows: [
					[
						"Pašnjak",
						"čvrsta omča na kraju konopa koja se ne steže; za vez na bitvu, spašavanje osobe",
					],
					["Muški uzao", "spaja dva konopa iste debljine"],
					[
						"Zastavni uzao",
						"spaja dva konopa različite debljine, ili konop s omčom zastave",
					],
					[
						"Vrzni uzao",
						"brzi vez za stup, ogradu ili bitvu; vješanje bokobrana",
					],
					["Sidreni uzao", "vezanje konopa za kolut (oko) sidra"],
					[
						"Osmica",
						"zadebljanje na kraju da konop ne isklizne kroz koloturnik ili rupu",
					],
				],
			},
			{
				type: "visual",
				level: "common",
				visual: "knot-steps",
				caption: "Usporedi: muški, zastavni i vrzni uzao",
				props: { knot: "muski", compare: ["muski", "zastavni", "vrzni"] },
			},
			{
				type: "warning",
				level: "common",
				markdown:
					'Muški uzao vežeš ovako: desni kraj preko lijevog, pa lijevi preko desnog. Ako oba puta prebaciš isti kraj na istu stranu, dobiješ "ženski" uzao koji lako popusti. Vrzni uzao može skliznuti kad se opterećenje stalno mijenja, pa ga za duži vez osiguraj još jednim polu-uzlom.',
			},
			{
				type: "remember",
				level: "common",
				title: "Zapamti",
				items: [
					"Pašnjak: omča koja se ne steže.",
					"Muški: dva jednaka konopa. Zastavni: dva različita.",
					"Vrzni: brzo na stup ili bokobran. Sidreni: konop na sidro.",
				],
			},
			{
				type: "check",
				level: "common",
				questionId: "pomorstvo-manevriranje-010",
			},
			{
				type: "check",
				level: "common",
				questionId: "pomorstvo-manevriranje-012",
			},
		],
		cheatSheet: [
			"Pašnjak: nepomična omča, ključni ispitni uzao.",
			"Muški uzao: dva konopa iste debljine.",
			"Zastavni uzao: dva konopa različite debljine.",
			"Vrzni uzao: brzi vez na stup ili bokobran.",
			"Sidreni uzao: konop za sidro; osmica: kraj ne isklizne.",
		],
		source: "original",
	},
	{
		slug: "sile-vijak-kormilo",
		area: "pomorstvo-manevriranje",
		order: 5,
		title: "Sile na brodicu, vijak i kormilo",
		summary:
			"Što gura tvoju brodicu i kako vijak pri vožnji krmom zakreće krmu.",
		level: "B",
		minutes: 6,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"Kad manevriraš, na brodicu djeluju dvije vrste sila:\n\n- **vanjske**: vjetar, struja, valovi i plitko more;\n- **unutarnje**, kojima ti upravljaš: vijak, kormilo, sidro i konopi.\n\nDobar voditelj vanjske sile koristi kad mu pomažu i umanjuje ih kad mu smetaju.",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"**Kormilo** djeluje jer voda struji preko njega. Kad voziš naprijed, mlaz vijka udara u kormilo i brodica dobro sluša. Kad voziš **krmom** (unatrag), kormilo gotovo da i ne djeluje.\n\nKlasično kormilo zakreće se do otprilike 35 stupnjeva u svaku stranu.",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"**Izboj krme.** Vijak koji se pri vožnji naprijed vrti udesno zove se **desnokretni**. Kad s njim voziš krmom, krma se zanosi **ulijevo**. Lijevokretni vijak krmu zanosi udesno.\n\nZato je s desnokretnim vijkom lakše pristati **lijevim bokom**: kratka vožnja krmom na kraju zaustavi brodicu i privuče krmu obali.",
			},
			{
				type: "example",
				level: "B",
				title: "Dva motora",
				markdown:
					"Brodica s dva vijka obično ima vijke koji se vrte prema van, pa se izboj poništava. Okret u mjestu udesno: **lijevi motor naprijed, desni krmom**. Ulijevo obrnuto.\n\nNeke brodice imaju i **pramčani potiskivač** (bow thruster), mali vijak u pramcu koji gura pramac lijevo ili desno.",
			},
			{
				type: "remember",
				level: "B",
				title: "Zapamti",
				items: [
					"Vanjske sile: vjetar, struja, valovi, plitko more.",
					"Vožnja krmom: kormilo slabo djeluje.",
					"Desnokretni vijak krmom zanosi krmu ulijevo, pa pristaješ lijevim bokom.",
					"Okret udesno s dva motora: lijevi naprijed, desni krmom.",
				],
			},
			{ type: "check", level: "B", questionId: "pomorstvo-manevriranje-015" },
			{ type: "check", level: "B", questionId: "pomorstvo-manevriranje-016" },
		],
		cheatSheet: [
			"Vanjske sile: vjetar, struja, valovi, plitko more.",
			"Unutarnje sile: vijak, kormilo, sidro, konopi.",
			"Desnokretni vijak krmom: krma ide ulijevo.",
			"Lakše pristajanje: bokom suprotnim od smjera vrtnje vijka.",
			"Dva vijka, okret udesno: lijevi naprijed, desni krmom.",
		],
		source: "original",
	},
	{
		slug: "pristajanje-i-vez",
		area: "pomorstvo-manevriranje",
		order: 6,
		title: "Pristajanje i vez",
		summary:
			"Kako se pripremiti, prići obali i vezati brodicu s tri konopa ili u četverovez.",
		level: "B",
		minutes: 6,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"Prije pristajanja sve pripremi na vrijeme: **bokobrane** objesi na stranu kojom pristaješ, konope složi na pramac i krmu, a posadi reci tko što radi. Nitko ne skače na obalu dok brodica ne stane.",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"Prilazi **polako**, s malo gasa, jer polako uvijek možeš popraviti, a brzo ne možeš. Kad god možeš, prilazi **pramcem u vjetar** ili struju: tako lakše stojiš na mjestu i imaš kontrolu.\n\nAko vjetar puše jako s obale ili prema obali, a ne možeš sigurno prići, okreni se na sidru i pristani krmom.",
			},
			{
				type: "table",
				level: "B",
				caption: "Konopi za vez bokom",
				columns: ["Konop", "Čemu služi"],
				rows: [
					["Pramčani", "drži pramac uz obalu"],
					["Krmeni", "drži krmu uz obalu"],
					["Špring", "sprječava da brodica klizi naprijed ili natrag uz obalu"],
				],
			},
			{
				type: "text",
				level: "B",
				markdown:
					"Brodica se može vezati:\n\n- **bokom** uz obalu ili uz drugo plovilo;\n- u **četverovez**: krma vezana za obalu, a pramac na sidru ili na plutači (mooringu). Tako stane više plovila uz istu obalu, i to je najčešći vez u našim lukama i marinama.\n\nPri isplovljavanju koristi motor, kormilo i konope zajedno. Na primjer, uz špring možeš odmaknuti pramac ili krmu od obale.",
			},
			{
				type: "remember",
				level: "B",
				title: "Zapamti",
				items: [
					"Pripremi bokobrane i konope prije prilaza.",
					"Prilazi polako, po mogućnosti pramcem u vjetar.",
					"Vez bokom: pramčani, krmeni i špring.",
					"Četverovez: krma na obalu, pramac na sidro ili plutaču.",
				],
			},
			{ type: "check", level: "B", questionId: "pomorstvo-manevriranje-018" },
			{ type: "check", level: "B", questionId: "pomorstvo-manevriranje-019" },
		],
		cheatSheet: [
			"Bokobrani i konopi spremni prije prilaza.",
			"Prilaz polako, pramcem u vjetar ili struju.",
			"Tri konopa: pramčani, krmeni, špring.",
			"Četverovez: krma obala, pramac sidro ili mooring.",
		],
		source: "original",
	},
	{
		slug: "sidrenje",
		area: "pomorstvo-manevriranje",
		order: 7,
		title: "Sidrenje",
		summary:
			"Gdje se sidriti, koliko lanca dati i kako provjeriti drži li sidro.",
		level: "B",
		minutes: 6,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"Sidro mora tri stvari: **dobro se ukopati**, **dobro držati** i **lako se izvući**.\n\nZato je dno važno:\n\n- **mulj i pijesak**: najbolje, sidro se lijepo ukopa;\n- **šljunak**: drži slabije, dobro samo po mirnom vremenu;\n- **kamen**: najgore, sidro ne drži ili se zaglavi.\n\nVrstu dna vidiš na pomorskoj karti (slova M, P, Š, K).",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"**Koliko lanca ili konopa?** Po lijepom vremenu daj **3 do 4 puta** više od dubine. Kad puše ili očekuješ vjetar, daj još više.\n\nPrimjer: dubina 5 m znači 15 do 20 m lanca.\n\nMisli i na **krug zaokreta**: brodica se oko sidra okreće u krugu čiji je polumjer od sidra do krme. U tom krugu ne smije biti drugih plovila ni plićina.",
			},
			{
				type: "example",
				level: "B",
				title: "Postupak sidrenja",
				markdown:
					"1. Na karti provjeri dno, dubinu i zabrane (kabeli, cjevovodi).\n2. Polako priđi točki sidrenja **uz vjetar ili struju** (pramcem prema njima).\n3. Zaustavi brodicu i **spusti** sidro, nemoj ga bacati.\n4. Pusti da te vjetar odgura unatrag i popuštaj lanac.\n5. Lagano zavezi krmom da se sidro ukopa.\n6. Zapamti dvije točke na obali i povremeno provjeri da se ne pomičeš.",
			},
			{
				type: "warning",
				level: "B",
				markdown:
					"Ne sidri se iznad **podmorskih kabela i cjevovoda** (na karti crvena vijugava ili isprekidana crta, na obali bijela ploča s obrnutim crnim sidrom), u plovnim putovima ni na mjestima gdje je sidrenje zabranjeno. Brodica se u pravilu sidri jednim sidrom, da se lanci ne zapetljaju.",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"Poznati tipovi sidara su **Danforth** (plosnato, s dva široka kraka, dobro u pijesku i mulju), **Hall** (pomični kraci, za veće brodove) i **mačak** (četiri kraka, za male brodice).",
			},
			{
				type: "source-note",
				level: "B",
				markdown:
					'Stare skripte navode različito: "3 puta dubina", "3 do 4 puta", "oko 4 puta" ili "3 dubine plus duljina brodice". Za ispit reci **3 do 4 puta dubina po lijepom vremenu, više kad puše**.',
			},
			{
				type: "remember",
				level: "B",
				title: "Zapamti",
				items: [
					"Najbolje dno: mulj i pijesak. Najgore: kamen.",
					"Lanac: 3 do 4 puta dubina, više po vjetru.",
					"Prilaz uz vjetar ili struju, sidro se spušta, zatim krmom.",
					"Nikad iznad kabela i cjevovoda.",
				],
			},
			{ type: "check", level: "B", questionId: "pomorstvo-manevriranje-022" },
			{ type: "check", level: "B", questionId: "pomorstvo-manevriranje-023" },
		],
		cheatSheet: [
			"Dno: mulj i pijesak najbolji, kamen najgori.",
			"Lanac 3 do 4 puta dubina, više kad puše.",
			"Krug zaokreta: polumjer od sidra do krme.",
			"Prilaz pramcem u vjetar ili struju, sidro spustiti.",
			"Zabranjeno iznad kabela i cjevovoda.",
		],
		source: "original",
	},
	{
		slug: "plovidba-po-nevremenu",
		area: "pomorstvo-manevriranje",
		order: 8,
		title: "Plovidba po valovima i nevremenu",
		summary:
			"Kako postaviti brodicu prema valu i što napraviti prije nego te uhvati nevrijeme.",
		level: "B",
		minutes: 4,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"Najbolje nevrijeme je ono koje dočekaš u luci. Prije isplovljenja pogledaj prognozu, a kad vidiš znakove bure ili nevere, odmah potraži zaklon.\n\nAko te nevrijeme ipak uhvati:\n\n- svi oblače **prsluke**;\n- pospremi i učvrsti sve što se može pomaknuti;\n- zatvori otvore i grotla;\n- **smanji brzinu**.",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"**Kako prema valu?** Primaj val i vjetar **u pramac, pod malim kutom** (otprilike do 30 stupnjeva lijevo ili desno od pramca). Uz to podesi brzinu tako da pramac ne udara silovito u svaki val.\n\n**Izbjegavaj val u bok.** Bočni val najlakše nagne i prevrne malu brodicu. Kad val dolazi u krmu, pazi da te ne zakrene bočno na val.",
			},
			{
				type: "warning",
				level: "B",
				markdown:
					'Bura u nekoliko minuta može narasti do olujne snage. Ne pokušavaj je "prejahati" otvorenim morem, nego idi u najbližu zaštićenu uvalu ili luku.',
			},
			{
				type: "remember",
				level: "B",
				title: "Zapamti",
				items: [
					"Val u pramac pod malim kutom, smanjena brzina.",
					"Val u bok je najopasniji.",
					"Prsluci na sebe, teret učvršćen, otvori zatvoreni.",
				],
			},
			{ type: "check", level: "B", questionId: "pomorstvo-manevriranje-027" },
		],
		cheatSheet: [
			"Prije isplovljenja: prognoza.",
			"Val u pramac pod malim kutom, uz smanjenu brzinu.",
			"Izbjegavaj val u bok.",
			"Na znakove bure odmah u zaklon.",
		],
		source: "original",
	},
	{
		slug: "covjek-u-moru",
		area: "pomorstvo-manevriranje",
		order: 9,
		title: "Čovjek u moru",
		summary:
			"Što napraviti u prvih nekoliko sekundi kad netko padne s brodice i kako ga sigurno izvući.",
		level: "B",
		minutes: 6,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"Kad netko padne u more, najveća opasnost u prvim sekundama je **vijak**. Zato je prvi potez uvijek isti: **kormilo odmah do kraja na stranu na koju je osoba pala**. Krma se tako odmakne od osobe.",
			},
			{
				type: "example",
				level: "B",
				title: "Redoslijed",
				markdown:
					'1. Kormilo na stranu pada i viči "Čovjek u moru!".\n2. **Baci kolut** ili bilo što što pluta.\n3. Jedna osoba samo **gleda i pokazuje rukom** gdje je unesrećeni i ne skida pogled s njega.\n4. Označi poziciju (tipka MOB na GPS-u, ako je imaš).\n5. Smanji brzinu i **vrati se u krugu** na mjesto pada. To je obični okret.\n6. Priđi polako, po mogućnosti pramcem u vjetar i val, tako da je osoba uz bok kraj tebe.\n7. Prije nego je dohvatiš, **ugasi motor ili ga stavi u ler**, da je vijak ne ozlijedi.',
			},
			{
				type: "text",
				level: "B",
				markdown:
					"Ako osobu izgubiš iz vida ili je ne možeš izvući, odmah traži pomoć: **MAYDAY na VHF kanalu 16** ili poziv na **195** (MRCC Rijeka). Kapetanija preuzima potragu.\n\nVeliki brodovi umjesto običnog okreta rade **Williamsonov okret**, jer im treba puno prostora da se vrate na svoj trag.",
			},
			{
				type: "warning",
				level: "B",
				markdown:
					"Nikad ne vozi krmom prema osobi u moru dok vijak radi. Izvlači je s boka ili preko krmenih stepenica tek kad motor stoji.",
			},
			{
				type: "remember",
				level: "B",
				title: "Zapamti",
				items: [
					"Prvo kormilo na stranu pada, da vijak ne zahvati osobu.",
					"Baci kolut i ne skidaj pogled s osobe.",
					"Vrati se u krugu, priđi polako, ugasi motor prije izvlačenja.",
					"Ako je ne nađeš: MAYDAY na kanalu 16 ili 195.",
				],
			},
			{ type: "check", level: "B", questionId: "pomorstvo-manevriranje-028" },
			{ type: "check", level: "B", questionId: "pomorstvo-manevriranje-030" },
		],
		cheatSheet: [
			"Kormilo odmah na stranu pada.",
			"Baci kolut, jedna osoba stalno pokazuje unesrećenog.",
			"Obični okret: smanji brzinu, vrati se u krugu.",
			"Motor u ler ili ugašen prije izvlačenja.",
			"Izgubljen iz vida: MAYDAY na kanalu 16 ili 195.",
		],
		source: "original",
	},
];

export default lessons;
