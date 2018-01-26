import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeleccionaClientePage } from './selecciona-cliente';

@NgModule({
  declarations: [
    SeleccionaClientePage,
  ],
  imports: [
    IonicPageModule.forChild(SeleccionaClientePage),
  ],
})
export class SeleccionaClientePageModule {}
