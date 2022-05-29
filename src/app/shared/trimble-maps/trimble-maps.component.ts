import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as TrimbleMaps from '@trimblemaps/trimblemaps-js';
import SingleSearch from '@trimblemaps/trimblemaps-singlesearch';
@Component({
  selector: 'app-trimble-maps',
  templateUrl: './trimble-maps.component.html',
  styleUrls: ['./trimble-maps.component.css']
})
export class TrimbleMapsComponent implements OnInit, OnChanges {
  @Input() location;

  map;
  constructor() {

  }

  ngOnInit(): void {
    TrimbleMaps.setAPIKey('0743E1D2A82AD34682EFE73404AE4C0F');
    const centerCoord = new TrimbleMaps.LngLat(this.location.Coords.Lon, this.location.Coords.Lat);
    this.map = new TrimbleMaps.Map({
      container: 'myMap',
      style: TrimbleMaps.Common.Style.BASIC,
      center: centerCoord,
      zoom: 12,
    });
    const marker = new TrimbleMaps.Marker({
      draggable: true
    }).setLngLat(centerCoord)
      .addTo(this.map);

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log(this.map);
  }

}
