import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { throwError, concat, of } from 'rxjs';
import { MessagesService } from '../services/messages.service';
import { IteractionService } from '../services/iteractions.service';
import { Iteraction } from '../model/viewModels';
import * as moment from 'moment';

@Component({
  selector: 'tab-iteract',
  templateUrl: 'tabIteraction.component.html',
  providers: [ MessagesService, IteractionService ]
})
export class TabIteractionComponent implements OnInit, OnDestroy {

  constructor(
      private route: Router,
      public activateRoute: ActivatedRoute,
      private messages: MessagesService,
      private service: IteractionService
  ) { }

  subscr: Subscription;

  id: number;

  iteractions: Iteraction[];

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
    this.iteractions = Iteraction[0];
    this.service.getAll(id).subscribe((list: Iteraction[]) => {
      this.iteractions = list;
    });
  }

  addIteract() {
    this.route.navigate(['/oportunity-list/add-iteract', this.id]);
  }

  formatDate(dt) {
    let ddate: moment.Moment;
    ddate = moment(dt);
    return ddate.format('HH:mm') + 'h, ' + ddate.format('DD/MM');
  }
}
