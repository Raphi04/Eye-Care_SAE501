import GrilleDMLA from "../../assets/grilleDMLA.png";

export default function DmlaTest() {
  return (
    <>
      <div className="textContainer">
        <h2>Test de dégénérescence maculaire liée à l'âge (DMLA)</h2>
        <p>
          Un test de dégénérescence maculaire liée à l'âge sert à détecter une mauvaise condition de
          la partie centrale de l'œil. Cette maladie évolue généralement chez les personnes de plus
          de 50 ans.
        </p>
      </div>

      <div className="textContainer">
        <h2>Déroulement du test</h2>
        <p>
          Avant d’effectuer l’auto-test de la grille d’Amsler veillez vous mettre dans une pièce
          bien éclairée et à porter vos lunettes de vue si vous en avez.
        </p>

        <div className="evenMoreTextContainer">
          <div>
            <h3>Étapes à suivre :</h3>
            <ol>
              <li>Placez la grille à votre distance habituelle de lecture.</li>
              <li>Cachez un œil sans le presser</li>
              <li>Fixez le point centrale</li>
              <li>
                Vérifiez que :
                <ul>
                  <li>les lignes sont droites.</li>
                  <li>les intersections forment des angles droits.</li>
                  <li>Les cadres sont de la même taille</li>
                </ul>
              </li>
              <li>Répétez le test avec l'autre œil.</li>
            </ol>
          </div>
          <img src={GrilleDMLA} alt="grille DMLA" />
        </div>
      </div>

      <div className="textContainer">
        <h2>Diagnostic</h2>
        <p>
          Notre test n'est pas à prendre comme un résultat définitif et correspondant à 100% à votre
          acuité visuelle. Il se peut qu'il n'ait pas pu s'adapter à la morphologie de votre écran
          ou qu'il ait été réalisé dans de mauvaises conditions
          <br />
          <br />
          Si vous remarquez des zones floues, des lignes ondulées, distordues ou interrompues ou
          bien une absence du point noir, il est alors conseillé de consulter un professionnel de
          santé.
        </p>
      </div>

      <div className="textContainer">
        <h2>Pour consulter :</h2>
        <p>
          En cas de suspicion de DMLA, vous pouvez consulter un ophtalmologiste. C'est un médecin
          spécialisé dans la science de l'œil qui pourra vous faire passer ce test dans un cadre
          professionnel. En cas de DMLA avérée, il pourra vous fournir un traitement permettant de
          ralentir sa progression.
        </p>
      </div>
    </>
  );
}
