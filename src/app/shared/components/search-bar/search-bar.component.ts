import { Component, ChangeDetectionStrategy, Output, OnDestroy, EventEmitter, Input } from '@angular/core';

import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'tmdb-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent implements OnDestroy {
  @Output()
  public valueChange = new EventEmitter();
  @Input()
  public value: string | null = '';
  public focused = false;
  private value$ = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor() {
    this.value$.pipe(
      debounceTime(800),
      takeUntil(this.destroy$)
    ).subscribe(value => {
      this.valueChange.emit(value);
    })
  }

  public valueChanged(value: string): void {
    this.value$.next(value);
  }

  public clearSearch(): void {
    this.value = '';
    this.valueChanged('');
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
