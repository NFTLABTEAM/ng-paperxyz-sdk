import { Component, ElementRef, Inject, Input, Output, Renderer2 } from '@angular/core';
import { PAPER_APP_URL } from '../constants/paper-app-url';
import { HttpParams } from '@angular/common/http';
import { PaperEventsHandlerService } from '../services/events-handler.service';
import { PaperModuleConfig, PAPER_CONFIG_TOKEN } from '../tokens/config.token';

@Component({
  standalone: true,
  selector: 'paper-create-wallet',
  imports: [],
  providers: [PaperEventsHandlerService],
  template: ` <button class="btn" [disabled]="disabled" (click)="verifyEmail()">
    <ng-content></ng-content>
  </button>`,
})
export class PaperCreateWalletComponent {
  /** Paper wallet email */
  @Input() emailAddress!: string;
  /** Button disabled state */
  @Input() disabled = false;
  /** Emit notification on successful email verification */
  @Output() success = this.eventsHandler.emailVerificationSuccess;
  /** Emit notification on un-successful email verification */
  @Output() error = this.eventsHandler.emailVerificationError;
  /** Emit notification if email is pending magic link verification */
  @Output() emailVerificationPending = this.eventsHandler.emailVerificationPending;

  /** src for iFrame */
  private get requestURL(): string {
    if (!this.emailAddress || !this.configToken.chainName) {
      console.warn('CreateWallet: Accessing iFrame URL with missing data.');
    }
    const params = new HttpParams()
      .set('email', this.emailAddress)
      .set('chainName', this.configToken.chainName)
      .set('date', Date.now().toString());
    return `${PAPER_APP_URL}/sdk/v1/verify-email?${params.toString()}`;
  }

  constructor(
    @Inject(PAPER_CONFIG_TOKEN) private configToken: PaperModuleConfig,
    private renderer: Renderer2,
    private element: ElementRef,
    private eventsHandler: PaperEventsHandlerService
  ) {}

  /**
   * Appends iFrame element to component (i.e starts verification process).
   * More favorable than diffing with ngIf because it does not expose unnecessary business logic.
   */
  public verifyEmail(): void {
    const iframe: HTMLIFrameElement = this.renderer.createElement('iframe');
    this.renderer.setAttribute(iframe, 'src', this.requestURL);
    this.renderer.setStyle(iframe, 'width', '0px');
    this.renderer.setStyle(iframe, 'height', '0px');
    this.renderer.setStyle(iframe, 'visibility', 'hidden');

    this.renderer.appendChild(this.element.nativeElement, iframe);
    console.log(this.requestURL);
  }
}
