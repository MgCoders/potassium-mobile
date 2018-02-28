import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaTareaPage } from './lista-tarea';

@NgModule({
  declarations: [
    ListaTareaPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaTareaPage),
  ],
})
export class ListaTareaPageModule {}
