import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController , ModalController} from 'ionic-angular';
import { PreviewModal } from './preview';
import { Http } from '@angular/http';
import { Inject } from '@angular/core';
import { Itunes } from '../../itunes/itunes';

/*
  Generated class for the Search page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
	viewProviders: [Itunes]
})

export class SearchPage {

	public results:any;
	public keyword:string;
	public http:any;
	public itunes:any;
	public usesFilter:any;
	private _unfilteredResults:any;

	constructor(public navCtrl: NavController, public navParams: NavParams, itunes:Itunes, public actionCtrl:ActionSheetController, public modalCtrl:ModalController) {
		this._unfilteredResults = [];
		this.usesFilter = false;
		this.itunes = itunes;
		this.keyword = '';

	}

	openPreview(track){
		let previewModal = this.modalCtrl.create(PreviewModal, {
			track: track
		});
		previewModal.present();
	}

	userPressedCancel(){
		//this.results = this.getResults();
		this.keyword = '';
	}
	keyHasBeenPressed(e){
		if(e.key === 'Enter'){
			this.itunes.search(this.keyword)
				.then((results)=> {
					this._unfilteredResults = results;
					this.usesFilter = false;
					this.results = results
				});
		}
	}

	openFilters(){
		let sheet = this.actionCtrl.create({
			title:'Filter by...',
			buttons: [
				{
					text: 'Movies Only',
					handler: ()=>{
						this.results = this._unfilteredResults.filter(
							(item) => item.kind === 'feature-movie'
						);
						this.usesFilter = true;
					}
				},
				{
					text: 'Songs Only',
					handler: () => {
						this.results = this._unfilteredResults.filter(
							(item) => item.kind === 'song'
						);
						this.usesFilter = true;
					}
				},
				{
					text:'Clear',
					style: 'destructive',
					handler: ()=> {
						this.results = this._unfilteredResults;
						this.usesFilter = false;
					}
				},
				{
					text: 'Cancel',
					style: 'cancel'
				}
			]
		})
	  sheet.present(this.actionCtrl);
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
}
