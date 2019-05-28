import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Picture } from '../picture';
import { PictureService } from '../picture.service';
import { ErrorMessageService } from '../error-message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [PictureService]
})
export class DashboardComponent implements OnInit {

  constructor(private pictureService: PictureService, private errorMessageService: ErrorMessageService) { }

  ngOnInit() {
    this.pictureService.getPicturesForCurrentMonth();
    //this.pictureService.getTestPictures();
  }

}
