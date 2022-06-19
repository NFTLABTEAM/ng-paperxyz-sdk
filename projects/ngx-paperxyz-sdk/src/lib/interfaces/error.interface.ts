import { PaperSDKErrorCode } from '../enums/error-code.enum';

export interface PaperSDKError {
  /**
   * An enum representing the error encountered.
   * The value is a human-readable, English message describing the error.
   */
  code: PaperSDKErrorCode;
  error: Error;
}
