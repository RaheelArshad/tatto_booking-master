import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaloonsPage } from './saloons.page';

const routes: Routes = [
  {
    path: '',
    component: SaloonsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaloonsPageRoutingModule {}
