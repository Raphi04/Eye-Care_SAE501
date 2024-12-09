import { forwardRef } from "react";
import "@google/model-viewer";

interface ModelViewerProps {
  src: string;
  alt: string;
  scale?: string;
  loading: string;
  autoRotate?: boolean;
  autoRotateDelay?: string;
  rotationPerSecond?: string;
  cameraControls?: boolean;
  skyboxImage?: string;
  environmentImage?: string;
  shadowIntensity?: number;
  ar?: boolean;
}

const ModelViewer = forwardRef<HTMLElement, ModelViewerProps>(
  (
    {
      src,
      alt,
      scale,
      loading,
      autoRotate,
      autoRotateDelay,
      rotationPerSecond,
      cameraControls,
      skyboxImage,
      environmentImage,
      shadowIntensity,
      ar,
    },
    ref
  ) => {
    return (
      <model-viewer
        ref={ref}
        src={src}
        scale={scale}
        alt={alt}
        loading={loading}
        auto-rotate={autoRotate ? "true" : undefined}
        auto-rotate-delay={autoRotateDelay}
        rotation-per-second={rotationPerSecond}
        camera-controls={cameraControls ? "true" : undefined}
        skybox-image={skyboxImage}
        environment-image={environmentImage}
        shadow-intensity={shadowIntensity}
        ar={ar ? "true" : undefined}
      ></model-viewer>
    );
  }
);

export default ModelViewer;
