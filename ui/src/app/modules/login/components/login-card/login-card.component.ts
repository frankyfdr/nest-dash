import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/molecules/button/button.component';
import { TextInputComponent } from '../../../shared/components/molecules/text-input/text-input.component';
import { InputType } from '../../../shared/components/molecules/text-input/models/input';

@Component({
  selector: 'app-login-card',
  imports: [
    ButtonComponent,
    TextInputComponent,
  ],
  templateUrl: './login-card.component.html',
  styleUrl: './login-card.component.scss'
})
export class LoginCardComponent {

  protected readonly InputType = InputType;
}
