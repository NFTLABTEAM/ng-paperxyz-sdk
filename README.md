# Paperxyz Angular Components

## Documentation

https://baxelson12.github.io/paper-angular-client-sdk/components/PaperCreateWalletComponent.html

## Usage

Import SDK module in app:

```javascript
import { PaperAngularClientSdkModule } from 'angular-client-sdk';

imports: [... PaperAngularClientSdkModule],
```

Implement in html:

```javascript
<div style="margin-bottom: 1rem; padding: 0.5rem 0">
  <label>Email:</label>
  <input type="text" [formControl]="control" />
</div>
<paper-create-wallet
  [emailAddress]="control.value!"
  [disabled]="!control.valid"
  chainName="Rinkeby"
  (success)="onCreateWalletSuccess($event.walletAddress, $event.emailAddress)"
  (error)="onCreateWalletError($event.code, $event.error)"
  (emailVerificationPending)="onCreateWalletVerificationPending()"
>
  Verify email
</paper-create-wallet>

<br />
<br />

<paper-pay-with-card
  *ngIf="email"
  chainName="Rinkeby"
  checkoutId="7b2264ab-2533-4bf6-9569-7a5b3af52332"
  [recipientWalletAddress]="wallet"
  [emailAddress]="email"
  [quantity]="1"
  (paymentSuccess)="onCheckoutPaymentSuccess($event.id)"
  (transferSuccess)="onCheckoutTransferSuccess($event.id)"
  (review)="onCheckoutReview($event.id)"
  (cancel)="onCheckoutCancel()"
  (error)="onCheckoutError($event.code, $event.error)"
></paper-pay-with-card>
```

Implement in component:

```javascript
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
```
