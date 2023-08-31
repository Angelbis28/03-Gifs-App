import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { CardComponent } from './components/card/card.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';




@NgModule({

  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
     HomePageComponent,
     SearchBoxComponent,
     CardListComponent,
     CardComponent

  ],
  exports: [
    HomePageComponent
  ]
})
export class GifsModule { }
