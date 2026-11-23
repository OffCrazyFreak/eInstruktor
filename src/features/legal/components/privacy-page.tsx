import { Link } from "@tanstack/react-router";
import LegalPage from "@/features/legal/components/legal-page";
import LegalSection from "@/features/legal/components/legal-section";
import { CONTACT_URL } from "@/features/legal/constants/legal";

const SUMMARY = [
	"Bez prijave sve ostaje u tvom pregledniku. Nama ništa ne šaljemo.",
	"S Google prijavom spremamo tvoje ime, e-mail, sliku profila i napredak, da ih vidiš na svakom uređaju.",
	"Račun možeš obrisati kad želiš. Tada brišemo ime, e-mail i sliku, a ostaju samo anonimni odgovori.",
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
					<li>probni ispiti, dani učenja i obavijesti koje si zatvorio</li>
					<li>svijetla ili tamna tema</li>
				</ul>
				<p>
					Ti podaci ne dolaze do nas. Obrišeš ih tako da u pregledniku očistiš
					podatke ove stranice.
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
						učenja, kategoriju i datum ispita
					</li>
					<li>
						podatke o prijavi: kolačić sesije, IP adresu i vrstu preglednika za
						tu sesiju te tehničke ključeve koje Google izdaje za prijavu
					</li>
				</ul>
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
					<li>Google, za prijavu (dobivamo samo ime, e-mail i sliku)</li>
					<li>Netlify, hosting na kojem aplikacija radi</li>
					<li>pružatelj baze podataka u kojoj se čuva napredak s računom</li>
				</ul>
				<p>
					Pružatelj hostinga može kratko čuvati tehničke zapise, poput IP
					adrese, radi sigurnosti i rada servera.
				</p>
			</LegalSection>

			<LegalSection title="Brisanje računa">
				<p>
					Račun možeš obrisati u postavkama računa. Tada brišemo tvoje ime,
					e-mail adresu i sliku profila i odjavljujemo te sa svih uređaja.
					Odgovori na pitanja ostaju u bazi bez ikakve veze s tobom, kao
					anonimna statistika o tome koja su pitanja teška.
				</p>
			</LegalSection>

			<LegalSection title="Tvoja prava">
				<p>
					Možeš tražiti uvid u svoje podatke, ispravak, brisanje ili ograničenje
					obrade. Javi nam se putem{" "}
					<a href={CONTACT_URL} target="_blank" rel="noreferrer">
						GitHub repozitorija
					</a>
					. Ako misliš da podatke obrađujemo protivno propisima, možeš se
					obratiti Agenciji za zaštitu osobnih podataka (AZOP).
				</p>
				<p>
					Pravila korištenja aplikacije su u{" "}
					<Link to="/uvjeti">uvjetima korištenja</Link>.
				</p>
			</LegalSection>
		</LegalPage>
	);
}
