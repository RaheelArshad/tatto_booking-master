import { PasswordchangedPage } from './../passwordchanged/passwordchanged.page';
import { FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Component, OnInit } from '@angular/core';
import {
  NavController,
  ModalController,
  AlertController,
  Platform,
} from '@ionic/angular';
import { UtilserviceService } from 'src/app/services/utilservice.service';
import { ApiService } from 'src/app/services/api.service';
import { TranslateService } from '@ngx-translate/core';
import { NavigationExtras } from '@angular/router';
import {
  SignInWithApple,
  AppleSignInResponse,
  AppleSignInErrorResponse,
  ASAuthorizationAppleIDRequest,
} from '@ionic-native/sign-in-with-apple/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // email: string = "";
  // password: string = "";
  data: any;
  counter: { min: number; sec: number };
  errors: any;
  image: any;
  imagePath: any;
  imagee: any;
  err: any;
  passwordd: any;
  commonError: any;
  er: any;
  mesg: string;
  inputData: any = {};

  deviceToken: any;
  emailErr: any;
  passworErr: any;
  language: any;

  passwordType = 'password';
  passwordIcon = 'eye-off';
  error: any = {};
  errall: any;

  constructor(
    private navCtrl: NavController,
    private util: UtilserviceService,
    private api: ApiService,
    private modal: ModalController,
    private platform: Platform,
    private translate: TranslateService,
    private fb: Facebook,
    private signInWithApple: SignInWithApple,
    private googlePlus: GooglePlus
  ) {
    // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI4IiwianRpIjoiNGE3NDdhZmUwMWQ5YmNhMTU2NTYwYjAzZGFiMDM1MTcwMzhkNTExYTgxZTMwZTRiZDVlYWJlODcxNGE2MzcxNDRjMjhmYTE4M2NhNzJiMzgiLCJpYXQiOjE2MzI4NTAyNDEuNzM1NTc4LCJuYmYiOjE2MzI4NTAyNDEuNzM1NTg3LCJleHAiOjE2NjQzODYyNDEuNzI2OTY1LCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.jY3UUikj2HnRGpAaou9FoWDbbijlMezNckj1ZrTTYjDIIK8LfrCuV3G3Syka3u5jDnOe0qvR30Cfk-lzUtwh95wgkPPxamP7A2PkwvTJgKKBhXl6xApolO7P1ykp-zJs8R99ctcES5LjJPVRouiK0HPzd2B50Hv98Je8kE7u8Ib5DKe-fLz42VAkaCwJhhKOCujf9ojX-Nxrnosk6eRj2OYwKZ6_tAKKw69EfAEL6OaqcDSw8nXnsMeuwS_xmM_07i_t0O_imH4J_1UuYEEK20z-GSLaGVu8v2_ahUDTbreWhSi4aXtBbLiE8RPkrfL3KFl77ZR3PmC9XgChMC_MTQAND_U6wd4ifuY5q95AjKBL3P8h6JBNLOI6RY0pIj93mOpzfTBUG3t5PB3x6UWTtxEjxoczaD7DADOZpR-JsEWVZYc12-YWb62to1L0cqC2Lmna67Wgx_wyTBOqgCjha74NEoRizCrOMejpy_IgtiQWQohkmkWOnmMIF5A_YaAEJG4q_KgdSjy_IbyM978zwjknp4jmmtM2PGsFQ88tS7v-CZvJB7Zdsj7WHqTYwkJEJeMUSrmvRu02dJgYAce79HVlN4z5y7n19BjzNVtprtRRxw5SFWMFMJLr4oy_na4FHADgoOPqOBaj7R_TRWdFFoKc_DT-tXp-sY39oTe_fw4';
    // localStorage.setItem('token', token);
  }

  ionViewWillEnter() {
    this.inputData.email = '';
    this.inputData.password = '';
    this.language = localStorage.getItem('lan');
    this.util.startLoad();
    this.api.getData('settings').subscribe(
      (success: any) => {
        if (success.success) {
          this.imagePath = success.data.imagePath;
          this.imagee = success.data.white_logo;
          this.util.dismissLoader();
        }
      },
      (error) => {
        this.util.dismissLoader();
      }
    );
  }

  ngOnInit() {
    this.util.startLoad();
    this.api.getData('settings').subscribe(
      (success: any) => {
        if (success.success) {
          this.imagePath = success.data.imagePath;
          this.imagee = success.data.white_logo;
          this.util.dismissLoader();
        }
      },
      (error) => {
        this.util.dismissLoader();
      }
    );
    this.language = localStorage.getItem('lan');
  }

  backButton() {
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateBack('tabs/home');
    });
  }

  signUp() {
    const hasPre = localStorage.getItem('previous-request') ? true : false;
    if (hasPre) {
      this.modal.dismiss();
      this.navCtrl.navigateForward('signup');
    } else {
      this.modal.dismiss();
      this.navCtrl.navigateForward('signup');
    }
  }

  forgot() {
    const hasPre = localStorage.getItem('previous-request') ? true : false;
    if (hasPre) {
      this.modal.dismiss();
      this.navCtrl.navigateForward('emailverify');
    } else {
      this.modal.dismiss();
      this.navCtrl.navigateForward('emailverify');
    }
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  home() {
    console.log('success');
    let translateData: any;
    let tData: any;
    this.translate.get('loginErr').subscribe((data: any) => {
      translateData = data;
    });
    this.util.startLoad();
    this.deviceToken = this.api.deviceToken ? this.api.deviceToken : 'helo';
    const fd = new FormData();
    fd.append('email', this.inputData.email);
    fd.append('password', this.inputData.password);
    fd.append('provider', 'local');
    fd.append(
      'device_token',
      this.deviceToken ? this.deviceToken : localStorage.getItem('pushTokn')
    );
    this.api.postDataWithToken('login', fd).subscribe(
      (success: any) => {
        this.util.dismissLoader();
        console.log(success);
        this.errors = '';
        this.passwordd = '';
        this.util.presentToast(success.msg);
        if (success.msg == false) {
          if (this.language == 'ar') {
            this.util.presentToast('لم يتم التحقق من تسجيل الدخول هذا');
          } else if (this.language == 'en') {
            this.util.presentToast('This Login is Not Verified');
          } else {
            this.util.presentToast('Această autentificare nu este verificată');
          }

          const send = {
            email: this.inputData.email,
          };
          this.api.postDataWithToken('sendotp', send).subscribe(
            (data: any) => {
              console.log('send data', data);
              this.util.dismissLoader();
            },
            (err: any) => {
              this.util.dismissLoader();
              console.log(err);
            }
          );
          this.navCtrl.navigateForward('verify');
          this.modal.dismiss();
        }
        const hasPre = localStorage.getItem('previous-request') ? true : false;
        if (hasPre) {
          if (success.msg == false) {
            console.log('success');
            if (this.language == 'ar') {
              this.util.presentToast('لم يتم التحقق من تسجيل الدخول هذا');
            } else if (this.language == 'en') {
              this.util.presentToast('This Login is Not Verified');
            } else {
              this.util.presentToast(
                'Această autentificare nu este verificată'
              );
            }
            const navigationExtra: NavigationExtras = {
              state: {
                id: success.data,
              },
            };
            this.navCtrl.navigateForward('verify', navigationExtra);
            this.modal.dismiss();
          } else {
            console.log('success');
            localStorage.setItem('token', success.data.token);

            const page = localStorage.getItem('previous-request-page');
            localStorage.setItem('isUserLogged', 'true');
            this.util.dismissLoader();
            this.modal.dismiss();
            this.api.setNewLogin(true);
            this.navCtrl.navigateForward(page);
          }
        } else {
          console.log('success');
          if (success) { localStorage.setItem('token', success.data.token); }
          localStorage.setItem('isUserLogged', 'true');

          this.util.dismissLoader();
          if (this.language == 'ar') {
            this.util.presentToast('تم تسجيل الدخول بنجاح');
          } else if (this.language == 'en') {
            this.util.presentToast('You have signed in successfully');
          } else {
            this.util.presentToast('V-ați conectat cu succes');
          }
          this.api.setNewLogin(true);
          this.navCtrl.navigateRoot('tabs/home');
        }
      },
      (error: any) => {
        this.util.dismissLoader();
        this.errors = '';
        this.passwordd = '';
        this.errall = '';
        console.log(error.error.error);
        this.errall = error.error.error;
        this.err = error.error.errors;
        console.log(this.err);

        if (this.inputData.email == '') {
          this.errors = translateData.email;
        }
        if (this.inputData.password == '') {
          this.passwordd = translateData.password;
        }
        // console.log(this.errors.length);
        // this.emailErr = this.errors.length;

        // console.log("pass", translateData.password);
        // this.passworErr = this.passwordd.length;

        // console.log(this.err.email[0] != "The email field is required.");

        // if (this.err.email[0] == "The email field is required.") {
        //   this.errors = translateData.email;

        // }
        // console.log(this.err.password[0] != "The password field is required.");

        // if (this.err.this.inputData.password[0] != "The password field is required.") {
        //   this.passwordd = translateData.password;
        // }

        // this.emailErr = "Email Must Be Required";
        // this.er = error.error.error;
        // this.util.presentToast(this.er);
        // this.passworErr = "Password Must Be Required";

        // this.commonError = error.error.message;

        // if (error.status == 422) {
        //   this.err = error.error.errors;
        //   console.log("err", this.err);
        //   console.log(this.err.email[0] == "The email field is required.");

        //   if (this.err.email[0] == "The email field is required.") {
        //     this.errors = translateData.email;
        //   }
        //   if (this.err.this.inputData.password[0] == "The password field is required.") {
        //     this.passwordd = translateData.password;
        //   }
        // }
      }
    );
  }

  facebookLogin() {
    this.fb
      .login(['email', 'public_profile', 'user_friends'])
      .then((res: FacebookLoginResponse) => {
        console.log('Logged into Facebook!', res);
        this.fb
          .api(
            'me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)',
            []
          )
          .then((profile) => {
            console.log('profile', profile);
            const fd = new FormData();
            if (profile.email) {
              fd.append('email', profile.email);
            }
            fd.append('provider', 'facebook');
            fd.append('provider_token', profile.id);
            fd.append('name', profile.name);
            fd.append('image', profile.picture_large.data.url);
            fd.append(
              'device_token',
              this.deviceToken
                ? this.deviceToken
                : localStorage.getItem('pushTokn')
            );

            this.util.startLoad();
            this.api.postDataWithToken('login', fd).subscribe(
              (res: any) => {
                console.log('response', res);
                this.util.dismissLoader();
                if (res.success) {
                  localStorage.setItem('token', res.data.token);
                  localStorage.setItem('provider', 'facebook');
                  this.inputData = {};

                  const page = localStorage.getItem('previous-request-page');
                  this.modal.dismiss();
                  this.api.setNewLogin(true);
                  this.navCtrl.navigateForward(page);

                  this.util.presentToast(res.msg);
                  this.navCtrl.navigateForward('/tabs/home');
                } else {
                  this.util.presentToast(res.msg);
                }
              },
              (er) => {
                this.util.dismissLoader();
                console.log('er', er);
              }
            );
          });
      })
      .catch((e) => console.log('Error logging into Facebook', e));
  }

  googleLogin() {
    this.googlePlus
      .login({})
      .then((gres) => {
        // accessToken
        console.log('google response', gres);
        const fd = new FormData();
        fd.append('email', gres.email);
        fd.append('provider', 'google');
        fd.append('provider_token', gres.userId);
        fd.append('name', gres.displayName);
        fd.append(
          'device_token',
          this.deviceToken ? this.deviceToken : localStorage.getItem('pushTokn')
        );
        this.util.startLoad();
        this.api.postData('login', fd).subscribe(
          (res: any) => {
            console.log('response', res);
            this.util.dismissLoader();
            if (res.success) {
              localStorage.setItem('token', res.data.token);
              localStorage.setItem('provider', 'google');
              this.inputData = {};
              const page = localStorage.getItem('previous-request-page');
              this.modal.dismiss();
              this.api.setNewLogin(true);
              this.navCtrl.navigateForward(page);
              this.util.presentToast(res.msg);
              this.navCtrl.navigateForward('/tabs/home');
            } else {
              console.log(res.msg);
            }
          },
          (er) => {
            this.util.dismissLoader();
            console.log('er', er);
          }
        );
      })
      .catch((err) => {
        console.error('errror', err);
        console.log('google', err);
      });
  }

  appleLoginDB(res) {
    const fd = new FormData();
    if (res.email) {
      fd.append('email', res.email);
    }
    fd.append('provider', 'apple');
    fd.append('provider_token', res.user);
    fd.append('name', res.fullName.givenName);
    fd.append(
      'device_token',
      this.deviceToken ? this.deviceToken : localStorage.getItem('pushTokn')
    );
    this.util.startLoad();
    this.api.postData('login', fd).subscribe(
      (res: any) => {
        console.log('response', res);
        this.util.dismissLoader();
        if (res.success) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('provider', 'apple');
          this.inputData = {};
          const page = localStorage.getItem('previous-request-page');
          this.modal.dismiss();
          this.api.setNewLogin(true);
          this.navCtrl.navigateForward(page);
          this.util.presentToast(res.msg);
          this.navCtrl.navigateForward('/tabs/home');
        } else {
          this.util.presentToast(res.msg);
        }
      },
      (er) => {
        this.util.dismissLoader();
        console.log('er', er);
      }
    );
  }

  appleLogin() {
    this.signInWithApple
      .signin({
        requestedScopes: [
          ASAuthorizationAppleIDRequest.ASAuthorizationScopeFullName,
          ASAuthorizationAppleIDRequest.ASAuthorizationScopeEmail,
        ],
      })
      .then((res: AppleSignInResponse) => {
        console.log(res);
        this.appleLoginDB(res);
      })
      .catch((error: AppleSignInErrorResponse) => {
        console.log(error.code + ' ' + error.localizedDescription);
        console.error(error);
      });
    this.util.presentToast('Not Available in Android');
  }
}
