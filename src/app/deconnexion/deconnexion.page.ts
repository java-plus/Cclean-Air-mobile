import {Component, NgZone, OnInit} from '@angular/core';
import {DeconnexionService} from '../services/deconnexion.service';
import {MenuController} from '@ionic/angular';
import {Router} from '@angular/router';

/**
 * Page gérant la déconnexion de l'utilisateur.
 */
@Component({
    selector: 'app-deconnexion',
    templateUrl: './deconnexion.page.html',
    styleUrls: [],
})
export class DeconnexionPage implements OnInit {

    isErreurDeDeconnexion = false;
    isDeconnexionOk = false;

    constructor(private deconnexionService: DeconnexionService,
                private menu: MenuController,
                private router: Router,
                private zone: NgZone) {
    }

    /**
     * Méthode redirigeant vers la page d'accueil.
     */
    redigerVersAuthentification(): void {
        this.router.navigate(['/authentification']);
    }

    ngOnInit(): void {

        this.zone.run(() => {
            this.deconnexionService.deconnecter().subscribe(
                () => {
                    this.menu.enable(false);
                    this.isDeconnexionOk = true;
                    this.redigerVersAuthentification();
                    // rechargement de la page dans le cas d'un bug de redirection
                    document.location.reload();
                },
                () => this.isErreurDeDeconnexion = true
            );
        });
    }
}
