import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators'

import { LoadingService } from './services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.startLoading();

    return next.handle(request).pipe(finalize(() => {
      this.loadingService.stopLoading();
    }));
  }
}