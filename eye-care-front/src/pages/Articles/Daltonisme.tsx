import { Link } from "react-router-dom";

import daltonisme from "../../assets/DiseasesImages/daltonisme.png";
import Glasses from "../../assets/glasses.svg?react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import CommentsSection from "../../components/CommentsSection/CommentsSection";

export default function Daltonisme() {
	return (
		<>
			<main>
				<section className="presentationMaladie">
					<article className="textContainer">
						<h2>LE DALTONISME</h2>
						<div className="textImageContainer">
							<p>
								Le daltonisme, ou dyschromatopsie, est un trouble de la vision
								des couleurs qui empêche certaines personnes de distinguer
								correctement certaines teintes. Il existe un spectre du
								daltonisme assez large mais dans la majorité des cas, les
								personnes touchées ont des difficultés à différencier le rouge
								et le vert (Protanopie / Deutéranopie), tandis que d’autres
								formes, concernent les teintes bleu et jaune (Tritanopie). Dans
								des cas plus rares, les personnes ayant une absence de cônes ou
								une altération sévère de leur fonctionnement distinguent leur
								environnement seulement grâce aux différentes intensités
								lumineuses et niveaux de gris (Achromatopsie). Bien que le
								daltonisme ne soit pas une condition invalidante dans la vie
								quotidienne pour beaucoup, il peut poser des défis dans certains
								métiers ou situations nécessitant une discrimination fine des
								couleurs.
							</p>
							<img className="imageArticle-daltonisme" src={daltonisme}></img>
						</div>
					</article>
				</section>

				<section className="quelquesChiffres">
					<h2>INFORMATIONS CLÉS</h2>
					<article className="chiffresContainer">
						<div className="chiffres">
							<h3>≃ 8,5 %</h3>
							<p>
								Environ 8,5 % de la population mondiale est daltonienne, dont 8
								% des hommes et 0,5 % des femmes.
							</p>
						</div>
						<div className="chiffres">
							<h3>1 homme sur 12 protanope</h3>
							<p>
								La forme la plus courante de daltonisme, la protanopie
								(difficulté à percevoir le rouge), touche 1 homme sur 12.
							</p>
						</div>
					</article>
					<article className="chiffresContainer">
						<div className="chiffres">
							<h3>≃ 300 millions</h3>
							<p>
								Environ 300 millions de personnes à travers le monde vivent avec
								une forme de daltonisme.
							</p>
						</div>
						<div className="chiffres">
							<h3>Chromosome X</h3>
							<p>
								Le daltonisme est transmis par le chromosome X, ce qui explique
								pourquoi les hommes, n'ayant pas de second chromosome X pour
								compenser, sont plus fréquemment touchés que les femmes.
							</p>
						</div>
					</article>
				</section>

				<section className="causes">
					<article className="textContainer">
						<h2>LES CAUSES</h2>
						<p>
							Le daltonisme est un trouble de la vision des couleurs
							généralement d’origine génétique, qui affecte les cellules
							photoréceptrices de la rétine, appelées cônes, responsables de la
							perception des couleurs. Ce trouble est transmis par les parents à
							travers une mutation des gènes qui codent les pigments des cônes
							rétiniens. Ces pigments permettent de distinguer les différentes
							longueurs d’onde de lumière associées aux couleurs. Lorsque ces
							pigments sont altérés ou absents, la perception des couleurs
							devient perturbée.
						</p>
						<p>
							Dans certains cas rares, le daltonisme peut être acquis. Cela peut
							résulter de dommages à la rétine ou au nerf optique, causés par
							des maladies telles que le glaucome ou la dégénérescence maculaire
							liée à l’âge (DMLA). Une exposition à certains produits chimiques
							ou médicaments peut également altérer la perception des couleurs,
							entraînant un daltonisme acquis.
						</p>
					</article>
					<article className="glasses">
						<Glasses />
					</article>
				</section>

				<section className="traitements">
					<h2>LES TRAITEMENTS</h2>
					<p>
						Il n’existe actuellement aucun remède définitif pour corriger le
						daltonisme, mais des solutions permettent de compenser les effets de
						ce trouble. Les lunettes ou lentilles spécialement conçues pour les
						daltoniens intègrent des filtres optiques qui amplifient la
						distinction entre certaines teintes, aidant ainsi à améliorer la
						perception des couleurs. Des applications mobiles et logiciels
						peuvent également être utilisés pour ajuster les couleurs sur les
						écrans, rendant ainsi le numérique plus accessible aux personnes
						atteintes.
					</p>
					<p>
						Pour les formes de daltonisme acquises, il est parfois possible de
						traiter la cause sous-jacente, comme une maladie oculaire ou un
						trouble neurologique. Par ailleurs, les avancées en génétique
						laissent espérer, à long terme, des thérapies capables de réparer ou
						remplacer les pigments déficients. Bien que vivre avec le daltonisme
						implique parfois des ajustements, des outils et des stratégies
						adaptés permettent aux personnes concernées de mener une vie
						normale.
					</p>

					<article className="articlesContainer">
						<Link to="/articles/presbytie" className="articleLink">
							<div>
								<h3>LA PRESBYTIE</h3>
								<FontAwesomeIcon icon={faArrowRight} />
							</div>
							<p>
								C'est un trouble visuel lié au vieillissement naturel de l'œil,
								qui se traduit....
							</p>
						</Link>

						<Link to="/articles/astigmatisme" className="articleLink">
							<div>
								<h3>L'ASTIGMATISME</h3>
								<FontAwesomeIcon icon={faArrowRight} />
							</div>
							<p>
								C'est un trouble visuel qui se caractérise par une vision floue
								ou déformée....
							</p>
						</Link>

						<Link to="/articles/dmla" className="articleLink">
							<div>
								<h3>LA DMLA</h3>
								<FontAwesomeIcon icon={faArrowRight} />
							</div>
							<p>
								C'est une affection oculaire chronique qui affecte la macula, la
								partie centrale de la rétine....
							</p>
						</Link>
					</article>
				</section>
				<CommentsSection subject="daltonisme" />
			</main>
		</>
	);
}
