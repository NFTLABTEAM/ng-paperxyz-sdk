import { InjectionToken } from '@angular/core';
import { SupportedChains } from '../types/supported-chains.type';

export interface PaperModuleConfig {
  chainName: SupportedChains;
  checkoutId: string;
}

export const PAPER_CONFIG_TOKEN = new InjectionToken<PaperModuleConfig>(
  'Paper Module Config Token'
);
