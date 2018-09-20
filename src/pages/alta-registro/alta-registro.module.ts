import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {AltaRegistroPage} from "./alta-registro";

@NgModule({
  declarations: [
    AltaRegistroPage,
  ],
  imports: [
    IonicPageModule.forChild(AltaRegistroPage),
  ],  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class AltaRegistroPageModule {}
