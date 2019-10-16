import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'accueil',
        pathMatch: 'full'
    },
    {
        path: 'inscription',
        loadChildren: () => import('./inscription/inscription.module').then(m => m.InscriptionPageModule)
    },
    {
        path: 'accueil',
        loadChildren: () => import('./accueil/accueil.module').then(m => m.AccueilPageModule)
    },
    {
        path: 'mon-profil',
        loadChildren: () => import('./mon-profil/mon-profil.module').then(m => m.MonProfilPageModule)
    },
    {
        path: 'authentification',
        loadChildren: () => import('./authentification/authentification.module').then(m => m.AuthentificationPageModule)
    },
    {
        path: 'accueil-visiteur',
        loadChildren: () => import('./accueil-visiteur/accueil-visiteur.module').then(m => m.AccueilVisiteurPageModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
