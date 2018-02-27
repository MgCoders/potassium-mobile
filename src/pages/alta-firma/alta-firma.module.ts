import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AltaFirmaPage } from './alta-firma';

@NgModule({
  declarations: [
    AltaFirmaPage,
  ],
  imports: [
    IonicPageModule.forChild(AltaFirmaPage),
  ],
})
export class AltaFirmaPageModule {}
