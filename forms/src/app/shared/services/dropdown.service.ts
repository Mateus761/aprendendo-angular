import { EstadoBr } from './../models/EstadoBr';
import { HttpClient, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadosBr() {
    return this.http.get<EstadoBr>('assets/dados/estadosbr.json').pipe();
  }

}
