import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessagesService } from './messages.service';
import { ApiResult, Oportunity } from '../model/viewModels';

import { Observable } from 'rxjs';
import { throwError, concat, of } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class OportunityService {

  // baseUrl = 'http://127.0.0.1/';
  baseUrl = 'http://www.wozzi.com.br/crm/';

  constructor(
    private messages: MessagesService,
    private httpClient: HttpClient
  ) { }

  public getAll(): Observable<Oportunity[]> {
    return this.httpClient
      .get(this.baseUrl + 'services/oportunities/getall.php')
      .map(resp => {
        let apiresult: ApiResult;
        apiresult = resp as ApiResult;
        const oportunities = apiresult.data;
        return oportunities.map((oportunity) => new Oportunity(oportunity));
      })
      .catch((err: any) => {
        if (err.error.message === 'No oportunities found.') {
          this.messages.showMessage('Não há oportunidades');
          return new Observable<Oportunity[]>();
        }
        this.messages.showErrorMessage('Oportunidades indisponíveis');
        return throwError(new Error(err));
      });
  }

  public getById(idOport: number): Observable<Oportunity> {
      return this.httpClient
      .get(this.baseUrl + 'services/oportunities/getbyid.php?id=' + idOport)
      .map(response => {
          return new Oportunity(response);
      })
      .catch((err: any) => {
        this.messages.showErrorMessage('Oportunidade não encontrada');
        return new Observable<Oportunity>();
      });
  }

  public create(entity: any) {
    //
  }

  public update(entity: any) {
    //
  }

  public delete(id: number) {
    //
  }

}
