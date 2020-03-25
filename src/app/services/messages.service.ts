import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(public toastController: ToastController) { }

  async showMessage(msg) {
    const toast = await this.toastController.create({
      color: 'tertiary',
      duration: 2000,
      message: msg,
      showCloseButton: true
    });
    toast.present();
  }

  async showErrorMessage(msg) {
    const toast = await this.toastController.create({
      color: 'danger',
      duration: 2000,
      message: msg,
      showCloseButton: true
    });
    toast.present();
  }
}
