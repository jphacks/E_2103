import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverTutorialComponent } from '../popover-tutorial/popover-tutorial.component';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() logoutEvent = new EventEmitter();
  login_flag: boolean

  constructor(
    private router: Router,
    public popoverController: PopoverController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.checkLogin()
  }

  signup = () => {
    this.router.navigate(['signup'])
  }

  login = () => {
    this.router.navigate(['login'])
  }

  logout = () => {
    localStorage.clear()
    this.checkLogin()
    this.logoutEvent.emit()
    this.alertLogout()
    this.router.navigate([''])
  }

  checkLogin = () => {
    this.login_flag = (localStorage.user_id !== undefined)
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverTutorialComponent,
      event: ev
    });
    await popover.present();
    if (!this.login_flag) this.recommendLogin()

    const { role } = await popover.onDidDismiss();
    // console.log('onDidDismiss resolved with role', role);
  }

  recommendLogin = async () => {
    const alert = await this.alertController.create({
      message: "いくつかの機能のご利用には<br>ログインが必要です<br>会員登録をよろしくお願いします😄",
      buttons: [
        {
          text: 'OK'
        }
      ]
    });
    await alert.present();
  }

  async alertLogout() {
    const alert = await this.alertController.create({
      message: "ログアウトしました👋<br>またお待ちしております☺️",
      buttons: [
        {
          text: 'OK'
        }
      ]
    });
    await alert.present();
  }

}
