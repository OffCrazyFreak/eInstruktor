import type { ILesson } from "@/content/types";

const lessons: ILesson[] = [
	{
		slug: "oprema-brodice",
		area: "sigurnost-prva-pomoc",
		order: 1,
		title: "Obavezna oprema brodice",
		summary:
			"Što brodica za osobne potrebe mora imati i kako se popis mijenja s udaljenošću od obale.",
		level: "B",
		minutes: 6,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"Opremu propisuje Pravilnik o brodicama, čamcima i jahtama, a koliko čega treba ovisi o **namjeni** brodice i **području plovidbe**. Što dalje ploviš od obale, to je popis dulji.\n\nOprema se dijeli na opremu trupa (sidro, konopi, bitve), strojnog uređaja, protupožarnu opremu, sredstva za spašavanje, sredstva za signalizaciju i navigaciju, i opremu protiv onečišćenja.",
			},
			{
				type: "table",
				level: "B",
				caption: "Izbor iz popisa za brodicu za osobne potrebe",
				columns: ["Oprema", "Gdje se traži"],
				rows: [
					["Sidro sa sidrenim užetom ili lancem", "sva područja"],
					["3 užeta za vez (najmanje 5 m) i uže za tegalj", "sva područja"],
					["Vodootporna svjetiljka, šibice ili upaljač", "sva područja"],
					["Prsluk za svaku osobu", "IV do III"],
					["Kutija prve pomoći", "IIIc do III"],
					["Sredstvo za zvučno oglašavanje", "od IIIb dalje"],
					["Kolut za spašavanje", "od III dalje"],
					["GNSS, kompas, dalekozor, ažurirane karte", "od III dalje"],
					["Rakete s padobranom, ručne buktinje, dimni signal", "II i I"],
				],
			},
			{
				type: "text",
				level: "B",
				markdown:
					"Brodica s ugrađenim motorom mora imati i **posudu za otpadno ulje** i sredstvo za upijanje ulja. Svaka brodica treba **posudu za smeće**.\n\n**Skuter:** sigurnosna narukvica (prekidač motora na užetu oko ruke), a svi na njemu nose **prsluk i kacigu**. Otvorene brodice i gumenjaci brži od **20 čvorova** također moraju imati sigurnosnu narukvicu, i voditelj je mora nositi pričvršćenu na sebe.",
			},
			{
				type: "warning",
				level: "B",
				markdown:
					"Ovo je izbor najvažnijeg. Točan popis za tvoju brodicu ovisi o njenoj vrsti, motoru i području, pa ga provjeri u Pravilniku ili kod lučke kapetanije. Vatrogasni aparat obrađujemo u lekciji o požaru.",
			},
			{
				type: "source-note",
				level: "B",
				markdown:
					"Stara skripta s pitanjima i odgovorima kaže da kutija prve pomoći ne treba u IV i IIIc i da zvučno sredstvo treba u IIIa i IIIb. Tablica u Pravilniku (NN 13/20) traži kutiju prve pomoći od IIIc do III, a zvučno sredstvo od IIIb dalje.",
			},
			{
				type: "remember",
				level: "B",
				title: "Zapamti",
				items: [
					"Prsluk za svaku osobu na brodici.",
					"Svjetiljka, sidro i konopi trebaju svugdje.",
					"Što dalje od obale, to više opreme: kolut i navigacija od III, rakete tek u II i I.",
					"Skuter i brze otvorene brodice: sigurnosna narukvica.",
				],
			},
			{ type: "check", level: "B", questionId: "sigurnost-prva-pomoc-001" },
			{ type: "check", level: "B", questionId: "sigurnost-prva-pomoc-004" },
		],
		cheatSheet: [
			"Oprema ovisi o namjeni i području plovidbe.",
			"Svugdje: sidro, 3 užeta za vez, uže za tegalj, svjetiljka, šibice.",
			"Prsluk za svaku osobu; kutija prve pomoći od IIIc.",
			"Od III: kolut, GNSS, kompas, dalekozor, karte.",
			"Skuter: narukvica, prsluk i kaciga.",
		],
		source: "original",
	},
	{
		slug: "sredstva-za-spasavanje",
		area: "sigurnost-prva-pomoc",
		order: 2,
		title: "Sredstva za spašavanje",
		summary:
			"Prsluk, kolut, splav: što je osobno, što zajedničko i kako se koristi.",
		level: "B",
		minutes: 4,
		blocks: [
			{
				type: "table",
				level: "B",
				caption: "Dvije skupine sredstava",
				columns: ["Osobna", "Zajednička"],
				rows: [
					["prsluk za spašavanje", "brodica (čamac) za spašavanje"],
					[
						"kolut ili pojas za spašavanje",
						"splav za spašavanje (kruta ili na napuhavanje)",
					],
					["odijelo za spašavanje", "spasilačka brodica"],
					[
						"termozaštitna sredstva (protiv hlađenja)",
						"brza spasilačka brodica",
					],
				],
			},
			{
				type: "text",
				level: "B",
				markdown:
					"**Prsluk** mora biti odobrenog tipa i odgovarati veličini osobe, i za djecu. Prsluk na napuhavanje puni se **povlačenjem ručice** koja otvori bočicu s plinom (CO2). Mnogi se pune i sami kad uđu u vodu. Ako izgubi zrak, dopuni ga puhanjem kroz cjevčicu.\n\nU područjima II i I prsluk mora imati **zviždaljku i svjetlo** koje se samo upali. Isto vrijedi za brodice brže od 20 čvorova koje plove noću.",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"**Kolut** baciš osobi u moru, tako da padne blizu nje, a ne na nju. Ako je na užetu, drži slobodni kraj.\n\nKoliko sredstava mora biti na brodici određuje lučka kapetanija, a za jahte Hrvatski registar brodova.",
			},
			{
				type: "remember",
				level: "B",
				title: "Zapamti",
				items: [
					"Osobna: prsluk, kolut, odijelo, termozaštita.",
					"Zajednička: čamac, splav, spasilačka brodica.",
					"Prsluk na napuhavanje: povuci ručicu, dopuni puhanjem.",
				],
			},
			{ type: "check", level: "B", questionId: "sigurnost-prva-pomoc-007" },
			{ type: "check", level: "B", questionId: "sigurnost-prva-pomoc-008" },
		],
		cheatSheet: [
			"Osobna sredstva: prsluk, kolut, odijelo, termozaštita.",
			"Zajednička: čamac i splav za spašavanje.",
			"Prsluk odobrenog tipa, prave veličine.",
			"II i I: prsluk sa zviždaljkom i svjetlom.",
		],
		source: "original",
	},
	{
		slug: "signali-pogibelji",
		area: "sigurnost-prva-pomoc",
		order: 3,
		title: "Signali pogibelji",
		summary:
			"Kako svijetu javiti da si u nevolji: radio, svjetlo, dim, zvuk i ruke.",
		level: "common",
		minutes: 5,
		blocks: [
			{
				type: "text",
				level: "common",
				markdown:
					"Signal pogibelji daješ kad su **ljudski životi u ozbiljnoj opasnosti**: brodica tone, gori, nasukala se, netko je pao u more. Signale prepoznaje svatko na moru, i svatko tko ih vidi ili čuje mora pomoći ili javiti dalje.",
			},
			{
				type: "table",
				level: "common",
				caption: "Međunarodni signali pogibelji",
				columns: ["Vrsta", "Signal"],
				rows: [
					["Radio", "MAYDAY izgovoren tri puta na VHF kanalu 16"],
					["Vizualni", "crvena raketa s padobranom, crvena ručna buktinja"],
					["Vizualni", "narančasti dim iz dimne kutije"],
					["Vizualni", "polagano dizanje i spuštanje raširenih ruku"],
					["Vizualni", "vatra na brodici koja daje gusti dim"],
					["Svjetlo ili zvuk", "SOS: tri kratka, tri duga, tri kratka"],
					["Zvuk", "neprekidno trubljenje bilo kojim zvučnim uređajem"],
					["Zvuk", "pucnji u razmaku od otprilike jedne minute"],
				],
			},
			{
				type: "visual",
				level: "common",
				visual: "sound-signal-player",
				caption: "Poslušaj SOS: tri kratka, tri duga, tri kratka.",
				props: { pattern: "sos" },
			},
			{
				type: "warning",
				level: "common",
				markdown:
					"Za vatru nikad ne koristi benzin, jer eksplodira. Signale pogibelji ne daj iz šale ni za provjeru: lažna uzbuna pokreće spašavanje i kažnjava se.",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"Na brodici s VHF postajom koja ima **DSC** pogibelj javljaš i crvenom tipkom **DISTRESS**: uređaj automatski šalje poziv na kanalu 70, s tvojom pozicijom. Zatim govorom daješ MAYDAY na kanalu 16. Više o tome u lekcijama o VHF-u.",
			},
			{
				type: "source-note",
				level: "common",
				markdown:
					'Stara skripta s pitanjima i odgovorima među signale pogibelji ubraja i "prekrižena vesla". Toga nema na međunarodnom popisu signala pogibelji (COLREG, Dodatak IV), pa ga na ispitu ne navodi kao službeni signal.',
			},
			{
				type: "remember",
				level: "common",
				title: "Zapamti",
				items: [
					"MAYDAY tri puta na kanalu 16.",
					"Crvena raketa ili buktinja, narančasti dim.",
					"SOS: tri kratka, tri duga, tri kratka (... --- ...).",
					"Dizanje i spuštanje raširenih ruku, neprekidan zvuk.",
				],
			},
			{
				type: "check",
				level: "common",
				questionId: "sigurnost-prva-pomoc-011",
			},
			{
				type: "check",
				level: "common",
				questionId: "sigurnost-prva-pomoc-014",
			},
		],
		cheatSheet: [
			"Radio: MAYDAY ×3 na kanalu 16; DSC tipka DISTRESS.",
			"Vizualno: crvena raketa ili buktinja, narančasti dim, ruke gore-dolje.",
			"SOS svjetlom ili zvukom: tri kratka, tri duga, tri kratka.",
			"Zvuk: neprekidno trubljenje, pucnji svake minute.",
			"Vatra za signal: nikad benzin.",
		],
		source: "original",
	},
	{
		slug: "sar-sluzba",
		area: "sigurnost-prva-pomoc",
		order: 4,
		title: "Traganje i spašavanje (SAR, MRCC)",
		summary: "Tko u Hrvatskoj vodi spašavanje na moru i kako ga pozvati.",
		level: "B",
		minutes: 4,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"**SAR** (Search and Rescue) je služba traganja i spašavanja na moru. U Hrvatskoj je organizirana ovako:\n\n- **Stožer** službe sa sjedištem u Zagrebu;\n- **MRCC Rijeka**, nacionalna središnjica koja vodi i usklađuje sve akcije;\n- **pod-središnjice**: osam lučkih kapetanija (Pula, Rijeka, Senj, Zadar, Šibenik, Split, Ploče, Dubrovnik);\n- **obalne promatračke jedinice**: ispostave kapetanija;\n- **jedinice** za spašavanje: pomorske, zračne i kopnene.",
			},
			{
				type: "remember",
				level: "B",
				title: "Kako pozvati pomoć",
				items: [
					"Telefon MRCC Rijeka: 195",
					"Opći broj za hitne slučajeve: 112",
					"VHF kanal 16, ili DSC poziv na kanalu 70",
				],
			},
			{
				type: "text",
				level: "B",
				markdown:
					"MRCC usklađuje potragu, poziva u pomoć jedinice i plovila u blizini i surađuje sa službama susjednih država.\n\nTvoja obveza: svaku opasnost za plovidbu (npr. plutajući kontejner) i svako **onečišćenje mora** javi što prije, s **točnom pozicijom**, i pričekaj upute.",
			},
			{
				type: "source-note",
				level: "B",
				markdown:
					"Stara skripta s pitanjima i odgovorima navodi broj **9155**. To je stari broj. Danas MRCC Rijeka zoveš na **195**, a uz to rade 112 i VHF kanal 16.",
			},
			{ type: "check", level: "B", questionId: "sigurnost-prva-pomoc-018" },
			{ type: "check", level: "B", questionId: "sigurnost-prva-pomoc-020" },
		],
		cheatSheet: [
			"MRCC Rijeka vodi traganje i spašavanje na moru.",
			"Telefon 195, uz to 112 i VHF kanal 16.",
			"Pod-središnjice: osam lučkih kapetanija.",
			"Opasnost i onečišćenje javi s točnom pozicijom.",
		],
		source: "original",
	},
	{
		slug: "pozar",
		area: "sigurnost-prva-pomoc",
		order: 5,
		title: "Požar na brodici",
		summary:
			"Čime gasiti, kako pravilno koristiti aparat i kad napustiti brodicu.",
		level: "B",
		minutes: 5,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"Na brodici su gorivo, ulje, plin i električne instalacije blizu jedno drugome, pa se požar brzo širi. Gasi **odmah**, čim ga primijetiš, svim što imaš, a prvo **prijenosnim aparatom**.",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"**Sredstva za gašenje** mogu biti:\n\n- **tipska**: prijenosni aparati ili ugrađeni sustavi s **prahom**, **pjenom** ili **CO2**; za male brodice najčešće je najbolji aparat s **prahom**;\n- **priručna**: pijesak, deka ili mokra tkanina kojom prekriješ plamen.\n\nNa aparatu piše za koje je vrste požara i dokad vrijedi. Kad rok istekne, aparat nosiš na servis.",
			},
			{
				type: "example",
				level: "B",
				title: "Kako gasiti",
				markdown:
					"1. Ugasi motor i zatvori dovod goriva i plina.\n2. Okreni brodicu tako da vjetar odnosi plamen i dim od ljudi.\n3. Mlaz aparata usmjeri u **podnožje plamena**, ne u vrh.\n4. Ako gori strojarnica, ne otvaraj širom poklopac, jer dovodiš zrak. Gasi kroz otvor za gašenje ako ga brodica ima.\n5. Ako ne uspiješ: prsluci na sebe, signal pogibelji i napuštanje brodice po naredbi voditelja.",
			},
			{
				type: "warning",
				level: "B",
				markdown:
					"Zapaljeno gorivo ili ulje **ne gasi vodom**: voda ih raznosi i požar se širi. Električne instalacije ne gasi vodom dok su pod naponom.",
			},
			{
				type: "remember",
				level: "B",
				title: "Zapamti",
				items: [
					"Gasi odmah, prvo prijenosnim aparatom.",
					"Za malu brodicu najčešće je najbolji aparat s prahom.",
					"Mlaz u podnožje plamena.",
					"Gorivo i struju ne gasi vodom.",
				],
			},
			{ type: "check", level: "B", questionId: "sigurnost-prva-pomoc-022" },
			{ type: "check", level: "B", questionId: "sigurnost-prva-pomoc-024" },
		],
		cheatSheet: [
			"Gasi odmah, prijenosnim aparatom.",
			"Aparati: prah, pjena, CO2; priručno pijesak i deka.",
			"Ugasi motor, zatvori gorivo, plamen niz vjetar od ljudi.",
			"Mlaz u podnožje plamena; gorivo ne gasi vodom.",
			"Istekao rok aparata: servis.",
		],
		source: "original",
	},
	{
		slug: "prodor-nasukavanje-sudar",
		area: "sigurnost-prva-pomoc",
		order: 6,
		title: "Prodor vode, nasukavanje i sudar",
		summary:
			"Što raditi kad voda ulazi, kad sjedneš na dno i kad se sudariš s drugim plovilom.",
		level: "B",
		minutes: 6,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"**Prodor vode:** izbacuj vodu svim sredstvima (pumpa, kablić) i pokušaj privremeno zatvoriti rupu (čep, krpa, jastuk). Provjeri jesu li otvoreni ventili i otvori kojima voda ulazi.\n\nAko brodicu ne možeš spasiti, makni je s plovnog puta i pokušaj je **nasukati na pogodno dno**, ali pazi prije svega na ljude.",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"**Nasukavanje:** ne pokušavaj odmah punim gasom krmom, jer možeš napraviti veću štetu. Prvo utvrdi:\n\n- kakvo je dno (pijesak, kamen);\n- koliko je velika šteta i koliki je dio trupa na dnu;\n- prodire li voda u brodicu.",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"**Sudar:** ne smiješ otići s mjesta dok ne utvrdiš da su ljudi na drugom plovilu sigurni. Ako je tvoja brodica manje oštećena, pomažeš drugoj. Prvo se spašavaju **ljudi**, zatim imovina. Obavezno **razmijenite podatke**.\n\nZa spašavanje ljudi **ne pripada naknada**. Za spašavanje imovine pripada **pravična naknada**, najviše do vrijednosti spašene imovine.",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"**Napuštanje brodice** naređuje voditelj, i to tek kad je sve pokušano. Prije toga: svi oblače prsluke, daje se signal pogibelji, a sa sobom se uzima što pluta i što se može ponijeti. Nezgodu ili nesreću poslije prijavi kapetaniji.",
			},
			{
				type: "remember",
				level: "B",
				title: "Zapamti",
				items: [
					"Prodor vode: izbaci vodu, zatvori otvor.",
					"Nasukavanje: prvo provjeri dno, štetu i prodor vode.",
					"Sudar: ne odlazi, pomozi, razmijeni podatke.",
					"Ljudi prvo, imovina poslije. Za ljude nema naknade.",
				],
			},
			{ type: "check", level: "B", questionId: "sigurnost-prva-pomoc-025" },
			{ type: "check", level: "B", questionId: "sigurnost-prva-pomoc-028" },
		],
		cheatSheet: [
			"Prodor vode: izbacuj vodu, zatvori rupu.",
			"Brodica tone: makni je s plovnog puta i nasukaj na pogodno dno.",
			"Nasukavanje: provjeri dno, štetu i prodor vode.",
			"Sudar: ostani, pomozi, razmijeni podatke.",
			"Spašavanje ljudi bez naknade, imovine uz pravičnu naknadu.",
		],
		source: "original",
	},
	{
		slug: "prezivljavanje-u-moru",
		area: "sigurnost-prva-pomoc",
		order: 7,
		title: "Preživljavanje u moru",
		summary: "Kako sačuvati toplinu i snagu ako završiš u vodi.",
		level: "B",
		minutes: 4,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"More hladi tijelo puno brže od zraka iste temperature. U vodi se zato bori za dvije stvari: da **plutaš** i da **ne gubiš toplinu**.",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"Što napraviti:\n\n- **odmah obuci prsluk** i napuhaj ga;\n- prvih trenutaka u hladnoj vodi diši polako i ne paničari;\n- **ne skidaj odjeću**, jer i mokra zadržava toplinu; pokrij glavu ako možeš;\n- **ne plivaj bez cilja**: kretanje troši snagu i hladi tijelo;\n- uhvati se za bilo što što pluta; ako brodica pluta, ostani uz nju jer se lakše vidi;\n- zauzmi položaj koji čuva toplinu: koljena privuci prsima, ruke prekriži preko prsa;\n- u skupini se zbijte jedni uz druge.",
			},
			{
				type: "warning",
				level: "B",
				markdown:
					"Pothlađivanje (hipotermija) dolazi postupno: drhtanje, zatim smetenost i pospanost. Zato su prsluk i brz poziv u pomoć važniji od svega drugog.",
			},
			{
				type: "remember",
				level: "B",
				title: "Zapamti",
				items: [
					"Prsluk odmah na sebe.",
					"Odjeća ostaje na tebi, glava pokrivena.",
					"Što manje se kreći, skupi se ili se zbijte u skupinu.",
					"Ostani uz brodicu ako pluta.",
				],
			},
			{ type: "check", level: "B", questionId: "sigurnost-prva-pomoc-030" },
		],
		cheatSheet: [
			"Prsluk odmah.",
			"Ne skidaj odjeću, pokrij glavu.",
			"Ne plivaj bez cilja, čuvaj toplinu.",
			"Koljena na prsa ili zbijte se u skupinu.",
			"Ostani uz brodicu koja pluta.",
		],
		source: "original",
	},
	{
		slug: "prva-pomoc-osnove",
		area: "sigurnost-prva-pomoc",
		order: 8,
		title: "Prva pomoć na brodici: osnove",
		summary:
			"Odakle prijete ozljede na brodici, što mora biti u kutiji i kad ne polažeš prvu pomoć.",
		level: "B",
		minutes: 4,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"Dobra vijest prvo: ako imaš **vozačku dozvolu** (ili drugi dokaz da si položio prvu pomoć), prvu pomoć na ispitu za B **ne polažeš**. Uz prijavu priložiš presliku vozačke dozvole.\n\nNa brodici ti znanje ipak treba, jer je pomoć daleko.",
			},
			{
				type: "table",
				level: "B",
				caption: "Izvori ozljeda na brodici",
				columns: ["Vrsta", "Primjeri"],
				rows: [
					["Toplinski", "vruća ispušna grana motora, požar, sunce"],
					[
						"Mehanički",
						"padovi na mokroj palubi, udarci o opremu, prsti u konopu ili vijak",
					],
					["Kemijski", "kiselina iz akumulatora, plinovi izgaranja, gorivo"],
				],
			},
			{
				type: "text",
				level: "B",
				markdown:
					"**Kutija prve pomoći** mora biti na brodici (od područja IIIc dalje). Drži je na suhom i na mjestu koje svi znaju. Provjeri rokove i nadopuni ono što potrošiš.\n\nU hitnom slučaju zovi **112** ili, na moru, **MRCC na 195** i VHF kanal 16. Za liječnički savjet preko radija postoji poziv PAN PAN MEDICO.",
			},
			{
				type: "remember",
				level: "B",
				title: "Zapamti",
				items: [
					"Vozačka dozvola oslobađa te ispita iz prve pomoći.",
					"Ozljede: toplinske, mehaničke, kemijske.",
					"Kutija prve pomoći: suha, dostupna, s valjanim rokovima.",
				],
			},
			{ type: "check", level: "B", questionId: "sigurnost-prva-pomoc-032" },
			{ type: "check", level: "B", questionId: "sigurnost-prva-pomoc-033" },
		],
		cheatSheet: [
			"Vozačka dozvola = dokaz o prvoj pomoći za ispit.",
			"Izvori ozljeda: toplinski, mehanički, kemijski.",
			"Kutija prve pomoći od IIIc dalje.",
			"Hitno: 112, na moru 195 i VHF 16.",
		],
		source: "original",
	},
	{
		slug: "prva-pomoc-postupci",
		area: "sigurnost-prva-pomoc",
		order: 9,
		title: "Prva pomoć: oživljavanje, pothlađenost i vrućina",
		summary:
			"Najvažniji postupci kad netko ne diše, kad se pothladi ili kad ga udari vrućina.",
		level: "B",
		minutes: 7,
		blocks: [
			{
				type: "text",
				level: "B",
				markdown:
					"**Osoba ne reagira.** Provjeri je li mjesto sigurno, glasno je pozovi i lagano protresi za ramena. Zabaci joj glavu i podigni bradu, pa najviše 10 sekundi gledaj, slušaj i osjećaj diše li normalno.\n\n- **Diše normalno**: okreni je u **bočni (stabilni) položaj** i stalno je prati.\n- **Ne diše normalno**: zovi **112** (ili 195 na moru) i odmah počni **oživljavanje**.",
			},
			{
				type: "example",
				level: "B",
				title: "Oživljavanje odrasle osobe",
				markdown:
					"1. Ruke na sredinu prsa, laktovi ispruženi.\n2. **30 pritisaka** na prsa, brzo i snažno (oko 100 do 120 u minuti, 5 do 6 cm duboko).\n3. **2 upuha** usta na usta.\n4. Ponavljaj 30 : 2 dok ne stigne pomoć ili osoba ne prodiše.\n\nKod utopljenika prvo daj **5 upuha**, pa nastavi 30 : 2. Ako je blizu automatski vanjski defibrilator (AED), uključi ga i slijedi glasovne upute.",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"**Pothlađenost (hipotermija):** makni osobu od vjetra i iz vode, pažljivo i bez naglih pokreta. Skini mokru odjeću, umotaj je u deke ili termo-foliju i pokrij glavu. Ako je pri svijesti i može gutati, daj joj topao, sladak napitak.\n\n**Smrzotine:** zagrijavaj polako, ne trljaj kožu i ne stavljaj je uz jaku vatru.",
			},
			{
				type: "text",
				level: "B",
				markdown:
					"**Vrućina:** kod sunčanice i toplinskog udara osobu premjesti u hlad, rashladi je mokrim ručnicima ili morskom vodom po koži i daj joj piti ako je pri svijesti. Smetenost ili gubitak svijesti znače: hitno zovi pomoć.\n\n**Opekline:** hladi ih dugo mlakom do hladnom vodom, ne ledom, i pokrij čistom gazom. **Kiselina iz akumulatora** na koži ili u oku: ispiri s puno vode.",
			},
			{
				type: "warning",
				level: "B",
				markdown:
					"Pothlađenoj osobi ne daj alkohol i ne trljaj joj ruke i noge. Ovo je sažetak za ispit, ne zamjena za tečaj prve pomoći. Smjernice se mijenjaju, pa prati one Crvenog križa.",
			},
			{
				type: "remember",
				level: "B",
				title: "Zapamti",
				items: [
					"Ne reagira, a diše: bočni položaj.",
					"Ne diše: 112 i oživljavanje 30 pritisaka : 2 upuha.",
					"Utopljenik: prvo 5 upuha.",
					"Pothlađenost: suho, toplo, bez alkohola i trljanja.",
					"Vrućina: hlad, hlađenje, tekućina.",
				],
			},
			{ type: "check", level: "B", questionId: "sigurnost-prva-pomoc-034" },
			{ type: "check", level: "B", questionId: "sigurnost-prva-pomoc-036" },
		],
		cheatSheet: [
			"Ne diše normalno: 112 i 30 pritisaka : 2 upuha.",
			"Utopljenik: prvo 5 upuha.",
			"Diše, a bez svijesti: bočni položaj.",
			"Pothlađenost: skini mokro, umotaj, bez alkohola.",
			"Toplinski udar: hlad, hlađenje, tekućina.",
		],
		source: "original",
	},
];

export default lessons;
