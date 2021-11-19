import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverHintComponent } from '../popover-hint/popover-hint.component';

@Component({
  selector: 'app-hint',
  templateUrl: './hint.component.html',
  styleUrls: ['./hint.component.scss'],
})
export class HintComponent implements OnInit {
  @Input() hint: string

  constructor(
    public popoverController: PopoverController
  ) { }

  ngOnInit() {}

  popExplaination = async (e: any) => {
    const popover = await this.popoverController.create({
      component: PopoverHintComponent,
      event: e,
      componentProps: {
        "hint": this.hint
      }
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    // console.log('onDidDismiss resolved with role', role);
  }
  closePopover = () => { this.popoverController.dismiss() }

}
