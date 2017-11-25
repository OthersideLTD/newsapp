import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


/*
  Generated class for the NewsApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NewsApiProvider {

  apikey: String = "d0098c76364443848e120d6f73a2a68c";

  constructor(public http: Http) {

    // console.log('Hello NewsApiProvider Provider');
  }

  getLatestNews() {
    return this.http.get(`https://newsapi.org/v1/articles?source=techcrunch&sortBy=latest&apiKey=${this.apikey}`)
    .map(res => res.json());
  }

  getBusinessNews() {
    return this.http.get(`https://newsapi.org/v1/articles?source=ign&sortBy=latest&apiKey=${this.apikey}`)
    .map(res => res.json());
  }

  getSportsNews() {
    return this.http.get(`https://newsapi.org/v1/articles?source=espn&sortBy=latest&apiKey=${this.apikey}`)
    .map(res => res.json());
  }

}