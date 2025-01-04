//Dependancies
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

//SCSS files
import "./mentionslegales.scss";

//Assets
export default function mentionslegales() {
  return (
    <>
      <main className="mentionslegales">
      <Header active={"accueil"} />
        <section className="phoneview"></section>
        <section className="webview">
        <h1>Mentions Légales</h1>
            <article>
              <div className="section">
                <h2>I. Éditeur du site</h2>
                <p>Le site Eye Care (https://www.eyecare.com) est édité dans le cadre d’un projet étudiant ayant pour but de sensibiliser aux problèmes de vue, proposer des tests ophtalmologiques et permettre l’interaction avec des professionnels via un forum.</p>
                <ul>
                  <li>Nom de l’éditeur :Équipe Eye Care</li>
                  <li>Adresse postale : Adresse disponible sur demande pour des raisons de confidentialité.</li>
                  <li>Adresse e-mail : contact@eyecare.com</li>
                  <li>Numéro de téléphone : Non applicable</li>
                </ul>
              </div>
              <div className="section">
                <h2>II. Hébergeur du site</h2>
                <p>L’hébergement du site est assuré par :</p>
                <ul>
                  <li>Nom de l’hébergeur :</li>
                  <li>Adresse postale :</li>
                  <li>Téléphone :</li>
                </ul>
              </div>
              <div className="section">
                <h2>III. Données personnelles</h2>
                <p>Le site Eye Care respecte la réglementation européenne (RGPD) sur la collecte et le traitement des données personnelles.</p>
                <p>Données collectées :</p>
                <p>Lors de l'inscription pour utiliser certaines fonctionnalités (tests ophtalmologiques et forum), nous collectons les informations suivantes :</p>
                <ul>
                  <li>Nom, prénom.</li>
                  <li>Adresse e-mail.</li>
                  <li>Mot de passe (crypté).</li>
                  <li>Historique des tests réalisés sur le site (enregistrés uniquement si l'utilisateur est connecté).</li>
                </ul>
                <div className="section2">
                  <h3>1- Finalité du traitement des données :</h3>
                  <p>Les données personnelles collectées sont utilisées uniquement pour :</p>
                  <ul>
                    <li>Permettre l’accès aux fonctionnalités nécessitant un compte (tests et forum).</li>
                    <li>Fournir un historique des tests réalisés pour l’utilisateur connecté.</li>
                    <li>Permettre la participation aux discussions sur le forum.</li>
                  </ul>
                </div>
                <div className="section2">
                  <h3>2- Base légale :</h3>
                  <p>Les données sont collectées avec le consentement explicite des utilisateurs, qui acceptent ces termes lors de leur inscription.</p>
                </div>
                <div className="section2">
                  <h3>3- Conservation des données :</h3>
                  <ul>
                    <li>Les données personnelles sont conservées tant que le compte utilisateur est actif. Les comptes inactifs sont supprimés après une période de 12 mois d’inactivité.</li>
                    <li>Les utilisateurs peuvent demander la suppression de leurs données à tout moment.</li>
                  </ul>
                </div>
                <div className="section2">
                  <h3>4- Droits des utilisateurs :</h3>
                  <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                  <ul>
                    <li>Droit d’accès, de rectification, de suppression de vos données personnelles.</li>
                    <li>Droit d’opposition au traitement de vos données.</li>
                    <li>Droit à la portabilité de vos données.</li>
                  </ul>
                  <p>Pour exercer vos droits, contactez-nous à : contact@eyecare.com.</p>
                </div>
                <div className="section2">
                  <h3>5- Cookies :</h3>
                  <p>Le site utilise des cookies pour :</p>
                  <ul>
                    <li>Améliorer l’expérience utilisateur.</li>
                    <li>Suivre l’activité des utilisateurs anonymes à des fins statistiques (via Google Analytics ou similaire, si applicable).</li>
                  </ul>
                  <p>Un bandeau de gestion des cookies vous permet de personnaliser vos préférences lors de votre première visite sur le site.</p>
                </div>
              </div>
              <div className="section">
                <h2>IV. Propriété intellectuelle</h2>
                <p>Tous les contenus présents sur le site Eye Care (textes, images, vidéos, logos, etc.) sont protégés par les lois en vigueur sur la propriété intellectuelle.</p>
                <ul>
                  <li>Toute reproduction, représentation, modification ou exploitation, même partielle, des contenus du site est strictement interdite sans autorisation préalable.</li>
                  <li>Les ressources issues de tiers (images libres de droits, vidéos YouTube, etc.) respectent leurs licences respectives.</li>
                </ul>
              </div>
              <div className="section">
                <h2>V. Responsabilité</h2>
                <p>Le site Eye Care est un projet étudiant :</p>
                <ul>
                  <li>Les informations fournies sur les troubles de la vue sont à titre informatif et ne remplacent en aucun cas une consultation médicale.</li>
                  <li>Les tests ophtalmologiques proposés ne constituent pas un diagnostic médical et ne peuvent se substituer à une visite chez un professionnel de santé.</li>
                  <li>L’éditeur décline toute responsabilité en cas de mauvaise interprétation des résultats ou des conseils obtenus sur le site.</li>
                </ul>
                <p>L’éditeur n’est pas responsable des échanges sur le forum, mais s’engage à modérer les propos inappropriés ou contraires à la loi.</p>
              </div>
              <div className="section">
                <h2>VI. Liens externes</h2>
                <p>Le site Eye Care peut contenir des liens hypertextes vers des sites externes.</p>
                <p>L’éditeur ne peut être tenu responsable du contenu ou des pratiques des sites tiers.</p>
              </div>
            </article>
        </section>
      </main>
      <Footer />
    </>
  );
}
