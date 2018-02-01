import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoogleFitPage } from './google-fit';

@NgModule({
  declarations: [
    GoogleFitPage,
  ],
  imports: [
    IonicPageModule.forChild(GoogleFitPage),
  ],
})
export class GoogleFitPageModule {}
