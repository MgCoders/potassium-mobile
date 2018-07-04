import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ListaRegistroPage} from "./lista-registro";

@NgModule({
  declarations: [
    ListaRegistroPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaRegistroPage),
  ],
})
export class ListaRegistroPageModule {}
