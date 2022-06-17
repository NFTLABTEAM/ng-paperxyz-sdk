import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PaperAngularClientSdkModule } from 'angular-client-sdk';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ReactiveFormsModule, PaperAngularClientSdkModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
