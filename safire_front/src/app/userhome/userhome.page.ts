import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-userhome',
  templateUrl: 'userhome.page.html',
  styleUrls: ['userhome.page.scss']
})
export class UserHomePage {
  url: string = 'https://techfusion-studio.com/safire/'
  postObj: any = {};
  returnObj: any = {};
  project_list: any;

  ranking_flag: boolean = false;
  ranking_display: string = "表示する"
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
  },
  {
    img: "/assets/img/view_ranking_other.png",
    id: 1,
    title: "すごいサービス",
    tag_list: ["AI", "IoT"]
  },
  {
    img: "/assets/img/view_ranking_other.png",
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

  constructor(
    private router: Router,
    public gs: GlobalService
  ) {}

  ngOnInit(){
    this.gs.httpGet(this.url + 'home').subscribe(
      res => {
        this.returnObj = res;
        console.log(this.returnObj)
        if(this.returnObj['project_list']){
          this.project_list = this.returnObj['project_list'];
        }
      }
    )
  }

  // 既存のページに帰ってくる場合はこっち
  ionViewDidEnter() {
    this.login_flag = (localStorage.user_id !== undefined)
    console.log(this.login_flag)
  }

  signup = () => {
    this.router.navigate(['signup']);
  }

  login = () => {
    this.router.navigate(['login']);
  }

  logout = () => {
    localStorage.clear();
    this.router.navigate(['']);
  }

  toMypage = () => {
    this.router.navigate(['userpage'])
  }

  toNewProject = () => {
    this.router.navigate(['new_project'])
  }

  toUserPage = () => {
    this.router.navigate(['userpage']);
  }

  toArticlePage = (id: any) => {
    localStorage.project_id = id;
    this.router.navigate(['article', id]);
  }

  toUserHome = () => {
    localStorage.removeItem('project_id');
    this.router.navigate(['userhome']);
  }

  changeRankingDisplay = () => {
    this.ranking_flag = !this.ranking_flag
    if (this.ranking_flag) this.ranking_display = "表示を消す"
    else this.ranking_display = "表示する"
  }
}
