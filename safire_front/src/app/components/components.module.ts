import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PopoverTutorialComponent } from './popover-tutorial/popover-tutorial.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    PopoverTutorialComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [
    PopoverTutorialComponent,
    HeaderComponent,
  ],
})
export class ComponentsModule { }
