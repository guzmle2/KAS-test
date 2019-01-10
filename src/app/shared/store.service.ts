import {Injectable} from '@angular/core';
import {TYPE_METRICS} from './models/type-metrics.enum';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  metrics: TYPE_METRICS = TYPE_METRICS.CELSIUS;
  timeInterval = 30000;
  private _countries = [];
  cityDefault = [
    {country: 'cl', name: 'santiago'},
    {country: 'ar', name: 'buenos aires'},
    {country: 'pe', name: 'lima'},
    {country: 'br', name: 'sao paulo'}
  ];

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
