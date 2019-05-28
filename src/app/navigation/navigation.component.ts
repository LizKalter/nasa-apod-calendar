import { Component, OnInit } from '@angular/core';

import { PictureService } from '../picture.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  months: Date[] = new Array();
  years: Date[] = new Array();

  constructor(private pictureService: PictureService) { }

  setMonths(): void {
    for (var i = 0; i < 12; i++) {
      this.months[i] = new Date(Date.UTC(this.pictureService.lastAvailableDate.getUTCFullYear(), i + 1));
    }
  }

  setYears(): void {
    for (var i = 0; 
        i <= (this.pictureService.lastAvailableDate.getUTCFullYear() 
            - this.pictureService.earliestAvailableDate.getUTCFullYear()); i++) {
      this.years[i] = new Date(Date.UTC(this.pictureService.earliestAvailableDate.getUTCFullYear() + i + 1, 0));
    }
  }

  ngOnInit() {
    this.setMonths(); // needs to be regenerated for first and last available years
    this.setYears();
  }

}
