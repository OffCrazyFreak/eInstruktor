import { Link } from "@tanstack/react-router";
import LegalPage from "@/features/legal/components/legal-page";
import LegalSection from "@/features/legal/components/legal-section";
import { CONTACT_URL } from "@/features/legal/constants/legal";

const SUMMARY = [
	"eInstruktor je besplatno pomagalo za učenje. Nije službena aplikacija Ministarstva ni lučke kapetanije.",
	"Spremnost i probni ispit su procjena, ne jamstvo da ćeš položiti.",
	"Kad se nešto u aplikaciji razlikuje od službenih izvora, vrijede službeni izvori.",
];

export default function TermsPage() {
	return (
		<LegalPage
			eyebrow="UVJETI KORIŠTENJA"
			title="Uvjeti korištenja"
			summary={SUMMARY}
		>
			<LegalSection title="Što je eInstruktor">
				<p>
					eInstruktor je besplatna aplikacija za pripremu ispita za voditelja
					brodice kategorije A i B: kratke lekcije, pitanja za vježbu i probni
					ispit. Koristiš je s računom ili bez njega, bez plaćanja i bez oglasa.
				</p>
				<p>
					Aplikacija nije službeni izvor. Ispit polažeš pred povjerenstvom
					Ministarstva mora, prometa i infrastrukture ili lučke kapetanije, i
					samo oni odlučuju je li položen.
				</p>
			</LegalSection>

			<LegalSection title="Procjena, ne jamstvo">
				<p>
					Spremnost za ispit, slabe teme i rezultat probnog ispita računa
					aplikacija iz tvojih odgovora. To je <strong>procjena</strong>, a ne
					jamstvo da ćeš položiti. Pravi ispit je usmeni, a službenog popisa
					pitanja ni propisanog broja pitanja nema, pa je naš probni ispit
					simulacija, ne službeni format.
				</p>
			</LegalSection>

			<LegalSection title="Odakle je sadržaj">
				<ul>
					<li>
						Lekcije i pitanja za vježbu napisali smo sami, prema Pravilniku o
						brodicama i jahtama (NN 27/05 i izmjene) i Pravilniku o brodicama,
						čamcima i jahtama (NN 13/20, 52/20).
					</li>
					<li>
						Kartice za usmeni ispit preuzete su doslovno iz bilješki s pitanjima
						i odgovorima koje je autor projekta skupio za vlastitu pripremu i
						označene su tim izvorom. Gdje se stari tekst razlikuje od današnjih
						propisa, uz karticu piše što danas vrijedi.
					</li>
					<li>
						Pristojbe, postupak prijave i propisi mogu se promijeniti. Uz
						činjenice piše kad smo ih zadnji put provjerili.
					</li>
				</ul>
				<p>
					Ako se nešto u aplikaciji razlikuje od Narodnih novina, Ministarstva
					ili lučke kapetanije, <strong>vrijede službeni izvori</strong>.
				</p>
			</LegalSection>

			<LegalSection title="Greške u sadržaju">
				<p>
					Trudimo se da sve bude točno, ali greške su moguće. Ako nađeš pogrešan
					odgovor ili zastarjelo pravilo, javi nam putem{" "}
					<a href={CONTACT_URL} target="_blank" rel="noreferrer">
						GitHub repozitorija
					</a>
					.
				</p>
			</LegalSection>

			<LegalSection title="Korištenje i odgovornost">
				<ul>
					<li>Sadržaj koristi za vlastito učenje.</li>
					<li>
						Ne pokušavaj ometati rad aplikacije ni pristupati tuđim podacima.
					</li>
					<li>
						Aplikacija se nudi takva kakva jest. Ne odgovaramo za štetu koja
						nastane oslanjanjem na njezin sadržaj, ni na ispitu ni na moru.
					</li>
					<li>
						Aplikaciju i ove uvjete možemo mijenjati. Datum zadnje izmjene je na
						vrhu stranice.
					</li>
				</ul>
				<p>
					Kako postupamo s tvojim podacima, piše u{" "}
					<Link to="/privatnost">pravilima privatnosti</Link>.
				</p>
			</LegalSection>
		</LegalPage>
	);
}
