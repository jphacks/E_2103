import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { environment } from 'src/environments/environment';
import { HeaderComponent } from '../components/header/header.component';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(HeaderComponent, {static: false})
  header: HeaderComponent
  url: string = 'https://techfusion-studio.com/safire/'
  postObj: any = {};
  returnObj: any = {};
  project_list: any;

  ranking_img_list = [
    "/assets/img/view_ranking_1.png",
    "/assets/img/view_ranking_2.png",
    "/assets/img/view_ranking_3.png",
    "/assets/img/view_ranking_other.png",
    "/assets/img/view_ranking_other.png"
  ]

  ranking_project: any[] = [{
    img: "/assets/img/view_ranking_1.png",
    id: 1,
    title: "すごいサービス",
    tag_list: ["AI", "IoT"]
  },
  {
    img: "/assets/img/view_ranking_2.png",
    id: 1,
    title: "すごいサービス",
    tag_list: ["AI", "IoT"]
  },
  {
    img: "/assets/img/view_ranking_3.png",
    id: 1,
    title: "すごいサービス",
    tag_list: ["AI", "IoT"]
  }]

  img: string;

  recommend_user: any[] = [{
    user_id: "サファ太郎",
    tag_list: ["AI", "IoT"]
  },
  {
    user_id: "サファ太郎",
    tag_list: ["AI", "IoT"]
  },
  {
    user_id: "サファ太郎",
    tag_list: ["AI", "IoT"]
  }]

  login_flag: boolean

  challenge_flag: boolean = false
  latest_project_id: number

  waiting: any

  constructor(
    private router: Router,
    public gs: GlobalService,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.waiting.dismiss()
  }

  // 既存のページに帰ってくる場合はこっち
  ionViewDidEnter() {
    this.loading()
    this.checkLogin()
    this.header.checkLogin()
    this.getHomeInformation()
  }

  getHomeInformation = () => {
    this.gs.httpGet(this.url + 'home/' + '?' + 'user_id=' + localStorage.user_id).subscribe(
      res => {
        this.returnObj = res;
        if(this.returnObj['project_list']){
          this.project_list = this.returnObj['project_list'];
          this.checkTagListLength(this.project_list)
          this.setInfo()
          this.setRecommendUser(this.returnObj.user_list)
          this.setRecommendProject(this.returnObj.top_project_list)
        }
        if (this.login_flag) this.getLatestProject()
        else this.waiting.dismiss()
      },
      error => {
        this.waiting.dismiss()
        this.router.navigate(['error'])
      }
    )
  }

  getLatestProject = () => {
    this.gs.httpGet(environment.url+'project/'+localStorage.user_id+'/latest_project').subscribe(
      res => {
        if (res["project_id"] != null) {
          this.challenge_flag = true
          this.latest_project_id = res["project_id"]
        }
        else this.challenge_flag = false
        this.waiting.dismiss()
      },
      error => {
        this.waiting.dismiss()
        this.router.navigate(['error'])
      }
    )
  }

  setInfo = () => {
    for(let i=0; i < this.project_list.length; i++){
      this.project_list[i]['thumbnail'] = (this.project_list[i]['thumbnail'] == null) ? "/assets/img/project_img_none.png" : this.project_list[i]['thumbnail'];
    }
  }

  checkLogin = () => {
    this.login_flag = (localStorage.user_id !== undefined)
  }

  toMypage = () => {
    this.router.navigate(['/userpage'], {queryParams: {user: localStorage.user_id}})
  }

  toNewProject = () => {
    this.router.navigate(['new_project'])
  }

  toUserPage = (user_id) => {
    this.router.navigate(['/userpage'], {queryParams: {user: user_id}});
  }

  toArticlePage = (id: any) => {
    localStorage.project_id = id;
    this.router.navigate(['article', id]);
  }

  /** プロジェクトタグが3つ以上の場合はproject-cardに収まらないので3つだけ表示 **/
  checkTagListLength = (projects: any[]) => {
    for(let i in projects){
      var project = projects[i]
      if(project['tag_list'].length > 3){
        this.project_list[i]['tag_list'] = project['tag_list'].splice(0, 3)
        this.project_list[i]['tag_list'].push('+')
      }
    }
  }

  setRecommendUser = (user_list: any[]) => {
    this.recommend_user = user_list;
  }

  setRecommendProject = (project_list: any[]) => {
    this.ranking_project = project_list;
    for(let i in this.ranking_project){
      this.ranking_project[i]['img'] = this.ranking_img_list[i]
    }
    for(let i in this.ranking_project){
      var project = this.ranking_project[i]
      if(project['tag_list'].length > 2){
        this.ranking_project[i]['tag_list'] = project['tag_list'].splice(0, 2)
        //this.ranking_project[i]['tag_list'].push('+')
      }
    }
  }

  practiceLatestPost = () => {
    localStorage.project_id = this.latest_project_id
    this.router.navigate(['/practice', this.latest_project_id])
  }

  loading = async () => {
    this.waiting = await this.loadingController.create({
      message: `読み込み中...⏳`,
      duration: 10000
    })
    await this.waiting.present()
  }
}
