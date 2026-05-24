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
    __brandConfig?: Brand;
    __brandSlug?: string;
    __brandReady?: Promise<void>;
    __POWERED_BY_SHELL__?: boolean;
  }
}

export {};
