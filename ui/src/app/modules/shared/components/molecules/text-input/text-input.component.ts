import { Component, input, InputSignal } from '@angular/core';
import { LabelComponent } from '../../atoms/label/label.component';
import { InputType } from './models/input';

@Component({
  selector: 'app-text-input',
  imports: [
    LabelComponent,
  ],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss'
})
export class TextInputComponent {

  inputType:InputSignal<InputType> = input<InputType>(InputType.Text);
  label:InputSignal<string> = input<string>('label');
  placeholder:InputSignal<string> = input<string>('');

}
