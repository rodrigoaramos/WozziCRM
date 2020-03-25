import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'tabs-oport',
  templateUrl: 'tabsOportunity.component.html'
})
export class TabsOportunityComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) {}

    id: number;

    ngOnInit() {
      let parts: string[];
      parts = this.route.snapshot['_routerState'].url.split('/');
      let id: any;
      id = parts[parts.length - 1] || '0';
      this.id = (id as number);
    }
}
