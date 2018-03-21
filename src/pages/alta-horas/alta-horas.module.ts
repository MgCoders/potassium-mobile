import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AltaHorasPage } from './alta-horas';

@NgModule({
  declarations: [
    AltaHorasPage,
  ],
  imports: [
    IonicPageModule.forChild(AltaHorasPage),
  ],
})
export class AltaHorasPageModule {}
