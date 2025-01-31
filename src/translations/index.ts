
import { enTranslations } from './en';
import { nlTranslations } from './nl';

export const translations = {
  en: enTranslations,
  nl: nlTranslations,
} as const;

export type TranslationKey = keyof typeof enTranslations;
