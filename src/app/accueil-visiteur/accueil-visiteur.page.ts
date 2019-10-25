import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from '../services/authentification.service';
import {Router} from '@angular/router';
import {MenuController} from '@ionic/angular';

/**
 * Classe gérant la page d'accueil d'un visiteur (utilisateur non authentifié).
 */
@Component({
    selector: 'app-accueil-visiteur',
    templateUrl: './accueil-visiteur.page.html',
    styles: ['h1 { font-weight: bold; font-size: 40px; }'],
})
export class AccueilVisiteurPage implements OnInit {

  /**
   * Constructeur
   * @param authenticationService : AuthentificationService
   * @param router : Router
   * @param menu : MenuController
   */
    constructor(private authenticationService: AuthentificationService,
                private router: Router,
                private menu: MenuController) {
    }

  /**
   * Sollicite le service d'authentification pour vérifier si l'utilisateur est
   * déjà authentifié et le redirige dans ce cas vers l'accueil des membres.
   */
  renvoyerVersAccueilSiDejaAuthentifie(): void {
        this.authenticationService.verificationEstAuthentifie().subscribe(
            () => this.router.navigate(['/accueil']),
            () => {}
        );
    }

    ngOnInit(): void {
      this.menu.enable(false);
      this.renvoyerVersAccueilSiDejaAuthentifie();
    }

}
