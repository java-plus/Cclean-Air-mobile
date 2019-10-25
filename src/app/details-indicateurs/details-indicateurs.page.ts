import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CommuneService } from '../services/commune.service';
import { CommuneDtoVisualisation } from '../entities/CommuneDtovisualisation';
import { ConditionMeteoDtoVisualisation } from '../entities/ConditionMeteoDtoVisualisation';
import { PolluantDtoVisualisation } from '../entities/PolluantDtoVisualisation';
import { DonneesLocalesDto } from '../entities/DonneesLocalesDto';
import { CommuneAlerte } from '../entities/commune-alerte';
import { NotificationService } from '../services/notification.service';
import { IndicateursService } from '../services/indicateursService';
import { CommuneIndicateur } from '../entities/commune-indicateur';

@Component({
  selector: 'app-details-indicateurs',
  templateUrl: './details-indicateurs.page.html',
  styles: [],
})
export class DetailsIndicateursPage implements OnInit {

  codeInsee: string;

  commune = new CommuneDtoVisualisation('', null);
  meteo = new ConditionMeteoDtoVisualisation(null, null, null);
  polluant: PolluantDtoVisualisation[] = [];

  listeCommuneAlertes: CommuneAlerte[] = [];

  donneesLocales: DonneesLocalesDto = new DonneesLocalesDto(this.commune,
    this.polluant, this.meteo, null);

  erreur: string;

  affichageErreur = false;

  icon: string;

  iconColor: string;

  alerte = false;
  suppressionIndicateurs = false;
  communeSuppression: CommuneIndicateur;

  listePolluantsAlerte: string[] = [];

  constructor(private route: ActivatedRoute, private communeService: CommuneService, private notificationService: NotificationService,
    private indicateursService: IndicateursService, private router: Router) {
    this.codeInsee = route.snapshot.paramMap.get('codeInsee');
  }


  ngOnInit() {

    this.route.paramMap.subscribe((params: ParamMap) => {

      this.codeInsee = params.get('codeInsee');

      this.communeService.afficherDonneesLocales(this.codeInsee).subscribe(

        donnees => {

          this.donneesLocales = donnees;

          if (this.donneesLocales.conditionMeteo.humidite > 66) {
            this.icon = 'rainy';
            this.iconColor = 'medium';
          } else {
            this.icon = 'partly-sunny';
            this.iconColor = 'medium';
          }
          if (this.donneesLocales.conditionMeteo.ensoleillement > 66) {
            this.icon = 'sunny';
            this.iconColor = 'warning';
          }
          this.notificationService.recupererAlertesPollutionPourTousIndicateurs()
            .subscribe(
              data => {
                this.listeCommuneAlertes = data;
                if (this.listeCommuneAlertes != null) {
                  this.listeCommuneAlertes.forEach(commune => {
                    if (commune.nomCommune === this.donneesLocales.commune.nom) {
                      this.alerte = true;
                      this.listePolluantsAlerte.push(commune.nomPolluant);
                    }
                  });
                }
              }
            );
        }, err => {
          this.erreur = err.error;
          this.affichageErreur = true;

        }
      );

      if (this.donneesLocales === undefined || this.donneesLocales === null) {
        this.affichageErreur = true;
      }
    });
  }

  /**
   * méthode qui sert à passer à l'affichage de la confirmation de suppression d'un indicateur.
   * Elle prend en paramètre l'indicateur à supprimer
   * @param communeIndicateur
   */
  supprimerIndicateur(communeIndicateur: CommuneIndicateur) {
    this.communeSuppression = communeIndicateur;
  }

  /**
   * méthode qui permet d'annuler la suppression d'un indicateur et de revenir à l'affichage des indicateurs
   */
  annulationSuppressionIndicateur() {
    this.suppressionIndicateurs = false;
  }

  /**
   * Methode qui permet la suppression définitive d'un indicateur.
   */
  confirmationSuppressionIndicateur() {
    this.indicateursService
      .supprimerIndicateur(this.donneesLocales.commune.nom)
      .subscribe(
        result => {
          this.router.navigate(["/indicateurs"]);
        },
        err => {
          this.router.navigate(["/indicateurs"]);
        }
      );
  }

}
