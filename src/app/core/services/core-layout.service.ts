import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, Observable } from 'rxjs';
import { map, filter, first } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CoreLayoutService {

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }

  public onScrollToTop(): Observable<boolean> {
    const root = this.document.getElementsByTagName('body')[0];
    const finishedScroll = fromEvent(root, 'scroll').pipe(
      filter((event: any) => {
        return event?.target?.scrollTop === 0;
      }),
      first(),
      map(() => true)
    );
    root.scrollTo(0, 0);
    return finishedScroll;
  }

}
