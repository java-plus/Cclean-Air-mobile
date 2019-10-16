import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CommuneService } from '../services/commune.service';
import { CommuneDtoVisualisation } from '../entities/CommuneDtovisualisation';
import { ConditionMeteoDtoVisualisation } from '../entities/ConditionMeteoDtoVisualisation';
import { PolluantDtoVisualisation } from '../entities/PolluantDtoVisualisation';
import { DonneesLocalesDto } from '../entities/DonneesLocalesDto';

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


  donneesLocales: DonneesLocalesDto = new DonneesLocalesDto(this.commune,
    this.polluant, this.meteo, null);

  erreur: string;

  affichageErreur = false;

  icon: string;

  constructor(private route: ActivatedRoute, private communeService: CommuneService) { this.codeInsee = route.snapshot.paramMap.get('codeInsee'); }


  ngOnInit() {

    this.route.paramMap.subscribe((params: ParamMap) => {

      this.codeInsee = params.get('codeInsee');


      this.communeService.afficherDonneesLocales(this.codeInsee).subscribe(

        donnees => {

          this.donneesLocales = donnees;

          if (this.donneesLocales.conditionMeteo.humidite > 66) {
            this.icon = 'rainy';
          } else {
            this.icon = 'partly-sunny';
          }
          if (this.donneesLocales.conditionMeteo.ensoleillement > 66) {
            this.icon = 'sunny';
          }
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

}
