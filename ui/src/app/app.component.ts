import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import "@phosphor-icons/webcomponents/PhHorse";
import { LoginComponent } from './modules/login/login.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ui';
  Auth: any;
}
