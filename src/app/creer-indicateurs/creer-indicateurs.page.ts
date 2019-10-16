import { Component, OnInit, Output } from '@angular/core';
import { IndicateurCreation } from '../entities/Indicateur-creation';
import { IndicateursService } from '../services/indicateursService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creer-indicateurs',
  templateUrl: './creer-indicateurs.page.html',
  styles: [],
})
export class CreerIndicateursPage implements OnInit {

  /**
   * liste des communes pour lesquelles les infos sont en base
   */
  listeCommunes = [
    "Abbaretz",
    "Aigrefeuille-sur-Maine",
    "Ancenis-Saint-Géréon",
    "Chaumes-en-Retz",
    "Assérac",
    "Avessac",
    "Basse-Goulaine",
    "Batz-sur-Mer",
    "La Bernerie-en-Retz",
    "Besné"
  ];

  indicateurCreation: IndicateurCreation = new IndicateurCreation("", null);

  messageErreur: string = null;


  /**
   * constructeur
   * @param dataService
   * @param indicateursService
   */
  constructor(private indicateursService: IndicateursService, private router: Router) { }

  ngOnInit() { }

  /**
   * méthode qui permet de créer un indicateur
   * @param indicateurCreation
   */
  creerIndicateur(indicateurCreation: IndicateurCreation) {
    console.log(indicateurCreation)
    if (indicateurCreation.alerte == null) {
      indicateurCreation.alerte = false;
    }
    this.indicateursService.enregistrerIndicateur(indicateurCreation).subscribe(
      () => {
        this.router.navigate(["/indicateurs"]);
      },
      err => {
        this.messageErreur = err.error;
      }
    );
  }

  /**
  * méthode qui permet de revenir à l'affichage des indicateurs
  */
  retourIndicateur() {

  }

}
