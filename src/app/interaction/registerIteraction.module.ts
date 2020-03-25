import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RegisterIteractionComponent } from './registerIteraction.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: RegisterIteractionComponent }])
  ],
  declarations: [
    RegisterIteractionComponent
  ],
  providers: [
    ToastController
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule]
})
export class RegisterIteractionModule { }
