import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { SearchPage } from '../search/search';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

	public theSearchPage: any;

  constructor(public navCtrl: NavController) {
    this.theSearchPage = SearchPage;
  }

}
