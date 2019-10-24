import {AfterContentInit, Component, OnInit} from '@angular/core';
import {DeconnexionService} from '../services/deconnexion.service';
import {MenuController} from '@ionic/angular';
import {Router} from '@angular/router';
import {timeout} from 'rxjs/operators';

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
                private router: Router) {
        this.menu.enable(false);
    }

    /**
     * Méthode redirigeant vers la page d'accueil.
     */
    redigerVersAuthentification(): void {
        this.router.navigate(['/authentification']);
    }

    ngOnInit(): void {
        this.menu.enable(false);
        this.deconnexionService.deconnecter().subscribe(
            () => {
                this.isDeconnexionOk = true;
                this.redigerVersAuthentification();
            },
            () => this.isErreurDeDeconnexion = true
        );
    }
}
