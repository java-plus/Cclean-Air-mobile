import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'accueil',
    pathMatch: 'full'
  },
  {
    path: 'recherche',
    loadChildren: () => import('./recherche/recherche.module').then(m => m.RecherchePageModule)
  },
  {
    path: 'inscription',
    loadChildren: () => import('./inscription/inscription.module').then(m => m.InscriptionPageModule)
  },
  {path: 'accueil', loadChildren: './accueil/accueil.module#AccueilPageModule'},
  {path: 'mon-profil', loadChildren: './mon-profil/mon-profil.module#MonProfilPageModule'},
  {path: 'authentification', loadChildren: './authentification/authentification.module#AuthentificationPageModule'}


];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
