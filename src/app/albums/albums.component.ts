import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.less']
})
export class AlbumsComponent implements OnInit {
  album
  songs
  albums
  isBusy = false;

  constructor(
    private dataService: DataService) { }

  ngOnInit() { 
    this.getAlbums(); 
  }

  getAlbums() {
    this.album = undefined;  // <-- clear before refresh
    this.albums = undefined;

    this.isBusy = true;
    console.log('Getting albums ...');

    this.dataService.getAlbums().subscribe( 
        abs => {
          this.isBusy = false;
          this.albums = abs;
          [this.album] = this.albums
          this.selected(this.album);
        },
        (errorMsg: string) => {
          this.isBusy = false;
          alert(errorMsg);
        }
      );
  }

  getSongs(id){
    this.songs = undefined;
    this.isBusy = true;
    console.log('Getting songs ...');
    
    this.dataService.getSongs(id).subscribe( 
      sngs => {
        this.isBusy = false;
        this.songs = sngs;
      },
      (errorMsg: string) => {
        this.isBusy = false;
        alert(errorMsg);
      }
    );
  }

  shift(increment: number) {
    let ix = increment + this.albums.findIndex(c => c === this.album);
    ix = Math.min(this.albums.length - 1, Math.max(0, ix));
    this.album = this.albums[ix];
    this.selected(this.album)
  }

  selected(album){
    this.album = album
    this.getSongs(album.id)
  }
}
