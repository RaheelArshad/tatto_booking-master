import {MenuController, ModalController, NavController, Platform} from '@ionic/angular';
import { SearchModalPage } from './../search-modal/search-modal.page';
import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import {NavigationExtras, Router} from '@angular/router';
import {UtilserviceService} from '../services/utilservice.service';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {Network} from '@ionic-native/network/ngx';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  card1 = false;
  card2 = false;
  card3 = false;
  imgUrl = 'http://54.93.192.116/barber/adminpanel/public/storage/images/categories/';
  saloonImgUrl = 'http://54.93.192.116/barber/adminpanel/public/storage/images/salon%20logos/';
  tattoos: any = [];
  finalTattoos: any = [];
  shops: any = [];
  finalShops: any = [];
  artist: any = [];
  finalArtist: any = [];
  address: string;
  addressLat: any;
  addressLng: any;
  latitude: number;
  longitude: number;
  constructor(private modalController: ModalController,
              private Api: ApiService, private router: Router,
              private util: UtilserviceService,
              private api: ApiService,
              private geolocaion: Geolocation,
              private platform: Platform,
              private network: Network,
              private navCtrl: NavController,
              private menuController: MenuController
              ) {
    this.Api.getCategories().subscribe((data: any) => {
      this.tattoos = data.data;
      console.log(this.tattoos);
    });
    this.Api.getSaloons().subscribe((data: any) => {
      this.shops = data.data;
      console.log(this.shops);
    });
    this.Api.getArtists().subscribe((data: any) => {
      console.log(data);
      this.artist = data.data;
    });
  }
  async getLocation() {
    const position = await this.geolocaion.getCurrentPosition();
    this.addressLat = localStorage.getItem("addressLat");
    this.addressLng = localStorage.getItem("addressLng");
    this.latitude = this.addressLat
        ? this.addressLat
        : position.coords.latitude;
    this.longitude = this.addressLng
        ? this.addressLng
        : position.coords.longitude;
    let long = {
      lat: this.latitude,
      long: this.longitude,
    };
    this.util.dismissLoader();
  }

  appoint() {
    this.navCtrl.navigateBack('tabs/home/appointment');
  }
  search() {
    let navigationExtra: NavigationExtras = {
      state: {
        address: this.address,
      },
    };
    this.router.navigate(['tabs/home/search'], navigationExtra);
  }
  book(id) {
    console.log('Hello');
    const navigationExtras: NavigationExtras = {
      state: {
        id,
      }
    };
    this.router.navigate(['tabs/home/salon-profile'], navigationExtras);
    localStorage.setItem('Salon-id', id);
  }
  tattooSearch(event) {
    const val = event.target.value;
    let newTqattoo = this.tattoos;
    newTqattoo = newTqattoo.filter((item) => {
      return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
    });
    let finalTattoo = newTqattoo;
    finalTattoo = finalTattoo.filter((item) => {
      // console.log(item);
      return (item.name.toLowerCase().indexOf('tattoo'.toLowerCase()) > -1);
    });
    this.finalTattoos = finalTattoo;
  }
  shopSearch(event) {
    const val = event.target.value;
    let newShops = this.shops;
    newShops = newShops.filter((item) => {
      return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
    });
    this.finalShops = newShops;
  }
  artistSearch(event) {
    const val = event.target.value;
    let newArtist = this.artist;
    newArtist = newArtist.filter((item) => {
      return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
    });
    this.finalArtist = newArtist;
  }

  Card1()
  {
    if (this.card2 == false && this.card3 == false)
    {
      this.card1 =! this.card1;
    }
    else
    {
      this.card1 = false;
    }
  }
    Card2()
    {
      if(this.card1 === false && this.card3 === false)
      {
        this.card2 =!this.card2;
      }
      else
      {
        this.card2 = false;
      }
    }

    Card3()
    {
      if (this.card1 === false && this.card2 === false)
      {
        this.card3 =!this.card3;
      }
      else
      {
        this.card3 = false;
      }
    }

    async presentModal() {
      const modal = await this.modalController.create({
        component: SearchModalPage,
        cssClass: 'searchModal',
      });
      return await modal.present();
    }


  ngOnInit() {
  }

}
