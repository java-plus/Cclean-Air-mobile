import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilisateurAuthentification } from '../entities/utilisateur-authentification';
import { NgForm } from '@angular/forms';
import { AuthentificationService } from '../services/authentification.service';
import {MenuController} from '@ionic/angular';

/**
 * Composant gérant la page d'authentification.
 */
@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.page.html',
  styleUrls: ['./authentification.page.scss'],
})

export class AuthentificationPage implements OnInit {

  statutErreur: boolean;
  utilisateur: UtilisateurAuthentification = new UtilisateurAuthentification(null, null);

  /**
   * Constructeur
   * @param service : AuthentificationService
   * @param router : Router
   * @param menu : MenuController
   */
  constructor(private service: AuthentificationService,
              private router: Router,
              private menu: MenuController) { }

  ngOnInit() {
    this.menu.enable(false);
    this.statutErreur = false;
  }

  /**
   * Fait appel a la méthode de service pour lui envoyer les informations de connexion,
   * redirige vers la page de login ou l'accueil (la page de recherche) selon la réponse.
   * @param formAuthentification form
   */
  authentifier(formAuthentification: NgForm): void {
    if (formAuthentification.invalid) {
      this.statutErreur = true;
      return;
    }
    this.service.authentifier(this.utilisateur).subscribe(() => {
      this.router.navigate(['/accueil']);
    }, () => {
      this.router.navigate(['/authentification']);
      this.statutErreur = true;
    });
  }
}
