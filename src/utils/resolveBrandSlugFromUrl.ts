// src/utils/resolveBrandSlugFromUrl.ts

export const resolveBrandSlugFromUrl = (): string | null => {
  const url = new URL(window.location.href);

  const querySlug = url.searchParams.get('slug');

  if (querySlug) {
    window.__brandSlug = querySlug;
    return querySlug;
  }

  const hostname = window.location.hostname;

  const isLocalhost =
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname.includes('localhost');

  if (isLocalhost) {
    return window.__brandSlug ?? 'default';
  }

  const parts = hostname.split('.');

  // Example:
  // acme.zaplite.io => acme
  // stage.app.zaplite.io => stage/app should probably map to default ZapLite brand
  const subdomain = parts[0];

  const ignoredSubdomains = ['www', 'app', 'stage', 'dev'];

  if (!subdomain || ignoredSubdomains.includes(subdomain)) {
    return window.__brandSlug ?? 'default';
  }

  window.__brandSlug = subdomain;

  return subdomain;
};
