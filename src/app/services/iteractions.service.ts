import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessagesService } from './messages.service';
import { ApiResult, Iteraction, Status, Historico } from '../model/viewModels';

import { Observable } from 'rxjs';
import { throwError, concat, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

// const httpOptions = {
//   headers: new HttpHeaders()
//       .set('Content-Type', 'application/json')
//       .append('Access-Control-Allow-Methods', '*')
//       .append('Access-Control-Allow-Origin', '*')
//       .append('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method')
// };

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
};

@Injectable({
  providedIn: 'root'
})
export class IteractionService {

  // baseUrl = 'http://127.0.0.1/';
  baseUrl = 'http://www.wozzi.com.br/crm/';

  constructor(
    private messages: MessagesService,
    private httpClient: HttpClient
  ) { }

  public getAll(idOport: number): Observable<Iteraction[]> {
    return this.httpClient
      .get(this.baseUrl + 'services/iteractions/getall.php?idoport=' + idOport)
      .map(resp => {
        let apiresult: ApiResult;
        apiresult = resp as ApiResult;
        const interactions = apiresult.data;
        return interactions.map((iteraction) => new Iteraction(iteraction));
      })
      .catch((err: any) => {
        if (err.error.message === 'No iteractions found.') {
          this.messages.showMessage('Não há interações');
          return new Observable<Iteraction[]>();
        }
        this.messages.showErrorMessage('Interações indisponíveis');
        return throwError(new Error(err));
      });
  }

  public getAllStatus(): Observable<Status[]> {
    return this.httpClient
      .get(this.baseUrl + 'services/iteractions/getallstatus.php')
      .map(resp => {
        let apiresult: ApiResult;
        apiresult = resp as ApiResult;
        const statuses = apiresult.data;
        return statuses.map((status) => new Status(status));
      })
      .catch((err: any) => {
        this.messages.showErrorMessage('Status estão indisponíveis');
        return throwError(new Error(err));
      });
  }

  public create(historico: Historico): Observable<Historico> {
    const apiUrl = this.baseUrl + 'services/iteractions/create.php';
    return this.httpClient.post<Historico>(apiUrl, historico, httpOptions).pipe(
      tap((hist: Historico) => {
        this.messages.showMessage('Histórico registrado com sucesso!');
        return hist;
      }),
      catchError((err: any) => {
        this.messages.showErrorMessage('Histórico não foi registrado!');
        return throwError(new Error(err));
      })
    );
  }

  public update(entity: any) {
    //
  }

  public delete(id: number) {
    //
  }
}
