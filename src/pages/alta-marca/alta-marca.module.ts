import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {AltaMarcaPage} from "./alta-marca";

@NgModule({
  declarations: [
    AltaMarcaPage,
  ],
  imports: [
    IonicPageModule.forChild(AltaMarcaPage),
  ],  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class AltaMarcaPageModule {}
