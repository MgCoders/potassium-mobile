import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VerTrabajoPage } from './ver-trabajo';

@NgModule({
  declarations: [
    VerTrabajoPage,
  ],
  imports: [
    IonicPageModule.forChild(VerTrabajoPage),
  ],  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class VerTrabajoPageModule {}
