import type { ILesson } from "@/content/types";

const lessons: ILesson[] = [
	{
		slug: "vrste-motora-i-taktovi",
		area: "motoristika",
		order: 1,
		title: "Vrste motora i taktovi",
		summary:
			"Benzinski i dizelski, dvotaktni i četverotaktni, ugrađeni i vanbrodski: po čemu se razlikuju i kako rade.",
		level: "B",
		minutes: 7,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"Motore na brodicama dijelimo na više načina:\n\n- po smještaju: **ugrađeni** (unutar trupa) i **vanbrodski** (visi na krmi)\n- po gorivu: **benzinski** (Otto) i **dizelski**\n- po radu: **dvotaktni** i **četverotaktni**\n- po broju cilindara: jednocilindrični i višecilindrični\n\nSve češće viđaš i električne motore, ali na ispitu se pita o motorima s unutarnjim izgaranjem.",
			},
			{
				type: "table",
				level: "B",
				caption: "Benzinski i dizelski motor",
				columns: ["", "Benzinski (Otto)", "Dizelski"],
				rows: [
					[
						"Gorivo",
						"Benzin (dvotaktni: mješavina benzina i ulja)",
						"Dizelsko gorivo (plinsko ulje)",
					],
					[
						"Kako nastaje smjesa",
						"Rasplinjač ili ubrizgavanje miješa zrak i gorivo",
						"Usisava se samo zrak, gorivo se ubrizga kasnije",
					],
					[
						"Paljenje",
						"Iskra svjećice blizu gornje mrtve točke",
						"Samozapaljenje u jako zagrijanom sabijenom zraku",
					],
					[
						"Ključni dijelovi",
						"Svjećica, rasplinjač ili brizgaljke",
						"Visokotlačna pumpa i rasprskač, nema svjećice",
					],
				],
			},
			{
				type: "text",
				level: "B",
				markdown:
					"Kod dizela klip sabije čisti zrak toliko da se zagrije na nekoliko stotina stupnjeva (skripte navode oko 700 °C). Pumpa tada kroz rasprskač ubrizga gorivo u obliku sitne magle i ono se samo zapali. Zato dizel ne treba svjećicu.",
			},
			{
				type: "visual",
				level: "B",
				visual: "four-stroke-engine",
				caption: "Pokreni animaciju i prati ventile i klip kroz četiri takta.",
				props: { mode: "four-stroke" },
			},
			{
				type: "text",
				level: "B",
				markdown:
					"**Četverotaktni motor** ima četiri takta:\n\n1. **Usis**: klip ide dolje, usisni ventil je otvoren i ulazi smjesa (ili zrak kod dizela).\n2. **Kompresija**: oba ventila su zatvorena, klip ide gore i sabija.\n3. **Ekspanzija (radni takt)**: smjesa izgara, plinovi guraju klip dolje. Samo ovaj takt daje snagu.\n4. **Ispuh**: ispušni ventil se otvara, klip ide gore i izbacuje plinove.\n\nZa cijeli ciklus koljenasto vratilo napravi dva okretaja.",
			},
			{
				type: "visual",
				level: "B",
				visual: "four-stroke-engine",
				caption: "Prebaci na dvotaktni motor i usporedi.",
				props: { mode: "two-stroke" },
			},
			{
				type: "text",
				level: "B",
				markdown:
					"**Dvotaktni motor** sve obavi u dva takta, dakle u jednom okretaju:\n\n1. **Izmjena medija i kompresija**: svježa smjesa ulazi, stari plinovi izlaze, klip sabija.\n2. **Izgaranje i ekspanzija**: radni takt.\n\nNema ventila. Smjesa ulazi i izlazi kroz **kanale** u stijenci cilindra koje klip otvara i zatvara.",
			},
			{
				type: "remember",
				level: "B",
				items: [
					"Četiri takta: usis, kompresija, ekspanzija, ispuh.",
					"Dvotaktni: izmjena medija i kompresija, pa izgaranje i ekspanzija. Nema ventila, ima kanale.",
					"Benzinski pali svjećica, dizel se pali sam od vrućeg sabijenog zraka.",
					"Jedini takt koji daje snagu je ekspanzija (radni takt).",
				],
			},
			{ type: "check", level: "B", questionId: "motoristika-001" },
			{ type: "check", level: "B", questionId: "motoristika-004" },
		],
		cheatSheet: [
			"Četverotaktni: usis, kompresija, ekspanzija, ispuh (dva okretaja vratila).",
			"Dvotaktni: dva takta, jedan okretaj, kanali umjesto ventila.",
			"Otto: svjećica i iskra. Diesel: rasprskač i samozapaljenje.",
			"Dizel nema rasplinjač ni svjećicu.",
		],
		source: "original",
	},
	{
		slug: "podmazivanje-i-hladenje",
		area: "motoristika",
		order: 2,
		title: "Podmazivanje i hlađenje",
		summary:
			"Kako ulje i voda čuvaju motor, i zašto je ventil morske vode toliko važan.",
		level: "B",
		minutes: 5,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"Ulje smanjuje trenje među dijelovima koji se gibaju i odvodi dio topline. Bez ulja motor se brzo zariba.\n\n- **Dvotaktni benzinski**: ulje ide zajedno s gorivom kao **mješavina**. Omjer piše u uputi proizvođača. Noviji motori imaju poseban spremnik ulja i sami ga doziraju.\n- **Četverotaktni**: ulje stoji u **karteru** na dnu motora, a uljna pumpa ga tjera kroz kanale. Razinu provjeravaš **mjernom šipkom**.\n\nUlje se mijenja nakon broja radnih sati koji propisuje proizvođač.",
			},
			{
				type: "warning",
				level: "B",
				markdown:
					"Ako tlak ulja naglo padne, **odmah ugasi motor**. Motor bez podmazivanja se ošteti u kratkom vremenu, a ulje koje negdje curi može završiti u moru.",
			},
			{
				type: "table",
				level: "B",
				caption: "Načini hlađenja",
				columns: ["Vrsta", "Kako radi", "Napomena"],
				rows: [
					[
						"Zračno",
						"Ventilator i rebra na motoru odvode toplinu",
						"Provjeri da je ventilator slobodan",
					],
					[
						"Vodeno izravno",
						"Morska voda prolazi kroz motor i izlazi van",
						"Jeftinije i češće",
					],
					[
						"Vodeno neizravno",
						"Slatka voda kruži kroz motor, a nju u hladnjaku hladi morska voda",
						"Motor je zaštićen od soli",
					],
				],
			},
			{
				type: "text",
				level: "B",
				markdown:
					"Kod vodenog hlađenja morska voda ulazi kroz **ventil morske vode** na trupu. Prije paljenja ga **otvori**, inače motor nema hlađenje. Nakon gašenja ga je preporučljivo **zatvoriti**, jer brtve mogu popustiti i brodica se može naplaviti.\n\nKod vanbrodskog motora pogledaj **kontrolni mlaz** vode sa strane kućišta. Ako mlaza nema, hlađenje ne radi.",
			},
			{
				type: "remember",
				level: "B",
				items: [
					"Dvotaktni benzinski se podmazuje mješavinom ulja i goriva.",
					"Četverotaktni ima karter i uljnu pumpu, razina se mjeri šipkom.",
					"Ventil morske vode: otvoriti prije paljenja, zatvoriti nakon gašenja.",
					"Nema kontrolnog mlaza na vanbrodskom motoru: hlađenje ne radi.",
				],
			},
			{ type: "check", level: "B", questionId: "motoristika-008" },
			{ type: "check", level: "B", questionId: "motoristika-011" },
		],
		cheatSheet: [
			"Dvotaktni: ulje u gorivu (mješavina). Četverotaktni: karter, pumpa, šipka.",
			"Nagli pad tlaka ulja: odmah ugasi motor.",
			"Hlađenje: zračno, vodeno izravno (morska voda), vodeno neizravno (slatka voda i hladnjak).",
			"Ventil morske vode otvori prije paljenja, zatvori poslije gašenja.",
		],
		source: "original",
	},
	{
		slug: "priprema-upucivanje-i-nadzor",
		area: "motoristika",
		order: 3,
		title: "Priprema, upućivanje i nadzor motora",
		summary:
			"Što provjeriti prije paljenja, kako upaliti i ugasiti motor i što ti govore instrumenti.",
		level: "B",
		minutes: 7,
		blocks: [
			{
				type: "remember",
				level: "B",
				title: "Prije paljenja provjeri",
				items: [
					"Ima li dovoljno goriva, uz rezervu.",
					"Je li dovod goriva od spremnika do motora otvoren i čitav.",
					"Razinu ulja (šipkom) ili mješavinu kod dvotaktnog.",
					"Hlađenje: otvoren ventil morske vode ili slobodan ventilator.",
					"Akumulator, ako se motor pali elektropokretačem.",
					"Je li vijak slobodan (nema konopa ni mreže oko njega).",
				],
			},
			{
				type: "warning",
				level: "B",
				markdown:
					"Benzinski motor u zatvorenom prostoru smiješ upaliti tek kad prostor **provjetriš ventilatorom** (puhalom). Benzinske pare su teže od zraka, skupljaju se na dnu i iskra ih može zapaliti. Ugradnja mora biti takva da se motor ne može pokrenuti prije provjetravanja.",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"**Kako se motor pali (upućuje):**\n\n- mali vanbrodski: povlačenjem užeta ili elektropokretačem\n- mali dizel: ručno, uz dekompresor i zamašnjak\n- veći motori: elektropokretačem (iz akumulatora)\n- vrlo veliki: komprimiranim zrakom\n\nPrije paljenja ručica mjenjača mora biti u **neutralnom položaju (leru)**. Na vanbrodskom motoru zakači **sigurnosnu vrpcu** (prekidač) za sebe: ako padneš, motor se ugasi.",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"Dok motor ne dosegne radnu temperaturu, vozi lagano, bez velikog broja okretaja i punog opterećenja. Pri gašenju smanji gas na prazni hod, pusti motor kratko da radi u leru, pa ga ugasi.",
			},
			{
				type: "table",
				level: "B",
				caption: "Instrumenti za nadzor motora",
				columns: ["Instrument", "Što pokazuje"],
				rows: [
					["Manometar", "Tlak ulja"],
					["Termometar", "Temperaturu rashladne tekućine (i ulja)"],
					["Brojač okretaja", "Broj okretaja motora u minuti"],
					["Voltmetar", "Napon akumulatora i punjenja"],
					["Ampermetar", "Jakost struje punjenja ili potrošnje"],
					["Nivokaz goriva", "Koliko goriva ima u spremniku"],
				],
			},
			{
				type: "visual",
				level: "B",
				visual: "four-stroke-engine",
				caption: "Pogledaj ploču s instrumentima i koja očitanja su normalna.",
				props: { mode: "instruments" },
			},
			{
				type: "text",
				level: "B",
				markdown:
					"Motor pratiš i bez instrumenata: **sluhom** (promjena zvuka), **vidom** (dim, kontrolni mlaz) i **opipom** izlazne vode (ne smije biti vruća).",
			},
			{
				type: "source-note",
				level: "B",
				markdown:
					"Neki sažeci navode da je normalno oko 60 do 80 °C i tlak ulja oko 3 bara. To ovisi o motoru. Točne vrijednosti za tvoj motor piše u uputi proizvođača, a na ispitu je dovoljno znati što koji instrument pokazuje i što znači nagla promjena.",
			},
			{ type: "check", level: "B", questionId: "motoristika-013" },
			{ type: "check", level: "B", questionId: "motoristika-016" },
		],
		cheatSheet: [
			"Prije paljenja: gorivo, dovod, ulje, hlađenje, akumulator, slobodan vijak.",
			"Benzinski motor u zatvorenom: prvo provjetri ventilatorom.",
			"Pali se u leru, sa zakačenom sigurnosnom vrpcom.",
			"Manometar je tlak ulja, termometar temperatura, voltmetar napon.",
			"Do radne temperature vozi lagano.",
		],
		source: "original",
	},
	{
		slug: "kvarovi-i-dijagnostika",
		area: "motoristika",
		order: 4,
		title: "Kvarovi i dijagnostika",
		summary:
			"Kako prepoznati kvar po znakovima, što možeš sam napraviti na moru i kako reagirati na pregrijavanje ili požar.",
		level: "B",
		minutes: 8,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"Kvar se obično najavi. Pazi na:\n\n- pad napona, okretaja ili **tlaka ulja**\n- porast **temperature**\n- nestanak kontrolnog mlaza vode\n- promjenu zvuka, jake vibracije ili neobičan dim",
			},
			{
				type: "table",
				level: "B",
				caption: "Znak, mogući uzrok i što napraviti",
				columns: ["Znak", "Mogući uzrok", "Što napraviti"],
				rows: [
					[
						"Benzinski ne pali",
						"Nema goriva, zatvoren dovod, zauljena svjećica, izvučena sigurnosna vrpca",
						"Provjeri gorivo i dovod, očisti ili zamijeni svjećicu, vrati vrpcu",
					],
					[
						"Dizel ne pali ili se gasi",
						"Prljav filter goriva ili zraka, zrak u gorivu, slab akumulator",
						"Očisti ili zamijeni filtere, provjeri akumulator",
					],
					[
						"Temperatura raste, nema mlaza",
						"Istrošen impeler (gumeno kolo pumpe), začepljen usis (vrećica, alge), zatvoren ventil",
						"Smanji gas na prazni hod; ako nema mlaza, ugasi motor i provjeri usis i impeler",
					],
					[
						"Tlak ulja naglo pada",
						"Malo ulja ili kvar pumpe",
						"Odmah ugasi motor",
					],
					[
						"Jake vibracije",
						"Nešto namotano na vijak ili oštećen vijak",
						"Ugasi motor i pregledaj vijak",
					],
				],
			},
			{
				type: "text",
				level: "B",
				markdown:
					"**Pregrijavanje:** smanji gas i prati temperaturu. Ako voda ne izlazi (nema mlaza) ili temperatura i dalje raste, ugasi motor i potraži uzrok (često je to istrošen impeler ili začepljen usis morske vode).",
			},
			{
				type: "warning",
				level: "B",
				markdown:
					"Prije nego što rukom diraš vijak ili motor, **ugasi motor** i izvuci ključ ili sigurnosnu vrpcu. Vijak koji se slučajno pokrene teško ozljeđuje.",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"**Motor se ugasio i ne pali:** prvo pazi da te vjetar ili struja ne nose na obalu ili hrid. Ako je dovoljno plitko, **usidri se**. Zatim mirno traži kvar. Ako ti treba pomoć, javi se preko VHF radija porukom **PAN PAN** (žurnost). Ako su ljudi u neposrednoj životnoj opasnosti, to je **MAYDAY**.",
			},
			{
				type: "remember",
				level: "B",
				title: "Rezervni dijelovi i alat",
				items: [
					"Benzinski: svjećice, osigurač vijka (štift) i alat.",
					"Dizel: rasprskači, filteri zraka, ulja i goriva i alat.",
				],
			},
			{
				type: "warning",
				level: "B",
				markdown:
					"**Požar u prostoru motora:** ugasi motor, zatvori dovod goriva i otvore (manje zraka, manje vatre), pa gasi aparatom na **CO₂ ili prah**. Gorivo koje gori **nikad ne gasi vodom**, voda ga raznosi i širi vatru.",
			},
			{ type: "check", level: "B", questionId: "motoristika-019" },
			{ type: "check", level: "B", questionId: "motoristika-022" },
		],
		cheatSheet: [
			"Znakovi kvara: pad tlaka ulja, napona ili okretaja, rast temperature, nema mlaza.",
			"Pregrijavanje: smanji gas, prati temperaturu, provjeri usis morske vode.",
			"Pad tlaka ulja: odmah ugasi motor.",
			"Motor stao: ne daj da te nosi na obalu, sidri, po potrebi PAN PAN.",
			"Gorivo koje gori ne gasi se vodom.",
		],
		source: "original",
	},
	{
		slug: "akumulator-i-instalacije",
		area: "motoristika",
		order: 5,
		title: "Akumulator i brodske instalacije",
		summary:
			"Vrste akumulatora, serijski i paralelni spoj, održavanje i opasnosti, te koje instalacije brodica ima.",
		level: "B",
		minutes: 6,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"Akumulator daje samo **istosmjernu struju**. Na brodici pali motor i napaja VHF radio, svjetla i ostale uređaje. Ćelija ima napon **2 V**: šest ćelija daje **12 V**, dvanaest ćelija **24 V**.",
			},
			{
				type: "table",
				level: "B",
				caption: "Vrste akumulatora",
				columns: ["Vrsta", "Elektrolit", "Održavanje"],
				rows: [
					[
						"Olovni (najčešći)",
						"Razrijeđena sumporna kiselina",
						"Provjera razine elektrolita, dolijevanje destilirane vode",
					],
					[
						"Čelični (skuplji)",
						"Razrijeđena kalijeva lužina",
						"Slično olovnom",
					],
					[
						"Suhi zatvoreni i gel",
						"Vezan, ne može iscuriti",
						"Samo čisti spojevi",
					],
				],
			},
			{
				type: "table",
				level: "B",
				caption: "Primjer: dva akumulatora od 12 V i 100 Ah",
				columns: ["Spoj", "Što se zbraja", "Rezultat"],
				rows: [
					["Serijski (plus na minus)", "Napon", "24 V, 100 Ah"],
					[
						"Paralelni (plus na plus, minus na minus)",
						"Kapacitet i struja",
						"12 V, 200 Ah",
					],
				],
			},
			{
				type: "remember",
				level: "B",
				title: "Održavanje",
				items: [
					"Elektrolit mora biti oko 1 cm iznad ploča. Ako padne, dolij destiliranu vodu.",
					"Spojeve (kleme) drži čistima i premaži ih zaštitnom mašću.",
					"Akumulator čvrsto učvrsti da se ne pomiče na valovima.",
				],
			},
			{
				type: "warning",
				level: "B",
				markdown:
					"Olovni akumulator pri punjenju ispušta **eksplozivni plin** (vodik). Drži ga u prozračenom prostoru, bez iskre i plamena. Elektrolit nagriza kožu, odjeću i trup. Pri skidanju prvo odspoji **minus**, a pri spajanju ga spoji zadnjeg, tako da ključem ne napraviš kratki spoj.",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"**Brodske instalacije** su sve cijevi i vodovi na brodici:\n\n- električni vodovi\n- dovod goriva\n- uljni vodovi (npr. hidraulika upravljanja)\n- rashladna voda motora\n- pitka i sanitarna voda\n- cjevovodi otpadnih (crnih) tankova i kaljuže\n\nPod u prostoru motora treba biti od protukliznog lima. Svaku mrlju ulja ili goriva odmah obriši.",
			},
			{ type: "check", level: "B", questionId: "motoristika-025" },
			{ type: "check", level: "B", questionId: "motoristika-027" },
		],
		cheatSheet: [
			"Akumulator daje istosmjernu struju; ćelija 2 V, 6 ćelija 12 V.",
			"Serijski spoj zbraja napon, paralelni kapacitet (struju).",
			"Elektrolit oko 1 cm iznad ploča, dolijeva se destilirana voda.",
			"Punjenje stvara eksplozivni plin: prozračivanje, bez iskri.",
		],
		source: "original",
	},
	{
		slug: "tocenje-goriva",
		area: "motoristika",
		order: 6,
		title: "Sigurno točenje goriva",
		summary:
			"Redoslijed radnji na benzinskoj postaji za brodice i što napraviti s prolivenim gorivom.",
		level: "B",
		minutes: 5,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"Točenje goriva je jedan od najopasnijih trenutaka na brodici: pare goriva, statički elektricitet i jedna iskra mogu izazvati požar ili eksploziju. Zato postoji jasan redoslijed.",
			},
			{
				type: "example",
				level: "B",
				title: "Redoslijed na postaji",
				markdown:
					"1. Pristani i **čvrsto veži** brodicu.\n2. **Ugasi motor** i sve uređaje koji mogu iskriti.\n3. **Iskrcaj putnike**, na brodici ostaje samo posada.\n4. **Zabrana pušenja** i otvorenog plamena.\n5. **Aparat za gašenje** stavi u pripravu.\n6. **Zatvori otvore** na palubi da pare ne uđu u unutrašnjost.\n7. Odvedi **statički elektricitet** (kliješta za uzemljenje ili pištolj stalno u dodiru s grlom spremnika).\n8. Toči. Voditelj je cijelo vrijeme **uz mjesto točenja**.\n9. Nakon točenja **provjetri** prostor motora i spremnika ventilatorom.\n10. Tek onda **upali motor** i **ukrcaj putnike**.",
			},
			{
				type: "warning",
				level: "B",
				markdown:
					"Proliveno gorivo **nikad ne ispiri vodom** u more. Pobriši ga suhom krpom ili upijačem (npr. piljevinom) i odloži na za to označeno mjesto.",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"Uvijek isplovi s **dovoljno goriva i rezervom**, u spremniku odobrenog tipa. Praktično pravilo mnogih nautičara: trećina goriva za put tamo, trećina za povratak i trećina u rezervi.",
			},
			{
				type: "remember",
				level: "B",
				items: [
					"Putnici izlaze prije točenja i ulaze tek kad je motor upaljen nakon provjetravanja.",
					"Motor ugašen, nema pušenja, aparat spreman, otvori zatvoreni.",
					"Voditelj je uvijek uz mjesto točenja.",
					"Proliveno gorivo se briše, ne ispire.",
				],
			},
			{ type: "check", level: "B", questionId: "motoristika-029" },
			{ type: "check", level: "B", questionId: "motoristika-031" },
		],
		cheatSheet: [
			"Veži, ugasi motor, iskrcaj putnike, nema pušenja, aparat spreman, zatvori otvore.",
			"Statički elektricitet odvedi prije i tijekom točenja.",
			"Nakon točenja provjetri, pa pali motor, pa ukrcaj putnike.",
			"Proliveno gorivo: suha krpa ili upijač, nikad voda.",
		],
		source: "original",
	},
	{
		slug: "zastita-mora",
		area: "motoristika",
		order: 7,
		title: "Zaštita mora od onečišćenja",
		summary:
			"Što smije, a što ne smije u more, kamo s uljem, smećem i otpadnim vodama i kako reagirati na izljev.",
		level: "B",
		minutes: 6,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					'Pravila o onečišćenju s plovila dolaze iz međunarodne konvencije **MARPOL** i naših propisa. Osnovno pravilo je jednostavno: **ulje, gorivo i smeće ne idu u more**. "Ulje" je zajednički naziv za naftu i sve njezine derivate, dakle i gorivo.',
			},
			{
				type: "table",
				level: "B",
				caption: "Kamo s otpadom",
				columns: ["Otpad", "Što s njim"],
				rows: [
					[
						"Otpadno ulje, filteri",
						"U posudu za otpadno ulje, predaj na obali",
					],
					[
						"Zauljena voda iz kaljuže",
						"Ne pumpaj u more; upij ulje upijačem, predaj u luci",
					],
					[
						"Otpadne (crne) vode",
						"Skupljaju se u tanku i prazne na uređaju u luci ili marini",
					],
					["Smeće, plastika, staklo", "U vreću ili kantu, odloži na obali"],
				],
			},
			{
				type: "remember",
				level: "B",
				items: [
					"Na brodici mora biti posuda za otpadno ulje.",
					"Zalihe ulja drži tako da ne mogu iscuriti u more ni kad se ambalaža ošteti.",
					"Plastika i staklo se u moru razgrađuju stotinama godina.",
					"Svako onečišćenje koje vidiš prijavi lučkoj kapetaniji.",
				],
			},
			{
				type: "warning",
				level: "B",
				markdown:
					"**Izljev ulja s tvoje brodice:** zaustavi izvor, ogradi mrlju (npr. konopom ili plutajućom branom) i pokupi što možeš upijačima. Odmah obavijesti najbližu **lučku kapetaniju** ili ispostavu (ili nazovi **195**). Slijedi prekršajni postupak, a kazne su visoke.",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"**Balastni tankovi** velikih brodova primaju morsku vodu u jednoj luci i ispuštaju je u drugoj. S tom vodom putuju i strane vrste organizama, zato se balastna voda smije mijenjati i ispuštati samo prema pravilima. Na brodici ti je važnije znati da **otpadni tankovi** imaju svoj ventil i da ga na moru ne otvaraš: sanitarne otpadne vode s brodice ne smiju u more.",
			},
			{
				type: "source-note",
				level: "B",
				markdown:
					'Za brodice vrijedi strože od "12 Nm": Pravilnik o brodicama (NN 13/20, 4.1.15 do 4.1.18) zabranjuje ispuštanje ulja, sanitarnih otpadnih voda i smeća u more na bilo kojoj udaljenosti. MARPOL Prilog V (Sredozemno more je posebno područje) dopušta samo usitnjeni otpad od hrane na 12 NM ili dalje.',
			},
			{ type: "check", level: "B", questionId: "motoristika-033" },
			{ type: "check", level: "B", questionId: "motoristika-035" },
		],
		cheatSheet: [
			"Ulje, gorivo i smeće ne idu u more (MARPOL).",
			"Posuda za otpadno ulje je obavezna.",
			"Otpadne vode u tank, prazne se u luci.",
			"Izljev: zaustavi, ogradi, upij, prijavi kapetaniji ili na 195.",
		],
		source: "original",
	},
];

export default lessons;
