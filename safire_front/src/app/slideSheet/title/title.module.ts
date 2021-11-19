import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TitlePageRoutingModule } from './title-routing.module';

import { TitlePage } from './title.page';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TitlePageRoutingModule,
    MatSnackBarModule,
    ComponentsModule,
  ],
  declarations: [TitlePage]
})
export class TitlePageModule {}
