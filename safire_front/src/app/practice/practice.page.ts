import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ModalController } from '@ionic/angular';
import { ModalSettingPage } from './modal-setting/modal-setting.page';

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
  ) { }

  project_id: string
  smile_times: number
  filler_times: number
  negative_times: number
  time_min: number
  time_sec: number

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.project_id = params["project_id"]
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
    return await modal.present();
  }
}
