import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AltaDibujoPage } from './alta-dibujo';

@NgModule({
  declarations: [
    AltaDibujoPage,
  ],
  imports: [
    IonicPageModule.forChild(AltaDibujoPage),
  ],
})
export class AltaFirmaPageModule {}
