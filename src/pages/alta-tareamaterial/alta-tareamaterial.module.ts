import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {AltaTareaMaterialPage} from "./alta-tareamaterial";
import {IonicSelectableModule} from "ionic-selectable";

@NgModule({
  declarations: [
   AltaTareaMaterialPage,
  ],
  imports: [
    IonicPageModule.forChild(AltaTareaMaterialPage),
    IonicSelectableModule
  ],  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class AltaTareaMaterialPageModule {}
