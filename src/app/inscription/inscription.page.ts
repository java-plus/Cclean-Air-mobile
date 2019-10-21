import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UtilisateurInscription } from '../entities/utilisateur-inscription';
import { NgForm } from '@angular/forms';
import { InscriptionService } from './inscription.service';
import { Router } from '@angular/router';
import { Commune } from '../entities/commune';
import { CommuneService } from '../services/commune.service';

/**
 * Page gérant l'affiche du formulaire d'inscription et les informations sur le
 * stockage des données.
 */
@Component({
    selector: 'app-inscription',
    templateUrl: './inscription.page.html',
    styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {

    champsInvalideMsg = 'Champ invalide';
    motDePasseDeConfirmation: string;
    utilisateur: UtilisateurInscription = new UtilisateurInscription(null,
        null, null, null, ['MEMBRE'],
        null, null, false);
    isErreurCreation = false;
    isFormulaireValide = true;
    isErreurRecuperationCommunes: boolean;
    isRGPDCoche: boolean;
    fonctionnalite = 'create';
    listeCommunes: Commune[];

    /**
     * Constructeur
     * @param inscriptionService : InscriptionService le service gérant les
     * inscriptions
     * @param router : Router
     * @param communeService : CommuneService
     */
    constructor(private inscriptionService: InscriptionService,
        private router: Router,
        private communeService: CommuneService) {
    }

    /**
     * Méthode de création d'un compte qui appelle la méthode dans le service
     * d'inscription.
     */
    creerCompte(formInscription: NgForm): void {
        if (formInscription.invalid) {
            this.isFormulaireValide = false;
            return;
        }
        this.inscriptionService.creerCompte(this.utilisateur).subscribe(
            () => {
                this.isFormulaireValide = true;
                this.isErreurCreation = false;
                this.fonctionnalite = 'affichageCompteCree';
                this.utilisateur = new UtilisateurInscription(null,
                    null, null, null, ['MEMBRE'],
                    null, null, false);
            },
            (error: HttpErrorResponse) => {
                this.isFormulaireValide = true;
                this.isErreurCreation = true;
            }
        );
    }

    /**
     * Méthode affichant le composant des détails sur le rgpd.
     */
    afficherInfosRGPD(): void {
        this.fonctionnalite = 'rgpd';
    }

    /**
     * Méthode affichant le formulaire.
     */
    afficherFormulaire(): void {
        this.fonctionnalite = 'create';
    }

    /**
     * Méthode affichant le message de confirmation de succès de création de
     * compte.
     */
    redirigerVersPageConnexion(): void {
        this.router.navigate(['/authentification']);
    }

    ngOnInit(): void {
        this.communeService.recupererCommunes()
            .subscribe(
                liste => {
                    this.isErreurRecuperationCommunes = false;
                    this.listeCommunes = liste;
                },
                () => this.isErreurRecuperationCommunes = true
            );
    }

}
