import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { SliderTutorialPage } from 'src/app/modals/slider-tutorial/slider-tutorial.page';

@Component({
  selector: 'app-popover-tutorial',
  templateUrl: './popover-tutorial.component.html',
  styleUrls: ['./popover-tutorial.component.scss'],
})
export class PopoverTutorialComponent implements OnInit {

  constructor(
    private popoverController: PopoverController,
    private modalController: ModalController,
  ) { }

  ngOnInit() {}

  closePopover = () => {
    this.popoverController.dismiss()
  }

  presentModalPresentation = async (header) => {
    const modal = await this.modalController.create({
      component: SliderTutorialPage,
      componentProps: {
        'headerName': header,
        'assets': ["assets/img/tutorial/presentation-0.png", "assets/img/tutorial/presentation-1.png"],
      }
    });
    await modal.present();
  }
  presentModalUse = async (header) => {
    const modal = await this.modalController.create({
      component: SliderTutorialPage,
      componentProps: {
        'headerName': header,
        'assets': ["assets/img/tutorial/use-0.png"],
      }
    });
    await modal.present();
  }
  presentModalPost = async (header) => {
    const modal = await this.modalController.create({
      component: SliderTutorialPage,
      componentProps: {
        'headerName': header,
        'assets': ["assets/img/tutorial/post-0.png", "assets/img/tutorial/post-1.png"],
      }
    });
    await modal.present();
  }
  presentModalPostResult = async (header) => {
    const modal = await this.modalController.create({
      component: SliderTutorialPage,
      componentProps: {
        'headerName': header,
        'assets': ["assets/img/tutorial/post-result-0.png", "assets/img/tutorial/post-result-1.png", "assets/img/tutorial/post-result-2.png", "assets/img/tutorial/post-result-3.png"],
      }
    });
    await modal.present();
  }
  presentModalPractice = async (header) => {
    const modal = await this.modalController.create({
      component: SliderTutorialPage,
      componentProps: {
        'headerName': header,
        'assets': ["assets/img/tutorial/practice-0.png", "assets/img/tutorial/practice-1.png", "assets/img/tutorial/practice-2.png", "assets/img/tutorial/practice-3.png", "assets/img/tutorial/practice-4.png", "assets/img/tutorial/practice-5.png", "assets/img/tutorial/practice-6.png"],
      }
    });
    await modal.present();
  }
  presentModalTips = async (header) => {
    const modal = await this.modalController.create({
      component: SliderTutorialPage,
      componentProps: {
        'headerName': header,
        'assets': ["assets/img/tutorial/tip-0.png"],
      }
    });
    await modal.present();
  }
  presentModalScore = async (header) => {
    const modal = await this.modalController.create({
      component: SliderTutorialPage,
      componentProps: {
        'headerName': header,
        'assets': ["assets/img/tutorial/score-0.png", "assets/img/tutorial/score-1.png"],
      }
    });
    await modal.present();
  }

}
