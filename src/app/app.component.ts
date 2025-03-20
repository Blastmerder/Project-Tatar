import { Component, inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import * as L from 'leaflet';
import { icon, latLng, marker, Map, point, polyline, tileLayer, LatLngBounds, latLngBounds } from 'leaflet';
import { DialogContentExample, DialogContentExampleDialog } from './components/modal/modal.component.js'
import { Point } from './models/point.js';
import data from './points.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [LeafletModule, MatDialogModule, DialogContentExample]
})
export class AppComponent implements OnInit {
  dialog=inject(MatDialog)

  ngOnInit() {

    this.options.layers =  data.map(d=>
      marker(latLng([d.position[0], d.position[1], d.position[2]]),
      {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: './assets/images/marker-icon.png',
          shadowUrl: './assets/images/marker-shadow.png'
        })
      }).on('click', (event) => { this.openDialog(<Point>d); }))

    this.options.layers.push(this.streetMaps)

    this.initMap();
  }


  // Define our base layers so we can reference them multiple times
  streetMaps = tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom:16,
    minZoom: 5
    
  });
  
  // Marker for the top of Mt. Ranier
  summit = marker([ 55.35, 52 ], 
    {
    icon: icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 41 ],
      iconUrl: './assets/images/marker-icon.png',
      shadowUrl: './assets/images/marker-shadow.png'
    })
  }) 
  

  // Set the initial set of displayed layers (we could also use the leafletLayers input binding for this)
  options = {
    layers: [ this.streetMaps, this.summit],
    zoom: 7,
    center: latLng([ 55.35, 51 ])
  };


  private initMap(): void {
    // Обработка события нажатия на маркер
    // this.summit.on('click', (event) => { console.log(event) });
  }

  openDialog(d: Point) {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      data: d
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}