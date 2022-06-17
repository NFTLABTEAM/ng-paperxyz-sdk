import { PaperSDKPayWithCardEventTypes } from './pay-event.type';
import { PaperSDKCreateWalletEventTypes } from './wallet-event.type';

export type PaperCompoundEventTypes =
  | PaperSDKCreateWalletEventTypes
  | PaperSDKPayWithCardEventTypes;
