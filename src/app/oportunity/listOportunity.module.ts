import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ListOportunityComponent } from './listOportunity.component';

const routes: Routes = [
  {
    path: '',
    component: ListOportunityComponent
  },
  {
    path: 'oportunity-tabs',
    loadChildren: () => import('./../tabsOportunity/tabsOportunity.module').then(m => m.TabsOportunityModule)
  },
  {
    path: 'add-iteract/:id',
    loadChildren: () => import('./../interaction/registerIteraction.module').then(m => m.RegisterIteractionModule)
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ListOportunityComponent
  ],
  providers: [
    ToastController
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule]
})
export class ListOportunityModule { }
