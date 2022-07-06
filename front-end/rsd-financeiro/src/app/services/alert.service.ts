import { Injectable } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  public mensagem: String = '';

  constructor() { }

  success(mensagem: string) {
    this.mensagem = mensagem;
    let toast = document.getElementById('liveToast');
    let toastObj = new bootstrap.Toast(toast!);
    toastObj.show();
  }

  warning(mensagem: string) {
    this.mensagem = mensagem;
    let toast = document.getElementById('liveToastAlert');
    let toastObj = new bootstrap.Toast(toast!);
    toastObj.show();
  }

  danger(mensagem: string) {
    this.mensagem = mensagem;
    let toast = document.getElementById('liveToastDanger');
    let toastObj = new bootstrap.Toast(toast!);
    toastObj.show();
  }
}
