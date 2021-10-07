import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SaloonsPageRoutingModule } from './saloons-routing.module';

import { SaloonsPage } from './saloons.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SaloonsPageRoutingModule
  ],
  declarations: [SaloonsPage]
})
export class SaloonsPageModule {}
