import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AltaDibujoPage } from './alta-dibujo';

@NgModule({
  declarations: [
    AltaDibujoPage,
  ],
  imports: [
    IonicPageModule.forChild(AltaDibujoPage),
  ],  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class AltaDibujoPageModule {}
