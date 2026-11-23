import type { IStudyCard } from "@/content/types";

const studyCards: IStudyCard[] = [
	{
		id: "qa-001",
		area: "karte-navigacija",
		level: "common",
		prompt: "Poznavanje pomorskih karata i planova",
		answer:
			"U pomorstvu koristimo pomorske karte Merkatorove projekcije.One mogu biti generalne, kursne, obalne i karte planovi. Obalne karte su obično mjerila od 1: 50 000 - 250 000, a karte planovi najčešće 1:5000 do 1: 25 000.",
		ref: "I.1",
		source: "qa-doc",
	},
	{
		id: "qa-002",
		area: "karte-navigacija",
		level: "common",
		prompt: "Rad na pomorskoj karti:",
		answer:
			"Traži se 1. kurs, 2. azimut i pramčani kut, 3. udaljenost, 4. koordinate. Obrađuje predavač na tečaju.",
		ref: "I.2",
		source: "qa-doc",
	},
	{
		id: "qa-003",
		area: "karte-navigacija",
		level: "B",
		prompt: "Onove terestičke navigacije",
		answer:
			"1.Određivanje i ucrtavanje točke broda. Obrađuje predavač na tečaju.",
		ref: "I.3",
		source: "qa-doc",
	},
	{
		id: "qa-004",
		area: "karte-navigacija",
		level: "B",
		prompt: "Priručnici za navigaciju:",
		answer:
			"To su peljari i popis svjetala i signala za maglu.\nPeljari su navigacijski priručnici, nautički vodići,publikacije (knjige) kojie vrlo detaljno opisuju konfiguraciju obale i otoka, navode dubine u lukama i marinama, smjer struja i vjetrova, izgled svjetionika i sve specifičnosti pojedinog dijela obale.\nPopis svjetala i signala za maglu je službena publikacija (knjiga) u kojoj su redom navedena sva pomorska svjetla (svjetionici na kopnu - obali i otocima- sa svojom punom karakteristikom, brodovi -svjetionici i svjetleće plutače koje plutaju po morskoj površini, takođeri svi zvučni signali za maglu.",
		ref: "I.4",
		source: "qa-doc",
	},
	{
		id: "qa-005",
		area: "karte-navigacija",
		level: "B",
		prompt: "Kompas",
		answer:
			"Kompas je naprava za mjerenje horizontalnih kuteva.\nU navigaciji se koristi za pokazivanje kursa i azimuta. Postoje magnetni i žiro-kompasi.",
		ref: "I.5",
		source: "qa-doc",
	},
	{
		id: "qa-006",
		area: "karte-navigacija",
		level: "B",
		prompt: "Uporaba elektronskih pomagala na brodici:",
		answer:
			"6.1.Radar je je skraćenica nastala od engleskih riječi Radio Detection and Ranging, što znači otkrivanje i određivanje udaljenosti radiovalovima. To je elektronski uređaj za otkrivanje nekog objekta, npr. broda, za mjerenje njegove udaljenosti i brzine, kao i za upravljanje njime u tami i po magli. Sastoji se od odašiljača uskog snopa usmjerenih ultrakratkih radiovalova i prijemnika.Kad emitirani snop naiđe na neki objekt, on će se od njega odbiti i na ekranu katodne cijevi prijemnika izazvati pojavu siluete objekta te dati procjenu njegove udaljenosti.\n6.2.Dubinomjere dijelimo na i ručni i elektronski. Ručni predstavljaju konop na čijem se kraju nalazi olovni uteg, a elektronski d. su uređaji za mjetrenje dubine pomoću zvučnog impulsa.\nPrincip rada je da se zvučni impuls koji se odbija od prepreke (dna) pretvara u električni signal te prikazuje na zaslonu uređaja u obliku brojčanog zapisa ili slike.\n6.3.Brzinomjeri su uređaji za mjerenje brzine broda.Dijele se na one koji mjere brzinu broda kroz vodu (relativne) i one koji mjere brzinu broda preko dna(apsolutne).",
		ref: "I.6",
		source: "qa-doc",
	},
	{
		id: "qa-007",
		area: "plovne-oznake",
		level: "B",
		prompt: "Plovni putovi i balisaža, IALA sustav",
		answer:
			"Plovni put je morski pojas dovoljno dubok i širok, a po potrebi i obilježen, koji služi za odvijanje plovidbe.\nBalisaža je sistem označavanja pomorskog plovnog puta, opasnosti i točaka važnih za orjentaciju.Postoje dva sustava obilježavanja plovnih puteva: Lateralni sustav - A (crveno na lijevoj strani) i Kardinalni - B (crveno na desnoj strani).\nIALA je međunarodno udruženje svjetioničarskih službi koje je propisalo navedene sustave.",
		correction:
			"IALA A i B su regije, a ne sustavi. Lateralne i kardinalne oznake su vrste oznaka, a cijeli Jadran je u regiji A (crveno lijevo, zeleno desno pri uplovljavanju).",
		ref: "I.7",
		source: "qa-doc",
	},
	{
		id: "qa-008",
		area: "motoristika",
		level: "B",
		prompt: "Podjela mehaničkih porivnih uređaja",
		answer:
			"Motori se djele prema radu (2-taktni i 4-taktni), prema termodinamičkom procesu (Otto i Diesel) prema načinu ugradnje (stabilni - ugrađeni i vanbrodski).U novije vrijeme sve je više i elektromotora.",
		ref: "II.1",
		source: "qa-doc",
	},
	{
		id: "qa-009",
		area: "motoristika",
		level: "B",
		prompt:
			"Osnovni pojmovi o radu, priprema za pogon;upućivanje i zaustavljanje",
		answer:
			"Diesel motor: Usljed velike brzine klipa koji se kreće unutar cilindra dolazi do tlačenja molekula zraka u njemu, time i do zagrijavanja istih.U trenutku kada se u cilindru postigne dovoljna temperatura, uvodi se u cilindar gorivo preko crpke za ubrizgavanje goriva.Dolazi do eksplozije (ekspanzija)\nOtto motor: Potrebno je stvoriti smjesu zraka i goriva koja se zatim uvodi u cilindar,gdje se na ulasku gorivo pali pomoću svjećice.Nije potreban tlak kao kod Diesela. Dolazi do eksplozije (ekspanzija)\nTaktovi: 1.-usis,2-kompresija (tlačenje);3.ekspanzija (radni takt);4.-ispuh.Kod dvotaktnih: 1.-usis i kompresija; 2.-ekspanzija i ispuh.\nPriprema za pogon: Ako je motor stabilni u zatvorenom kućištu obavezno prije pokretanja motora prozračiti kućište.Provjeriti dovode goriva i spojeve na akumulatorima.Provjeriti razinu ulja i tekućine za hlađenje motora.Provjeriti razinu goriva.Tada pokrenuti motor.Dok ne postigne radni temperaturu ne voziti pod velikim opterećenjem i sa velikim brojem okretaja.",
		ref: "II.2",
		source: "qa-doc",
	},
	{
		id: "qa-010",
		area: "motoristika",
		level: "B",
		prompt: "Načini upućivanja;podmazivanje i hlađenje:",
		answer:
			"Upućivanje = pokretanje.Obavlja se kod manjih vanbrodskih Otto motora povlačenjem užeta omotanog oko induktora, a kod većih elektropokretačem.Kod manjih Diesel motora obavlja se pomoču dekompresora i pokretanjem zamašnjaka, kod večih elektropokretačem, a kod vrlo velikih pomoću komprimiranog zraka pod visokim tlakom.\nPodmazivanje se obavlja uljem iz goriva (mješavina)- dvotaktni motori ili uljem iz posebne posude za ulje (kartera) - četverotaktni motori.Dvotaktni motori novije proizvodnje također imaju komoru za ulje iz koje se ulje dozira u gorivo ovisno o broju okretaja.Kod četverotaktnih motora ulje iz kartera, koji je na dnu motora, ulazi u gornji dio motora momoću crpke (uljne pumpe), u motoru postoje projektirani kanali za ulje koji vode do dijelova koje je potrebno podmazivati.Hlađenje motora obavlja se zrakom (zračno) i tekučinom (vodeno).Kod zračnog hlađenja postoji ventilator koji stalno radi i usisava zrak koji struji oko motora i hladi ga.Obično i na plovilu postoji ugrađena ili konstruirana vjetrolovka ili više njih kojoj je uloga da u plovidbi strujanje zraka izazvano kretanjem plovila ili vjetrom usmjerava oko motora.Kod hlađenja tekučinom kao dio motora postoji hladnjak u koji se stavlja tekučina koja pomoću crpke za vodu struji kroz motor, ulazi u hladnjak (ovdje je moguće- što je čest slučaj- izvesti dodatno hlađenje hladnjaka vodom iz mora) i tako ohlađena ponovno hladi motor.",
		ref: "II.3",
		source: "qa-doc",
	},
	{
		id: "qa-011",
		area: "motoristika",
		level: "B",
		prompt: "Kontrola rada; instrumenti za kontrolu:",
		answer:
			"Kontrola rada motora obavlja se instrumentima, te vidom i sluhom.Instrumentima pratimo: Pritisak ulja u motoru (manometar), temperaturu rashladne tekućine i temperaturu ulja (termometar), broj okretaja motora (brojač okretaja), električni napon na akumulatoru (voltmetrar).Instrumenti se nalaze na upravljačkoj ploći - konzoli…",
		ref: "II.4",
		source: "qa-doc",
	},
	{
		id: "qa-012",
		area: "motoristika",
		level: "B",
		prompt: "Dijagnosticiranje kvarova i njihovo otklanjanje.",
		answer:
			"Dijagnosticiranje kvarova obavlja se pomoću instrumenata na upravljačkoj ploči, gdje se prema padu napona, broja okretaja motora, porastu temperature u motoru ili padu tlaka ulja u motoru može zaključiti da je došlo do nepravilnosti u radu.Kod starijih benzinskih motora možemo smetnje u radu otkloniti pregledom i čišćenjem svječice, a kod starijih diesel motora možemo očistiti ili oprati filtere goriva i zraka.",
		ref: "II.5",
		source: "qa-doc",
	},
	{
		id: "qa-013",
		area: "motoristika",
		level: "B",
		prompt: "Akumulatori; gorivo i mjere predostrožnosti kod krcanja goriva",
		answer:
			"Još uvijek su u širokoj primjeni olovni akumulatori u kojima se nalazi kiselina (elektrolit) u koju se uranjaju olovne čelije.treba ih izbjegavati jer su isparenja tog akumulatora eksplozivna, elektrolit hlapi, ako se razlije nagriza kožu, odjeću i plovilo. Treba nabaviti suhe akumulatore, nikal-kadmijske ili litij-ionske koji su skuplji, ali bolji jer ne zahtjevaju održavanje.Gorivo koje koristimo za pogon plovila je Diesel, motorni benzin, mazut, a rijeđe plin, kerozin i alkohol.Kod krcanja goriva na plovilu ne smije biti putnika.Plovilo mora biti čvrsto izvezano da se ne pomiće, moraju se pripremiti sredstva za gašenje požara, a sa plovila se mora odvesti statički elektricitet.Tada se pristupa krcanju goriva.Ako se gorivo razlije, ne smije se prati vodom, mora se obrisati suhom krpom ili posuti piljevinom koji se zatim odlažu na posebno označena mjesta na obali.",
		ref: "II.6",
		source: "qa-doc",
	},
	{
		id: "qa-014",
		area: "motoristika",
		level: "B",
		prompt: "Brodske instalacije",
		answer:
			"To su elektro vodovi ili elektro mreža, uljni vodovi (hidraulički sustavi), sustav za krcanje i dobavu goriva, sustav cjevovoda do balastnih tankova i crnih tankova, sustv cijevi pitke i sanitarne vode itd.",
		ref: "II.7",
		source: "qa-doc",
	},
	{
		id: "qa-015",
		area: "sigurnost-prva-pomoc",
		level: "B",
		prompt: "Sredstva za gašenje požara",
		answer:
			"Mogu biti tipska i priručna.Tipska su ugrađeni ili prijenosni uređaji za gašenje požara prahom ili pjenom, ovisno o vrsti požara.Za mala plovila najbolji su oni za gašenje prahom.Priručna sredstva su pijesak, ponjava (deka) kojima se prekriva plamen.",
		ref: "II.8",
		source: "qa-doc",
	},
	{
		id: "qa-016",
		area: "motoristika",
		level: "B",
		prompt:
			"Poznavanje mjera predostrožnosti za sprečavanje izljevanja ulja u more",
		answer:
			"Moraju uvijek biti ispravni sustavi u motoru u kojima se nalazi ulje. Moraju se pratiti uređaji koji pokazuju tlak ulja u motoru i pravodobno djelovati ako tlak naglo pada (isključiti motor).Ako se ulje skladišti (zalihe), to mora biti na mjestu sa koje ga se u slučaju oštečenja ambalaže ne može izliti u more.",
		ref: "II.9",
		source: "qa-doc",
	},
	{
		id: "qa-017",
		area: "motoristika",
		level: "B",
		prompt: "Načini prikupljanj otpadnih voda i kučnog otpada",
		answer:
			"Mora postojati tank otpadnih voda koje se prazni u luci. Kućni otpad odlaže se u kantu za otpad koja se prazni na za to predvođeno mjesto na obali. MARPOL konvencija.",
		ref: "II.10",
		source: "qa-doc",
	},
	{
		id: "qa-018",
		area: "propisi",
		level: "B",
		prompt: "Propisi o plovidbi i redu u lukama",
		answer:
			"Glisiranje 300m od obale, plovidba za ostale 200 m od obale. Ne prilaziti bliže od 50 m od plutaća na kupalištu.Skuteri do 300 m moraju kroz poseban koridor od plutaća.Uluci je zabranjno plivati, kupati se, glisirati, dirati napreve za privez drugih plovila, ložiti vatru na plovilu ili kopnu, radio promet.",
		correction:
			"Propis ne poznaje granicu od 200 m. Plovila kraća od 15 m plove najmanje 50 m od obale, od 15 do 30 m 150 m, duža od 30 m 300 m, a glisirati se smije samo dalje od 300 m.",
		ref: "III.1",
		source: "qa-doc",
	},
	{
		id: "qa-019",
		area: "propisi",
		level: "B",
		prompt: "Pravilnik o brodicama i jahtama",
		answer:
			"To je podzakonski akt koji uređuje uvjete za plovidbu, stavljanje na tržište, područja plovidbe, uvjete i nadzor nad gradnjom jahti i brodica, upis i brisanje brodica iz očevidnika brodica, određuje oznake i imena brodica, utvrđuje sposobnost za plovidbu jahti i brodica, te isprave brodica, posada brodica i jahti, način i uvjeti za stjecanje uvjerenja i svjedodžbi o osposobljenosti voditelja brodica i zapovjednika jahti, uvjete i način ovlašćivanja učilišta, te nadzor nad provođenjem odredaba Pravilnika.",
		correction:
			"Od 01.02.2020. tehnička pravila za brodice su u Pravilniku o brodicama, čamcima i jahtama (NN 13/20). Stari Pravilnik o brodicama i jahtama vrijedi još samo za posadu i ispite (kategorije A, B i C).",
		ref: "III.1.1",
		source: "qa-doc",
	},
	{
		id: "qa-020",
		area: "propisi",
		level: "B",
		prompt:
			"Isprave na brodici, upis i brisanje brodice u očevidnik brodice, pregledi",
		answer:
			"Dozvola za plovidbu je osnovni dokument svake brodice i mora se u plovidbi nalaziti na brodici. U nju se unosi naziv tijela koje izdaje dozvolu,broj, datum i mjesto izdavanja dozvole, oznaku i ime, ako brodica ima ime, pozivni znak i godinu gradnje, namjenu, tip i materijal gradnje, broj trupa, ako ga ima, duljina brodice, nosivost i visinu teretne vodne linije za brodice za gospodarske namjene, broj i snagu porivnog uređaja, ime, prezime i adresu, odnosno naziv i sjedište vlasnika, najveći dopušteni broj osoba, najmanji broj članova posade potreban za sigurnu plovidbu sa osposobljenjima, najveći dozvoljeni broj putnika, za brodice za prijevoz putnika, područje plovidbe, datum pregleda s rokom valjanosti.Dozvola za plovidbu brodice izdaje se na hrvatskom i engleskom jeziku.\nU očevidnik brodica mora se upisati brodica duljine veće od 2,5 metra ili brodica s ukupnom snagom porivnih strojeva većom od 5 kW, koja je u cjelini u vlasništvu fizičke ili pravne osobe s prebivalištem odnosno sjedištem u Republici Hrvatskoj.\nU očevidnik brodica može se upisati brodica duljine veće od 2,5 metra ili brodica s ukupnom snagom porivnih strojeva većom od 5 kW koja je u cjelini ili dijelom u vlasništvu strane fizičke ili pravne osobe ili osobe bez državljanstva ili državljanina Republike Hrvatske koji nema prebivalište u Republici Hrvatskoj ako brodica pretežno boravi u moru Republike Hrvatske. Zahtjevu za prvi upis brodice u očevidnik brodica mora se priložiti: isprava kojom se dokazuje vlasništvo brodice i porivnog uređaja (kupoprodajni ugovor, ugovor o darovanju, rješenje o nasljeđivanju, račun, Svjedodžba o gradnji, i sl.), isprava kojom se dokazuje bruto tonaža, te nosivost brodice za brodice za gospodarske namjene, dokaz o registraciji za obavljanje gospodarske djelatnosti za brodice za gospodarske namjene, presliku Police o osiguranju obvezne odgovornosti za nematerijalne štete vlasnika brodice ukoliko snaga porivnog uređaja brodice prelazi 15 kW, isprava kojom se dokazuje da je brodica brisana iz stranog upisnika brodica, ukoliko je brodica bila upisana u strani upisnik brodica, dokaz o podmirenim carinskim i poreznim obvezama, dokaz o uplaćenoj naknadi za upis u hrvatski očevidnik brodica, svjedodžba o gradnji izdana od nadležnog tijela ili Deklaracija o sukladnosti izdana sukladno Direktivi EU 94/25 EC. Ako vlasnik brodice upisane u očevidnik brodica za osobne potrebe namjerava brodicu dati u najam fizičkoj ili pravnoj osobi registriranoj za obavljanje djelatnosti, dužan je podnijeti zahtjev za upis brodice u očevidnik brodica za gospodarske namjene, te uz zahtjev za upis, pored dokumenata iz stavka 1. ovog članka priložiti i ovjereni ugovor o najmu, dokaz o registraciji za obavljanje gospodarske djelatnosti tvrtke s kojom je zaključio ugovor o najmu, dokaz o prijavi predmetnog ugovora nadležnoj poreznoj upravi.\nPregledi mogu biti osnovni(kod prvog upisa), redovni (brodice za gospodarske namjene - prijevoz putnika svake godine, za gospodarske namjene prijevoz robe, ribarenje...-svake druge godine, brodice za rekreaciju - svake pete godibe) i izvanredni (nakon konstrukcijskih zahvat na brodici ili nakon havarije).",
		correction:
			"Dokument se danas zove upisni list brodice, a ne dozvola za plovidbu. Redovni pregled je svake 2 godine za gospodarske i javne brodice, a svakih 5 godina za osobne brodice dulje od 7 m ili jače od 15 kW s određenom opremom.",
		ref: "III.1.2",
		source: "qa-doc",
	},
	{
		id: "qa-021",
		area: "propisi",
		level: "B",
		prompt: "Osposobljenost posade",
		answer:
			"Osoba koja upravlja brodicom ili zapovijeda jahtom mora biti osposobljena kao voditelj brodice kategorije A,voditelj brodice kategorije B, voditelj brodice kategorije C. Uvjerenje o osposobljenosti za voditelja brodice kategorije A stječe osoba koja ima najmanje 15 godina života i položi ispit.Uvjerenje o osposobljenosti za voditelja brodice kategorije B stječe osoba koja ma najmanje 16 godina života i položi ispit.Uvjerenje o osposobljenosti za voditelja brodice kategorije C stječe osoba koja ima najmanje 18 godina života, ima završenu osnovnu školu, udovoljava propisanim zdravstvenim uvjetima, posebice u pogledu vida i sluha, završi izobrazbu u pomorskom učilištu i položi ispit Brodica za osobne potrebe koja plovi u području plovidbe I. i II. mora imati najmanje sljedeći broj članova posade: osobu koja upravlja brodicom osposobljena za voditelja brodice kategorije C i jednog člana posade osposobljenog za voditelja brodice kategorije B.Brodice za osobne potrebe u području plovidbe III. i IV. mora imati najmanje sljedeći broj članova posade: osobu koja upravlja brodicom osposobljenu za voditelja brodice kategorije B.Brodica za osobne potrebe duljine do 6 metara i snage porivnog uređaja do 8 kW u području plovidbe III.a, III.b, III.c i IV. mora imati najmanje sljedeći broj članova posade: osobu koja upravlja brodicom osposobljenu za voditelja brodice kategorije A. Brodicom za osobne potrebe na vesla može upravljati osoba starija od 12 godina.",
		correction:
			"Danas kategorija A pokriva brodice za osobne potrebe do 7 m i 15 kW (ne 6 m i 8 kW), u područjima IIIa, IIIb, IIIc i IV.",
		ref: "III.1.3",
		source: "qa-doc",
	},
	{
		id: "qa-022",
		area: "propisi",
		level: "B",
		prompt: "Nadležnost lučkih kapetanija u odnosu na brodicu i posadu brodice",
		answer:
			"Nadzor nad provedbom pravila obavljaju inspektori sigurnosti plovidbe Ministarstva i lučkih kapetanija i drugi stručni djelatnici Ministarstva i lučkih kapetanija u okviru posebnog ovlaštenja. Nadzor nad gradnjom brodica za osobne potrebe koja se gradi za osobne potrebe graditelja obavlja lučka kapetanija ili ispostava.Kapetanije su nadležne teritorjalno, po mjasnoj nadležnosti.",
		ref: "III.1.4",
		source: "qa-doc",
	},
	{
		id: "qa-023",
		area: "propisi",
		level: "B",
		prompt: "Kategorije plovidbe",
		answer:
			"Brodica ili jahta ovisno o svojoj veličini, konstrukciji i drugim tehničkim karakteristikama može ploviti u sljedećim područjima plovidbe:\n1. Područje plovidbe I - obuhvaća međunarodnu plovidbu svim morima i vodama koje su pristupačne s mora\n2. Područje plovidbe II - obuhvaća međunarodnu plovidbu Jadranskim morem\n3. Područje plovidbe III - obuhvaća plovidbu unutrašnjim morskim vodama, teritorijalnim vodama RH i vodama koje su pristupačne s mora.\nU području plovidbe III. mogu postojati sljedeća ograničenja:\nIIIa - do 6 Nm od obale kopna ili otoka;\nIIIb - do 3 Nm od obale kopna ili otoka\nIIIc - do 1 Nm od obale kopna ili otoka\n4. Područje plovidbe IV koje obuhvaća plovidbu lukama, zaljevima, rijekama hrvatskoga Jadranskog slijeva do granicama do koje su one plovne morske strane, te Prokljanskim jezerom.U područjima plovidbe iz stavka 1. ovoga članka lučka kapetanija, priznata organizacija ili ovlašteno tijelo može ograničiti plovidbu brodice ili jahte u određenim vremenskim uvjetima. Ograničenje mora biti naznačeno u Dozvoli za plovidbu brodice ili Svjedodžbi o sposobnosti jahte za plovidbu.",
		correction:
			"Područja II i III danas su određena udaljenošću: II do 20 NM, a III do 12 NM od najbliže obale kopna ili otoka (NN 13/20, čl. 37). Isprava se zove upisni list brodice.",
		ref: "III.1.5",
		source: "qa-doc",
	},
	{
		id: "qa-024",
		area: "pomorstvo-manevriranje",
		level: "B",
		prompt: "Vrste i tipovi brodica i jahti",
		answer:
			"Brodice se dijele prema namjeni (gospodarske, rekreacijske, javne), vrsti poriva (vesla, jedra, motor), materijalu gradnje trupa (guma, drvo, čelik, plastika...), području plovidbe (more i rijeke i jezera), obliku trupa (deplasmanske, gliserske, katamaranske, hidrokrilne) i tipu (leut, pasara,gajeta, batana).",
		ref: "III.2",
		source: "qa-doc",
	},
	{
		id: "qa-025",
		area: "pomorstvo-manevriranje",
		level: "B",
		prompt:
			"Elementi konstrukcije i konstrukcijska obilježja različitih tipova brodica",
		answer:
			"Gajeta je drvena brodica zaobljena trupa manja 6- 9 m, gdje je prednja trećina opalubljena i veća, 9 -12 m,koja je opalubljena potpuno, sa grotlima (u sredini veće sa poklopcima).Služi za ribolov mrežama potegačama, stajačicama, kao svjećarica.Može imati jedro i motor.Leut ima trup oštra oblika, na pramcu izvedeno rilo (skakalo), duljine od 8 - 12 m.Pramčana polovica i krmena četvrtina su mu opalubljene.Može i mati jedro, a veći i motor.Batana je drvena brodica plosnata dna, ravnih i koso nagnutih bokova, oštra pramca i zrcalne krme.Dužina od 3 - 4,5 m, širina ok 1,5 m.vesla se na 2 ili 4 parića.Služi za ribolov blizu obale.Pasara je drvena ili plastična brodica zašiljena pramca i zrcalne krme dužine 3 - 6 m često opalubljena pramca.Služi sportu i razonodi.",
		ref: "III.2.1",
		source: "qa-doc",
	},
	{
		id: "qa-026",
		area: "sigurnost-prva-pomoc",
		level: "B",
		prompt: "Oprema brodice",
		answer:
			"Dijeli se na opremu trupa, opremu strojnog uređaja, opremu za gašenje požara, radioopremu, sredstva za spašavanje, sredstva za signalizaciju i pomagala za navigaciju i opremu za spriječavanje zagađenja.Oprema je navedena u pravilima za statutarnu certifikaciju brodica i jahti.Brodica mora imati sidro s konopom ili lancem 25 - 100 m,bitve, 3 užeta za privez, 2 vesla, 4 palca ili pričuvni motor i čaklja, rezervno rudo kormila, alat za održavanje motora i rezervne dijelove za motor, vatrogasnu sjekiru, kutiju prve pomoći (ne mora IV i IIIc), prijenosni protupožarni aparat, prsluk za spašavanje za osobe na brodici, dvije kutije šibica ili upaljač (nepromočivo), posudu za prikupljanje krutih tvari, kolut za spašavanje, siguronosno uže (za jedrilice), propisana svjetla, sredstvo za zvučno oglašavanje (III a i IIIb), vodootpornu baterijsku svjetiljku, informativna karta (karta 101 -INFO), a područje III i pomorske karte prema području plovidbe, GNSS prijemnik, kompas i dalekozor, opremu za rad na karti,peljar za male brodove, popis svjetala i signala za maglu, radar reflektor, a za plovila koja imaju ugrađeni porivni stroj i posudu za otpadno ulje i sredstvo za upijanje i odvajanje zauljenih ostataka.",
		correction:
			"Prema tablici opreme u Pravilniku (NN 13/20) kutija prve pomoći treba od područja IIIc do III, a sredstvo za zvučno oglašavanje od IIIb dalje. Točan popis ovisi o brodici, pa ga provjeri u Pravilniku.",
		ref: "III.2.2",
		source: "qa-doc",
	},
	{
		id: "qa-027",
		area: "pomorstvo-manevriranje",
		level: "B",
		prompt: "Stabilnost brodice",
		answer:
			"Stabilnost je svojstvo plovila da se odupre nagibanju koje izazivaju prekretni momenti (vjetar, valovi, sile na kormilu kod naglog zakretanja, pomaci tereta i putnika) i da se vrati u ravnotežni položaj onda kada ti momenti prestanu djelovati.Kod brodica za sport i razonodu najveća je opasnost od nepravilno raspoređenih osoba u brodici, pa treba paziti da se rasporede jednakomjerno.Plovidba sa zategom, pretegom ili opterećenjem po jednom boku je opasna, neudobna i skupa jer zahtjeva povečanu potrošnju goriva.",
		ref: "III.3",
		source: "qa-doc",
	},
	{
		id: "qa-028",
		area: "pomorstvo-manevriranje",
		level: "common",
		prompt: "Konopi, sidra i uzlovi",
		answer:
			"Danas se koriste PVC konopi,Ne tonu, ne smrzavaju se, jeftini su i čvrsti.Sidro je čelični odljevak ili otkivak koji svojom masom i oblikom, ukopan u morski dno, preko sidrenog lanca(sidrenjaka) drži brod na točki sidrenja.Najpoznatija sidra su kišobranasto, mačak, Hall i Danforth.Uzao je način vezanja krajeva istog konopa, krajeva dvaju konopa ili živog kraja konopa za neki predmet po određenim pravilima.Postoje uzlovi muški, ženski, plutaćin, gaša, sidreni, zastavni... UČE SE NA TEČAJU.",
		ref: "III.4",
		source: "qa-doc",
	},
	{
		id: "qa-029",
		area: "meteorologija",
		level: "B",
		prompt: "Meteorologija",
		answer:
			"Meteorologija je grana geofizike koja proučava atmosferu, odnosno razvoj fizičkih procesa najnižih atmosferskih slojeva.\n5.1. Meteorološki elementi su temperatura zraka, atmosferski tlak, vlažnost zraka, zračna strujanja, oblaci i oborine. Temperatura je stupanj toplinskog stanja neke tvari.Temp.zraka mjeri se termometrom na oko 2 m visine, na mjestu zaštičenom od sunca.Atmosferski tlak je tlak u slobodnoj atmosferi. Mjeri se barometrom i barografom.Pri naglom padu tlaka zraka očekujemo nevrijeme.Vlažnost zraka je masa vodene pare koju sadržava zrak u jedinici obujma.Mjeri se psihrometromPadom temp.zraka vlažnost se smanjuje i obratno.Zračna strujanja nazivamo vjetrovi.To su vodoravna strujanja zraka.Brzina vjatra mjeri se anemometrom.Oblak je vidljiv skup sitnih čestica vode ili leda koji lebde u zraku.Osnovni rodovi oblaka su cirusi, stratusi, kumulusi i kumulonimbusi.Oborine su voda u obliku krutih ili tekućih čestica koja pada iz oblaka na površinu Zemlje.Tu pojavi nazivamo kiša, snijeg, grad...Ciklona je barometarski minimum - zračni vrtlog sniženog tlaka zraka.Anticiklona je barometarski maksimum.",
		correction:
			"Kad se zrak hladi, relativna vlažnost raste (zato nastaju rosa i magla), a ne pada.",
		ref: "III.5",
		source: "qa-doc",
	},
	{
		id: "qa-030",
		area: "meteorologija",
		level: "common",
		prompt: "Vjetrovi, morske struje i valovi",
		answer:
			"Jugo, bura, maestral označavaju tri karakteristična tipa vremena na Jadranu.Jugo je topao i vlažan vjetar koji puše iz smjera jugoistoka.Manje je opasno od bure, jer se javlja postupno.Jugo izaziva velike valove, a puše i do 10 dana zimi, a ljeti do 3 dana.Bura je jak, iznenadan, mahovit vjetar, hladan, brzine i do 200 km/h.Puše iz smjera sjeveroistoka.Kod bure pada temp.zraka, a raste tlakZimi tarje od 3-7 dana, ljeti do 2 dana.Maestral je dnevni vjetar koji je karakterističan za ljetno doba. Sjeverozapadnog je smjera.Prati lijepo, stabilno vrijeme.Počinje puhati ok 10 sti, oko 14 dostiže maksimum, te naglo prestaje prije zalaska sunca.Njegova pojava zimi znak je nevremena.Tramontana je oblik bure koja puše iz smjera sjevera, a Levanat (istočnjak) onaj koji puše iz smjera istoka.\nIz Jonskog mora dolazi ogranak sredozemne struje koja teče uzduž hrvatske obale od juga prema sjeverozapadu kruži kroz Jadran i uz talijansku obalu vraća se u Jonsko more. Na tu struju (glavnu) utječu struje morskih mijena - plime i oseke. Zimi je ječe strujanje uz hrvatsku obalu, a ljeti uz talijansku.Brzina struje je od o,5 do 1 čvora, a kroz kanale, tjesnace itd. i do 4 čvora.\nValovi su proces periodičnog gibanja vodene mase. Nastaju pod utjecajem vjetra, struja, gravitacije ili potresa.",
		ref: "III.5.2",
		source: "qa-doc",
	},
	{
		id: "qa-031",
		area: "meteorologija",
		level: "B",
		prompt: "Plima i oseka",
		answer:
			"To su periodične, vertikalne oscilacije morske razine, koje se javljaju pod utjecajem gravitacijskih sila Sunca i Mjeseca na Zemlju.Utjecaj Mjeseca veći je od utjecaja Sunca. Plima je dizanje morske razine, a oseka spuštanje. U jednom danu nastupaju dvije plime i dvije oseke.Oscilacije u Jadranu kreću se od cca 0,25 na jugu do 1 m na sjeveru.",
		ref: "III.5.3",
		source: "qa-doc",
	},
	{
		id: "qa-032",
		area: "meteorologija",
		level: "B",
		prompt: "Izvješča i upozorenja",
		answer:
			"Obalne radio postaje Rijeka radio (kanal 24, 04, 20 u 05.35,14:35 i 19:35), Split radio (kanal 07, 21,81,23 u 05:45, 12:45, 19:45) i Dubrovnik radio (kanal 04, 07 u 06:25, 13:20, 21:20) odašilju meteorološka i navigacijska izvješća i upozorenja, a te informacije mogu se dobiti i u lučkim kapetanijama u svako doba.",
		correction:
			"Vremena su zastarjela. Plovput objavljuje raspored emitiranja (u UTC), npr. Rijeka radio 05:30, 12:30 i 19:30, Split radio 05:45, 12:45 i 19:45, Dubrovnik radio 06:20, 13:20 i 20:20. Prije plovidbe provjeri aktualni raspored.",
		ref: "III.5.4",
		source: "qa-doc",
	},
	{
		id: "qa-033",
		area: "izbjegavanje-sudara",
		level: "common",
		prompt: "Pravila o izbjegavanju sudara na moru",
		answer:
			"Pravila se odnose na pravila kod pretjecanja - svaki brod koji pretjeće drugi brod mora se ukloniti s puta tom brodu, križanja kurseva - brod kojem drugi brod dolazi po desnom boku mora dati prednost tom brodu i plovide u protukursu - svaki brod skreće u svoju desnu stranu za ne manje od 10 stupnjeva.",
		correction:
			"Pravila ne propisuju najmanje 10 stupnjeva. Promjena kursa mora biti dovoljno velika i na vrijeme, da je drugo plovilo jasno primijeti.",
		ref: "IV.1",
		source: "qa-doc",
	},
	{
		id: "qa-034",
		area: "svjetla-znakovi",
		level: "common",
		prompt: "Svjetla, dnevni izvučni signali",
		answer:
			"Na brodu: lijevi bok - crveno 112,5 stupnjeva, desni bok - zeleno 112,5 stupnjeva, krma - bijelo 135 stupnjeva. Ako je motorni - na pramcu bijelo 225 stupnjeva.Ako je duži od 50 m na krmenom jarbolu još jedno bijelo 225 stupnjeva ili općenito - drugo bijelo svijetlo mora biti smješteno iza i iznad pramčanog, a iza bočnih svjetala.Ako je jedrenjak kraći od 20 m - samo bočna i krmeno, a duži od 20 m - još i na jarbolu zeleno i ispod njega crveno svjetlo 360 stupnjeva.Dnevni signali - stožac, kugla i valjak - crne boje.",
		correction:
			"Jedrenjak bilo koje duljine ima bočna i krmeno svjetlo (ispod 20 m smiju biti spojena u jedan fenjer na vrhu jarbola). Po želji smije na vrhu jarbola nositi dva kružna svjetla, gore crveno i dolje zeleno, ali ne uz spojeni fenjer (COLREG pravilo 25).",
		ref: "IV.2",
		source: "qa-doc",
	},
	{
		id: "qa-035",
		area: "pomorstvo-manevriranje",
		level: "B",
		prompt:
			"Manevriranje brodicom: plovidba, pristajanje, sidrenje, i vezivanje u svim vremenskim uvjetima",
		answer:
			"Ploviti tako da vjetar i valovi udaraju u pramac do 30 stupnjeva lijevo ili desno, ne dozvoliti dolazak vjetra i valova po boku.Pristajati pramcem u vjetar, a ako to nije moguće okrenuti brodicu na sidru, pa pristati krmom. Kod sidrenja zaustaviti brodicu i na sidru dati konopa 3 puta dubina na kojoj sidrimo, pazeći da ne sidrimo na za to zabranjenim mjestima, iznad cjevovoda, kabela itd.Brodicu treba vezati sa tri konopa: Pramčani, krmeni i krmeni ili pramčani špring (uzda). Obrađuje se detaljnije na tečaju.",
		correction:
			"Za sidrenje po lijepom vremenu uzmi 3 do 4 puta dubinu, a kad puše, daj i više.",
		ref: "IV.3",
		source: "qa-doc",
	},
	{
		id: "qa-036",
		area: "sigurnost-prva-pomoc",
		level: "B",
		prompt:
			"Suradnja sa službom za traganje i spašavanje (MRCC) u slučaju opasnosti i onečišćenja mora",
		answer:
			"Maritime Rescue and Coordination Centre - MRCC). U Republici Hrvatskoj MRCC je smješten u Rijeci. TO je nacionalnea središnjice za usklađivanje traganja i spašavanja na moru sa sledećim zadaćama:\n- usklađivati operacije traganja i spašavanja u području nadležnosti službe traganja i spašavanja Republike Hrvatske izvan unutarnjih morskih voda i teritorijalnog mora Republike Hrvatske\n- izravno usklađivati operacije traganja i spašavanja s nacionalnim središnjicama za usklađivanje traganja i spašavanja drugih država\n- pozivati u pomoć spasilačke jedinice drugih država\n- dopustiti ulazak spasilačkih jedinica drugih država u teritorijalno more i unutarnje morske vode Republike Hrvatske za potrebe spašavanja nakon pribavljenog odobrenja takvog postupka od odgovorne osobe Ministarstva unutarnjih poslova Republike Hrvatske\n- odobriti (na temelju zahtjeva nacionalne središnjice za usklađivanje traganja i spašavanja druge države i nakon pribavljenog odobrenja takvog postupka od odgovorne osobe Ministarstva unutarnjih poslova Republike Hrvatske) odlazak spasilačkih jedinica službe traganja i spašavanja Republike Hrvatske u pomoć jedinicama druge države\n- izvješćivati druga ministarstva i državne službe i zatražiti pomoć spasilačkih jedinica i drugih službi u nadležnosti tih ministarstava i državnih službi\n- pozivati u pomoć jedinice u privatnom vlasništvu s čijim vlasnicima su sklopljeni odgovarajući ugovori\n- surađivati i pomagati zrakoplovnoj središnjici za usklađivanje traganja i spašavanja i drugim državnim službama\n- pripremati i provoditi izobrazbu i uvježbavanje traganja i spašavanja, samostalno, u suradnji s pod-središnjicama te u suradnji s nacionalnim središnjicama za usklađivanje traganja i spašavanja drugih država\n- voditi službu izvješćivanja s brodova (Ship Reporting System).\n- upućivati izvješća i upozorenja brodovima u plovidbi sukladno međunarodno prihvaćenim načelima i uputama\n- izvješćivati javnost o pojedinostima vezanim za pojedine operacije, osim ako tu dužnost ne preuzme stožer službe traganja i spašavanja\n- pružiti stručnu pomoć drugim službama i djelatnostima čiji rad izravno utječe na stupanj sigurnosti plovidbe te ako to ni na koji način ne ometa ostale zadaće nacionalne središnjice za usklađivanje traganja i spašavanja\n- Svi učesnici u plovidbi na tel 9155 i na 16.VHF.sve uočene opasnosti i onečišćenja sa točnom pozicijom u najkračem mogućem roku trebaju dojaviti službi i čekati upute za daljnje postupanje.",
		correction:
			"Broj 9155 je stari. MRCC Rijeka danas zoveš na 195, uz 112 i VHF kanal 16.",
		ref: "IV.4",
		source: "qa-doc",
	},
	{
		id: "qa-037",
		area: "sigurnost-prva-pomoc",
		level: "common",
		prompt: "Signali opasnosti",
		answer:
			"Signali opasnosti su: Ispaljivanje crvene rakete ili raketa sa padobranom, aktiviranje buktinje, pucanje u razmacima od 1 min., zvukom ili svjetlom signal S.O.S.,dim, vatra, prekrižena vesla, mahanje rukama od položaja uz tijelo do vodoravnog položaja, neprekidno trubljenje ili fučkanje.Radio-postajom na 16.VHF: MAY-DAY - signal POGIBELJI kada su ugroženi ljudski životi; PAN-PAN (HITNOST) kada je ugrožena sigurnost broda i osoba; SECURITE (SIGURNOST) kada je ugrožena sigurnost plovidbe",
		correction:
			"Prekrižena vesla nisu na međunarodnom popisu signala pogibelji (COLREG, Dodatak IV).",
		ref: "IV.5",
		source: "qa-doc",
	},
	{
		id: "qa-038",
		area: "sigurnost-prva-pomoc",
		level: "B",
		prompt: "Preživljavanje na moru",
		answer:
			"Pri padu u more ako nemate prsluk na sebi, a pri ruci vam je,o dmah ga treba obući i povući vrpcu, tako da se napuni ugljičnim dioksidom. Ne zaboraviti svako malo provjeravati stanje zraka, po potrebi puhnuti u otvor kao što se radi s s zračnim jastukom. Treba potražiti bilo što na čemu se mogže plutati. Iako se sada to čini malo nelogično, ako na sebi imate prsluk za spašavanje, ne preporuča se skidati vašu staru odjeću. Cipele obavezno odmah odbaciti bacite, jer vuku prema dolje.\nBudući da pri temperaturi vode ispod 25 stupnjeva tijelo nije u mogućnosti zadržati tjelesnu temperaturu, nije preporučljivo kretati se zato što se u hladnoj vodi krv brzo povlači iz svojih stijenki i ide održavati važne organe na životu. Ako se osoba kreće krv se ubrzano hladi. Dobro je staviti kapu na glavu jer se tako zadržava tjelesna toplina.\nAko je temperatura mora ravna ništici, statistički gledano, ostaje 90 minuta do smrti uzrokovane smrzavanjem.",
		ref: "IV.6",
		source: "qa-doc",
	},
	{
		id: "qa-039",
		area: "sigurnost-prva-pomoc",
		level: "B",
		prompt: "Upotreba sredstava za spašavanje",
		answer:
			"Sredstva za spašavanje su prsluci (prsluk odobrenog tipa mora biti opremljen fučkaljkom (zviždaljkom) i baterijskom svjetiljkom), kolutovi za spašavanje, splavi, brodice.Svi moraju biti propisanog i odobrenog tipa.",
		correction:
			"Prema tablici opreme zviždaljka i samoupaljivo svjetlo na prsluku obavezni su u područjima II i I i na brodicama bržim od 20 čvorova koje plove noću.",
		ref: "IV.7",
		source: "qa-doc",
	},
	{
		id: "qa-040",
		area: "sigurnost-prva-pomoc",
		level: "B",
		prompt: "Pružanje prve pomoći",
		answer:
			"Uvažava se vozačka dozvola. Na brodici postoje termički (ispušna grana motora, požar), mehanički (padovi, udarci u dijelove opreme) i kemijski (kiselina iz akumulatora, produkti izgaranja) izvori ozljeda.Za pružanje prve pomoći koristi se kutija ili ormarić prve pomoći koji se obavezno moraju nalaziti na brodici.",
		ref: "IV.8",
		source: "qa-doc",
	},
	{
		id: "qa-041",
		area: "vhf-radio",
		level: "B",
		prompt:
			"GMDSS-SVJETSKI POMORSKI SUSTAV ZA POGIBAO I SIGURNOST (Global Maritime Distress and Safety System)",
		answer:
			"Osnovna je zamisao Svjetskog pomorskog sustava pogibli i sigurnosti (Global Maritime Distress and Safety System - GMDSS) omogućiti službi potrage i spašavanja (Search and Rescue - SAR) hitno obavješćivanje o brodovima koji se nalaze u pogibli i uzbunjivanje brodova u neposrednoj blizini broda u pogibli, tako da mogu sudjelovati u koordiniranim akcijama potrage i spašavanja. Svim operacijama SAR-a rukovodi Pomorski centar za koordinaciju spašavanja (Maritime Rescue and Coordination Centre - MRCC). U Republici Hrvatskoj MRCC je smješten u Rijeci.\nSustav omogućuje hitno objavljivanje obavijesti iz područja pomorske sigurnosti (Maritime Safety Information - MSI) koje obuhvaćaju navigacijska i meteorološka upozorenja. GMDSS se temelji na satelitskim i zemaljskim komunikacijskim vezama i službama.\nU GMDSS-u se uočavaju 4 područja plovidbe označena sa A1, A2, A3 i A4:\nA1 područje unutar dosega VHF obalne postaje s kojom je moguće stalno DSC uzbunjivanje\nA2 područje koje isključuje područje A1, a unutar je dosega MF obalne postaje s kojom je moguće stalno DSC uzbunjivanje\nA3 područje koje isključuje A1 i A2 područja, a unutar je obuhvata INMARSAT sustava s kojim je moguće stalno uzbunjivanje\nA4 ostala područja izvan područja A1, A2 i A3\nU svim područjima se zahtijeva mogućnost stalnog uzbunjivanja. Ovisno o području kojim plovi, brod mora imati propisanu radioopremu definiranu SOLAS konvencijom (Poglavlje IV). Republika Hrvatska pripada u područje plovidbe A1.",
		ref: "D.1",
		source: "qa-doc",
	},
];

export default studyCards;
