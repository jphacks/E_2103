import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-hint',
  templateUrl: './popover-hint.component.html',
  styleUrls: ['./popover-hint.component.scss'],
})
export class PopoverHintComponent implements OnInit {
  hint: string

  constructor(
    private popoverController: PopoverController,
  ) { }

  ngOnInit() {}

  closePopover = () => {
    this.popoverController.dismiss()
  }

}
