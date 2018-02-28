import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeleccionaTareaPage } from './selecciona-tarea';

@NgModule({
  declarations: [
    SeleccionaTareaPage,
  ],
  imports: [
    IonicPageModule.forChild(SeleccionaTareaPage),
  ],
})
export class SeleccionaTareaPageModule {}
