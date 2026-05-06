// shared-state/brand.subject.ts

import { BehaviorSubject } from 'rxjs';
import { BrandConfig } from '../types/brand';

declare global {
  interface Window {
    __themeConfig?: BrandConfig;
  }
}

export const brand$ = new BehaviorSubject<BrandConfig | null>(
  window.__themeConfig ?? null,
);

export const setBrand = (brand: BrandConfig) => {
  window.__themeConfig = brand;
  brand$.next(brand);
};

export const getCurrentBrand = () => brand$.getValue();
