import { Link } from "@tanstack/react-router";
import LegalPage from "@/features/legal/components/legal-page";
import LegalSection from "@/features/legal/components/legal-section";
import { CONTACT_URL } from "@/features/legal/constants/legal";

const SUMMARY = [
	"Bez prijave napredak ostaje u tvom pregledniku i ne šaljemo ga nikamo. Hosting, kao kod svake web stranice, pri posjetu vidi tvoju IP adresu.",
	"S Google prijavom spremamo tvoje ime, e-mail, sliku profila, Googleov ID računa, ključeve za prijavu i napredak, da ih vidiš na svakom uređaju.",
	"Račun brišeš sam na stranici Račun. Brisanje uklanja Googleov ID, ključeve za prijavu i sve sesije, a ime, e-mail i sliku zamjenjuje anonimnim podacima.",
	"Nemamo oglase ni kolačiće za praćenje.",
];

export default function PrivacyPage() {
	return (
		<LegalPage
			eyebrow="PRAVILA PRIVATNOSTI"
			title="Privatnost"
			summary={SUMMARY}
		>
			<LegalSection title="Tko smo">
				<p>
					eInstruktor je besplatna aplikacija za pripremu ispita za voditelja
					brodice. Vodi je i održava autor projekta, koji je odgovoran za
					podatke opisane na ovoj stranici.
				</p>
			</LegalSection>

			<LegalSection title="Bez prijave: sve je u tvom pregledniku">
				<p>
					Aplikaciju možeš koristiti bez računa. Tada se tvoj napredak sprema
					samo u <strong>localStorage</strong> tvog preglednika, na tvom
					uređaju:
				</p>
				<ul>
					<li>odabrana kategorija (A ili B) i datum ispita, ako ga upišeš</li>
					<li>odgovori na pitanja, završene lekcije i označena pitanja</li>
					<li>
						probni ispiti, značke, dani učenja, oznaka da si položio i
						obavijesti koje si zatvorio
					</li>
					<li>svijetla ili tamna tema</li>
				</ul>
				<p>
					U sessionStorage bilježimo samo je li ti se ponuda za prijavu već
					prikazala, da je ne vidiš više puta u istom posjetu. Kad si
					prijavljen, preglednik pamti i što je već spremljeno na račun, da
					šalje samo promjene.
				</p>
				<p>
					Taj napredak ne šaljemo nikamo. Obrišeš ga tako da u pregledniku
					očistiš podatke ove stranice.
				</p>
			</LegalSection>

			<LegalSection title="S Google prijavom">
				<p>
					Prijava je dobrovoljna i služi samo tome da ti se napredak čuva i
					prenosi na druge uređaje. Kad se prijaviš Googleom, u našu bazu
					podataka spremamo:
				</p>
				<ul>
					<li>ime, e-mail adresu i sliku profila koje nam pošalje Google</li>
					<li>
						napredak: odgovore, lekcije, probne ispite, oznake, značke, dane
						učenja, kategoriju, datum ispita i dan kad si označio da si položio
					</li>
					<li>
						Googleov ID tvog računa i ključeve za prijavu koje Google izdaje
						(access, refresh i ID token)
					</li>
					<li>
						podatke o sesiji: kolačić sesije, IP adresu i vrstu preglednika s
						kojeg si se prijavio
					</li>
				</ul>
				<p>
					Kad se prijaviš, napredak koji je već u pregledniku prenosimo na
					račun, a dok si prijavljen, svaka promjena se nekoliko sekundi kasnije
					sprema i na račun. Tako ga vidiš na svakom uređaju na kojem se
					prijaviš.
				</p>
				<p>
					Kolačić sesije nužan je da bi prijava radila. Lozinku ne spremamo jer
					je nema: prijava ide samo preko Googlea.
				</p>
			</LegalSection>

			<LegalSection title="Zašto i koliko dugo">
				<p>
					Podatke koristimo samo da bi ti aplikacija radila: da vidiš svoj
					napredak, slabe teme i spremnost za ispit. Ne prodajemo ih, ne
					dijelimo ih radi oglasa i ne koristimo analitiku trećih strana.
				</p>
				<p>
					Podaci s računom čuvaju se dok imaš račun. Pravna osnova je usluga
					koju tražiš kad se prijaviš (članak 6. stavak 1. točka (b) Opće uredbe
					o zaštiti podataka, GDPR).
				</p>
			</LegalSection>

			<LegalSection title="Tko još obrađuje podatke">
				<ul>
					<li>
						Google, za prijavu (od njega dobivamo ime, e-mail, sliku i ID)
					</li>
					<li>
						Google Fonts, s kojeg se učitavaju slova stranice, pa Google pri
						svakom posjetu vidi tvoju IP adresu, i kad nisi prijavljen
					</li>
					<li>Netlify, hosting na kojem aplikacija radi</li>
					<li>pružatelj baze podataka u kojoj se čuva napredak s računom</li>
				</ul>
				<p>
					Hosting pri svakom posjetu vidi tvoju IP adresu i može kratko čuvati
					tehničke zapise radi sigurnosti i rada servera, i kad nisi prijavljen.
				</p>
				<p>
					Google i Netlify su tvrtke iz SAD-a, pa se podaci koje obrađuju mogu
					obrađivati i izvan Europske unije.
				</p>
			</LegalSection>

			<LegalSection title="Brisanje računa">
				<p>
					Račun brišeš na stranici <Link to="/racun">Račun</Link> gumbom "Obriši
					račun". Brisanje odmah:
				</p>
				<ul>
					<li>
						uklanja vezu s Googleom: Googleov ID tvog računa i ključeve za
						prijavu (access, refresh i ID token)
					</li>
					<li>
						briše sve sesije, pa si odjavljen na svim uređajima, i zahtjeve za
						potvrdu koji još čekaju
					</li>
					<li>briše kategoriju, datum ispita i oznaku da si položio</li>
					<li>
						ime, e-mail i sliku trajno zamjenjuje anonimnim podacima, pa se više
						ne mogu vratiti
					</li>
				</ul>
				<p>
					Odgovori na pitanja, lekcije, probni ispiti, oznake, značke i dani
					učenja ostaju u bazi bez imena, e-maila i veze s Google računom, kao
					statistika o tome koja su pitanja teška. Napredak u ovom pregledniku
					brišemo samo ako to odabereš u istom koraku. Ako se poslije opet
					prijaviš istim Google računom, dobivaš novi, prazan račun.
				</p>
				<p>
					Ako ne možeš ući u račun, brisanje zatraži preko{" "}
					<a href={CONTACT_URL} target="_blank" rel="noreferrer">
						GitHub repozitorija
					</a>
					: otvori issue s naslovom "Zahtjev za brisanje" i u njega ne upisuj
					osobne podatke. Javit ćemo ti se preko tvog GitHub računa.
				</p>
			</LegalSection>

			<LegalSection title="Tvoja prava">
				<p>
					Možeš tražiti uvid u svoje podatke, ispravak, brisanje ili ograničenje
					obrade. Javi nam se putem{" "}
					<a href={CONTACT_URL} target="_blank" rel="noreferrer">
						GitHub repozitorija
					</a>
					, kao i za brisanje, bez osobnih podataka u samom issueu. Ako misliš
					da podatke obrađujemo protivno propisima, možeš se obratiti Agenciji
					za zaštitu osobnih podataka (AZOP).
				</p>
				<p>
					Pravila korištenja aplikacije su u{" "}
					<Link to="/uvjeti">uvjetima korištenja</Link>.
				</p>
			</LegalSection>
		</LegalPage>
	);
}
