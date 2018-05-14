import { Component } from '@angular/core';

/**
 * Generated class for the ModalClienteComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'modal-cliente',
  templateUrl: 'modal-cliente.html'
})
export class ModalClienteComponent {

  text: string;

  constructor() {
    console.log('Hello ModalClienteComponent Component');
    this.text = 'Hello World';
  }

}
