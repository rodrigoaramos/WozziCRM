import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessagesService } from '../services/messages.service';
import { Oportunity } from '../model/viewModels';
import { OportunityService } from '../services/oportunity.service';
import * as moment from 'moment';

@Component({
  selector: 'list-oport',
  templateUrl: './listOportunity.component.html',
  styleUrls: ['./listOportunity.component.css'],
  providers: [ MessagesService, OportunityService ]
})
export class ListOportunityComponent implements OnInit {

  constructor(
    private router: Router,
    private messages: MessagesService,
    private service: OportunityService
  ) { }

  oportunities: Oportunity[];

  ngOnInit() {
    this.loadOportunities();
  }

  loadOportunities() {
    this.service.getAll().subscribe((list: Oportunity[]) => {
      this.oportunities = list;
    });
  }

  detail(id) {
    this.router.navigate(['/oportunity-list/oportunity-tabs/tabs/basic', id]);
  }

  formatDate(dt) {
    return moment(dt).format('DD/MM/YYYY');
  }
}
