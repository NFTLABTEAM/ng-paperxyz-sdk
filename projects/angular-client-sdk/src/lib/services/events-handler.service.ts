import { EventEmitter, Injectable, OnDestroy, Renderer2, RendererFactory2 } from '@angular/core';
import { filter, fromEventPattern, map, Subject, Subscription, takeUntil } from 'rxjs';
import { PaperCreateWalletData } from '../interfaces/create-wallet-data.interface';
import { PaperSDKError } from '../interfaces/error.interface';
import { PaperPayWithCardData } from '../interfaces/pay-with-card-data.interface';
import { PaymentSuccessResult } from '../interfaces/payment-success-result.interface';
import { ReviewResult } from '../interfaces/review-result.interface';
import { TransferSuccessResult } from '../interfaces/transfer-success-result.interface';
import { PaperCompoundEventTypes } from '../types/compound-events.type';
import { PaperSDKEvents } from '../types/events.type';
import { PaperCreateWalletService } from './create-wallet.service';
import { PaperPayWithCardService } from './pay-with-card.service';

@Injectable({ providedIn: 'root' })
export class PaperEventsHandlerService implements OnDestroy {
  /** Emit notification on successful payment */
  public checkoutPaymentSuccess = new EventEmitter<PaymentSuccessResult>();
  /** Emit notification on successful transfer of assets */
  public checkoutTransferSuccess = new EventEmitter<TransferSuccessResult>();
  /** Emit notification when at review step */
  public checkoutReview = new EventEmitter<ReviewResult>();
  /** Emit notification if transaction cancelled */
  public checkoutCancel = new EventEmitter<void>();
  /** Emit notification on un-successful checkout */
  public checkoutError = new EventEmitter<PaperSDKError>();
  /** Emit notification on successful email verification */
  public emailVerificationSuccess = new EventEmitter<{
    emailAddress: string;
    walletAddress: string;
  }>();
  /** Emit notification on un-successful email verification */
  public emailVerificationError = new EventEmitter<PaperSDKError>();
  /** Emit notification if email is pending magic link verification */
  public emailVerificationPending = new EventEmitter<void>();
  /** Subscription cleanup */
  private destroy$ = new Subject<void>();

  /** Event types map */
  private readonly EVENT_TYPES: PaperSDKEvents<PaperCreateWalletData | PaperPayWithCardData> = {
    payWithCardError: (data) => this.pwcService.handlePayWithCardError(data),
    payWithCardCancel: () => this.checkoutCancel.emit(),
    paymentSuccess: (data) => this.pwcService.handlePaymentSuccess(data),
    transferSuccess: (data) => this.pwcService.handleTransferSuccess(data),
    review: (data) => this.pwcService.handleReview(data),
    openReviewPaymentPopupWindow: (data) =>
      this.pwcService.handleOpenReviewPaymentPopupWindow(data),
    verifyEmailEmailVerificationInitiated: () => this.emailVerificationPending.emit(),
    verifyEmailError: (data) => this.cwService.handleVerifyEmailErrorMessage(data),
    verifyEmailSuccess: (data) => this.cwService.handleVerifyEmailSuccess(data),
  };

  constructor(
    private rendererFactory: RendererFactory2,
    private pwcService: PaperPayWithCardService,
    private cwService: PaperCreateWalletService
  ) {
    this.pwcService.registerEventsHandler(this);
    this.cwService.registerEventsHandler(this);
    this.createListener(this.rendererFactory.createRenderer(null, null));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Creates a message listener on window and subscribes to it.
   * @param renderer Renderer2 instance
   */
  createListener(renderer: Renderer2): void {
    let removeListener: () => void;
    const createEventListener = (handler: (e: MessageEvent) => boolean | void) => {
      removeListener = renderer.listen('window', 'message', handler);
    };
    fromEventPattern<MessageEvent>(createEventListener, () => removeListener())
      .pipe(
        filter(({ data }) => data.eventType in this.EVENT_TYPES),
        map(({ data }) => data),
        takeUntil(this.destroy$)
      )
      .subscribe((data) => this.EVENT_TYPES[data.eventType as PaperCompoundEventTypes]!(data));
  }
}
