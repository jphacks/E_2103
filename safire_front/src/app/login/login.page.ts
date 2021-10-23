import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';

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
    public gs: GlobalService
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
          console.log('Success Login')
          localStorage.user_id = this.user_id;
          this.router.navigate(['home']);
        }
        else{
          console.log('Error');
          return;
        }
      }
    )
  }
}
