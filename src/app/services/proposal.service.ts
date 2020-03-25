import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessagesService } from './messages.service';
import { ApiResult, Proposta } from '../model/viewModels';

import { Observable } from 'rxjs';
import { throwError, concat, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
};

@Injectable({
  providedIn: 'root'
})
export class ProposalService {

  // baseUrl = 'http://127.0.0.1/';
  baseUrl = 'http://www.wozzi.com.br/crm/';

  constructor(
    private messages: MessagesService,
    private httpClient: HttpClient
  ) { }

  public getAll(idop: number): Observable<Proposta[]> {
    return this.httpClient
      .get(this.baseUrl + 'services/proposal/getall.php?idop=' + idop)
      .map(resp => {
        let apiresult: ApiResult;
        apiresult = resp as ApiResult;
        const interactions = apiresult.data;
        return interactions.map((iteraction) => new Proposta(iteraction));
      })
      .catch((err: any) => {
        if (err.error.message === 'No proposals found.') {
          this.messages.showMessage('Não há propostas');
          return new Observable<Proposta[]>();
        }
        this.messages.showErrorMessage('Propostas indisponíveis');
        return throwError(new Error(err));
      });
  }

}
