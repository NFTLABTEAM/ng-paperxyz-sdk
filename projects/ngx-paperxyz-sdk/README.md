<p align="center">
    <br />
    <a href="https://paper.xyz"><img src="./src/assets/paper-logo.svg" width="100" alt=""/></a>
    <br />
</p>
<h1 align="center">(Unofficial) Paper Angular SDK</h1>
<p align="center">
	<!-- TODO: Update -->
    <!-- <a href="https://www.npmjs.com/package/@paperxyz/react-client-sdk"><img src="https://img.shields.io/github/package-json/v/paperxyz/react-client-sdk?color=red&label=npm&logo=npm" alt="npm version"/></a> -->
    <a href="https://discord.gg/mnUa29J2Fp"><img alt="Join our Discord!" src="https://img.shields.io/discord/936354866358546453.svg?color=7289da&label=discord&logo=discord&style=flat"/></a>
</p>

[Paper](https://paper.xyz) is a developer-first NFT checkout solution that
easily onboards users without wallets or cryptocurrencies.

## Documentation

[Documentation](https://nftlabteam.github.io/ngx-paperxyz-sdk/index.html)

## Installation

Install ngx-paperxyz-sdk with npm:

```bash
npm i @nftlabsupplies/ngx-paperxyz-sdk
```

## Usage/Examples

Import SDK module in app:

```javascript
import { NgxPaperXYZSdk } from '@nftlabsupplies/ngx-paperxyz-sdkk';

imports: [..., NgxPaperXYZSdk],
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
