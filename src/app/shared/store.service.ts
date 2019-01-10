import {Injectable} from '@angular/core';
import {TYPE_METRICS} from './models/type-metrics.enum';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  metrics: TYPE_METRICS = TYPE_METRICS.CELSIUS;
  private _countries = [];

  constructor() {
  }

  get countries(): any[] {
    return this._countries;
  }

  set countries(value: any[]) {
    this._countries = value;
  }

  addCountry(country) {
    this._countries.push(country);
  }

  removeCountry(country) {
    const index = this._countries.findIndex(e => JSON.stringify(country) === JSON.stringify(e));
    if (index !== -1) {
      this._countries.splice(index, 1);
    }
  }
}
