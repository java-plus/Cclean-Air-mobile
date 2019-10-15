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
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'recherche', loadChildren: './recherche/recherche.module#RecherchePageModule' },
  { path: 'mon-profil', loadChildren: './mon-profil/mon-profil.module#MonProfilPageModule' },
  { path: 'authentification', loadChildren: './authentification/authentification.module#AuthentificationPageModule' },
  { path: 'indicateurs', loadChildren: './indicateurs/indicateurs.module#IndicateursPageModule' },
  { path: 'visualiser-indicateurs', loadChildren: './visualiser-indicateurs/visualiser-indicateurs.module#VisualiserIndicateursPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
