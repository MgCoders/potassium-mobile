import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaTrabajoPage } from './lista-trabajo';

@NgModule({
  declarations: [
    ListaTrabajoPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaTrabajoPage),
  ],
})
export class ListaTrabajoPageModule {}
