import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AltaDescripcionPage } from './alta-descripcion';

@NgModule({
  declarations: [
    AltaDescripcionPage,
  ],
  imports: [
    IonicPageModule.forChild(AltaDescripcionPage),
  ],
})
export class AltaDescripcionPageModule {}
