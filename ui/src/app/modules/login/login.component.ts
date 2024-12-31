import { Component } from '@angular/core';
import { LoginCardComponent } from './components/login-card/login-card.component';

@Component({
  selector: 'app-login',
  imports: [
    LoginCardComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
