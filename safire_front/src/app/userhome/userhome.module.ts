import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserHomePage } from './userhome.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { UserHomePageRoutingModule } from './userhome-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    UserHomePageRoutingModule
  ],
  declarations: [UserHomePage]
})
export class UserHomePageModule {}
