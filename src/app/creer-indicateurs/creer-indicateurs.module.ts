import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreerIndicateursPage } from './creer-indicateurs.page';

const routes: Routes = [
  {
    path: '',
    component: CreerIndicateursPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreerIndicateursPage]
})
export class CreerIndicateursPageModule {}
