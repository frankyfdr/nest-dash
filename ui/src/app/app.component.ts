import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import "@phosphor-icons/webcomponents/PhHorse";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ui';
}
