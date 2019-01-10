import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainService {


  constructor(private  http: HttpClient) {
  }

  weatherID(ID): Observable<any> {
    const url = `weather?id=${ID}`;
    return this.http.get(url)
      .pipe(
        map(a => a),
        catchError(e => this.handleError(e))
      );

  }

  handleError(error: any) {
    return Observable.throw(error.error); // <= B
  }

}
