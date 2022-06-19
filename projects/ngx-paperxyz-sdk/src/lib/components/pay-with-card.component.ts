import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, Inject, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { PAPER_APP_URL } from '../constants/paper-app-url';
import { PaperPayWithCardInputs } from '../interfaces/pay-with-card-inputs.interface';
import { PaperSDKPayWithCardStyleOptions } from '../interfaces/style-options.interface';
import { PaperEventsHandlerService } from '../services/events-handler.service';
import { PaperModuleConfig, PAPER_CONFIG_TOKEN } from '../tokens/config.token';

@Component({
  standalone: true,
  selector: 'paper-pay-with-card',
  imports: [],
  providers: [PaperEventsHandlerService],
  template: ``,
})
export class PaperPayWithCardComponent implements OnInit {
  /** Shorthand concatenation of all inputs */
  @Input() set config(config: PaperPayWithCardInputs) {
    this._config = { ...config, options: { ...config.options } };
  }
  /** Receiving wallet address */
  @Input() set recipientWalletAddress(recipientWalletAddress: string) {
    this._config = { ...this._config, recipientWalletAddress };
  }
  /** Receiving email address */
  @Input() set emailAddress(emailAddress: string) {
    this._config = { ...this._config, emailAddress };
  }
  /** Amount to purchase */
  @Input() set quantity(quantity: number) {
    this._config = { ...this._config, quantity: quantity };
  }
  /** Metadata */
  @Input() set metadata(metadata: Record<string, unknown>) {
    this._config = { ...this._config, metadata };
  }
  /** Checkout style configurations */
  @Input() set options(options: PaperSDKPayWithCardStyleOptions) {
    this._config = { ...this._config, options };
  }

  /** Emit notification on successful payment */
  @Output() paymentSuccess = this.eventsHandler.checkoutPaymentSuccess;
  /** Emit notification on successful transfer of assets */
  @Output() transferSuccess = this.eventsHandler.checkoutTransferSuccess;
  /** Emit notification when at review step */
  @Output() review = this.eventsHandler.checkoutReview;
  /** Emit notification if transaction cancelled */
  @Output() cancel = this.eventsHandler.checkoutCancel;
  /** Emit notification on un-successful checkout */
  @Output() error = this.eventsHandler.checkoutError;

  /** Overall configuration data store */
  private _config!: PaperPayWithCardInputs;
  /** CC iFrame */
  private payWithCardIFrame!: HTMLIFrameElement;

  /** src for iFrame */
  private get requestURL(): string {
    const validKeysOnly = Object.entries(this._config ?? {}).reduce(
      (acc, [k, v]) => (v ? { ...acc, [k]: v } : { ...acc }),
      {}
    );
    const params = new HttpParams({
      fromObject: validKeysOnly,
    });
    return `${PAPER_APP_URL}/sdk/v1/pay-with-card?${params.toString()}`;
  }

  constructor(
    @Inject(PAPER_CONFIG_TOKEN) private configToken: PaperModuleConfig,
    private renderer: Renderer2,
    private element: ElementRef,
    private eventsHandler: PaperEventsHandlerService
  ) {
    this._config = { ...this._config, ...this.configToken };
  }

  ngOnInit(): void {
    this.payWithCardIFrame = this.renderer.createElement('iframe');
    this.renderer.setAttribute(this.payWithCardIFrame, 'src', this.requestURL);
    this.renderer.setAttribute(this.payWithCardIFrame, 'width', '100%');
    this.renderer.setAttribute(this.payWithCardIFrame, 'height', '100%');
    this.renderer.setAttribute(this.payWithCardIFrame, 'allowTransparency', 'true');
    this.renderer.appendChild(this.element.nativeElement, this.payWithCardIFrame);
  }
}
