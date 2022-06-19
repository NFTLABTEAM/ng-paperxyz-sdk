import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgPaperXYZSdk } from 'ng-paperxyz-sdk';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ReactiveFormsModule, NgPaperXYZSdk],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
