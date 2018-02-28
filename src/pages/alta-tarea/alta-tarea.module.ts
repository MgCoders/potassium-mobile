import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AltaTareaPage } from './alta-tarea';

@NgModule({
  declarations: [
    AltaTareaPage,
  ],
  imports: [
    IonicPageModule.forChild(AltaTareaPage),
  ],
})
export class AltaTareaPageModule {}
