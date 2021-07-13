import { ChangeDetectionStrategy, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';
import { AnimationBuilder } from '@angular/animations';

import { fromEvent, merge, Observable, timer } from 'rxjs';
import { filter, map, } from 'rxjs/operators';

import { bouncySlider } from '../../animations';

@Component({
  selector: 'tmdb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @ViewChild('toolbar', { read: ElementRef, static: true })
  public toolbar!: ElementRef;
  @ViewChild('slider', { read: ElementRef, static: true })
  public slider!: ElementRef;
  @ViewChildren(RouterLinkActive, { read: ElementRef })
  public links!: QueryList<ElementRef>;

  constructor(private animationBuilder: AnimationBuilder, private router: Router) {}

  public ngAfterViewInit(): void {
    // Timer is needed here because angular's routerLinkActive directive does not set the class in time
    const initialLink$: Observable<HTMLElement> = timer(250).pipe(map(() =>
      this.links.toArray().find(link => link.nativeElement.classList.contains('active'))?.nativeElement
    ));

    const selectedLink$ = fromEvent<Event>(this.toolbar.nativeElement, 'click').pipe(
      filter(event => !(event.target as Element).children?.length),
      map(event => event.target as HTMLElement),
    );

    merge(initialLink$, selectedLink$).pipe(
      filter(linkElement => !!linkElement),
      map(linkElement => ({
        width: linkElement.offsetWidth,
        left: linkElement.offsetLeft
      })),
    ).subscribe(params => {
      this.animationBuilder
        .build(bouncySlider(params))
        .create(this.slider.nativeElement)
        .play();
    });
  }
}
