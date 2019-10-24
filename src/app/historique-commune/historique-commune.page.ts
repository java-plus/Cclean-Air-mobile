import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { CommuneService } from "../services/commune.service";
import { DonneesLocalesHistorique } from "../entities/DonneesLocalesHistorique";
import { DonneesLocalesRecherchees } from "../entities/DonneesLocalesRecherchees";
import { PolluantDtoVisualisation } from "../entities/PolluantDtoVisualisation";
import { PolluantService } from "../services/polluant.service";
import { DonneesLocalesDto } from "../entities/DonneesLocalesDto";
import { CommuneDtoVisualisation } from "../entities/CommuneDtovisualisation";
import { ConditionMeteoDtoVisualisation } from "../entities/ConditionMeteoDtoVisualisation";
import { Chart } from "chart.js";
import { DatePipe } from "@angular/common";
import { NgForm } from "@angular/forms";
import { Plugins } from "@capacitor/core";

const { Storage } = Plugins;

@Component({
  selector: "app-historique-commune",
  templateUrl: "./historique-commune.page.html",
  styles: []
})
export class HistoriqueCommunePage implements OnInit {
  @ViewChild("lineCanvas", { static: false }) lineCanvas: ElementRef;

  @ViewChild("formulaire", { static: false }) formulaire: NgForm;

  codeInsee: string;

  lineChart: Chart;

  donneesHistorique: DonneesLocalesHistorique[] = [];

  myDate = new Date().toISOString();

  date = new Date();

  datePassee = new Date();

  myLastDate: string;

  donneesRecherchees = new DonneesLocalesRecherchees(null, null, "");
  commune = new CommuneDtoVisualisation("", null);
  meteo = new ConditionMeteoDtoVisualisation(null, null, null);
  polluant: PolluantDtoVisualisation[] = [];

  unite = "";

  donneesLocales: DonneesLocalesDto = new DonneesLocalesDto(
    this.commune,
    this.polluant,
    this.meteo,
    null
  );

  listePolluants: string[];

  affichageFormulaire = true;

  dataTab: number[] = [];

  labels: string[] = [];

  polluantVide = false;

  nomPolluant: string;

  donnneesVides = false;

  erreur: string;

  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private communeService: CommuneService,
    private polluantService: PolluantService,
    private datepipe: DatePipe
  ) {
    this.codeInsee = route.snapshot.paramMap.get("codeInsee");
  }

  ngOnInit() {
    this.datePassee.setDate(this.date.getDate() - 7);
    this.myLastDate = this.datePassee.toISOString();

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.codeInsee = params.get("codeInsee");
      this.polluantService.recupererPolluant().subscribe(donnees => {
        this.listePolluants = donnees;
      });

      this.communeService
        .afficherDonneesLocales(this.codeInsee)
        .subscribe(donnees => {
          this.donneesLocales = donnees;
        });
    });
  }

  /**
   *Méthode qui récupère l'historique en appelant le back, et qui le renvoie sous forme de graphique, puis reset le formulaire
   *
   * @memberof HistoriqueCommunePage
   */
  rechercheHistorique() {
    if (this.donneesRecherchees.dateDebut > this.donneesRecherchees.dateFin) {
      this.erreur = "Veuillez vérifier les dates saisies";
    } else {
      this.loading = true;
      this.communeService
        .afficherHistorique(this.codeInsee, this.donneesRecherchees)
        .subscribe(
          donnees => {
            this.donneesHistorique = donnees;

            this.donneesHistorique.forEach(element => {
              if (element.polluantDtoVisualisation.nom === null) {
                this.polluantVide = true;
              } else {
                this.nomPolluant = element.polluantDtoVisualisation.nom;
                this.polluantVide = false;
              }
              this.unite = element.polluantDtoVisualisation.unite;

              this.dataTab.push(element.polluantDtoVisualisation.valeur);
              const dateFormatee = this.datepipe.transform(
                element.date,
                "dd-MM-yyyy HH:mm"
              );
              this.labels.push(dateFormatee);

              this.lineChart = new Chart(this.lineCanvas.nativeElement, {
                type: "line",
                data: {
                  labels: this.labels,
                  datasets: [
                    {
                      label: this.donneesRecherchees.polluant,
                      fill: false,
                      lineTension: 0.1,
                      backgroundColor: "rgba(75,192,192,0.4)",
                      borderColor: "rgba(75,192,192,1)",
                      borderCapStyle: "butt",
                      borderDash: [],
                      borderDashOffset: 0.0,
                      borderJoinStyle: "miter",
                      pointBorderColor: "rgba(75,192,192,1)",
                      pointBackgroundColor: "#fff",
                      pointBorderWidth: 1,
                      pointHoverRadius: 5,
                      pointHoverBackgroundColor: "rgba(75,192,192,1)",
                      pointHoverBorderColor: "rgba(220,220,220,1)",
                      pointHoverBorderWidth: 2,
                      pointRadius: 1,
                      pointHitRadius: 10,
                      data: this.dataTab,
                      spanGaps: false
                    }
                  ]
                },
                options: {
                  legend: {
                    display: false
                  },
                  tooltips: {
                    callbacks: {
                      label: function (tooltipItem) {
                        return tooltipItem.yLabel;
                      }
                    }
                  }
                }
              });
              this.loading = false;
            });
            if (this.polluantVide === false) {
              this.affichageFormulaire = false;
            }
            if (this.donneesHistorique.length == 0) {
              this.affichageFormulaire = true;
              this.donnneesVides = true;
              this.erreur =
                "Il n'y a pas de données pour les dates et polluant choisis";
            }
            this.formulaire.resetForm();

          },
          err => {
            this.erreur = err.error;
          }
        );
    }
  }

  /**
   *méthode qui retourne vers le formulaire
   *
   * @memberof HistoriqueCommunePage
   */
  retourFormulaire() {
    this.affichageFormulaire = true;
  }
}
