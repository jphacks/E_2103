import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-modal-setting',
  templateUrl: './modal-setting.page.html',
  styleUrls: ['./modal-setting.page.scss'],
})
export class ModalSettingPage implements OnInit {
  @Input() project_id: number
  @Input() smile_times: number
  @Input() filler_times: number
  @Input() negative_times: number
  @Input() time_min: number
  @Input() time_sec: number

  url: string = "https://techfusion-studio.com/safire/"

  constructor(
    public modalController: ModalController,
    private alertController: AlertController,
    public gs: GlobalService
  ) { }

  ngOnInit() {
    console.log(this.project_id)
  }

  postTarget = () => {
    const body = {
      'project_id': this.project_id,
      'smile_times': this.smile_times,
      'filler_times': this.filler_times,
      'negative_times': this.negative_times,
      'time_min': this.time_min,
      'time_sec': this.time_sec
    }
    // this.gs.http(this.url + "rate", body).subscribe(
    //   res => {
    //     console.log(res)
    //     this.alertResult()
    //   }
    // )
    this.alertResult()
  }
  dismiss = () => {
    this.modalController.dismiss({"dissmiss": true})
  }

  async alertResult() {
    const alert = await this.alertController.create({
      message: "目標を設定しました.<br>頑張って練習していきましょう♪.",
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
