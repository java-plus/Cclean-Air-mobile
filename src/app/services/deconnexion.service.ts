import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

const URL_BACKEND = environment.backendUrl;

@Injectable({
  providedIn: 'root'
})
export class DeconnexionService {

  constructor(private http: HttpClient) { }

  deconnecter(): Observable<any> {
    const httpOptions = {
      withCredentials: true
    };

    return this.http.post(`${URL_BACKEND}/logout`, {}, httpOptions);
  }
}
