
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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

    { path: 'recherche', loadChildren: './recherche/recherche.module#RecherchePageModule' },
    {
        path: 'accueil-visiteur',
        loadChildren: () => import('./accueil-visiteur/accueil-visiteur.module').then(m => m.AccueilVisiteurPageModule)
    },
    {
        path: 'indicateurs',
        loadChildren: () => import('./visualiser-indicateurs/visualiser-indicateurs.module').then(m => m.VisualiserIndicateursPageModule)
    },
    {
        path: 'indicateurs/creer',
        loadChildren: () => import('./creer-indicateurs/creer-indicateurs.module').then(m => m.CreerIndicateursPageModule)
    },
    {
        path: 'indicateurs/:codeInsee',
        loadChildren: () => import('./details-indicateurs/details-indicateurs.module').then(m => m.DetailsIndicateursPageModule)
    },
    {
        path: 'communes/historique/:codeInsee',
        loadChildren: () => import('./historique-commune/historique-commune.module').then(m => m.HistoriqueCommunePageModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
