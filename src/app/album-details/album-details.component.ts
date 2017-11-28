import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css']
})
export class AlbumDetailsComponent {
  
  @Input()
  songs

  @Output()
  shift = new EventEmitter<number>();

  left()   { this.shift.emit(-1); }
  right()  { this.shift.emit(1); }
}
