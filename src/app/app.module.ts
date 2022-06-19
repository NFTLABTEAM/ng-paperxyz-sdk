import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaperXYZSdk } from '@nftlabsupplies/ngx-paperxyz-sdk';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ReactiveFormsModule, NgxPaperXYZSdk],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
