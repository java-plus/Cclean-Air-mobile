import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HistoriqueCommunePage } from './historique-commune.page';

const routes: Routes = [
  {
    path: '',
    component: HistoriqueCommunePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HistoriqueCommunePage]
})
export class HistoriqueCommunePageModule {}
