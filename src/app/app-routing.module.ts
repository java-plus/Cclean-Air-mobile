import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {ConnexionGuard} from './connexion-guard.service';

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
        loadChildren: () => import('./accueil/accueil.module').then(m => m.AccueilPageModule),
        canActivate: [ConnexionGuard]
    },
    {
        path: 'mon-profil',
        loadChildren: () => import('./mon-profil/mon-profil.module').then(m => m.MonProfilPageModule),
        canActivate: [ConnexionGuard]
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
