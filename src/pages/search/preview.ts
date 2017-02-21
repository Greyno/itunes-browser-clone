import {ViewController, NavController, NavParams} from 'ionic-angular';
import {Component} from '@angular/core';

@Component({
template:`<ion-content padding>
			<h2>{{track.trackName}}</h2>
			<audio [src]="track.previewUrl" *ngIf="track.kind ==='song'" autoplay="autoplay" controls="controls">
			Browser doesn't support</audio>
			<video [src]="track.previewUrl" *ngIf="track.kind === 'feature-movie'" autoplay="autoplay" controls="controls">Browser doesn't support</video>
			<button ion-button primary (click)="close()">Close</button>
		</ion-content>
	`
})

export class PreviewModal{
    public track:any;

    constructor(public viewCtrl: ViewController, params:NavParams){
        this.track = params.data.track;
    }

    close(){
        this.viewCtrl.dismiss();
    }
}