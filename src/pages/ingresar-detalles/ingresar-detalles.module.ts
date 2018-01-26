import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IngresarDetallesPage } from './ingresar-detalles';

@NgModule({
  declarations: [
    IngresarDetallesPage,
  ],
  imports: [
    IonicPageModule.forChild(IngresarDetallesPage),
  ],
})
export class IngresarDetallesPageModule {}
