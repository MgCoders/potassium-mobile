import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AltaTrabajoPage } from './alta-trabajo';

@NgModule({
  declarations: [
    AltaTrabajoPage,
  ],
  imports: [
    IonicPageModule.forChild(AltaTrabajoPage),
  ],  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class AltaTrabajoPageModule {}
