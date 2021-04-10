import { Component, OnInit } from '@angular/core';

import { ChatService } from '../../providers/chat.service';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit {

  mensaje: string = "";
  elemento: any;

  constructor( public _cs: ChatService ) {


    this._cs.loadMessages()
            .subscribe( ()=> {
              this.elemento.scrollTop = this.elemento.scrollHeight;
            });

            // => {
            //   console.log(messages);
            // }

   }

   ngOnInit(){

    setTimeout( ()=> {
      this.elemento = document.getElementById('app-mensajes');
    })
   }

  enviarMensaje(){

    //console.log(this.mensaje);

    if( this.mensaje.length === 0 ){

      return;

    }

    this._cs.addMessages( this.mensaje )
            .then( ()=> { this.mensaje = "" })
            .catch( (err)=> { console.error('Error al enviar mensaje ', err)});

  }
}
