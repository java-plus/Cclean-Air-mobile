
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  { path: 'accueil', loadChildren: './accueil/accueil.module#AccueilPageModule' },
  { path: 'mon-profil', loadChildren: './mon-profil/mon-profil.module#MonProfilPageModule' },
  { path: 'authentification', loadChildren: './authentification/authentification.module#AuthentificationPageModule' },
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
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
