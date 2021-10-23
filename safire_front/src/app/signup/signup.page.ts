import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';

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
    public gs: GlobalService
  ) { }

  ngOnInit() {
  }

  signup = () => {
    this.postObj['user_id'] = this.user_id;
    if(this.password == this.password_confirm){
      this.postObj['password'] = this.password
    } else {return};
    this.postObj['age'] = this.age;
    this.postObj["school_grade"] = this.school_grade
    this.postObj['gender'] = this.gender;
    
    const element: HTMLInputElement = <HTMLInputElement>document.getElementById('description')
    this.postObj['description'] = element.value

    const body = this.postObj;

    this.gs.http(this.url+'signup', body).subscribe(
      res => {
        this.returnObj = res;
        if(this.returnObj['message']){
          console.log('Success: Signup')
          this.router.navigate(['login']);
        }
        else {
          console.log('Error');
          return;
        }
      }
    )
  }
}
