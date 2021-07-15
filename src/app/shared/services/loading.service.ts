import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loadingCount$ = new BehaviorSubject<number>(0);

  constructor() {}

  public get loading$(): Observable<boolean> {
    return this.loadingCount$.pipe(
      map(loadingCount => loadingCount > 0),
      distinctUntilChanged()
    );
  }

  public startLoading(): void {
    this.loadingCount$.next(this.loadingCount$.value + 1)
  }

  public stopLoading(): void {
    this.loadingCount$.next(this.loadingCount$.value - 1)
  }
}
