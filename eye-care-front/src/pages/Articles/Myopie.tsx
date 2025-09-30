import { Link } from "react-router-dom";

import Glasses from "../../assets/glasses.svg?react";
import myopie from "../../assets/DiseasesImages/myopie.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import CommentsSection from "../../components/CommentsSection/CommentsSection";

export default function Myopie() {
	return (
		<>
			<main>
				<section className="presentationMaladie">
					<article className="textContainer">
						<h2>LA MYOPIE</h2>
						<div className="textImageContainer">
							<p>
								La myopie est un trouble visuel courant qui se traduit par une
								vision claire pour les objets proches mais une difficulté à voir
								nettement les objets éloignés. Cela s'explique par un œil trop
								long ou une courbure excessive de la cornée, ce qui provoque une
								focalisation de l'image en avant de la rétine au lieu de
								directement sur celle-ci. Cette anomalie peut entraîner une gêne
								quotidienne, comme de la difficulté à lire des panneaux de
								signalisation ou à reconnaître des visages à distance. Sans
								correction, la myopie peut causer des maux de tête, une fatigue
								oculaire et augmenter le risque de complications graves, telles
								que le décollement de la rétine.
							</p>
							<img className="imageArticle-myopie" src={myopie}></img>
						</div>
					</article>
				</section>

				<section className="quelquesChiffres">
					<h2>INFORMATIONS CLÉS</h2>
					<article className="chiffresContainer">
						<div className="chiffres">
							<h3>2,6 milliards</h3>
							<p>
								Actuellement, 2,6 milliards de personnes sont myopes dans le
								monde.
							</p>
						</div>
						<div className="chiffres">
							<h3>50 %</h3>
							<p>
								Selon l'OMS, d'ici 2050, 50 % de la population mondiale pourrait
								être myope.
							</p>
						</div>
					</article>
					<article className="chiffresContainer">
						<div className="chiffres">
							<h3>10x plus de risque</h3>
							<p>
								Les personnes myopes présentent un risque 10x plus élevé de
								développer une dégénérescence maculaire myopique.
							</p>
						</div>
						<div className="chiffres">
							<h3>⅓ des français</h3>
							<p>
								⅓ des français souffre de myopie, soit près de 27 millions en
								France, et ce chiffre est en augmentation constante.
							</p>
						</div>
					</article>
				</section>

				<section className="causes">
					<article className="textContainer">
						<h2>LES CAUSES</h2>
						<p>
							La myopie peut être attribuée à divers facteurs, aussi bien
							génétiques, qu'environnementaux. Si l’un des deux parents est
							myopes, il y a une forte probabilité que l’enfant développe
							également ce trouble visuel. Les habitudes modernes jouent
							également un rôle important : les longues périodes passées à lire,
							à regarder un écran ou à effectuer des tâches nécessitant une
							vision de près sollicitent intensément les yeux et peuvent
							favoriser l’apparition de la myopie. De plus, une faible
							exposition à la lumière naturelle entraîne une augmentation du
							risque, en particulier chez les enfants qui passent peu de temps à
							l’extérieur.
						</p>
					</article>
					<article className="glasses">
						<Glasses />
					</article>
				</section>

				<section className="traitements">
					<h2>LES TRAITEMENTS</h2>
					<p>
						La myopie peut être corrigée ou gérée de différentes façons. Les
						lunettes et les lentilles de contact sont les méthodes les plus
						courantes et les plus accessibles pour améliorer la vision. Ces
						dispositifs corrigent la focalisation de la lumière sur la rétine,
						permettant ainsi une vision claire. Pour les patients recherchant
						une solution permanente, les interventions chirurgicales comme le
						LASIK ou la PKR peuvent remodeler la cornée afin de corriger le
						trouble.
					</p>
					<p>
						Pour ralentir la progression de la myopie, notamment chez les
						enfants, des collyres à base d’atropine faiblement dosée ou des
						lentilles spécialisées peuvent être prescrits. Des méthodes comme
						l’orthokératologie, qui consiste à porter des lentilles rigides la
						nuit pour remodeler temporairement la cornée, offrent également une
						alternative efficace. Enfin, adopter de bonnes pratiques visuelles,
						comme faire des pauses régulières lors de l’utilisation des écrans
						et passer plus de temps à l’extérieur, est essentiel pour limiter
						les effets de ce trouble visuel.
					</p>

					<article className="articlesContainer">
						<Link to="/articles/daltonisme" className="articleLink">
							<div>
								<h3>LE DALTONISME</h3>
								<FontAwesomeIcon icon={faArrowRight} />
							</div>
							<p>
								C'est un trouble de la vision des couleurs qui empêche certaines
								personnes....
							</p>
						</Link>

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

						<Link to="/articles/hypermetropie" className="articleLink">
							<div>
								<h3>L'HYPERMÉTROPIE</h3>
								<FontAwesomeIcon icon={faArrowRight} />
							</div>
							<p>
								C'est un trouble de la vision qui se traduit par une difficulté
								à voir nettement....
							</p>
						</Link>
					</article>
				</section>

				<CommentsSection subject="myopie" />
			</main>{" "}
		</>
	);
}
