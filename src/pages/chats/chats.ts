import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams ,Events, AlertController, PopoverController, LoadingController} from 'ionic-angular';
import { RequestsProvider } from '../../providers/requests/requests';
import { ChatProvider } from '../../providers/chat/chat';
import { UserProvider } from '../../providers/user/user';

import { ImagehandlerProvider } from '../../providers/imagehandler/imagehandler';
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {
  myrequests;
  myfriends;
  // messagecounter;
  requestcounter=null;
  username : string;
  avatar:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public requestservice: RequestsProvider,public events: Events, public alertCtrl : AlertController, public chatservice : ChatProvider,public zone :NgZone,public popoverCtrl : PopoverController, public imghandler: ImagehandlerProvider, public userservice: UserProvider, public loadingCtrl: LoadingController) {
    this.setStatus();
    // this.events.subscribe('counter', () => {
    //   this.zone.run(()=>{
    //     this.messagecounter= this.chatservice.msgcount;
    //     console.log(this.messagecounter);
    //   })
    // })

  }

  ionViewWillEnter() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait'
    });
    loader.present();

    this.requestservice.getmyrequests();
    this.requestservice.getmyfriends();
     this.loaduserdetails();

    this.myfriends = [];
    this.events.subscribe('gotrequests', () => {
      this.myrequests = [];
      this.myrequests = this.requestservice.userdetails;
      console.log('this.myrequests',this.myrequests);
      loader.dismiss();
      if(this.myrequests){
        this.requestcounter =this.myrequests.length;
      }
    })
    this.events.subscribe('friends', () => {
      this.myfriends = [];
      this.myfriends = this.requestservice.myfriends;
      console.log('myfriends',this.myfriends);
      loader.dismiss();
      // for(let i = 0;i<this.myfriends.length;i++){
      //
      //   console.log('requestcounter',this.requestcounter)
      //   console.log('user > ',this.myfriends[i])
      //   this.chatservice.getmsgCounter(this.myfriends[i]);
      // }

    })
  }

  addbuddy() {
    this.navCtrl.push('BuddiesPage');
  }
  buddychat(buddy) {
    this.chatservice.initializebuddy(buddy);
    this.navCtrl.push('BuddychatPage');
  }
  setStatus(){
    this.chatservice.setstatusUser().then((res)=>{
      if(res){
        console.log('User Online');
      }
    }).catch((err)=>{
        alert(err);
    })
  }
  presentPopover(myEvent) {
   let popover = this.popoverCtrl.create('RequestPage',{});
     popover.present({
       ev: myEvent
     });
   }
   //profile data
loaduserdetails() {
     this.userservice.getuserdetails().then((res: any) => {
       this.username = res.displayName;
       this.zone.run(() => {
         this.avatar = res.photoURL;
       })
     })
   }
   logout() {
     this.chatservice.setStatusOffline().then((res)=>{
       if(res){
         firebase.auth().signOut().then(() => {
           this.navCtrl.setRoot('LoginPage');
         })
       }
     })
    }

    editname() {
      let statusalert = this.alertCtrl.create({
        buttons: ['okay']
      });
      let alert = this.alertCtrl.create({
        title: 'Edit Nickname',
        inputs: [{
          name: 'nickname',
          placeholder: 'Nickname'
        }],
        buttons: [{
          text: 'Cancel',
          role: 'cancel',
          handler: data => {

          }
        },
        {
          text: 'Edit',
          handler: data => {
            if (data.nickname) {
              this.userservice.updatedisplayname(data.nickname).then((res: any) => {
                if (res.success) {
                  statusalert.setTitle('Updated');
                  statusalert.setSubTitle('Your username has been changed successfully!!');
                  statusalert.present();
                  this.zone.run(() => {
                    this.username = data.nickname;
                  })
                }

                else {
                  statusalert.setTitle('Failed');
                  statusalert.setSubTitle('Your username was not changed');
                  statusalert.present();
                }

              })
            }
          }

        }]
      });
      alert.present();
    }
    editimage() {
      let statusalert = this.alertCtrl.create({
        buttons: ['okay']
      });
      this.imghandler.uploadimage().then((url: any) => {
        this.userservice.updateimage(url).then((res: any) => {
          if (res.success) {
            statusalert.setTitle('Updated');
            statusalert.setSubTitle('Your profile pic has been changed successfully!!');
            statusalert.present();
            this.zone.run(() => {
            this.avatar = url;
          })
          }
        }).catch((err) => {
            statusalert.setTitle('Failed');
            statusalert.setSubTitle('Your profile pic was not changed');
            statusalert.present();
        })
        })
    }

}
