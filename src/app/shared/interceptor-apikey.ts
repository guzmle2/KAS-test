import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {StoreService} from './store.service';

@Injectable()
export class InterceptorApikey implements HttpInterceptor {
  storeService = this.injector.get(StoreService);

  constructor(private  injector: Injector) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let url = `${environment.server + req.url}`;
    if (this.storeService.metrics) {
      url += `&units=${this.storeService.metrics}`;
    }
    if (environment.APPID) {
      url += `&APPID=${environment.APPID}`;
    }
    const dupReq = req.clone({
      url: url
    });
    return next.handle(dupReq);
  }
}
