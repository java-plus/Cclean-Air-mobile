import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InfosRGPDPage } from './infos-rgpd.page';

const routes: Routes = [
  {
    path: '',
    component: InfosRGPDPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InfosRGPDPage]
})
export class InfosRGPDPageModule {}
