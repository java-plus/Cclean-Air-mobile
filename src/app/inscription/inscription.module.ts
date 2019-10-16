import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {InscriptionPage} from './inscription.page';
import {RgpdDetailsComponent} from './rgpd-details/rgpd-details.component';

const routes: Routes = [
    {
        path: '',
        component: InscriptionPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [InscriptionPage, RgpdDetailsComponent]
})
export class InscriptionPageModule {
}
