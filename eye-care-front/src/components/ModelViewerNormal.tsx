import "@google/model-viewer";

interface modelViewerProps {
  src: string;
  alt: string;
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

export default function ModelViewer({
  src,
  alt,
  loading,
  autoRotate,
  autoRotateDelay,
  rotationPerSecond,
  cameraControls,
  skyboxImage,
  environmentImage,
  shadowIntensity,
  ar,
}: modelViewerProps) {
  return (
    <>
      <model-viewer
        src={src}
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
    </>
  );
}
