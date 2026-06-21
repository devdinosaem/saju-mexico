import * as mxPrompts from './mx/prompts.js';
import * as krPrompts from './kr/prompts.js';
import { DICT as mxDict } from './mx/dict.js';
import { DICT as krDict } from './kr/dict.js';

export type Locale = 'kr' | 'mx';

export interface LocaleConfig {
  SYSTEM_PROMPT: string;
  CALL1_PROMPT: string;
  CALL2_PROMPT: string;
  CALL3_PROMPT: string;
  CALL4_PROMPT: string;
  USER_DATA_HEADER: string;
  DICT: Record<string, string>;
}

const configs: Record<Locale, LocaleConfig> = {
  mx: { ...mxPrompts, DICT: mxDict },
  kr: { ...krPrompts, DICT: krDict },
};

export function getLocaleConfig(locale: Locale): LocaleConfig {
  return configs[locale];
}
