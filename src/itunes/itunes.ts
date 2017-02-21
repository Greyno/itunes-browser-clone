import {Injectable} from '@angular/core';
import {Jsonp, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/toPromise';
let i = 0;
@Injectable()
export class Itunes {

	public jsonp:any;

  constructor(jsonp: Jsonp) {
    this.jsonp = jsonp;
    console.debug('Instance of Itunes #'+(++i));
  }

  search(keyword) {
    let params = new URLSearchParams('callback=JSONP_CALLBACK');
    params.set('term', keyword);
    return this.jsonp.request('https://itunes.apple.com/search', {
      search: params
    }).toPromise()
      .then((response) => response.json().results);
  }
}