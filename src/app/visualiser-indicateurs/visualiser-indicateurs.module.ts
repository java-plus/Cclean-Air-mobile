import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VisualiserIndicateursPage } from './visualiser-indicateurs.page';

const routes: Routes = [
  {
    path: '',
    component: VisualiserIndicateursPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VisualiserIndicateursPage]
})
export class VisualiserIndicateursPageModule {}
