import { Component, OnInit, Renderer2, ViewChild, ElementRef} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Picture } from '../picture';

@Component({
  selector: 'app-picture-modal',
  templateUrl: './picture-modal.component.html',
  styleUrls: ['./picture-modal.component.scss']
})
export class PictureModalComponent implements OnInit {
  picture: Picture;
  videoUrl: SafeResourceUrl;
  @ViewChild('modalClose') modalCloseButton: ElementRef;

  constructor(private sanitizer: DomSanitizer, private renderer: Renderer2) { }

  setPicture(picture: Picture): void {
    this.picture = picture;
    this.renderer.addClass(document.body, 'modal-open');
    if (this.picture && this.picture.media_type == 'video' && this.picture.url.startsWith('https://www.youtube.com')) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.picture.url);
    } else {
      this.videoUrl = null;
    }
    setTimeout(()=> {
      this.modalCloseButton.nativeElement.focus();
    }, 200);
    
  }

  removePicture(): void {
    this.picture = null;
    this.renderer.removeClass(document.body, 'modal-open');
  }

  ngOnInit() {
  }

}
