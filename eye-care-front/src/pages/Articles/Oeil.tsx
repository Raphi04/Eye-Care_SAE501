import { useState } from "react";

import ModelViewer from "../../components/ModelViewerNormal";
import Lunette from "../../assets/3D_Model/glasses.glb";
import Emmanuel from "../../assets/3D_Model/emmanuel.glb";
import OIIA from "../../assets/3D_Model/OIIA_CAT.glb";

import "./oeil.scss";

export default function Oeil() {
  const [currentModel, setCurrentModel] = useState<any>(Lunette);

  function changeModel(model: any) {
    setCurrentModel(model);
  }

  return (
    <>
      <main>
        <ModelViewer
          src={currentModel}
          alt="OIIA"
          loading="eager"
          environmentImage="neutral"
          cameraControls
          interaction-prompt="none"
        />

        <button
          onClick={() => {
            changeModel(Emmanuel);
          }}
        >
          Emmanuel
        </button>

        <button
          onClick={() => {
            changeModel(OIIA);
          }}
        >
          OIIA
        </button>

        <button
          onClick={() => {
            changeModel(Lunette);
          }}
        >
          Lunette
        </button>
      </main>
    </>
  );
}
