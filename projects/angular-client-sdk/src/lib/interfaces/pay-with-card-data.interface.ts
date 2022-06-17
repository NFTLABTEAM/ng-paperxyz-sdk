import { PaperSDKErrorCode } from '../enums/error-code.enum';

/** Possible keys received in a message */
export interface PaperPayWithCardData {
  error?: Error;
  code?: PaperSDKErrorCode;
  id?: string;
  url?: string;
  width?: number;
  height?: number;
}
