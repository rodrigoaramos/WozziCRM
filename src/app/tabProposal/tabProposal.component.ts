import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { MessagesService } from '../services/messages.service';
import { ProposalService } from '../services/proposal.service';
import { Proposta } from '../model/viewModels';
import * as moment from 'moment';

registerLocaleData(localePt);

@Component({
  selector: 'tab-proposal',
  templateUrl: 'tabProposal.component.html',
  styleUrls: ['tabProposal.component.css'],
  providers: [ MessagesService, ProposalService ]
})
export class TabProposalComponent implements OnInit, OnDestroy {

  constructor(
      private route: Router,
      public activateRoute: ActivatedRoute,
      private messages: MessagesService,
      private service: ProposalService
  ) { }

  subscr: Subscription;

  id: number;

  propostas: Proposta[];

  ngOnInit() {
    this.subscr = this.activateRoute.paramMap.subscribe((params: ParamMap) => {
      let id: any;
      id = params.get('id') || '0';
      this.id = (id as number);
      if (this.id > 0) {
        this.loadIteractions(this.id);
      }
    });
  }

  ngOnDestroy() {
    this.subscr.unsubscribe();
  }

  loadIteractions(id) {
    this.propostas = Proposta[0];
    this.service.getAll(id).subscribe((list: Proposta[]) => {
      this.propostas = list;
    });
  }

  formatDate(dt) {
    let ddate: moment.Moment;
    ddate = moment(dt);
    return ddate.format('DD/MM/YYYY');
  }

  getSituacao(dias) {
    return (this.isVencida(dias) ? 'Vencida' : 'Ativa');
  }

  isVencida(dias) {
    dias = dias || 0;
    return (dias < 0);
  }
}
