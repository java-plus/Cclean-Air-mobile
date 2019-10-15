import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-infos-rgpd',
  templateUrl: './infos-rgpd.page.html',
  styleUrls: ['./infos-rgpd.page.scss'],
})
export class InfosRGPDPage implements OnInit {

  constructor(private router: Router) { }

  retournerAPageInscription() {
    this.router.navigate(['/inscription']);
  }

  ngOnInit() {
  }

}
