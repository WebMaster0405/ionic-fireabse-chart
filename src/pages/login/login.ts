import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { usercreds } from '../../models/interfaces/usercreds';

import { AuthProvider }from  '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  credentials  = {} as usercreds;
  authForm : FormGroup;
  email: AbstractControl;
	password: AbstractControl;

  passwordtype:string='password';
  passeye:string ='eye';

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService : AuthProvider,public fb: FormBuilder, public loadingCtrl : LoadingController ) {
    this.authForm = this.fb.group({
      'email' : [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])],
    });
    this.email = this.authForm.controls['email'];
    this.password = this.authForm.controls['password'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  forgePassword(){

  }
  doLogin(){
    let loader = this.loadingCtrl.create({
      content: 'Please wait'
    });
    loader.present();
      this.authService.login(this.credentials).then((res : any) => {
        if(!res.code){
            loader.dismiss();
            this.navCtrl.setRoot('ChatsPage');
          }
          else{
            loader.dismiss();
            alert(res);
          }
          loader.dismiss();
          
      })
  }
  doSignup(){
    this.navCtrl.push('RagisterPage');
  }
  managePassword() {
    if(this.passwordtype == 'password'){
      this.passwordtype='text';
      this.passeye='eye-off';
    }else{
      this.passwordtype='password';
      this.passeye = 'eye';
    }
  }
}
