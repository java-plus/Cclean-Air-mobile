import { Injectable } from '@angular/core';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private localNotifications: LocalNotifications) { }

  envoyerNotification(titre: string, contenu: string) {
    this.localNotifications.schedule({
      title: titre,
      text: contenu,
      led: 'FF0000',
      foreground: true,
      icon: 'res://logo.png',
      smallIcon: 'res://ic_stat_logosmall'
    });
  }

}
