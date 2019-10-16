import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {ConnexionGuard} from './connexion-guard.service';
import {AccueilPageModule} from './accueil/accueil.module';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'authentification',
        pathMatch: 'full'
    },
    {
        path: 'inscription',
        loadChildren: () => import('./inscription/inscription.module').then(m => m.InscriptionPageModule)
    },
    {
        path: 'accueil',
        canActivate: [ConnexionGuard],
        loadChildren: () => import('./accueil/accueil.module').then(m => m.AccueilPageModule)
    },
    {
        path: 'mon-profil',
        canActivate: [ConnexionGuard],
        loadChildren: () => import('./mon-profil/mon-profil.module').then(m => m.MonProfilPageModule)
    },
    {
        path: 'authentification',
        loadChildren: () => import('./authentification/authentification.module').then(m => m.AuthentificationPageModule)
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
