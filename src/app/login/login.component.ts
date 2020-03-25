import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MessagesService } from './../services/messages.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ MessagesService ]
})
export class LoginComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messages: MessagesService
  ) {}

  username: string;
  password: string;

  ngOnInit() {
    this.username = '';
    this.password = '';
  }

  processLogin(f: NgForm) {
    if (this.username === '') {
      this.messages.showErrorMessage('Informe um(a) consultor(a) válido(a)!');
      return;
    }
    if (this.password === '') {
      this.messages.showErrorMessage('Informe uma senha válida!');
      return;
    }
    if (this.username === 'gerencia.admin') {
      if (this.password !== 'admin' && this.password !== 'ADMIN') {
        this.messages.showErrorMessage('Colaborador(a) ou senha inválida!');
        return;
      }
    } else {
      if (this.username === 'ucilene.carvalho') {
        if (this.password !== '12345678') {
          this.messages.showErrorMessage('Colaborador(a) ou senha inválida!');
          return;
        }
      } else {
        if (this.username === 'r') {
          if (this.password !== 'r' && this.password !== 'R') {
            this.messages.showErrorMessage('Colaborador(a) ou senha inválida!');
            return;
          }
        } else {
          this.messages.showErrorMessage('Colaborador(a) ou senha inválida!');
          return;
        }
      }
    }
    this.router.navigateByUrl('oportunity-list');
  }
}
