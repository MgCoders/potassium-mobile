import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {VerificarPuntoControlPage} from "./verificar-puntocontrol";

@NgModule({
  declarations: [
    VerificarPuntoControlPage,
  ],
  imports: [
    IonicPageModule.forChild(VerificarPuntoControlPage),
  ],  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class VerificarPuntoControlPageModule {}
