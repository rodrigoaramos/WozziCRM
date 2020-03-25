import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MessagesService } from '../services/messages.service';
import { Oportunity, Client } from '../model/viewModels';
import { OportunityService } from '../services/oportunity.service';
import { ClientService } from '../services/client.service';
import * as moment from 'moment';

@Component({
  selector: 'tab-basic',
  templateUrl: 'tabBasic.component.html',
  providers: [ MessagesService, OportunityService, ClientService ]
})
export class TabBasicComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messages: MessagesService,
    private oportService: OportunityService,
    private clientService: ClientService
  ) { }

  subscr: Subscription;

  oportunity: Oportunity;

  client: Client;

  ngOnInit() {
    this.subscr = this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      let vid: any;
      vid = params.get('id') || '0';
      const id = (vid as number);
      this.oportunity = new Oportunity();
      this.oportunity.id = id;
      this.client = new Client();
      this.loadOportunity();
    });
  }

  ngOnDestroy() {
    this.subscr.unsubscribe();
  }

  formatDate(dt) {
    return moment(dt).format('DD/MM/YYYY');
  }

  getId() {
    return this.oportunity.id || 0;
  }

  getIdFigo() {
    return this.oportunity.idFigo || 0;
  }

  getIdUsuario() {
    return this.oportunity.idUsuario || 0;
  }
  getDataRegistro() {
    return this.formatDate(this.oportunity.dataRegistro || Date());
  }

  getEhLead() {
    const ehlead = this.oportunity.ehLead || 0;
    return (ehlead === 1 ? 'SIM' : 'NÃO');
  }

  getSituacao() {
    return this.oportunity.situacao || 1;
  }

  getIdProduto() {
    return this.oportunity.idProduto || 0;
  }

  getProduto() {
    return this.oportunity.produto || '';
  }

  getIdCliente() {
    return this.oportunity.cliente || 0;
  }

  getCliente() {
    return this.oportunity.cliente || '';
  }

  getDataInteracao() {
    return this.oportunity.dataInteracao || Date();
  }

  getStatus() {
    return this.oportunity.status || '';
  }

  getProgresso() {
    return this.oportunity.progresso || 0;
  }

  getPercentual() {
    return this.oportunity.percentual || '';
  }

  getAndamento() {
    return this.oportunity.andamento || '';
  }

  /** */

  getContato() {
    return this.client.contato || '';
  }

  getCargoFuncao() {
    return this.client.cargoFuncao || '';
  }

  getTelefone() {
    return this.client.telefone || '';
  }

  loadClient() {
    const id = this.getId();
    this.clientService.getById(id).subscribe((client: Client) => {
      this.client = client;
    });
  }

  loadOportunity() {
    const id = this.getId();
    this.oportService.getById(id).subscribe((oport: Oportunity) => {
      this.oportunity = oport;
      this.loadClient();
    });
  }

  goListOports() {
    this.router.navigate(['/oportunity-list']);
  }
}
