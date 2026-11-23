import type { ILesson } from "@/content/types";

const lessons: ILesson[] = [
	{
		slug: "vjetrovi-jadrana",
		area: "meteorologija",
		order: 1,
		title: "Ruža vjetrova na Jadranu",
		summary: "Osam vjetrova, njihova imena i smjerovi iz kojih pušu.",
		level: "common",
		minutes: 5,
		blocks: [
			{
				type: "text",
				level: "common",
				markdown:
					"Na Jadranu svaki glavni smjer ima svoj vjetar s vlastitim imenom. Vjetar se uvijek imenuje po smjeru **iz kojeg dolazi**. Bura dolazi sa sjeveroistoka i puše prema jugozapadu.",
			},
			{
				type: "visual",
				level: "common",
				visual: "adriatic-winds",
				caption: "Dodirni vjetar na karti i pogledaj odakle puše i kakav je.",
				props: { mode: "explore" },
			},
			{
				type: "table",
				level: "common",
				caption: "Osam vjetrova",
				columns: ["Smjer", "Vjetar", "Druga imena"],
				rows: [
					["N (sjever)", "tramontana", ""],
					["NE (sjeveroistok)", "bura", ""],
					["E (istok)", "levanat", "levant"],
					["SE (jugoistok)", "jugo", "šilok, široko"],
					["S (jug)", "oštro", ""],
					["SW (jugozapad)", "lebić", "garbin"],
					["W (zapad)", "ponente", "pulenat"],
					["NW (sjeverozapad)", "maestral", ""],
				],
			},
			{
				type: "remember",
				level: "common",
				items: [
					"Vjetar se zove po smjeru iz kojeg puše.",
					"Bura NE, jugo SE, maestral NW.",
					"Lebić SW, oštro S, tramontana N.",
				],
			},
			{
				type: "check",
				level: "common",
				questionId: "meteorologija-004",
			},
			{
				type: "check",
				level: "common",
				questionId: "meteorologija-007",
			},
		],
		cheatSheet: [
			"Vjetar se imenuje po smjeru iz kojeg dolazi.",
			"N tramontana, NE bura, E levanat, SE jugo.",
			"S oštro, SW lebić, W ponente, NW maestral.",
		],
		source: "original",
	},
	{
		slug: "bura-i-jugo",
		area: "meteorologija",
		order: 2,
		title: "Bura i jugo",
		summary: "Dva najvažnija jadranska vjetra i kako ih prepoznati na vrijeme.",
		level: "common",
		minutes: 7,
		blocks: [
			{
				type: "text",
				level: "common",
				markdown:
					"**Bura** je hladan i suh vjetar s kopna. Spušta se s planina prema moru na jake udare (refule) i diže morsku prašinu. Može doći gotovo bez najave i u kratkom vremenu postati orkanska. Smatra se **najopasnijim vjetrom na Jadranu**.",
			},
			{
				type: "text",
				level: "common",
				markdown:
					"**Jugo** je topao i vlažan vjetar s mora. Puše ujednačeno, jača postupno i donosi oblake i kišu. Kako puše uzduž cijelog Jadrana, diže velike i duge valove, osobito na otvorenom moru i na jugu.",
			},
			{
				type: "visual",
				level: "common",
				visual: "adriatic-winds",
				caption: "Usporedi buru i jugo: smjer, znakovi i kamo se skloniti.",
				props: { compare: ["bura", "jugo"], show: "signs" },
			},
			{
				type: "table",
				level: "common",
				caption: "Kako ih prepoznati",
				columns: ["", "Bura", "Jugo"],
				rows: [
					["Smjer", "NE, s kopna", "SE, s mora"],
					["Zrak", "hladan, suh, proziran", "topao, vlažan, mutan"],
					["Tlak", "raste", "pada"],
					[
						"Nebo",
						"bijela kapa oblaka na primorskim planinama",
						"sumaglica na jugoistoku, sve više oblaka",
					],
					["More", "razina niža (oseka)", "razina viša (plima)"],
					["Kako dolazi", "naglo, na udare", "postupno, ujednačeno"],
				],
			},
			{
				type: "warning",
				level: "common",
				markdown:
					"Čim vidiš znakove bure, **odmah kreni u najbližu sigurnu luku ili uvalu**. Na jugo imaš više vremena, ali valovi rastu satima, pa ni tada ne čekaj do zadnjeg trenutka.",
			},
			{
				type: "remember",
				level: "common",
				items: [
					"Bura: hladna, suha, naglo i na udare.",
					"Kapa oblaka nad planinama: bura dolazi.",
					"Jugo: toplo, vlažno, postupno, valovi i kiša.",
					"Tlak pada i sumaglica na jugoistoku: jugo dolazi.",
				],
			},
			{
				type: "check",
				level: "common",
				questionId: "meteorologija-014",
			},
			{
				type: "check",
				level: "common",
				questionId: "meteorologija-015",
			},
		],
		cheatSheet: [
			"Bura je najopasnija: naglo, refuli, hladna i suha.",
			"Znakovi bure: kapa oblaka, suh zrak, tlak raste.",
			"Jugo: toplo i vlažno, jača postupno, veliki valovi.",
			"Znakovi juga: tlak pada, sumaglica na SE, više vlage.",
			"Vidiš znakove bure: odmah u zaklon.",
		],
		source: "original",
	},
	{
		slug: "maestral-nevera-i-ostali",
		area: "meteorologija",
		order: 3,
		title: "Maestral, nevera i ostali vjetrovi",
		summary:
			"Ljetni dnevni vjetar, iznenadne oluje i vjetrovi koje rjeđe spominjemo.",
		level: "common",
		minutes: 6,
		blocks: [
			{
				type: "text",
				level: "common",
				markdown:
					"**Maestral** je ugodan ljetni vjetar sa sjeverozapada. Danju se kopno zagrije brže od mora, pa zrak struji s mora prema obali. Maestral obično počinje prije podne, najjači je rano poslijepodne i slabi prema zalasku sunca. U uskim kanalima, na primjer Hvarskom i Pelješkom, zna biti dosta jak.",
			},
			{
				type: "visual",
				level: "common",
				visual: "adriatic-winds",
				caption:
					"Pomakni sat i pogledaj kako maestral jača i slabi tijekom dana.",
				props: { highlight: "maestral", show: "day-cycle" },
			},
			{
				type: "text",
				level: "common",
				markdown:
					"Redoviti maestral znak je **stabilnog lijepog vremena**. Noću ga zamijeni slabi **burin** s kopna, jer se kopno noću ohladi brže od mora.",
			},
			{
				type: "warning",
				level: "common",
				markdown:
					"**Nevera** je kratka i jaka ljetna oluja. Dolazi naglo, obično sa zapadne strane (od NW do SW), uz grmljavinu, pljusak i jake udare vjetra. Teško ju je točno predvidjeti. Kad vidiš visoke tamne oblake na zapadu ili čuješ grmljavinu, kreni u najbližu luku ili uvalu.",
			},
			{
				type: "table",
				level: "common",
				caption: "Ostali vjetrovi",
				columns: ["Vjetar", "Što trebaš znati"],
				rows: [
					["Tramontana (N)", "hladan vjetar sa sjevera, sličan buri"],
					[
						"Levanat (E)",
						"istočnjak; često ima obilježja bure, uz ciklonu može donijeti kišu, a ponekad je topao vjetar lijepog vremena",
					],
					["Oštro (S)", "topao i vlažan vjetar s juga, sličan jugu"],
					[
						"Lebić (SW)",
						"s otvorenog mora; nemirne su luke i uvale otvorene prema jugozapadu",
					],
					[
						"Ponente (W)",
						"rijedak zapadni vjetar kod nas; dolazi brzo, kratko traje i može biti opasan",
					],
				],
			},
			{
				type: "remember",
				level: "common",
				items: [
					"Maestral: ljeti danju, s mora, znak lijepog vremena.",
					"Burin: slab noćni vjetar s kopna.",
					"Nevera: naglo, kratko, jako, sa zapada.",
				],
			},
			{
				type: "check",
				level: "common",
				questionId: "meteorologija-018",
			},
			{
				type: "check",
				level: "common",
				questionId: "meteorologija-021",
			},
		],
		cheatSheet: [
			"Maestral NW: ljeti danju, najjači rano poslijepodne.",
			"Redoviti maestral znači stabilno vrijeme.",
			"Nevera: kratka jaka oluja sa zapada, odmah u zaklon.",
			"Lebić SW: opasan za luke otvorene prema jugozapadu.",
		],
		source: "original",
	},
	{
		slug: "elementi-vremena",
		area: "meteorologija",
		order: 4,
		title: "Elementi vremena i instrumenti",
		summary: "Temperatura, tlak, vlaga, vidljivost i čime ih mjerimo.",
		level: "B",
		minutes: 5,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"**Vrijeme** je trenutno stanje atmosfere iznad nekog mjesta. Opisujemo ga elementima vremena: temperatura, tlak, vlažnost, vidljivost, oblačnost, oborine, vjetar i stanje mora. Najvažniji su prva tri, jer iz njihovih promjena nastaje sve ostalo.\n\nVrijeme se događa u **troposferi**, najnižem sloju atmosfere, debelom desetak kilometara.",
			},
			{
				type: "table",
				level: "B",
				caption: "Što čime mjerimo",
				columns: ["Element", "Instrument", "Jedinica"],
				rows: [
					["Temperatura zraka", "termometar", "°C"],
					["Tlak zraka", "barometar (aneroid)", "hPa"],
					["Vlažnost", "higrometar", "% (relativna vlaga)"],
					["Brzina vjetra", "anemometar", "čvorovi, m/s ili Bofori"],
					["Vidljivost", "procjena okom", "km, u magli m"],
				],
			},
			{
				type: "text",
				level: "B",
				markdown:
					"Vidljivost ispod 1 km je **magla**, a od 1 do 10 km **sumaglica**.",
			},
			{
				type: "source-note",
				level: "B",
				markdown:
					"Jedan stari materijal kaže da vlaga pada kad pada temperatura. Za relativnu vlagu vrijedi obrnuto: kad se zrak hladi, a pare je isto, **relativna vlaga raste**. Zato se noću stvaraju rosa i magla.",
			},
			{
				type: "remember",
				level: "B",
				items: [
					"Barometar mjeri tlak u hPa.",
					"Higrometar mjeri vlagu u postocima.",
					"Ispod 1 km magla, 1 do 10 km sumaglica.",
				],
			},
			{
				type: "check",
				level: "B",
				questionId: "meteorologija-026",
			},
		],
		cheatSheet: [
			"Najvažniji elementi: temperatura, tlak, vlaga.",
			"Barometar hPa, higrometar %, termometar °C, anemometar vjetar.",
			"Magla ispod 1 km, sumaglica 1 do 10 km.",
		],
		source: "original",
	},
	{
		slug: "tlak-ciklone-anticiklone",
		area: "meteorologija",
		order: 5,
		title: "Tlak, ciklone i anticiklone",
		summary: "Zašto puše vjetar i što barometar govori o vremenu.",
		level: "B",
		minutes: 5,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"**Vjetar** je strujanje zraka iz područja višeg prema području nižeg tlaka. Razlike u tlaku nastaju jer se kopno brzo grije i brzo hladi, a more sporo. Bez razlike u tlaku nema ni vjetra.",
			},
			{
				type: "table",
				level: "B",
				caption: "Dva sustava tlaka",
				columns: ["", "Anticiklona", "Ciklona"],
				rows: [
					["Tlak", "visok", "nizak"],
					["Vrijeme", "uglavnom lijepo", "oblaci, kiša, vjetar"],
					[
						"Kruženje (sjeverna polutka)",
						"u smjeru kazaljke na satu",
						"suprotno od kazaljke",
					],
					["Barometar kad se približava", "raste", "pada"],
				],
			},
			{
				type: "text",
				level: "B",
				markdown:
					"Kruženje dolazi od Zemljine vrtnje (Coriolisova sila). Na brodu je najkorisnije pratiti **kako se tlak mijenja**, a ne koliki je. Bilježi barometar svakih nekoliko sati.",
			},
			{
				type: "warning",
				level: "B",
				markdown:
					"Nagli pad tlaka u kratkom vremenu najavljuje pogoršanje i jak vjetar. Što brže pada, to je bliže i jače.",
			},
			{
				type: "remember",
				level: "B",
				items: [
					"Vjetar ide iz visokog u niski tlak.",
					"Anticiklona lijepo, ciklona ružno vrijeme.",
					"Ciklona se na sjevernoj polutci vrti suprotno od kazaljke.",
					"Nagli pad tlaka: nevrijeme.",
				],
			},
			{
				type: "check",
				level: "B",
				questionId: "meteorologija-028",
			},
			{
				type: "check",
				level: "B",
				questionId: "meteorologija-029",
			},
		],
		cheatSheet: [
			"Vjetar struji iz višeg u niži tlak.",
			"Anticiklona: visok tlak, lijepo vrijeme.",
			"Ciklona: nizak tlak, ružno vrijeme, kruži suprotno od kazaljke.",
			"Prati promjenu tlaka; nagli pad znači nevrijeme.",
		],
		source: "original",
	},
	{
		slug: "oblaci-magla-oborine",
		area: "meteorologija",
		order: 6,
		title: "Oblaci, magla i oborine",
		summary: "Vrste oblaka, olujni oblak i zašto magla smeta plovidbi.",
		level: "B",
		minutes: 4,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"**Oblak** je vidljivi skup sitnih kapljica ili kristalića leda u zraku. Osnovni oblici su **cirus** (tanki, visoki, kao pramenovi), **stratus** (siv sloj preko neba), **kumulus** (bijele nakupine poput vate) i **kumulonimbus** (visoki olujni oblak).",
			},
			{
				type: "table",
				level: "B",
				caption: "Visine oblaka",
				columns: ["Razina", "Visina"],
				rows: [
					["Niski", "do oko 2 km"],
					["Srednji", "od 2 do 6 km"],
					["Visoki", "iznad 6 km"],
				],
			},
			{
				type: "warning",
				level: "B",
				markdown:
					"**Kumulonimbus** raste visoko, taman je pri dnu i često ima vrh u obliku nakovnja. Donosi grmljavinu, pljusak, ponekad tuču i jake udare vjetra. To je oblak nevere.",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"**Magla** je oblak pri samoj površini mora. Smanjuje vidljivost i otežava navigaciju. **Oborine** (kiša, rosulja, snijeg, tuča) također smanjuju vidljivost. Tada pališ svjetla, usporavaš i daješ signale za maglu.",
			},
			{
				type: "remember",
				level: "B",
				items: [
					"Kumulonimbus: grmljavina i nevera.",
					"Niski oblaci do 2 km, srednji 2 do 6, visoki iznad 6.",
					"Magla i oborine: svjetla, manja brzina, signali.",
				],
			},
			{
				type: "check",
				level: "B",
				questionId: "meteorologija-030",
			},
		],
		cheatSheet: [
			"Oblici: cirus, stratus, kumulus, kumulonimbus.",
			"Kumulonimbus donosi grmljavinu i neveru.",
			"Niski do 2 km, srednji 2 do 6 km, visoki iznad 6 km.",
		],
		source: "original",
	},
	{
		slug: "beaufort-i-valovi",
		area: "meteorologija",
		order: 7,
		title: "Beaufortova ljestvica i valovi",
		summary: "Kako se izražava snaga vjetra i kako opisujemo valove.",
		level: "B",
		minutes: 6,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"Snaga vjetra izražava se u **čvorovima** ili u stupnjevima **Beaufortove ljestvice** (Bofori), od 0 do 12. Prognoze za Jadran često koriste Bofore, pa moraš znati što koji stupanj znači.",
			},
			{
				type: "visual",
				level: "B",
				visual: "beaufort-scale",
				caption: "Pomiči klizač i gledaj kako se mijenja more.",
				props: { mode: "explore" },
			},
			{
				type: "table",
				level: "B",
				caption: "Beaufortova ljestvica",
				columns: ["Bf", "Naziv", "Čvorovi"],
				rows: [
					["0", "tišina", "manje od 1"],
					["1", "lahor", "1 do 3"],
					["2", "povjetarac", "4 do 6"],
					["3", "slab vjetar", "7 do 10"],
					["4", "umjeren vjetar", "11 do 16"],
					["5", "umjereno jak vjetar", "17 do 21"],
					["6", "jak vjetar", "22 do 27"],
					["7", "žestoki vjetar", "28 do 33"],
					["8", "olujni vjetar", "34 do 40"],
					["9", "jak olujni vjetar", "41 do 47"],
					["10", "orkanski vjetar", "48 do 55"],
					["11", "jaki orkanski vjetar", "56 do 63"],
					["12", "orkan", "64 i više"],
				],
			},
			{
				type: "text",
				level: "B",
				markdown:
					"Val opisuješ trima mjerama: **visina** je okomit razmak od dola do brijega, **dužina** je vodoravan razmak između dva brijega, a **period** je vrijeme između dva brijega koji prođu istu točku.\n\n**Živo more** stvara vjetar koji upravo puše. **Mrtvo more** su dugi, zaobljeni valovi bez vjetra: ostatak nevremena ili najava nevremena iz daljine.",
			},
			{
				type: "warning",
				level: "B",
				markdown:
					"Već oko 4 Bofora na moru se pojavljuju bijele kreste i mala otvorena brodica postaje mokra i nestabilna. Ako nisi iskusan, prije isplovljenja provjeri prognozu i ne isplovljavaj kad se najavljuje jak vjetar.",
			},
			{
				type: "remember",
				level: "B",
				items: [
					"Ljestvica ima stupnjeve od 0 do 12.",
					"Svaki stupanj je raspon brzina, nije jedan broj.",
					"Živo more od vjetra, mrtvo more bez vjetra.",
				],
			},
			{
				type: "check",
				level: "B",
				questionId: "meteorologija-033",
			},
			{
				type: "check",
				level: "B",
				questionId: "meteorologija-034",
			},
		],
		cheatSheet: [
			"Beaufort 0 do 12; 6 Bf je 22 do 27 čvorova.",
			"Visina, dužina i period opisuju val.",
			"Živo more stvara vjetar, mrtvo more ostaje bez vjetra.",
		],
		source: "original",
	},
	{
		slug: "struje-plima-oseka",
		area: "meteorologija",
		order: 8,
		title: "Morske struje, plima i oseka",
		summary: "Kako teče jadranska struja i zašto je plima kod nas mala.",
		level: "B",
		minutes: 4,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"**Jadranska struja** dio je sredozemne. Ulazi kroz Otrantska vrata, ide uz istočnu obalu (Albanija, Crna Gora, Hrvatska) prema sjeverozapadu, a vraća se uz talijansku obalu. Kruži **suprotno od kazaljke na satu**. Obično je slaba, a jača u kanalima i tjesnacima.",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"**Plima** je periodično dizanje, a **oseka** spuštanje razine mora. Uzrok je privlačenje Mjeseca i Sunca, a Mjesec djeluje jače. Na Jadranu su obično dvije plime i dvije oseke dnevno.\n\nRazlika razine kod nas je mala, do otprilike jednog metra, veća na sjeveru. Na nekim oceanima doseže i više od 10 metara.",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"Na razinu mora utječu i **tlak i vjetar**. Uz jugo i nizak tlak more je više, a uz buru i visok tlak niže.",
			},
			{
				type: "remember",
				level: "B",
				items: [
					"Struja ulazi uz našu obalu prema sjeverozapadu, izlazi uz talijansku.",
					"Plima i oseka na Jadranu su male.",
					"Jugo diže, bura spušta razinu mora.",
				],
			},
			{
				type: "check",
				level: "B",
				questionId: "meteorologija-037",
			},
		],
		cheatSheet: [
			"Jadranska struja kruži suprotno od kazaljke na satu.",
			"Plima i oseka nastaju od privlačenja Mjeseca i Sunca.",
			"Na Jadranu razlika do otprilike 1 m.",
		],
		source: "original",
	},
	{
		slug: "prognoza-i-upozorenja",
		area: "meteorologija",
		order: 9,
		title: "Vremenska prognoza i upozorenja",
		summary: "Tko izrađuje pomorsku prognozu i gdje je čuješ na moru.",
		level: "B",
		minutes: 5,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"Pomorsku prognozu za Jadran izrađuje **Državni hidrometeorološki zavod (DHMZ), Pomorski meteorološki centar u Splitu**, nekoliko puta dnevno. Prognoza ima i upozorenja na jak vjetar i nevrijeme.\n\nPrije isplovljenja prognozu nađeš na oglasnoj ploči lučke kapetanije ili na internetu (meteo.hr). Na moru je slušaš preko obalnih radiopostaja na VHF-u, na hrvatskom i engleskom.",
			},
			{
				type: "table",
				level: "B",
				caption:
					"Redovite objave obalnih radiopostaja (vrijeme UTC, prema plovput.hr)",
				columns: ["Postaja", "VHF kanali", "Termini (UTC)"],
				rows: [
					[
						"Rijeka radio",
						"04, 19, 20, 23, 24, 81, 85",
						"05:30, 12:30, 19:30, 00:30",
					],
					[
						"Split radio",
						"07, 21, 23, 28, 81, 84",
						"05:45, 12:45, 19:45, 00:45",
					],
					["Dubrovnik radio", "04, 07, 28, 85", "06:20, 13:20, 20:20, 01:20"],
				],
			},
			{
				type: "text",
				level: "B",
				markdown:
					"Vrijeme je u **UTC**. Ljeti je naše vrijeme UTC plus 2 sata, a zimi UTC plus 1 sat. Kanali i termini mogu se promijeniti, pa ih provjeri na plovput.hr ili u publikaciji o radio-službi prije plovidbe.",
			},
			{
				type: "source-note",
				level: "B",
				markdown:
					"Stariji materijali navode druge termine (na primjer Rijeka u 05:35 i 14:35, Dubrovnik u 06:25). Ovdje su termini s Plovputove stranice, izraženi u UTC.",
			},
			{
				type: "remember",
				level: "B",
				items: [
					"Prognozu izrađuje DHMZ, Pomorski meteorološki centar Split.",
					"Na moru: obalne radiopostaje na VHF-u, hrvatski i engleski.",
					"Termini su u UTC; provjeri ih prije plovidbe.",
				],
			},
			{
				type: "check",
				level: "B",
				questionId: "meteorologija-038",
			},
			{
				type: "check",
				level: "B",
				questionId: "meteorologija-039",
			},
		],
		cheatSheet: [
			"Pomorska prognoza: DHMZ, PMC Split.",
			"Prije isplovljenja: lučka kapetanija ili meteo.hr.",
			"Na moru: Rijeka, Split i Dubrovnik radio na VHF-u.",
			"Termini su u UTC.",
		],
		source: "original",
	},
];

export default lessons;
