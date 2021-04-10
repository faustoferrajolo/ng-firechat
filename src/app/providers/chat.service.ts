import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensajes } from '../interface/message.interface';

import { map } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensajes>;

  public chats: Mensajes[] = [];
  public usuario: any = {};

  constructor(private afs: AngularFirestore,
              public afAuth: AngularFireAuth) {


                this.afAuth.authState.subscribe( user => {

                  console.log('Estado del usuario', user);
                  if( !user ){
                    return;
                  }

                  this.usuario.nombre = user.displayName;
                  this.usuario.uid = user.uid;

                  //console.log(this.usuario.nombre);
                  //console.log(this.usuario.uid);


                });
               }

  login( sitio: string ) {
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.usuario = {};
    this.afAuth.signOut();
    console.log('logout');
  }


  loadMessages(){

    this.itemsCollection = this.afs.collection<Mensajes>('chats', ref => ref.orderBy('fecha', 'desc').limit( 5 ));


    return this.itemsCollection.valueChanges()
                            .pipe(map( (mensajes: Mensajes[]) =>{
                              this.chats = mensajes;
                              //console.log(this.chats);
                              this.chats = [];
                              for ( let mensaje of mensajes ){
                                this.chats.unshift( mensaje );
                              }
                              return this.chats;
                            }));
  }


  addMessages( text: string ){
    // falta UID
    let mensaje: Mensajes = {
        nombre: this.usuario.nombre,
        mensaje: text,
        fecha: new Date().getTime(),
        uid: this.usuario.uid
    }
    return this.itemsCollection.add( mensaje );


  }
}
