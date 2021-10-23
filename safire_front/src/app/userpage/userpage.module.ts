import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserpagePage } from './userpage.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { UserpagePageRoutingModule } from './userpage-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    UserpagePageRoutingModule
  ],
  declarations: [UserpagePage]
})
export class UserpagePageModule {}
