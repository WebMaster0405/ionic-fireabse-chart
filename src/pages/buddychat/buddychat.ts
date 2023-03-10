import { Component ,ViewChild , NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams ,Events ,Content, LoadingController} from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';
import { ImagehandlerProvider } from '../../providers/imagehandler/imagehandler';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-buddychat',
  templateUrl: 'buddychat.html',
})
export class BuddychatPage {
  @ViewChild('content') content: Content;
  buddy: any;
  newmessage;
  allmessages = [];
  photoURL;
  imgornot;
  buddyStatus:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public chatservice: ChatProvider,public events: Events, public zone: NgZone,public loadingCtrl : LoadingController, public imgstore: ImagehandlerProvider) {
    this.buddy = this.chatservice.buddy;
      // this.photoURL = firebase.auth().currentUser.photoURL;
      this.scrollto();
      this.events.subscribe('newmessage', () => {
        this.allmessages = [];
        this.imgornot = [];
        this.zone.run(() => {
          this.allmessages = this.chatservice.buddymessages;
          for (var key in this.allmessages) {
            if (this.allmessages[key].message.substring(0, 4) == 'http')
              this.imgornot.push(true);
            else
              this.imgornot.push(false);
          }
        })
      })
        this.events.subscribe('onlieStatus', () => {
          this.zone.run(() => {
            this.buddyStatus = this.chatservice.buddyStatus;
          })
        })
  }
  ionViewDidEnter() {
      this.chatservice.getbuddymessages();
      this.chatservice.getbuddyStatus();

  }
  addmessage() {
    this.chatservice.addnewmessage(this.newmessage).then(() => {
      this.content.scrollToBottom();
      this.newmessage = '';
    })
  }
  scrollto() {
   setTimeout(() => {
       this.content.scrollToBottom();
     }, 1000);
   }

   sendPicMsg() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait'
    });
    loader.present();
    this.imgstore.picmsgstore().then((imgurl) => {
      loader.dismiss();
      this.chatservice.addnewmessage(imgurl).then(() => {
        this.scrollto();
        this.newmessage = '';
      })
    }).catch((err) => {
      alert(err);
      loader.dismiss();
    })
  }
}
