webpackJsonp([2],{

/***/ 478:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RagisterPageModule", function() { return RagisterPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ragister__ = __webpack_require__(489);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RagisterPageModule = /** @class */ (function () {
    function RagisterPageModule() {
    }
    RagisterPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__ragister__["a" /* RagisterPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__ragister__["a" /* RagisterPage */]),
            ],
        })
    ], RagisterPageModule);
    return RagisterPageModule;
}());

//# sourceMappingURL=ragister.module.js.map

/***/ }),

/***/ 489:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RagisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_user__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RagisterPage = /** @class */ (function () {
    function RagisterPage(navCtrl, navParams, userService, loadingCtrl, toastCtrl, fb) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userService = userService;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.fb = fb;
        this.newuser = { email: '', username: '', password: '', cnfpassword: '' };
        this.passwordtype = 'password';
        this.cnfpasswordtype = 'password';
        this.cnfpasseye = 'eye';
        this.passeye = 'eye';
        this.authForm = this.fb.group({
            'username': [null, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required])],
            'email': [null, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required])],
            'password': [null, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required])],
            'cnfpass': [null, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["f" /* Validators */].required])]
        });
        this.username = this.authForm.controls['username'];
        this.email = this.authForm.controls['email'];
        this.password = this.authForm.controls['password'];
        this.cnfpass = this.authForm.controls['cnfpass'];
    }
    RagisterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RagisterPage');
    };
    RagisterPage.prototype.doSignup = function () {
        var _this = this;
        var toaster = this.toastCtrl.create({
            message: 'Error Code ',
            duration: 3000,
            position: 'bottom'
        });
        if (this.newuser.email == '' || this.newuser.password == '' || this.newuser.username == '') {
            toaster.setMessage('All field are Required!');
            toaster.present();
        }
        else if (this.newuser.password.length < 7) {
            toaster.setMessage('Password is Not Strong');
            toaster.present();
        }
        else {
            if (this.newuser.password == this.newuser.cnfpassword) {
                var loader_1 = this.loadingCtrl.create({
                    content: 'Please wait'
                });
                loader_1.present();
                this.userService.adduser(this.newuser).then(function (res) {
                    loader_1.dismiss();
                    if (res) {
                        _this.navCtrl.push('ProfilepicPage');
                    }
                    else {
                        alert('Error' + res);
                    }
                });
            }
            else {
                toaster.setMessage('Both Password not matched');
                toaster.present();
            }
        }
    };
    RagisterPage.prototype.doLogin = function () {
        this.navCtrl.setRoot('LoginPage');
    };
    RagisterPage.prototype.managePassword = function () {
        if (this.passwordtype == 'password') {
            this.passwordtype = 'text';
            this.passeye = 'eye-off';
        }
        else {
            this.passwordtype = 'password';
            this.passeye = 'eye';
        }
    };
    RagisterPage.prototype.managecnfPassword = function () {
        if (this.cnfpasswordtype == 'password') {
            this.cnfpasswordtype = 'text';
            this.cnfpasseye = 'eye-off';
        }
        else {
            this.cnfpasswordtype = 'password';
            this.cnfpasseye = 'eye';
        }
    };
    RagisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-ragister',template:/*ion-inline-start:"/home/addweb/Downloads/firebaseChat/src/pages/ragister/ragister.html"*/'<ion-content class="bg-img">\n  <div padding class="container-bottom">\n    <div class="main-content">\n      <div class="container-logo" padding="" text-center="">\n        <img src="assets/imgs/logo.png">\n      </div>\n    </div>\n    <form [formGroup]="authForm">\n      <ion-card>\n        <ion-card-content>\n          <div class="errormsg">\n            <div *ngIf="username.errors && username.touched">\n              <p>Username is required.</p>\n            </div>\n            <div *ngIf="email.errors && email.touched">\n              <p>Email is required.</p>\n            </div>\n            <div *ngIf="password.errors && password.touched">\n              <p>Password is required.</p>\n            </div>\n            <div *ngIf="cnfpass.errors && cnfpass.touched">\n              <p>Confirm password is required.</p>\n            </div>\n          </div>\n            <ion-list>\n              <ion-item>\n                <ion-label><ion-icon ios="ios-person" md="md-person"></ion-icon></ion-label>\n                <ion-input id="username" type="text"   [formControl]="username" placeholder="Username" name="username" [(ngModel)]="newuser.username"></ion-input>\n              </ion-item>\n                <ion-item>\n                  <ion-label><ion-icon ios="ios-mail" md="md-mail"></ion-icon></ion-label>\n                  <ion-input id="email" type="email" [formControl]="email" placeholder="Email" name="email" [(ngModel)]="newuser.email"></ion-input>\n                </ion-item>\n                <ion-item>\n                    <ion-label><ion-icon ios="ios-unlock" md="md-unlock"></ion-icon></ion-label>\n                    <ion-input id="password" [formControl]="password" type="{{passwordtype}}"  placeholder="Password" name="password" [(ngModel)]="newuser.password"></ion-input>]\n                    <button ion-button class="eye-icon-btn" type="button" item-right (click)="managePassword()"><ion-icon name="{{passeye}}"></ion-icon></button>\n                </ion-item>\n                <ion-item>\n                    <ion-label><ion-icon ios="ios-unlock" md="md-unlock"></ion-icon></ion-label>\n                    <ion-input id="cnfpass" [formControl]="cnfpass" type="{{cnfpasswordtype}}" placeholder="Confirm Password" name="cnfpass" [(ngModel)]="newuser.cnfpassword"></ion-input>\n                    <button ion-button class="eye-icon-btn" type="button" item-right (click)="managecnfPassword()"><ion-icon name="{{cnfpasseye}}"></ion-icon></button>\n                </ion-item>\n                <!-- <ion-item> -->\n                <div class="button-container">\n                  <button ion-button full round outline color="dark" (click)="doSignup()"  [disabled]="!authForm.valid" >Sign Up</button>\n                </div>\n                <!-- </ion-item>\n                <a (click)="forgePassword()"><b>Forget Login Detail</b></a> -->\n            </ion-list>\n        </ion-card-content>\n      </ion-card>\n    </form >\n      <div text-center class="form-bottom-text">\n        <label>Already have an Account? <a href="javascript:void(0);" (click)="doLogin()">Sign in</a></label>\n      </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/addweb/Downloads/firebaseChat/src/pages/ragister/ragister.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_user_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */]])
    ], RagisterPage);
    return RagisterPage;
}());

//# sourceMappingURL=ragister.js.map

/***/ })

});
//# sourceMappingURL=2.js.map