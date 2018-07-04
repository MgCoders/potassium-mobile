import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {AltaRegistroPage} from "./alta-registro";

@NgModule({
  declarations: [
    AltaRegistroPage,
  ],
  imports: [
    IonicPageModule.forChild(AltaRegistroPage),
  ],
})
export class AltaRegistroPageModule {}
