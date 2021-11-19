import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  url: string = 'https://techfusion-studio.com/safire/'
  postObj: any = {};
  returnObj: any = {};

  user_id: string;
  password: string;
  password_confirm: string;
  age: any;
  gender: string;
  school_grade: string;
  description: string;

  constructor(
    private router: Router,
    public gs: GlobalService,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
  }

  signup = () => {
    if(this.checkInfo()){
      this.setInfo();
    }
  }

  checkInfo = () => {
    if( this.user_id == undefined || this.user_id == '' ){
      this.errorInform('ユーザIDを<ruby>入力<rt>にゅうりょく</rt></ruby>してください.');
      return false;
    }
    else if( this.password == undefined || this.password == '' ){
      this.errorInform('パスワードを<ruby>入力<rt>にゅうりょく</rt></ruby>してください.');
      return false;
    }
    else if( this.password_confirm == undefined || this.password_confirm == undefined ){
      this.errorInform('パスワード(<ruby>確認用<rt>かくにんよう</rt></ruby>)を<ruby>入力<rt>にゅうりょく</rt></ruby>してください.');
      return false;
    }
    else if( this.password != this.password_confirm ) {
      this.errorInform('「パスワード」と「パスワード(<ruby>確認用<rt>かくにんよう</rt></ruby>)」は<ruby>同<rt>おな</rt></ruby>じパスワードを<ruby>入力<rt>にゅうりょく</rt></ruby>してください.');
      this.password = "";
      this.password_confirm = "";
      return false;
    }
    else if( this.age == undefined || this.age == '' ){
      this.errorInform('<ruby>年齢<rt>ねんれい</rt></ruby>を<ruby>入力<rt>にゅうりょく</rt></ruby>してください.');
      return false;
    }
    else if( this.gender == undefined ){
      this.errorInform('<ruby>性別<rt>せいべつ</rt></ruby>を<ruby>選択<rt>せんたく</rt></ruby>してください.');
      return false;
    }
    else if( this.school_grade == undefined ){
      this.errorInform('<ruby>学校区分<rt>がっこうくぶん</rt></ruby>を<ruby>選択<rt>せんたく</rt></ruby>してください.');
      return false;
    }
    return true;
  }

  setInfo = () => {
    this.postObj['user_id'] = this.user_id;
    this.postObj['password'] = this.password;
    this.postObj['age'] = this.age;
    this.postObj["school_grade"] = this.school_grade;
    this.postObj['gender'] = this.gender;
    this.postObj['description'] = this.description;
    const body = this.postObj;

    this.gs.http(this.url+'signup', body).subscribe(
      res => {
        this.returnObj = res;
        if(this.returnObj['message']){
          this.router.navigate(['login']);
        }
        else {
          return;
        }
      },
      error => {
        this.errorInform('<ruby>入力<rt>にゅうりょく</rt></ruby>したユーザIDは<ruby>他<rt>ほか</rt></ruby>のユーザが<ruby>使用<rt>しよう</rt></ruby>しています.<br><ruby>別<rt>べつ</rt></ruby>のユーザIDを<ruby>入力<rt>にゅうりょく</rt></ruby>してください.');
        this.user_id = "";
        return;
      }
    )
  }

  async errorInform(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: [
        {
          text: 'OK'
        }
      ]
    });
    await alert.present();
  }
}
