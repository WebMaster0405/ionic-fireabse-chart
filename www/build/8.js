webpackJsonp([8],{

/***/ 472:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatsPageModule", function() { return ChatsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chats__ = __webpack_require__(483);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ChatsPageModule = /** @class */ (function () {
    function ChatsPageModule() {
    }
    ChatsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__chats__["a" /* ChatsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__chats__["a" /* ChatsPage */]),
            ],
        })
    ], ChatsPageModule);
    return ChatsPageModule;
}());

//# sourceMappingURL=chats.module.js.map

/***/ }),

/***/ 483:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_requests_requests__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_chat_chat__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_user__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_imagehandler_imagehandler__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ChatsPage = /** @class */ (function () {
    function ChatsPage(navCtrl, navParams, requestservice, events, alertCtrl, chatservice, zone, popoverCtrl, imghandler, userservice, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.requestservice = requestservice;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.chatservice = chatservice;
        this.zone = zone;
        this.popoverCtrl = popoverCtrl;
        this.imghandler = imghandler;
        this.userservice = userservice;
        this.loadingCtrl = loadingCtrl;
        // messagecounter;
        this.requestcounter = null;
        this.setStatus();
        // this.events.subscribe('counter', () => {
        //   this.zone.run(()=>{
        //     this.messagecounter= this.chatservice.msgcount;
        //     console.log(this.messagecounter);
        //   })
        // })
    }
    ChatsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: 'Please wait'
        });
        loader.present();
        this.requestservice.getmyrequests();
        this.requestservice.getmyfriends();
        this.loaduserdetails();
        this.myfriends = [];
        this.events.subscribe('gotrequests', function () {
            _this.myrequests = [];
            _this.myrequests = _this.requestservice.userdetails;
            console.log('this.myrequests', _this.myrequests);
            loader.dismiss();
            if (_this.myrequests) {
                _this.requestcounter = _this.myrequests.length;
            }
        });
        this.events.subscribe('friends', function () {
            _this.myfriends = [];
            _this.myfriends = _this.requestservice.myfriends;
            console.log('myfriends', _this.myfriends);
            loader.dismiss();
            // for(let i = 0;i<this.myfriends.length;i++){
            //
            //   console.log('requestcounter',this.requestcounter)
            //   console.log('user > ',this.myfriends[i])
            //   this.chatservice.getmsgCounter(this.myfriends[i]);
            // }
        });
    };
    ChatsPage.prototype.addbuddy = function () {
        this.navCtrl.push('BuddiesPage');
    };
    ChatsPage.prototype.buddychat = function (buddy) {
        this.chatservice.initializebuddy(buddy);
        this.navCtrl.push('BuddychatPage');
    };
    ChatsPage.prototype.setStatus = function () {
        this.chatservice.setstatusUser().then(function (res) {
            if (res) {
                console.log('User Online');
            }
        }).catch(function (err) {
            alert(err);
        });
    };
    ChatsPage.prototype.presentPopover = function (myEvent) {
        var popover = this.popoverCtrl.create('RequestPage', {});
        popover.present({
            ev: myEvent
        });
    };
    //profile data
    ChatsPage.prototype.loaduserdetails = function () {
        var _this = this;
        this.userservice.getuserdetails().then(function (res) {
            _this.username = res.displayName;
            _this.zone.run(function () {
                _this.avatar = res.photoURL;
            });
        });
    };
    ChatsPage.prototype.logout = function () {
        var _this = this;
        this.chatservice.setStatusOffline().then(function (res) {
            if (res) {
                __WEBPACK_IMPORTED_MODULE_6_firebase___default.a.auth().signOut().then(function () {
                    _this.navCtrl.setRoot('LoginPage');
                });
            }
        });
    };
    ChatsPage.prototype.editname = function () {
        var _this = this;
        var statusalert = this.alertCtrl.create({
            buttons: ['okay']
        });
        var alert = this.alertCtrl.create({
            title: 'Edit Nickname',
            inputs: [{
                    name: 'nickname',
                    placeholder: 'Nickname'
                }],
            buttons: [{
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                    }
                },
                {
                    text: 'Edit',
                    handler: function (data) {
                        if (data.nickname) {
                            _this.userservice.updatedisplayname(data.nickname).then(function (res) {
                                if (res.success) {
                                    statusalert.setTitle('Updated');
                                    statusalert.setSubTitle('Your username has been changed successfully!!');
                                    statusalert.present();
                                    _this.zone.run(function () {
                                        _this.username = data.nickname;
                                    });
                                }
                                else {
                                    statusalert.setTitle('Failed');
                                    statusalert.setSubTitle('Your username was not changed');
                                    statusalert.present();
                                }
                            });
                        }
                    }
                }]
        });
        alert.present();
    };
    ChatsPage.prototype.editimage = function () {
        var _this = this;
        var statusalert = this.alertCtrl.create({
            buttons: ['okay']
        });
        this.imghandler.uploadimage().then(function (url) {
            _this.userservice.updateimage(url).then(function (res) {
                if (res.success) {
                    statusalert.setTitle('Updated');
                    statusalert.setSubTitle('Your profile pic has been changed successfully!!');
                    statusalert.present();
                    _this.zone.run(function () {
                        _this.avatar = url;
                    });
                }
            }).catch(function (err) {
                statusalert.setTitle('Failed');
                statusalert.setSubTitle('Your profile pic was not changed');
                statusalert.present();
            });
        });
    };
    ChatsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-chats',template:/*ion-inline-start:"/home/addweb/Downloads/firebaseChat/src/pages/chats/chats.html"*/'<ion-header>\n  <ion-navbar color="dark">\n    <div class="profile-image-wrap">\n      <div class="profile-image"  (click)="editimage()">\n          <img src="{{avatar}}">\n      </div>\n      <button ion-button round outline color="danger"  (click)="logout()">Logout</button>\n    </div>\n    <div class="profile-info">\n      <div class="title">\n        <h2 (click)="editname()">{{username}}</h2>\n      </div>\n      <div class="subtitle">\n        Tap on your pic or username to change it.\n      </div>\n    </div>\n    <div class="spacer" style="height: 10px;"></div>\n    <div>\n      <!-- <button ion-button round outline color="danger" (click)="logout()">Logout</button> -->\n    </div>\n     <ion-buttons end>\n\n       <button ion-button icon-only (click)="presentPopover($event)">\n         <ion-icon name="notifications"></ion-icon><div class="notification" *ngIf="requestcounter != null">{{requestcounter}}</div>\n       </button>\n     </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <div *ngIf="myfriends == \'\' " class="backdropdiv">\n    <div class="focus-on">\n      <ion-fab bottom right>\n        <button ion-fab color="darkblue" (click)="addbuddy()"><ion-icon name="person-add"></ion-icon></button>\n      </ion-fab>\n    </div>\n    <div class="instrucation">\n      <p style="color:#fff;">Click, on button to Add Friends</p>\n    <img src="assets/imgs/introarrrow.png">\n    </div>\n  </div>\n\n<div padding *ngIf="myfriends != \'\' ">\n  <ion-list no-lines >\n    <!-- <ion-list-header>Friends</ion-list-header> -->\n    <ion-item *ngFor="let item of myfriends" (click)="buddychat(item)">\n      <ion-avatar item-left>\n        <img src={{item.photoURL}}>\n      </ion-avatar>\n      <h3>{{item.displayName}}</h3>\n      <!-- <button ion-button round color="danger" item-right right *ngIf="messagecounter != 0">{{messagecounter}}</button> -->\n    </ion-item>\n  </ion-list>\n  <ion-fab bottom right>\n    <button ion-fab color="darkblue" (click)="addbuddy()"><ion-icon name="person-add"></ion-icon></button>\n  </ion-fab>\n</div>\n</ion-content>\n'/*ion-inline-end:"/home/addweb/Downloads/firebaseChat/src/pages/chats/chats.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_requests_requests__["a" /* RequestsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__providers_chat_chat__["a" /* ChatProvider */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_5__providers_imagehandler_imagehandler__["a" /* ImagehandlerProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_user_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], ChatsPage);
    return ChatsPage;
}());

//# sourceMappingURL=chats.js.map

/***/ })

});
//# sourceMappingURL=8.js.map