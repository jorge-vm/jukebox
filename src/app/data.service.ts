import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {


  constructor(private http: HttpClient) { }

  songsUrl = environment.path + '/songs';
  albumsUrl = environment.path + '/albums';


  getAlbums(){
    return this.http.get<any>(this.albumsUrl)
    .catch(error => this.handleError(error));
  }

  getSongs(albumId){
    const url = `${this.songsUrl}?album_id=${albumId}`;
    return this.http.get(url)
    .map(this.sortSongs)
    .catch(error => this.handleError(error));;
  }

  sortSongs(response){
    return response.sort((a,b)=>{
      return a.song_order - b.song_order
    })
  }

  private handleError(error: any): Observable<any> {
    console.log(`An error occurred: ${error}`);
    return Observable.throw('Something bad happened; please check the console');
}
}
