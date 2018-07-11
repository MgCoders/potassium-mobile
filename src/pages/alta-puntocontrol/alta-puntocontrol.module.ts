import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {AltaPuntoControlPage} from "./alta-puntocontrol";

@NgModule({
  declarations: [
    AltaPuntoControlPage,
  ],
  imports: [
    IonicPageModule.forChild(AltaPuntoControlPage),
  ],
})
export class AltaTareaPageModule {}
