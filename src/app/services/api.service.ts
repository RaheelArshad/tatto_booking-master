import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { BehaviorSubject } from 'rxjs';
import { AlertController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // public BASE_URL = 'https://example.com/public/api/';
  // public BASE_URL = 'http://192.168.0.148/laravel/the_barber_multi/programati/public/api/';
  public BASE_URL = "https://saasmonks.in/App-Demo/thebarber-V2/public/api/";
  // public BASE_URL = "http://barber2.localhost/index.php/api/";
  // public BASE_URL = 'http://192.168.10.2/barber-master_2/barber-master/adminpanel/public/index.php/api/';
  paymentData: any;
  addressData: any;
  latitude: number;
  longitude: number;
  deviceToken:any;
  newLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  total:any = 0;
  salonId:any;
  salonDetail:any = {};
  distance:any ;
  date:any;
  userLat:number;
  userLong:number;
  time: any;
  searchLat:any;
  searchLng:any;
  booking_at: any;
  extraCharges: any = 0;
  constructor(
    private http:HttpClient,
    private geolocation:Geolocation,
    private alertCtrl:AlertController
  ) { }

  setNewLogin(val){
    this.newLogin.next(val);
  }

  isNewLogin() {
    return this.newLogin.asObservable();
  }

  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
  }
  getGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
    }).catch((error) => {
      alert('Error getting location' + JSON.stringify(error));
    });
  }

  async getLocation() {
    const position = await this.geolocation.getCurrentPosition();
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    console.log('this.lattitude in lattitude function',this.latitude);
    console.log('this.longitude in longitude',this.longitude);
  }

  async showAlert(title, msg, task) {
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: msg,
      buttons: [
        {
          text: `Action: ${task}`,
          handler: () => {
            // E.g: Navigate to a specific screen
          }
        }
      ]
    })
    alert.present();
  }



  deg2rad(deg) {
    return deg * (Math.PI/180)
  }
  storePaymentData(data) {
    this.paymentData = data;
  }
  getPaymentData() {
    return this.paymentData;
  }

  getData(url){
    return this.http.get(this.BASE_URL + url)
  }

  postData(url,data){
    return this.http.post(this.BASE_URL + url , data)
  }

  getDataWithToken(url) {
    let header = new HttpHeaders();
    console.log(localStorage.getItem('token'));
    console.log('In token');
    header = header.set("Authorization", "Bearer " + localStorage.getItem('token'));
    header = header.set("Accept", "application/json");
    return this.http.get(this.BASE_URL + url, { headers: header });
  }

  getDataIdWithToken(url,id) {
    let header = new HttpHeaders();
    header = header.set("Authorization", "Bearer " + localStorage.getItem('token'));
    header = header.set("Accept", "application/json");
    return this.http.get(this.BASE_URL + url + '/' + id, { headers: header });
  }

  postDataWithToken(url, data) {
    let header = new HttpHeaders();
    header = header.set("Authorization", "Bearer " + localStorage.getItem('token'));
    header = header.set("Accept", "application/json");
    return this.http.post(this.BASE_URL + url, data, { headers: header });
  }

  // from VonixSoft
  getCategories() {
    console.log(this.BASE_URL);
    return this.http.get(this.BASE_URL + 'categories');
  }
  getSaloons() {
    console.log(this.BASE_URL);
    return this.http.get(this.BASE_URL + 'salons');
  }
  getArtists() {
    return this.http.get('http://barber2.localhost/api/artist');
  }
}
