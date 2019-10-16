import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CommuneService } from '../services/commune.service';
import { DonneesLocalesHistorique } from '../entities/DonneesLocalesHistorique';

@Component({
  selector: 'app-historique-commune',
  templateUrl: './historique-commune.page.html',
  styles: [],
})
export class HistoriqueCommunePage implements OnInit {

  codeInsee: string;

  donneesHistorique = new DonneesLocalesHistorique(null, null, null);

  myDate = new Date().toISOString();

  constructor(private route: ActivatedRoute, private communeService: CommuneService) { this.codeInsee = route.snapshot.paramMap.get('codeInsee'); }

  ngOnInit() {


    this.route.paramMap.subscribe((params: ParamMap) => {

      this.codeInsee = params.get('codeInsee');

      this.communeService.afficherHistorique(this.codeInsee)
        .subscribe(
          donnees => {

            this.donneesHistorique = donnees;
            console.log(this.donneesHistorique);

          }
        );
    });
  }
}
