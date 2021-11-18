import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-tutorial',
  templateUrl: './popover-tutorial.component.html',
  styleUrls: ['./popover-tutorial.component.scss'],
})
export class PopoverTutorialComponent implements OnInit {

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}

  closePopover = () => {
    this.popoverController.dismiss()
  }

}
