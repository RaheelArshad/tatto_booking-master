import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.page.html',
  styleUrls: ['./search-modal.page.scss'],
})
export class SearchModalPage implements OnInit {
  card=false;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  dismiss()
  {
    this.modalCtrl.dismiss();
  }

  Card()
    {
        this.card =!this.card;
    }

}
