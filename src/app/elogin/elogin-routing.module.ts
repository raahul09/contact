import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EloginPage } from './elogin.page';

const routes: Routes = [
  {
    path: '',
    component: EloginPage
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EloginPageRoutingModule {}
