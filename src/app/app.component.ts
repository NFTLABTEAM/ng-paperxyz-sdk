import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PaperSDKErrorCode } from 'ng-paperxyz-sdk';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  control = new FormControl('', [Validators.required, Validators.email]);
  email = '';
  wallet = '';

  onCreateWalletSuccess(walletAddress: string, emailAddress: string): void {
    console.log('App: Create wallet handler: Success.', walletAddress, emailAddress);
    this.email = emailAddress;
    this.wallet = walletAddress;
  }

  onCreateWalletError(code: PaperSDKErrorCode, error: Error): void {
    console.log('App: Create wallet handler: Error.', code, error);
  }

  onCreateWalletVerificationPending(): void {
    console.log('App: Create wallet handler: Pending email verification.');
  }

  onCheckoutPaymentSuccess(id: string): void {
    console.log('App: Checkout payment success.', id);
  }
  onCheckoutTransferSuccess(id: string): void {
    console.log('App: Checkout transfer success.', id);
  }
  onCheckoutReview(id: string): void {
    console.log('App: Checkout review.', id);
  }
  onCheckoutCancel(): void {
    console.log('App: Checkout cancel.');
  }
  onCheckoutError(code: PaperSDKErrorCode, error: Error): void {
    console.log('App: Checkout error.', code, error);
  }
}
