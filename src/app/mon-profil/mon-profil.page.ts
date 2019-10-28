import { Component, OnInit } from '@angular/core';
import { UtilisateurProfil } from '../entities/UtilisateurProfil';
import { Router } from '@angular/router';
import { ProfilService } from '../services/profil.service';
import { Commune } from '../entities/commune';
import { CommuneService } from '../services/commune.service';

@Component({
  selector: 'app-mon-profil',
  templateUrl: './mon-profil.page.html',
  styleUrls: ['./mon-profil.page.scss'],
})
export class MonProfilPage implements OnInit {

  utilisateurInitial = new UtilisateurProfil('', '', '', '', [], null, '', '', '');
  utilisateurTemp = new UtilisateurProfil('', '', '', '', [], null, '', '', '');
  communes = new Commune('', null, '', null, null);
  error: string;
  modif: boolean = false;
  modifMdp: boolean = false;
  suppression: boolean = false;
  message: boolean = false;
  isErreurRecuperationCommunes: boolean;
  listeCommunes: Commune[];

  /**
   * Constructeur
   * @param profilService : ProfilService
   * @param router : Router
   */
  constructor(private router: Router, private profilService: ProfilService, private communeService: CommuneService) { }

  /**
   * Permet d'afficher les données de l'utilisateur à l'initialisation de la page Profil.
   */
  ngOnInit() {
    this.profilService.visualiserProfil().subscribe(utilisateurCo => {
      this.utilisateurInitial = utilisateurCo.clone();
      this.utilisateurTemp = utilisateurCo.clone();

      this.communeService.recupererCommunes()
            .subscribe(
                liste => {
                    this.isErreurRecuperationCommunes = false;
                    this.listeCommunes = liste;
                },
                () => this.isErreurRecuperationCommunes = true
            );
    });
  }

  /**
   * Permet de modifier les informations de l'utilisateur connecté.
   */
  modifierProfil() {
    this.profilService.modifierProfil(this.utilisateurTemp).subscribe(
      result => {
        this.utilisateurInitial = this.utilisateurTemp;
        this.modif = false;
        this.modifMdp = false;
        this.suppression = false;
        this.message = true;
        this.error = '';
      }, (err: any) => {
        this.error = err.error;
      });
  }

  validerSuppression(): void {
    this.profilService.supprimerProfil(this.utilisateurInitial.email).subscribe(result => {
      this.router.navigate(['/authentification']);
      this.suppression = false;
    }, (err: any) => {
      this.error = err.error;
    });
  }

}
