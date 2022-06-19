import { Injectable } from '@angular/core';
import { PaperSDKErrorCode } from '../enums/error-code.enum';
import { PaperCreateWalletData } from '../interfaces/create-wallet-data.interface';
import { PaperSDKError } from '../interfaces/error.interface';
import { hasKeys } from '../utils/has-keys';
import { PaperEventsHandlerService } from './events-handler.service';

@Injectable({ providedIn: 'root' })
export class PaperCreateWalletService {
  /** Events handler service */
  private eventsHandler!: PaperEventsHandlerService;

  /**
   * Registers event service for use (prevents circular dependency)
   * TODO: Better way to implement?
   * @param service Events handler service
   */
  public registerEventsHandler(service: PaperEventsHandlerService) {
    this.eventsHandler = service;
  }
  /**
   * Handles error event from iFrame and passes notification to parent component.
   * @param data Data sent from event
   * @returns void
   */
  public handleVerifyEmailErrorMessage(data: PaperCreateWalletData): void {
    if (!hasKeys(data, 'error')) {
      return;
    }
    console.error('Error in Paper SDK VerifyEmail', data.error);
    const { error } = data as PaperSDKError;
    this.eventsHandler.emailVerificationError.emit({
      error,
      code: PaperSDKErrorCode.EmailNotVerified,
    });
  }

  /**
   * Handles success event from iFrame and passes notification to parent component.
   * @param data Data sent from event
   * @returns void
   */
  public handleVerifyEmailSuccess(data: PaperCreateWalletData): void {
    if (!hasKeys(data, 'emailAddress', 'walletAddress')) {
      return;
    }
    const { emailAddress, walletAddress } = data as { emailAddress: string; walletAddress: string };
    this.eventsHandler.emailVerificationSuccess.emit({ emailAddress, walletAddress });
  }
}
