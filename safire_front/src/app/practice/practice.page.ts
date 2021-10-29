import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../global.service';
import { environment } from 'src/environments/environment';

import { ModalController } from '@ionic/angular';
import { ModalSettingPage } from './modal-setting/modal-setting.page';
import { fill } from '@tensorflow/tfjs-core';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.page.html',
  styleUrls: ['./practice.page.scss'],
})
export class PracticePage implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public modalController: ModalController,
    public gs: GlobalService
  ) { }

  project_id: string
  smile_times: number
  filler_times: number
  negative_times: number
  time_min: number
  time_sec: number
  modal_return: any
  status_list: any[] = []

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.project_id = params["project_id"]
        this.gs.httpGet(environment.url+'project/'+this.project_id+'/get_target').subscribe(
          (res) => {
            console.log(res)
            this.smile_times = res["smile_times"]
            this.filler_times = res["filler_times"]
            this.negative_times = res["negative_times"]
            this.time_min = res["time_min"]
            this.time_sec = res["time_sec"]
            // NULLチェック
            // クリアチェック
            // 差チェック

          }
        )
      }
    )
  }

  toFeedback = () => {
    this.router.navigate(['/feedback', this.project_id])
  }
  toUserHome = () => {
    this.router.navigate(['home']);
  }

  presentModal = async () => {
    const modal = await this.modalController.create({
      component: ModalSettingPage,
      componentProps: {
        'project_id': this.project_id,
        'smile_times': this.smile_times,
        'filler_times': this.filler_times,
        'negative_times': this.negative_times,
        'time_min': this.time_min,
        'time_sec': this.time_sec
      }
    });
    await modal.present();
    this.modal_return = await modal.onDidDismiss()
    this.smile_times = this.modal_return["data"]["smile_times"]
    this.filler_times = this.modal_return["data"]["filler_times"]
    this.negative_times = this.modal_return["data"]["negative_times"]
    this.time_min = this.modal_return["data"]["time_min"]
    this.time_sec = this.modal_return["data"]["time_sec"]
  }

}
