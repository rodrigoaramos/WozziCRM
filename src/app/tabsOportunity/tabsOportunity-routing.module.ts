import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsOportunityComponent } from './tabsOportunity.component';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsOportunityComponent,
    children: [
      {
        path: 'basic/:id',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tabBasic/tabBasic.module').then(m => m.TabBasicModule)
          }
        ]
      },
      {
        path: 'iteract/:id',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tabIteraction/tabIteraction.module').then(m => m.TabIteractionModule)
          }
        ]
      },
      {
        path: 'proposal/:id',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tabProposal/tabProposal.module').then(m => m.TabProposalModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: 'tabs/basic/:id',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/basic/:id',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
