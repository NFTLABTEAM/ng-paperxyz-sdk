import { Inject, ModuleWithProviders, NgModule } from '@angular/core';
import { PaperCreateWalletComponent } from './components/create-wallet.component';
import { PaperPayWithCardComponent } from './components/pay-with-card.component';
import { PaperCreateWalletService } from './services/create-wallet.service';
import { PaperEventsHandlerService } from './services/events-handler.service';
import { PaperPayWithCardService } from './services/pay-with-card.service';
import { PaperModuleConfig, PAPER_CONFIG_TOKEN } from './tokens/config.token';
import { hasKeys } from './utils/has-keys';

@NgModule({
  declarations: [],
  imports: [PaperCreateWalletComponent, PaperPayWithCardComponent],
  providers: [
    PaperEventsHandlerService,
    PaperCreateWalletService,
    PaperPayWithCardService,
    { provide: PAPER_CONFIG_TOKEN, useValue: {} },
  ],
  exports: [PaperCreateWalletComponent, PaperPayWithCardComponent],
})
export class NgxPaperXYZSdk {
  public static forRoot(opts: PaperModuleConfig): ModuleWithProviders<NgxPaperXYZSdk> {
    return {
      ngModule: NgxPaperXYZSdk,
      providers: [{ provide: PAPER_CONFIG_TOKEN, useValue: opts }],
    };
  }

  constructor(@Inject(PAPER_CONFIG_TOKEN) config: PaperModuleConfig) {
    !hasKeys(config, 'chainName', 'chainName') &&
      console.error('Paper: forRoot config object is missing properties!');
  }
}
