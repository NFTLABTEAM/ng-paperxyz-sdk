import { NgModule } from '@angular/core';
import { PaperCreateWalletComponent } from './components/create-wallet.component';
import { PaperPayWithCardComponent } from './components/pay-with-card.component';
import { PaperCreateWalletService } from './services/create-wallet.service';
import { PaperEventsHandlerService } from './services/events-handler.service';
import { PaperPayWithCardService } from './services/pay-with-card.service';

@NgModule({
  declarations: [],
  imports: [PaperCreateWalletComponent, PaperPayWithCardComponent],
  providers: [PaperEventsHandlerService, PaperCreateWalletService, PaperPayWithCardService],
  exports: [PaperCreateWalletComponent, PaperPayWithCardComponent],
})
export class PaperAngularClientSdkModule {}
