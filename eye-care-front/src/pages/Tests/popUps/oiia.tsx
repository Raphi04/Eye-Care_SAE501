import { useRef, useState } from "react";
import OIIA from "../../../assets/oiia_cat.png";
import OIIA_MP3 from "../../../assets/OIIA.mp3";

import "./oiia.scss";

export default function oiia() {
  const OIIA_Audio = useRef<HTMLAudioElement>(null);
  const [isOIIA, setIsOIIA] = useState<boolean>(false);

  function handleOIIA() {
    setIsOIIA(true);

    setTimeout(() => {
      setIsOIIA(false);
    }, 500);

    if (OIIA_Audio.current) {
      OIIA_Audio.current.pause();
      OIIA_Audio.current.currentTime = 0;
      OIIA_Audio.current.play();
    }
  }
  return (
    <div>
      <img src={OIIA} alt="OIIA" onClick={handleOIIA} className={isOIIA ? "clicked" : ""} />
      <p>*OIIAI AOIII AI* (GG mon gars)</p>
      <audio src={OIIA_MP3} ref={OIIA_Audio} />
    </div>
  );
}
