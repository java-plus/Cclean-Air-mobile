import { Component, OnInit } from '@angular/core';
import { IndicateurCreation } from '../entities/Indicateur-creation';

@Component({
  selector: 'app-indicateurs',
  templateUrl: './indicateurs.page.html',
  styleUrls: ['./indicateurs.page.scss'],
})
export class IndicateursPage implements OnInit {


  etat = 0;
  indicateurCourant: IndicateurCreation;

  constructor() { }

  ngOnInit() {
  }

  get affichage(): number {
    return this.etat;
  }

  changerEtat(event: { etat: number, indicateurCourant: IndicateurCreation }) {
    this.indicateurCourant = event.indicateurCourant;
    this.etat = event.etat;

  }
}
