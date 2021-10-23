import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-rate-modal',
  templateUrl: './rate-modal.page.html',
  styleUrls: ['./rate-modal.page.scss'],
})
export class RateModalPage implements OnInit {
  @Input() project_id: number
  @Input() user_id: string

  rate: number = 3.0

  url: string = "https://techfusion-studio.com/safire/"

  constructor(
    public modalController: ModalController,
    private alertController: AlertController,
    public gs: GlobalService,
  ) { }

  ngOnInit() {
  }

  postRate = () => {
    const body = {
      project_id: this.project_id,
      user_id: this.user_id,
      rate: this.rate
    }
    this.gs.http(this.url + "rate", body).subscribe(
      res => {
        console.log(res)
        this.alertResult()
      }
    )
  }
  dismiss = () => {
    this.modalController.dismiss({"dissmiss": true})
  }

  async alertResult() {
    const alert = await this.alertController.create({
      message: "評価をつけました.<br>評価によってあなたへの推薦記事の精度が改善されます.",
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.dismiss()
          }
        }
      ]
    });
    await alert.present();
  }

}
