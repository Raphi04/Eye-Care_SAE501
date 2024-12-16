declare global {
  interface HTMLModelViewerElement extends HTMLElement {
    autoRotate: boolean;
    autoRotateSpeed: string;
    cameraControls: boolean;
    src: string;
    alt: string;
    environmentImage: string;
  }

  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        alt?: string;
        loading?: string;
        scale?: string;
        "auto-rotate"?: boolean | string;
        "auto-rotate-delay"?: string;
        "rotation-per-second"?: string;
        "camera-controls"?: boolean | string;
        "skybox-image"?: string;
        "environment-image"?: string;
        "shadow-intensity"?: string | number;
        ar?: boolean | string;
      };
    }
  }

  declare module "*.glb" {
    const content: string;
    export default content;
  }
}

export {};
