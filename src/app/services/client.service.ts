import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessagesService } from './messages.service';
import { Client } from '../model/viewModels';

import { Observable } from 'rxjs';
import { throwError, concat, of } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  // baseUrl = 'http://127.0.0.1/';
  baseUrl = 'http://www.wozzi.com.br/crm/';

  constructor(
    private messages: MessagesService,
    private httpClient: HttpClient
  ) { }

  public getById(idCli: number): Observable<Client> {
      return this.httpClient
      .get(this.baseUrl + 'services/clients/getbyid.php?id=' + idCli)
      .map(response => {
          return new Client(response);
      })
      .catch((err: any) => {
        this.messages.showErrorMessage('Cliente não encontrado');
        return new Observable<Client>();
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
