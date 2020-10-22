import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EloginPageRoutingModule } from './elogin-routing.module';

import { EloginPage } from './elogin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EloginPageRoutingModule
  ],
  declarations: [EloginPage]
})
export class EloginPageModule {}
