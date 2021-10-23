import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { AlertController } from '@ionic/angular';

import { ModalController } from '@ionic/angular';
import { RateModalPage } from '../rate-modal/rate-modal.page';

import * as $ from 'jquery'
import marked from 'marked'


@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {
  url: string = 'https://techfusion-studio.com/safire/'
  postObj: any = {};
  returnObj: any = {};

  title: string;
  thumbnail: string;
  description: string;
  user_id: string;
  tag_list: any[] = [];
  description_background: string;
  thumbnail_background: any;
  description_idea: string;
  thumbnail_idea: any;
  description_technology: string;
  thumbnail_technology: any;
  appendix: string;
  appendix_html: string;
  color: string;

  owner_flag: boolean;
  member_flag: boolean = false;
  member_list: any[] = []
  login_flag: boolean
  apply_flag: boolean

  project_id: string

  constructor(
    private router: Router,
    private alertController: AlertController,
    public gs: GlobalService,
    public modalController: ModalController,
  ) { }

  ngOnInit() {
    this.login_flag = localStorage.user_id != null
    this.gs.httpGet(this.url+'project/'+localStorage.project_id).subscribe(
      res => {
        this.returnObj = res;
        console.log(this.returnObj['message']);
        if(this.returnObj['message']){
          console.log('Success: Get Project Detail Info')
          this.setInfo(this.returnObj);
          this.getMember()
        }
        else {
          console.log('Error');
          return;
        }
      }
    )
    this.gs.httpGet("https://techfusion-studio.com/safire/presentation/"+localStorage.project_id).subscribe(
      res => {
        localStorage.abstract = JSON.stringify(res)
        console.log(JSON.parse(localStorage.abstract)["title"])
      }
    )
  }

  setInfo = (res: any) => {
    this.project_id = res['id']
    this.title = res['title']
    this.thumbnail = res['thumbnail']
    this.description = res['description']
    this.user_id = res['user_id']
    this.owner_flag = this.user_id == localStorage.user_id
    this.tag_list = res['tag_list']
    this.description_background = res['description_background']
    this.thumbnail_background = (res['thumbnail_background'] == null) ? "/assets/img/project_img_none.png" : res['thumbnail_background']
    $('#detail_background_img').css('content', 'none');
    this.description_idea = res['description_idea']
    this.thumbnail_idea = (res['thumbnail_idea'] == null) ? "/assets/img/project_img_none.png" : res['thumbnail_idea']
    $('#detail_idea_img').css('content', 'none');
    this.description_technology = res['description_technology']
    this.thumbnail_technology = (res['thumbnail_technology'] == null) ? "/assets/img/project_img_none.png" : res['thumbnail_technology']
    $('#detail_tech_img').css('content', 'none');
    this.appendix = res['appendix']
    this.color = '#'+res['color']

    this.appendix_html = marked(this.appendix).replace('\n', '<br>');
  }

  toPresentation = () => {
    //
    this.router.navigate(['/slides']);
  }

  toTraining = () => {
    this.router.navigate(['/feedback', this.project_id]);
  }

  toEdit = () => {
    this.router.navigate(['/new_project', this.project_id])
  }

  async alertConfirm() {
    const alert = await this.alertController.create({
      message: 'メンバー申請を行いますか？',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            const body = {
              project_id: this.project_id,
              owner_id: this.user_id,
              user_id: localStorage.user_id
            }
            this.gs.http(this.url + "member", body).subscribe(
              res => {
                console.log(res)
                this.alertInform()
              }
            )
          }
        },
        {
          text: 'No',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }
  async alertInform() {
    const alert = await this.alertController.create({
      message: 'メンバー申請を行いました.<br>プロジェクトオーナーがマイページより申請を承認すると、共同編集が行えるようになります.',
      buttons: [
        {
          text: 'OK'
        }
      ]
    });
    await alert.present();
  }

  getMember = () => {
    this.gs.httpGet(this.url + "member/" + this.project_id).subscribe(
      res => {
        this.member_list = res["member_list"]
        this.member_flag = this.member_list.includes(localStorage.user_id) || this.owner_flag
        this.apply_flag = !this.member_flag && this.login_flag
      }
    )
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: RateModalPage,
      componentProps: {
        'project_id': this.project_id,
        'user_id': localStorage.user_id
      }
    });
    return await modal.present();
  }
}
