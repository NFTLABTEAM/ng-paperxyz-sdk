import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaperXYZSdk } from '@nftlabsupplies/ngx-paperxyz-sdk';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgxPaperXYZSdk.forRoot({
      chainName: 'Rinkeby',
      checkoutId: '7b2264ab-2533-4bf6-9569-7a5b3af52332',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
