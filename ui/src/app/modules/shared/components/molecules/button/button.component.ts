import { Component, input, InputSignal, output, signal, WritableSignal } from '@angular/core';
import { ButtonIconPosition, ButtonItems, ButtonSize, ButtonType } from './models/button';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [
    NgClass,
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  label:InputSignal<string> = input<string>('label');
  buttonType:InputSignal<ButtonType> = input<ButtonType>(ButtonType.Primary);
  buttonSize:InputSignal<ButtonSize> = input<ButtonSize>(ButtonSize.Medium);
  buttonItems:InputSignal<ButtonItems> = input<ButtonItems>(ButtonItems.Text);
  buttonIconPosition:InputSignal<ButtonIconPosition> = input<ButtonIconPosition>(ButtonIconPosition.Left);
  buttonIcon:InputSignal<string|null> = input<string|null>(null);
  buttonDisabled:InputSignal<boolean> = input<boolean>(false);

  buttonClass: WritableSignal<string> = signal('primary medium')

  onButtonClick = output<MouseEvent>()

  onClick(event:MouseEvent){
    event.preventDefault();
    this.onButtonClick.emit(event);
  }


}
