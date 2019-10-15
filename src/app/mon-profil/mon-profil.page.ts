import { Component, OnInit } from '@angular/core';
import { UtilisateurProfil } from '../entities/UtilisateurProfil';
import { Router } from '@angular/router';
import { ProfilService } from '../services/profil.service';

@Component({
  selector: 'app-mon-profil',
  templateUrl: './mon-profil.page.html',
  styleUrls: ['./mon-profil.page.scss'],
})
export class MonProfilPage implements OnInit {

  utilisateur = new UtilisateurProfil('', '', '', '', [], null, '', '', '');
  error: string;
  modif: boolean = false;
  suppression: boolean = false;

  /**
   * Constructeur
   * @param profilService : ProfilService
   * @param router : Router
   */
  constructor(private router: Router, private profilService: ProfilService) { }

  /**
   * Permet d'afficher les données de l'utilisateur à l'initialisation de la page Profil.
   */
  ngOnInit() {
    this.profilService.visualiserProfil().subscribe(utilisateurCo => this.utilisateur = utilisateurCo);
  }

  /**
   * Permet de modifier les informations de l'utilisateur connecté.
   */
  modifierProfil() {
    this.profilService.modifierProfil(this.utilisateur).subscribe(result => { this.modif = true; }, (err: any) => {
      this.error = err.error;
    });
  }

}
