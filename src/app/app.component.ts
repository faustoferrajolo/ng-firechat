import { Component } from '@angular/core';

import { ChatService } from './providers/chat.service';


// import { AngularFirestore } from '@angular/fire/firestore';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //public chats$: Observable<any[]>;
  constructor(//firestore: AngularFirestore,
              public _cs: ChatService) {

    //this.chats$ = firestore.collection('chats').valueChanges();



  }
}
