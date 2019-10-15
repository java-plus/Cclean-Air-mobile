import {Component} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {UtilisateurInscription} from '../entities/utilisateur-inscription';
import {NgForm} from '@angular/forms';
import {InscriptionService} from './inscription.service';
import {ModalController} from '@ionic/angular';
import {InfosRGPDPage} from './infos-rgpd/infos-rgpd.page';
import {Router} from '@angular/router';

@Component({
    selector: 'app-inscription',
    templateUrl: './inscription.page.html',
    styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage {

    champsInvalideMsg = 'Champ invalide.';
    motDePasseDeConfirmation: string;
    utilisateur: UtilisateurInscription = new UtilisateurInscription(null, null, null, null, ['MEMBRE'], null, null, false);
    isErreurCreation = false;
    isFormulaireValide = true;
    isRGPDCoche: boolean;
    fonctionnalite = 'create';
    erreurMsg: string;

    /**
     * Constructeur
     * @param inscriptionService : InscriptionService le service gérant les inscriptions
     * @param router : Router
     */
    constructor(private inscriptionService: InscriptionService, private router: Router) {
    }

    /**
     * Méthode de création d'un compte qui appelle la méthode dans le service d'inscription.
     */
    creerCompte(formInscription: NgForm) {
        if (formInscription.invalid) {
            this.isFormulaireValide = false;
            return;
        }
        this.inscriptionService.creerCompte(this.utilisateur).subscribe(
            () => {
                this.isFormulaireValide = true;
                this.isErreurCreation = false;
                this.fonctionnalite = 'read';
                this.utilisateur = new UtilisateurInscription(null, null, null, null, ['MEMBRE'], null, null, false);
            },
            (error: HttpErrorResponse) => {
                this.erreurMsg = error.error;
                this.isErreurCreation = true;
            }
        );
    }

    afficherPageRGPD() {
        this.router.navigate(['/inscription/rgpd']);
    }

}
