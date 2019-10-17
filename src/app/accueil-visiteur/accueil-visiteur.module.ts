import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AccueilVisiteurPage } from './accueil-visiteur.page';

const routes: Routes = [
  {
    path: '',
    component: AccueilVisiteurPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AccueilVisiteurPage]
})
export class AccueilVisiteurPageModule {}
