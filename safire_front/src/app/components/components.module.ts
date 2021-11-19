import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PopoverTutorialComponent } from './popover-tutorial/popover-tutorial.component';
import { HeaderComponent } from './header/header.component';
import { PipTimerComponent } from './pip-timer/pip-timer.component';
import { HintComponent } from './hint/hint.component';
import { PopoverHintComponent } from './popover-hint/popover-hint.component';
import { SnackbarPresentationComponent } from './snackbar-presentation/snackbar-presentation.component';

@NgModule({
  declarations: [
    PopoverTutorialComponent,
    HeaderComponent,
    PipTimerComponent,
    HintComponent,
    PopoverHintComponent,
    SnackbarPresentationComponent,
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
    HintComponent,
    PopoverHintComponent,
    SnackbarPresentationComponent,
  ],
})
export class ComponentsModule { }
