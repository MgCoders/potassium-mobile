import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IngresarFirmaPage } from './ingresar-firma';

@NgModule({
  declarations: [
    IngresarFirmaPage,
  ],
  imports: [
    IonicPageModule.forChild(IngresarFirmaPage),
  ],
})
export class IngresarFirmaPageModule {}
