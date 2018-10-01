import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaMaterialPage } from './lista-material';

@NgModule({
  declarations: [
    ListaMaterialPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaMaterialPage),
  ],  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class ListaMaterialPageModule {}
