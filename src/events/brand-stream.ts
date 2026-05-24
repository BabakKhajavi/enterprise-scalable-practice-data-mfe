// shared-state/brand.subject.ts

import { BehaviorSubject } from 'rxjs';
import { Brand } from '../types/brand';

const initialBrand = window.__brandConfig ?? null;

export const brand$ = new BehaviorSubject<Brand | null>(initialBrand);

export const setBrand = (brand: Brand) => {
  window.__brandConfig = brand;
  brand$.next(brand);
};

export const clearBrand = () => {
  window.__brandConfig = undefined;
  brand$.next(null);
};

export const getCurrentBrand = () => {
  return brand$.getValue();
};
