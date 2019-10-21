import {Component, OnInit} from '@angular/core';
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

    isErreurDeDeconnexion: boolean;
    isDeconnexionOk: boolean;

    constructor(private deconnexionService: DeconnexionService,
                private menu: MenuController,
                private router: Router) {
    }

    /**
     * Méthode redirigeant vers la page d'accueil.
     */
    redigerVersAccueilVisiter(): Promise<boolean> {
        return this.router.navigate(['/accueil-visiteur']);
    }

    ngOnInit(): void {
        this.menu.enable(true);
        this.deconnexionService.deconnecter().subscribe(
            () => {
                this.isDeconnexionOk = true;
                window.setTimeout(() => this.redigerVersAccueilVisiter(),
                    5000);
            },
            () => this.isErreurDeDeconnexion = true
        );
    }
}
