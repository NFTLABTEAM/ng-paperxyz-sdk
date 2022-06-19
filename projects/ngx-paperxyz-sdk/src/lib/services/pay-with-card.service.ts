import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { PaperSDKErrorCode } from '../enums/error-code.enum';
import { PaperPayWithCardData } from '../interfaces/pay-with-card-data.interface';
import { PaymentSuccessResult } from '../interfaces/payment-success-result.interface';
import { PaperPopupConfig } from '../interfaces/popup-config.interface';
import { ReviewResult } from '../interfaces/review-result.interface';
import { TransferSuccessResult } from '../interfaces/transfer-success-result.interface';
import { hasKeys } from '../utils/has-keys';
import { PaperEventsHandlerService } from './events-handler.service';

@Injectable({ providedIn: 'root' })
export class PaperPayWithCardService {
  /** Events handler service */
  private eventsHandler!: PaperEventsHandlerService;
  /** This window */
  private window: Window | null = this.document.defaultView;
  /** Payment review window */
  private reviewPaymentPopupWindow: Window | null = null;

  constructor(@Inject(DOCUMENT) private document: Document) {}

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
  public handlePayWithCardError(data: PaperPayWithCardData): void {
    if (!hasKeys(data, 'error', 'code')) {
      return;
    }
    console.error('Error in Paper SDK PayWithCard', data.error);
    const { error, code } = data as { code: PaperSDKErrorCode; error: Error };
    this.eventsHandler.checkoutError.emit({ code, error });
  }

  /**
   * Handles payment success event from iFrame and passes notification to parent component.
   * @param data Data sent from event
   * @returns void
   */
  public handlePaymentSuccess(data: PaperPayWithCardData): void {
    if (!hasKeys(data, 'id')) {
      return;
    }
    const { id } = data as PaymentSuccessResult;
    this.eventsHandler.checkoutPaymentSuccess.observed && this.reviewPaymentPopupWindow?.close();
    this.eventsHandler.checkoutPaymentSuccess.emit({ id });
  }

  /**
   * Handles transfer success event from iFrame and passes notification to parent component.
   * @param data Data sent from event
   * @returns void
   */
  public handleTransferSuccess(data: PaperPayWithCardData): void {
    if (!hasKeys(data, 'id')) {
      return;
    }
    const { id } = data as TransferSuccessResult;
    this.eventsHandler.checkoutTransferSuccess.emit({ id });
  }

  /**
   * Handles notifier of review step and passes to parent component
   * @param data Data sent from event
   * @returns void
   */
  public handleReview(data: PaperPayWithCardData): void {
    if (!hasKeys(data, 'id')) {
      return;
    }
    const { id } = data as ReviewResult;
    this.eventsHandler.checkoutReview.emit({ id });
  }

  /**
   * Handles opening of review / finalize popup
   * @param data Data sent from event
   * @returns void
   */
  public handleOpenReviewPaymentPopupWindow(data: PaperPayWithCardData): void {
    if (!hasKeys(data, 'url', 'width', 'height')) {
      return;
    }
    this.openCenteredPopup({ ...(data as PaperPopupConfig) });
  }

  /**
   * Opens review popup window
   * @param param0 Object containing url, title, width, height of popup
   * @returns void
   */
  public openCenteredPopup({ url, title = 'Paper Checkout', width, height }: PaperPopupConfig) {
    if (!this.window || !this.window.top) {
      console.error('PayWithCard: Window does not exist.');
      return;
    }
    const { top } = this.window;
    const centerPos = (outer: number, top: number) => outer / 2 + top - height / 2;

    this.reviewPaymentPopupWindow = window.open(
      url,
      title,
      `toolbar=no,
      location=no,
      status=no,
      menubar=no,
      scrollbars=yes,
      resizable=yes,
      width=${width},
      height=${height},
      top=${centerPos(top.outerHeight, top.screenY)},
      left=${centerPos(top.outerWidth, top.screenX)}`
    );
  }
}
