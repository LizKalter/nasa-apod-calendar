import { Component, OnInit } from '@angular/core';

import { PictureService } from '../picture.service';

@Component({
  selector: 'app-picture-list',
  templateUrl: './picture-list.component.html',
  styleUrls: ['./picture-list.component.scss']
})
export class PictureListComponent implements OnInit {
  viewType: string = 'calendar'; // 'list' or 'calendar'
  
  constructor(public pictureService: PictureService) { }

  // for generating empty squares before the first of the month
  getEmptyFillerDays(): number[] {
    let firstDay = new Date(this.pictureService.pictures[0].date);
    return new Array(firstDay.getUTCDay());
  }

  // for generating empty squares to fill out past days of the earliest available month
  getStartFillerDays(): number[] {
    if (! this.pictureService.hasPreviousMonth) {
      let firstDayOfMonth = new Date(this.pictureService.earliestAvailableDate.getUTCFullYear(),
          this.pictureService.earliestAvailableDate.getUTCMonth(), 1);
      let pastDates = new Array(this.pictureService.earliestAvailableDate.getUTCDate() - firstDayOfMonth.getUTCDate());
      for (var i = 0; i < pastDates.length; i++) {
        pastDates[i] = firstDayOfMonth.getUTCDate() + i;
      }
      return pastDates;
    } else {
      return null;
    }
  }

  // for generating empty squares to fill out future days of current month
  getEndFillerDays(): number[] {
    if (! this.pictureService.hasNextMonth) {
      let lastDayOfMonth = new Date(this.pictureService.lastAvailableDate.getUTCFullYear(), 
      		this.pictureService.lastAvailableDate.getUTCMonth() + 1, 0);
      let futureDates = new Array(lastDayOfMonth.getUTCDate() - this.pictureService.lastAvailableDate.getUTCDate());

      for (var i = 0; i < futureDates.length; i++) {
        futureDates[i] = this.pictureService.lastAvailableDate.getUTCDate() + i + 1;
      }

      return futureDates;
    } else {
      return null;
    }
  }

  ngOnInit() {
  }

}
