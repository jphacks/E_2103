import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  url: string = 'https://techfusion-studio.com/safire/'
  postObj: any = {};
  returnObj: any = {};

  user_id: string;
  password: string;
  
  constructor(
    private router: Router,
    public gs: GlobalService,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
  }

  login = () => {
    this.postObj['user_id'] = this.user_id;
    this.postObj['password'] = this.password;
    const body = this.postObj;
    this.gs.http(this.url+'login/'+this.user_id+'/login', body).subscribe(
      res => {
        this.returnObj = res;
        if(this.returnObj['message']){
          localStorage.user_id = this.user_id;
          this.router.navigate(['home']);
        }
        else{
          return;
        }
      },
      error => {
        this.errorInform()
      }
    )
  }

  async errorInform() {
    const alert = await this.alertController.create({
      message: 'ユーザIDもしくはパスワードが間違っています.<br>入力し直してください🙇‍♂️',
      buttons: [
        {
          text: 'OK'
        }
      ]
    });
    //入力欄のリセット
    this.user_id = "";
    this.password = "";
    await alert.present();
  }
}
