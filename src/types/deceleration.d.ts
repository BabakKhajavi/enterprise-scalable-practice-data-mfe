declare const module: {
  hot?: {
    accept: (deps?: string | string[], callback?: () => void) => void;
    dispose?: (callback: () => void) => void;
  };
};
