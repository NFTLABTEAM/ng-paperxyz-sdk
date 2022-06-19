import { PaperSDKPayWithCardStyleOptions } from './style-options.interface';

export interface PaperPayWithCardInputs {
  checkoutId: string;
  recipientWalletAddress: string;
  emailAddress: string;
  chainName: string;
  quantity?: number;
  metadata?: Record<string, any>;
  options?: PaperSDKPayWithCardStyleOptions;
}
