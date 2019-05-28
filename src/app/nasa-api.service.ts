import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, EMPTY } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

import { Picture } from './picture';
import { ErrorMessageService } from './error-message.service';

@Injectable({
  providedIn: 'root'
})
export class NasaApiService {
  private pictureUrl = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';
  private pipe = new DatePipe('en-US');

  constructor(private http: HttpClient, private errorMessageService: ErrorMessageService) { }

  getPicturesByDateRange(startDate: Date, endDate: Date): Observable<Picture[]> {
    if ((!isNaN(startDate.valueOf())) && (!isNaN(endDate.valueOf()))) {
      let startDateString = this.pipe.transform(startDate, 'yyyy-MM-dd', 'UTC');
      let endDateString = this.pipe.transform(endDate, 'yyyy-MM-dd', 'UTC');
      return this.http.get<Picture[]>(this.pictureUrl + '&start_date=' + startDateString + '&end_date=' + endDateString)
        .pipe(
          catchError(this.handleError<Picture[]>([]))
        );
    } else {
      return EMPTY;
    }
  }

  getPicturesForCurrentMonth(): Observable<Picture[]> {
    return this.getTodaysPicture().pipe(
      mergeMap(todaysPicture => {
        let endDate = new Date(todaysPicture.date);
        let startDate = new Date(endDate.getUTCFullYear(), endDate.getUTCMonth(), 1); // first day of current month
        return this.getPicturesByDateRange(startDate, endDate);
      })
    );
  }

  private getTodaysPicture(): Observable<Picture> {
    return this.http.get<Picture>(this.pictureUrl)
      .pipe(
        catchError(this.handleError<Picture>({}))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.errorMessageService.add('An error occurred: ' + error.message);
      return of(result as T);
    };
  }
}
