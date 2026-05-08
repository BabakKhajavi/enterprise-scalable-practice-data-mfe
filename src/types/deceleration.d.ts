import type { Brand } from './brand';
declare const module: {
  hot?: {
    accept: (deps?: string | string[], callback?: () => void) => void;
    dispose?: (callback: () => void) => void;
  };
};

declare global {
  interface Window {
    __themeConfig?: Brand;

    __brandSlug?: string;
  }
}

export {};
