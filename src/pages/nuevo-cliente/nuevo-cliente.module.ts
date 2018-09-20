import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevoClientePage } from './nuevo-cliente';

@NgModule({
  declarations: [
    NuevoClientePage,
  ],
  imports: [
    IonicPageModule.forChild(NuevoClientePage),
  ],  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class NuevoClientePageModule {}
