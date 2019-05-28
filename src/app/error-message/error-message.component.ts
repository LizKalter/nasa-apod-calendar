import { Component, OnInit } from '@angular/core';

import { ErrorMessageService } from '../error-message.service';
import { PictureService } from '../picture.service';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {

  constructor(private pictureService: PictureService, public errorMessageService: ErrorMessageService) { }

  ngOnInit() {
  }

}
