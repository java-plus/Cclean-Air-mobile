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
        path: 'authentification',
        loadChildren: () => import('./authentification/authentification.module').then(m => m.AuthentificationPageModule)
    },
    {
        path: 'accueil-visiteur',
        loadChildren: () => import('./accueil-visiteur/accueil-visiteur.module').then(m => m.AccueilVisiteurPageModule),
    },
    {
        path: 'guard',
        canActivateChild: [ConnexionGuard],
        children: [
            {
                path: 'accueil',
                loadChildren: () => import('./accueil/accueil.module').then(m => m.AccueilPageModule),
            },
            {
                path: 'mon-profil',
                loadChildren: () => import('./mon-profil/mon-profil.module').then(m => m.MonProfilPageModule),
            },
            {
                path: 'recherche',
                loadChildren: () => import('./recherche/recherche.module').then(m => m.RecherchePageModule),
            },
            {
                path: 'indicateurs',
                loadChildren: () => import('./visualiser-indicateurs/visualiser-indicateurs.module')
                    .then(m => m.VisualiserIndicateursPageModule),
            },
            {
                path: 'indicateurs/:codeInsee',
                loadChildren: () => import('./details-indicateurs/details-indicateurs.module').then(m => m.DetailsIndicateursPageModule),
            },
            {
                path: 'communes/historique/:codeInsee',
                loadChildren: () => import('./historique-commune/historique-commune.module').then(m => m.HistoriqueCommunePageModule),
            },
            {
                path: 'indicateurs/creer',
                loadChildren: () => import('./creer-indicateurs/creer-indicateurs.module').then(m => m.CreerIndicateursPageModule)
            },
            {
                path: 'deconnexion',
                loadChildren: () => import('./deconnexion/deconnexion.module').then(m => m.DeconnexionPageModule)
            }
        ]
    },
    {
        path: 'accueil',
        redirectTo: 'guard/accueil',
        pathMatch: 'full'
    },
    {
        path: 'mon-profil',
        redirectTo: 'guard/mon-profil',
        pathMatch: 'full'
    },
    {
        path: 'recherche',
        redirectTo: 'guard/recherche',
        pathMatch: 'full'
    },
    {
        path: 'indicateurs',
        redirectTo: 'guard/indicateurs',
        pathMatch: 'full'
    },
    {
        path: 'indicateurs/:codeInsee',
        redirectTo: 'guard/indicateurs/:codeInsee',
        pathMatch: 'full'
    },
    {
        path: 'communes/historique/:codeInsee',
        redirectTo: 'guard/communes/historique/:codeInsee',
        pathMatch: 'full'
    },
    {
        path: 'indicateurs/creer',
        redirectTo: 'guard/indicateurs/creer',
        pathMatch: 'full'
    },
    {
        path: 'deconnexion',
        redirectTo: 'guard/deconnexion',
        pathMatch: 'full'
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
