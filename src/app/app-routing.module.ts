import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {ConnexionGuard} from './connexion-guard.service';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'accueil-visiteur',
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
    },

    {
        path: 'recherche',
        loadChildren: () => import('./recherche/recherche.module').then(m => m.RecherchePageModule),
        canActivate: [ConnexionGuard]
    },
    {
        path: 'accueil-visiteur',
        loadChildren: () => import('./accueil-visiteur/accueil-visiteur.module').then(m => m.AccueilVisiteurPageModule)
    },
    {
        path: 'indicateurs',
        loadChildren: () => import('./visualiser-indicateurs/visualiser-indicateurs.module').then(m => m.VisualiserIndicateursPageModule),
        canActivate: [ConnexionGuard]
    },
    {
        path: 'indicateurs/creer',
        loadChildren: () => import('./creer-indicateurs/creer-indicateurs.module').then(m => m.CreerIndicateursPageModule)
    },
    {
        path: 'indicateurs/:codeInsee',
        loadChildren: () => import('./details-indicateurs/details-indicateurs.module').then(m => m.DetailsIndicateursPageModule),
        canActivate: [ConnexionGuard]
    },
    {
        path: 'communes/historique/:codeInsee',
        loadChildren: () => import('./historique-commune/historique-commune.module').then(m => m.HistoriqueCommunePageModule),
        canActivate: [ConnexionGuard]
    },
    {
        path: 'deconnexion',
        loadChildren: () => import('./deconnexion/deconnexion.module').then(m => m.DeconnexionPageModule)
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
