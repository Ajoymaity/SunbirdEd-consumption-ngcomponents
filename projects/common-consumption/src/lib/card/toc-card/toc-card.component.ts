import { MimeTypeMasterData } from './../../pipes-module/mime-type';
import { Component, OnInit, Input, EventEmitter, Output, QueryList, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { COMMON_CONSUMPTION_CONSTANTS } from '../../common-consumption.constants';
import { TocCardType } from '../models';

@Component({
  selector: 'sb-toc-card',
  templateUrl: './toc-card.component.html',
  styleUrls: ['./toc-card.component.scss']
})
export class TocCardComponent implements OnInit {
  @Input() content;
  @Input() activeContent;
  @Input() type: TocCardType = TocCardType.TEXTBOOK;
  @Output() tocCardClick: EventEmitter<any> = new EventEmitter();

  fallbackImg = COMMON_CONSUMPTION_CONSTANTS.TOC_CARD_FALLBACK_IMG;
  iconPathMap: any;
  get TocCardType() { return TocCardType; }

  ngOnInit() {
    if (this.type === TocCardType.COURSE) {
      this.createIconMap();
    }
    setTimeout(() => {
      if (this.activeContent && this.activeContent.sbUniqueIdentifier === this.content.sbUniqueIdentifier) {
        this.tocCardClick.emit({ event: {}, data: { ...this.content } });
      }
    });
  }

  public async onTocCardClick(event) {
    if (this.activeContent && this.activeContent.sbUniqueIdentifier !== this.content.sbUniqueIdentifier) {
      this.tocCardClick.emit({ event: event, data: { ...this.content } });
    }
  }

  createIconMap() {
    const mimeTypesData = MimeTypeMasterData;
    this.iconPathMap = [
      [mimeTypesData.COLLECTION, 'assets/common-consumption/images/sprite.svg#doc'],
      [mimeTypesData.VIDEO, 'assets/common-consumption/images/sprite.svg#play'],
      [mimeTypesData.AUDIO, 'assets/common-consumption/images/sprite.svg#play'],
      [mimeTypesData.INTERACTIVE, 'assets/common-consumption/images/sprite.svg#touch'],
      [mimeTypesData.DOCS, 'assets/common-consumption/images/sprite.svg#doc'],
    ];
    this.content.appIcon = this.getIconPath(this.content.mimeType);
  }

  getIconPath(contentMimeType: string) {
    for (const [key, value] of this.iconPathMap) {
      if (key.indexOf(contentMimeType) >= 0) {
        return value;
      }
    }
    return '';
  }
}
