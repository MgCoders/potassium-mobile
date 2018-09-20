import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AltaClientePage } from './alta-cliente';

@NgModule({
  declarations: [
    AltaClientePage,
  ],
  imports: [
    IonicPageModule.forChild(AltaClientePage),
  ],  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class AltaClientePageModule {}
