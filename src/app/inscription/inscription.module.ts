import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {InscriptionPage} from './inscription.page';

const routes: Routes = [
    {
        path: '',
        component: InscriptionPage
    },
    {
        path: 'rgpd',
        loadChildren: () => import('./infos-rgpd/infos-rgpd.module').then(m => m.InfosRGPDPageModule)
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [InscriptionPage]
})
export class InscriptionPageModule {
}
