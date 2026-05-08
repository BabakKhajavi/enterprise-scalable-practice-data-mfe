export interface BrandColors {
  primary: string;
  primaryText: string;
  primaryLoader: string;
  primaryContrastText: string;
  primaryHover: string;
  primaryDisabled: string;
  secondary: string;
  secondaryText: string;
  secondaryLoader: string;
  secondaryContrastText: string;
  secondaryHover: string;
  secondaryDisabled: string;
  border: string;
  bgDefault: string;
}

export interface Brand {
  brandId: string;
  tenantId?: string | null;
  slug: string;
  colors: BrandColors;
  fontFamily: string;
  createdAt: number;
  modifiedAt?: number | null;
  modifiedBy?: string | null;
}

export interface BrandConfigColors extends BrandColors {
  iconDefault: string;
  iconDark: string;
  secondarySelectBg: string;
  primarySelectBg: string;
}
