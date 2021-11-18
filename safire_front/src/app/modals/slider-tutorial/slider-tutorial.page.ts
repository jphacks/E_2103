import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SwiperComponent } from "swiper/angular";
// import Swiper core and required modules
import SwiperCore, { Virtual } from 'swiper';

// install Swiper modules
SwiperCore.use([Virtual]);

@Component({
  selector: 'app-slider-tutorial',
  templateUrl: './slider-tutorial.page.html',
  styleUrls: ['./slider-tutorial.page.scss'],
})
export class SliderTutorialPage implements OnInit {
  @Input() headerName: string
  @Input() assets: any[]
  exitFlag: Boolean = false
  backFlag: Boolean = false

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    this.exitFlag = (0 == (this.assets.length - 1))
  }

  dismiss = () => {
    this.modalController.dismiss({})
  }

  onSlideChange(swiper) {
    this.exitFlag = (swiper["activeIndex"] == (this.assets.length - 1))
    this.backFlag = (swiper["activeIndex"] != 0)
  }

  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  slideNext(){
    this.swiper.swiperRef.slideNext(100);
  }
  slidePrev(){
    this.swiper.swiperRef.slidePrev(100);
  }
}
