import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MessagesService } from '../services/messages.service';
import { IteractionService } from '../services/iteractions.service';
import { Historico, Status } from '../model/viewModels';

@Component({
  selector: 'reg-interact',
  templateUrl: './registerIteraction.component.html',
  styleUrls: ['./registerIteraction.component.css'],
  providers: [ MessagesService, IteractionService ]
})

export class RegisterIteractionComponent implements OnInit, OnDestroy {

  constructor(
    private route: Router,
    public activateRoute: ActivatedRoute,
    private messages: MessagesService,
    private service: IteractionService
  ) {
    const hoje: string = new Date().toISOString();
    this.historico = this.historico || new Historico();
    this.historico.dataRegistro = hoje;
    this.historico.dataProxima = hoje;
    this.historico.idStatus = 2;
    /** */
    this.customPopoverOptions = {
      cssClass: 'test-css'
    };
  }

  subscr: Subscription;

  customPopoverOptions: any;

  historico: Historico;

  statuses: Status[];

  isSubmitted: boolean;

  ngOnInit() {
    this.subscr = this.activateRoute.paramMap.subscribe((params: ParamMap) => {
      let id: any;
      id = params.get('id') || '0';
      this.historico = this.historico || new Historico();
      this.historico.idOportunidade = (id as number);
    });
    this.loadStatus();
  }

  ngOnDestroy() {
    this.subscr.unsubscribe();
  }

  saveRegister() {
    if (this.isSubmitted) { return; }
    this.isSubmitted = true;
    if (!this.historico || typeof(this.historico) === 'undefined') {
      this.messages.showErrorMessage('Erros nos dados. Recarregue a página.');
      return;
    }
    if (typeof(this.historico.dataRegistro) === 'undefined' || this.historico.dataRegistro === null) {
      this.historico.dataRegistro = new Date().toISOString();
    }
    if (typeof(this.historico.dataProxima) === 'undefined' || this.historico.dataProxima === null) {
      this.historico.dataProxima = this.historico.dataRegistro;
    }
    if (typeof(this.historico.idStatus) === 'undefined' || this.historico.idStatus === 0) {
      this.messages.showErrorMessage('Status precisa ser informado!');
      return;
    }
    if (typeof(this.historico.comentario) === 'undefined' || this.historico.comentario === '') {
      this.messages.showErrorMessage('Histórico precisa ser informado!');
      return;
    }
    if (this.historico.comentario.length > 255) {
      this.messages.showErrorMessage('Histórico excede a 255 caracteres!');
      return;
    }
    if (this.historico.idOportunidade <= 0) {
      this.messages.showErrorMessage('Erros nos dados. Recarregue a página.');
      return;
    }
    this.service.create(this.historico).subscribe((hist: Historico) => {
      this.isSubmitted = false;
      this.historico = hist;
      const self = this;
      const timer: ReturnType<typeof setTimeout> = setTimeout(() => self.cancelRegister(), 2000);
    });
  }

  cancelRegister() {
    this.route.navigate(['/oportunity-list/oportunity-tabs/tabs/iteract', this.historico.idOportunidade]);
  }

  loadStatus() {
    this.service.getAllStatus().subscribe((list: Status[]) => {
      this.statuses = list;
    });
  }
}
