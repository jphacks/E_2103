import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PopoverTutorialComponent } from './popover-tutorial/popover-tutorial.component';
import { HeaderComponent } from './header/header.component';
import { PipTimerComponent } from './pip-timer/pip-timer.component';

@NgModule({
  declarations: [
    PopoverTutorialComponent,
    HeaderComponent,
    PipTimerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [
    PopoverTutorialComponent,
    HeaderComponent,
    PipTimerComponent,
  ],
})
export class ComponentsModule { }
