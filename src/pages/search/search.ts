import { Component } from '@angular/core';
import { NavController, NavParams , ActionSheetController, ModalController} from 'ionic-angular';
import {Http} from '@angular/http';
import {Inject} from '@angular/core';
import { Itunes } from '../../itunes/itunes';
import {PreviewModal} from './preview';

/*
  Generated class for the Search page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  viewProviders:[Itunes]
})

export class SearchPage {
  public results:any;
  public keyword:string;
  public itunes:any;
  public http:any;
  public usesFilter:any;
  private _unfilteredResults:any; /*the _represents private*/

  constructor(public navCtrl: NavController, public navParams: NavParams, itunes:Itunes, public actionCtrl:ActionSheetController, 
  public modalCtrl: ModalController) {
  //this.results = this.getResults();
  this._unfilteredResults =[];
  this.usesFilter=false;
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
  this.keyword = '';
}

keyHasBeenPressed(e){
/*console.log(e); /* will log keys pressed in searchbar */
if(e.key ==='Enter'){
  this.itunes.search(this.keyword).then((results)=> {
    this._unfilteredResults = results;
    this.usesFilter = true;
    this.results = results});
 
}
}

openFilters(){
  let sheet = this.actionCtrl.create({
    title:'Filter by...',
    buttons: [
      {
        text: 'Movies only',
        handler: ()=>{
          this.results = this._unfilteredResults.filter(
            (item) => item.kind === 'feature-movie'
            );
            this.usesFilter = true;
        }
        },
        {text: 'Songs Only', 
        handler: () => {
          this.results =
          this._unfilteredResults.filter(
            (item) => item.kind === 'song'

          );
          this.usesFilter = true;
        }
      },
      { text: 'Clear',
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
sheet.present(this.actionCtrl)
}

ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
/*
getResults(){ two results are currently shown here so we can get started with some data; see structure, etc.
  return[
    {"wrapperType":"track", "kind":"song", "artistId":5869117, "collectionId":459904774, "trackId":459904911, "artistName":"Lil Wayne", "collectionName":"Tha Carter IV (Deluxe Edition)", "trackName":"John (feat. Rick Ross)", "collectionCensoredName":"Tha Carter IV (Deluxe Edition)", "trackCensoredName":"John (feat. Rick Ross)", "artistViewUrl":"https://itunes.apple.com/us/artist/lil-wayne/id5869117?uo=4", "collectionViewUrl":"https://itunes.apple.com/us/album/john-feat.-rick-ross/id459904774?i=459904911&uo=4", "trackViewUrl":"https://itunes.apple.com/us/album/john-feat.-rick-ross/id459904774?i=459904911&uo=4", "previewUrl":"http://a357.phobos.apple.com/us/r30/Music/de/c6/37/mzm.vjfeqrjw.aac.p.m4a", "artworkUrl30":"http://is4.mzstatic.com/image/thumb/Music/v4/c8/d2/f9/c8d2f98d-d2a8-35d0-fcd1-7adffc2560a9/source/30x30bb.jpg", "artworkUrl60":"http://is4.mzstatic.com/image/thumb/Music/v4/c8/d2/f9/c8d2f98d-d2a8-35d0-fcd1-7adffc2560a9/source/60x60bb.jpg", "artworkUrl100":"http://is4.mzstatic.com/image/thumb/Music/v4/c8/d2/f9/c8d2f98d-d2a8-35d0-fcd1-7adffc2560a9/source/100x100bb.jpg", "collectionPrice":6.99, "trackPrice":1.29, "releaseDate":"2011-08-29T07:00:00Z", "collectionExplicitness":"explicit", "trackExplicitness":"explicit", "discCount":1, "discNumber":1, "trackCount":19, "trackNumber":9, "trackTimeMillis":286973, "country":"USA", "currency":"USD", "primaryGenreName":"Hip-Hop/Rap", "contentAdvisoryRating":"Explicit", "isStreamable":true},
			{"wrapperType":"track", "kind":"feature-movie", "trackId":928911988, "artistName":"Chad Stahelski", "trackName":"John Wick", "trackCensoredName":"John Wick", "trackViewUrl":"https://itunes.apple.com/us/movie/john-wick/id928911988?uo=4",
			"previewUrl":"http://video.itunes.apple.com/apple-assets-us-std-000001/Video30/v4/7c/c9/6f/7cc96f1f-ff33-3f7d-8188-f1948755b3b8/mzvf_7061924837190485580.640x350.h264lc.D2.p.m4v", "artworkUrl30":"http://is2.mzstatic.com/image/thumb/Video2/v4/3b/ea/a4/3beaa4a6-611c-cbc2-6718-fd2578abf363/source/30x30bb.jpg", "artworkUrl60":"http://is2.mzstatic.com/image/thumb/Video2/v4/3b/ea/a4/3beaa4a6-611c-cbc2-6718-fd2578abf363/source/60x60bb.jpg", "artworkUrl100":"http://is2.mzstatic.com/image/thumb/Video2/v4/3b/ea/a4/3beaa4a6-611c-cbc2-6718-fd2578abf363/source/100x100bb.jpg", "collectionPrice":9.99, "trackPrice":9.99, "collectionHdPrice":12.99000, "trackHdPrice":12.99000, "releaseDate":"2014-10-24T07:00:00Z", "collectionExplicitness":"notExplicit", "trackExplicitness":"notExplicit", "trackTimeMillis":6072038, "country":"USA", "currency":"USD", "primaryGenreName":"Action & Adventure", "contentAdvisoryRating":"R", "shortDescription":"From the producer of CLASH OF THE TITANS and THE TOWN comes a tale of adrenaline-fueled revenge and",
			"longDescription":"When sadistic young thugs senselessly attack John Wick (Keanu Reeves)—a brilliantly lethal ex-assassin—they have no idea they've messed with the wrong guy. With New York City as his bullet-riddled playground, Wick embarks on a merciless rampage, hunting down his adversaries with the skill and ruthlessness that made him an underworld legend.", "hasITunesExtras":true}
      ]
}*/
}
