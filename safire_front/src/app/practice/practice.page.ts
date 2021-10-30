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
  practice_times: number
  smile_result: number
  filler_result: number
  negative_result: number
  time_result: number

  modal_return: any
  status_list: string[] = ["", "", "", ""]

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
            this.practice_times = res["project_times"]
            this.smile_result = res["smile_result"]
            this.filler_result = res["filler_result"]
            this.negative_result = res["negative_result"]
            this.time_result = res["time_result"]
            this.checkTarget()
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

  checkTarget = () => {
    if (this.smile_result == null) this.status_list[0] = "未挑戦…"
    else if (this.smile_result >= this.smile_times) this.status_list[0] = "🎉達成"
    else {
      this.status_list[0] = "あと" + String(this.smile_times - this.smile_result) + "回!"
    }

    if (this.filler_result == null) this.status_list[1] = "未挑戦…"
    else if (this.filler_result < this.filler_times) this.status_list[1] = "🎉達成"
    else {
      this.status_list[1] = "あと" + String(this.filler_result - this.filler_times + 1) + "回!"
    }

    if (this.negative_result == null) this.status_list[2] = "未挑戦…"
    else if (this.negative_result < this.negative_times) this.status_list[2] = "🎉達成"
    else {
      this.status_list[2] = "あと" + String(this.negative_result - this.negative_times + 1) + "回!"
    }

    if (this.time_result == null) this.status_list[3] = "未挑戦…"
    else if (30 >= this.time_result) this.status_list[3] = "🎉達成"
    else {
      this.status_list[3] = "あと" + String(this.time_result - 30) + "秒!"
    }
  }

  toArticle = () => {
    this.router.navigate(['/article'])
  }

}
