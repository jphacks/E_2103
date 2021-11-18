import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-userpage',
  templateUrl: 'userpage.page.html',
  styleUrls: ['userpage.page.scss']
})
export class UserpagePage {
  url: string = environment.url
  postObj: any = {};
  returnObj: any = {};
  own_project_list: any[];

  user_id: string = "hoge";
  user_id_page: string = "hoge";
  description: string = "こんにちは";
  image: string;

  applied_user: any[]
  applied_flag: boolean

  liked_project_list: any[];

  total_post: number = 0
  total_clear: number = 0
  total_practice: number = 0

  constructor(
    private router: Router,
    private alertController: AlertController,
    public gs: GlobalService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(){
    this.route.queryParams
      //.filter(params => params.user)
      .subscribe(params => {
        this.user_id_page = params.user
        this.getUserInfo()
        this.getAppliedUser()
      });
  }

  getUserInfo = () => {
    //this.user_id = localStorage.user_id;
    const body = {}//this.postObj;
    this.gs.httpGet(this.url+'mypage/'+this.user_id_page).subscribe(
      res => {
        this.returnObj = res;
        if(this.returnObj['user_id']){
          this.own_project_list = this.returnObj['own_project_list'];
          this.setInfo();
          this.checkTagListLength(this.own_project_list);
          //this.image = this.['thumbnail'];
          console.log('Success Get User Info');
          this.description = this.returnObj['description'];
          this.setLikedProjects(this.returnObj['liked_project_list'])
          this.checkTagListLength_liked(this.liked_project_list);
          //プロジェクト一覧

          this.total_post = res["total_post"]
          this.total_clear = res["total_clear"]
          this.total_practice = res["total_practice"]
        }
        else{
          return;
        }
      },
      error => {
        this.router.navigate(['error'])
      }
    )
  }

  setInfo = () => {
    for(let i=0; i < this.own_project_list.length; i++){
      this.own_project_list[i]['thumbnail'] = (this.own_project_list[i]['thumbnail'] == null) ? "/assets/img/project_img_none.png" : this.own_project_list[i]['thumbnail'];
    }
  }

  toArticlePage = (id: any) => {
    localStorage.project_id = id;
    this.router.navigate(['article']);
  }

  toUserHome = () => {
    this.router.navigate(['home']);
  }

  logout = () => {
    localStorage.clear()
    this.router.navigate([''])
  }

  async alertConfirm(id, user_id, project_title, index) {
    const alert = await this.alertController.create({
      message: `${user_id}さんがプロジェクト「${project_title}」に参加することを許可しますか？`,
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            const body = {
              permit: true
            }
            this.gs.httpPut(this.url + "member/" + id, body).subscribe(
              res => {
                console.log(res)
                this.alertInform(id, user_id, project_title, index)
              }
            )
          }
        },
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            const body = {
              permit: false
            }
            this.gs.httpPut(this.url + "member/" + id, body).subscribe(
              res => {
                console.log(res)
                this.alertInformFalse(id, user_id, project_title, index)
              }
            )
          }
        }
      ]
    });
    await alert.present();
  }
  async alertInform(id, user_id, project_title, index) {
    const alert = await this.alertController.create({
      message: `${user_id}さんがプロジェクト「${project_title}」に参加しました！`,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.applied_user.splice(index, 1)
            this.applied_flag = this.applied_user.length > 0
          }
        }
      ]
    });
    await alert.present();
  }
  async alertInformFalse(id, user_id, project_title, index) {
    const alert = await this.alertController.create({
      message: `${user_id}さんがプロジェクト「${project_title}」への申請を却下しました.`,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.applied_user.splice(index, 1)
            this.applied_flag = this.applied_user.length > 0
          }
        }
      ]
    });
    await alert.present();
  }

  getAppliedUser = () => {
    if (localStorage.user_id == this.user_id_page) {
      console.log(this.url + "member?owner_id=" + localStorage.user_id)
      this.gs.httpGet(this.url + "member?owner_id=" + localStorage.user_id).subscribe(
        res => {
          this.applied_user = res
          this.applied_flag = this.applied_user.length > 0
        }
      )
    }
  }

  /** プロジェクトタグが3つ以上の場合はproject-cardに収まらないので3つだけ表示 **/
  checkTagListLength = (projects: any[]) => {
    for(let i in projects){
      var project = projects[i]
      if(project['tag_list'].length > 3){
        this.own_project_list[i]['tag_list'] = project['tag_list'].splice(0, 3)
        this.own_project_list[i]['tag_list'].push('+')
      }
    }
  }
  checkTagListLength_liked = (projects: any[]) => {
    for(let i in projects){
      var project = projects[i]
      if(project['tag_list'].length > 3){
        this.liked_project_list[i]['tag_list'] = project['tag_list'].splice(0, 3)
        this.liked_project_list[i]['tag_list'].push('+')
      }
    }
  }

  setLikedProjects = (projects: any[]) => {
    this.liked_project_list = projects
  }
}
