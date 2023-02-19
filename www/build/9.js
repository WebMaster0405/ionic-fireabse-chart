webpackJsonp([9],{

/***/ 471:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BuddychatPageModule", function() { return BuddychatPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__buddychat__ = __webpack_require__(482);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var BuddychatPageModule = /** @class */ (function () {
    function BuddychatPageModule() {
    }
    BuddychatPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__buddychat__["a" /* BuddychatPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__buddychat__["a" /* BuddychatPage */]),
            ],
        })
    ], BuddychatPageModule);
    return BuddychatPageModule;
}());

//# sourceMappingURL=buddychat.module.js.map

/***/ }),

/***/ 482:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BuddychatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_chat_chat__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_imagehandler_imagehandler__ = __webpack_require__(289);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var BuddychatPage = /** @class */ (function () {
    function BuddychatPage(navCtrl, navParams, chatservice, events, zone, loadingCtrl, imgstore) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.chatservice = chatservice;
        this.events = events;
        this.zone = zone;
        this.loadingCtrl = loadingCtrl;
        this.imgstore = imgstore;
        this.allmessages = [];
        this.buddy = this.chatservice.buddy;
        // this.photoURL = firebase.auth().currentUser.photoURL;
        this.scrollto();
        this.events.subscribe('newmessage', function () {
            _this.allmessages = [];
            _this.imgornot = [];
            _this.zone.run(function () {
                _this.allmessages = _this.chatservice.buddymessages;
                for (var key in _this.allmessages) {
                    if (_this.allmessages[key].message.substring(0, 4) == 'http')
                        _this.imgornot.push(true);
                    else
                        _this.imgornot.push(false);
                }
            });
        });
        this.events.subscribe('onlieStatus', function () {
            _this.zone.run(function () {
                _this.buddyStatus = _this.chatservice.buddyStatus;
            });
        });
    }
    BuddychatPage.prototype.ionViewDidEnter = function () {
        this.chatservice.getbuddymessages();
        this.chatservice.getbuddyStatus();
    };
    BuddychatPage.prototype.addmessage = function () {
        var _this = this;
        this.chatservice.addnewmessage(this.newmessage).then(function () {
            _this.content.scrollToBottom();
            _this.newmessage = '';
        });
    };
    BuddychatPage.prototype.scrollto = function () {
        var _this = this;
        setTimeout(function () {
            _this.content.scrollToBottom();
        }, 1000);
    };
    BuddychatPage.prototype.sendPicMsg = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: 'Please wait'
        });
        loader.present();
        this.imgstore.picmsgstore().then(function (imgurl) {
            loader.dismiss();
            _this.chatservice.addnewmessage(imgurl).then(function () {
                _this.scrollto();
                _this.newmessage = '';
            });
        }).catch(function (err) {
            alert(err);
            loader.dismiss();
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('content'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */]) === "function" && _a || Object)
    ], BuddychatPage.prototype, "content", void 0);
    BuddychatPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-buddychat',template:/*ion-inline-start:"/home/addweb/Downloads/firebaseChat/src/pages/buddychat/buddychat.html"*/'<ion-header>\n  <ion-navbar color="darkblue">\n    <ion-title>\n      <div class="user-icon"><img src="{{buddy.photoURL}}"></div>\n      {{buddy.displayName}}\n      <br><p class="statusclass">{{buddyStatus}}</p>\n    </ion-title>\n   </ion-navbar>\n </ion-header>\n <ion-content #content>\n <div class = "chatwindow">\n   <ion-list no-lines>\n     <ion-item *ngFor = "let item of allmessages; let i = index" text-wrap>\n       <!-- <ion-avatar item-left *ngIf="item.sentby === buddy.uid">\n         <img src="{{buddy.photoURL}}">\n       </ion-avatar> -->\n       <div class="bubble me" *ngIf="item.sentby === buddy.uid">\n         <h3 *ngIf="!imgornot[i]">{{item.message}}</h3>\n         <img src="{{item.message}}" *ngIf="imgornot[i]">\n         <div class="msg-time">{{item.timeofmsg}}</div>\n       </div>\n       <!-- <ion-avatar item-right *ngIf="item.sentby != buddy.uid">\n         <img src="{{photoURL}}">\n       </ion-avatar> -->\n       <div class="bubble you" *ngIf="item.sentby != buddy.uid">\n         <h3 *ngIf="!imgornot[i]">{{item.message}}</h3>\n         <img src="{{item.message}}" *ngIf="imgornot[i]">\n         <div class="msg-time">{{item.timeofmsg}}</div>\n       </div>\n     </ion-item>\n   </ion-list>\n </div>\n </ion-content>\n <ion-footer ion-fixed>\n   <form>\n   <ion-toolbar class="no-border" color="white">\n     <ion-input [(ngModel)]="newmessage" name= "newmessage" class="newmsg" placeholder="Write your message ..."></ion-input>\n     <ion-buttons end>\n       <button ion-button (click)="sendPicMsg()"><ion-icon class="camera-btn" name="camera"></ion-icon></button>\n     </ion-buttons>\n     <ion-buttons end>\n       <button ion-button round type="submit" class="sentbtn" (click)="addmessage()"><ion-icon name="send" color="wcolor" style="font-size: 2.2em;"></ion-icon></button>\n     </ion-buttons>\n    </ion-toolbar>\n  </form>\n</ion-footer>\n'/*ion-inline-end:"/home/addweb/Downloads/firebaseChat/src/pages/buddychat/buddychat.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__providers_chat_chat__["a" /* ChatProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_chat_chat__["a" /* ChatProvider */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_3__providers_imagehandler_imagehandler__["a" /* ImagehandlerProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_imagehandler_imagehandler__["a" /* ImagehandlerProvider */]) === "function" && _h || Object])
    ], BuddychatPage);
    return BuddychatPage;
    var _a, _b, _c, _d, _e, _f, _g, _h;
}());

//# sourceMappingURL=buddychat.js.map

/***/ })

});
//# sourceMappingURL=9.js.map