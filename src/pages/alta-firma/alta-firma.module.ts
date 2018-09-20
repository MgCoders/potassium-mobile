import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AltaFirmaPage } from './alta-firma';

@NgModule({
  declarations: [
    AltaFirmaPage,
  ],
  imports: [
    IonicPageModule.forChild(AltaFirmaPage),
  ],  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class AltaFirmaPageModule {}
