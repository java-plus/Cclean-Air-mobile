import { Component, OnInit } from '@angular/core';
import { CommuneIndicateur } from 'src/app/entities/commune-indicateur';
import { IndicateursService } from 'src/app/services/indicateursService';

@Component({
  selector: 'app-visualiser-indicateurs',
  templateUrl: './visualiser-indicateurs.page.html',
  styleUrls: ['./visualiser-indicateurs.page.scss'],
})
export class VisualiserIndicateursPage implements OnInit {

  listeIndicateurs: CommuneIndicateur[];

  indicateurVide = true;

  compteurIndicateurs = true;


  /**
   * constructeur
   * @param indicateursService
   */
  constructor(private indicateursService: IndicateursService) { }


  /**
   * A l'initialisation de la page, la liste des indicateurs se met à jour
   */
  ngOnInit() {
    this.indicateursService.getListeIndicateurs()
      .subscribe(

        result => {
          this.listeIndicateurs = result;
          if (this.listeIndicateurs.length > 0) {
            this.indicateurVide = false;
          }

          if (this.listeIndicateurs.length >= 5) {
            this.compteurIndicateurs = false;
          }

        },
        err => { }
      );

  }

}
