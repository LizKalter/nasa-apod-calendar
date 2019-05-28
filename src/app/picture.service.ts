import { Injectable } from '@angular/core';

import { NasaApiService } from './nasa-api.service';
import { Picture } from './picture';
import { PICTURES } from './picture-list';

@Injectable({
  providedIn: 'root'
})
export class PictureService {
  pictures: Picture[];
  selectedMonthStart: Date;
  selectedMonthEnd: Date;
  lastAvailableDate: Date;
  earliestAvailableDate: Date = new Date(Date.UTC(1995, 5, 20)); // June 20 1995
  hasPreviousMonth: boolean = false;
  hasNextMonth: boolean = false;

  constructor(private nasaApiService: NasaApiService) { }

  showPreviousMonth(): void {
    let selectedMonthStart = new Date(this.pictures[0].date);
    let previousMonthStart = new Date(Date.UTC(selectedMonthStart.getUTCFullYear(), selectedMonthStart.getUTCMonth() - 1, 1));
    let previousMonthEnd = new Date(Date.UTC(selectedMonthStart.getUTCFullYear(), selectedMonthStart.getUTCMonth(), 0));
    this.getPicturesByDateRange(previousMonthStart, previousMonthEnd);
  }

  showNextMonth(): void {
    let selectedMonthStart = new Date(this.pictures[0].date);
    let nextMonthStart = new Date(Date.UTC(selectedMonthStart.getUTCFullYear(), selectedMonthStart.getUTCMonth() + 1, 1));
    let nextMonthEnd = new Date(Date.UTC(selectedMonthStart.getUTCFullYear(), selectedMonthStart.getUTCMonth() + 2, 0));
    if (nextMonthEnd > this.lastAvailableDate) {
      nextMonthEnd = this.lastAvailableDate;
    }
    this.getPicturesByDateRange(nextMonthStart, nextMonthEnd);
  }

  changeMonth(month: number): void {
    let startDate = new Date(Date.UTC(this.selectedMonthStart.getUTCFullYear(), ((month*1) - 1), 1));
    if (startDate < this.earliestAvailableDate) {
      startDate = this.earliestAvailableDate;
    } else if (startDate > this.lastAvailableDate) {
      startDate = new Date(Date.UTC(this.lastAvailableDate.getUTCFullYear(), this.lastAvailableDate.getUTCMonth(), 1));
    }
    let endDate = new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth() + 1, 0));
    if (endDate > this.lastAvailableDate) {
      endDate = this.lastAvailableDate;
    }
    this.getPicturesByDateRange(startDate, endDate);
  }

  changeYear(year: number): void {
    let startDate = new Date(Date.UTC(year, this.selectedMonthStart.getUTCMonth(), 1));
    if (startDate < this.earliestAvailableDate) {
      startDate = this.earliestAvailableDate;
    }
    let endDate = new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth() + 1, 0));
    if (endDate > this.lastAvailableDate) {
      endDate = this.lastAvailableDate;
    }

    this.getPicturesByDateRange(startDate, endDate);
  }

  private getPicturesByDateRange(startDate: Date, endDate: Date): void {
    this.nasaApiService.getPicturesByDateRange(startDate, endDate)
        .subscribe(pictures => {
          this.pictures = pictures;
          this.setCurrentMonth(startDate, endDate);
        });
  }

  private setCurrentMonth(selectedMonthStart, selectedMonthEnd) {
    this.selectedMonthStart = selectedMonthStart;
    this.selectedMonthEnd = selectedMonthEnd;
    this.hasNextMonth = (selectedMonthEnd < this.lastAvailableDate);
    this.hasPreviousMonth = (selectedMonthStart > this.earliestAvailableDate);
  }

  // the default content
  getPicturesForCurrentMonth(): void {
    this.nasaApiService.getPicturesForCurrentMonth()
        .subscribe(pictures => {
          this.pictures = pictures;
          let monthStart = new Date(this.pictures[0].date);
          this.lastAvailableDate = new Date(this.pictures[this.pictures.length - 1].date);
          this.setCurrentMonth(monthStart, this.lastAvailableDate);
        });
  }

  getTestPictures(): void {
    this.pictures = PICTURES;
    let monthStart = new Date(this.pictures[0].date);
    this.lastAvailableDate = new Date(this.pictures[this.pictures.length - 1].date);
    this.setCurrentMonth(monthStart, this.lastAvailableDate);
  }
}
