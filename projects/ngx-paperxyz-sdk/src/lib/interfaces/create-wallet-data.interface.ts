/** Possible keys received in a message */
export interface PaperCreateWalletData {
  error?: Error;
  emailAddress?: string;
  walletAddress?: string;
}
