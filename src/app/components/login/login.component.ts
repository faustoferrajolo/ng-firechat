import { Component } from '@angular/core';
import { ChatService } from '../../providers/chat.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor( public _cs: ChatService) { }


  ingresar( sitio: string ){

    console.log(( sitio ));

    this._cs.login( sitio );

  }
}
