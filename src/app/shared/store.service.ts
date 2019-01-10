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

  addCountry(country) {
    this._countries.push(country);
  }

  removeCountry(country) {
    const index = this._countries.findIndex(e => JSON.stringify(country) === JSON.stringify(e));
    if (index !== -1) {
      this._countries.splice(index, 1);
    }
  }

  addHistory(value) {
    const obj = {
      id: value.id,
      name: value.name,
      country: value.country,
      temps: [{
        temp: value.main.temp,
        date: new Date().getTime()
      }]
    };
    let items = this.historyTemp;
    if (items.length && items.findIndex(h => h.id === obj.id) !== -1) {
      items = items.map(a => {
        if (a.id === obj.id && !a.temps.filter(s => s.date === obj.temps[0]).length) {
          a.temps.push(obj.temps[0]);
        }
        return a;
      });
    } else {
      items.push(obj);
    }
    this.historyTemp = items;
  }

  removeHistory(id) {
    const items = this.historyTemp;
    const index = items.findIndex(e => Number(e.id) === Number(id));
    if (index !== -1) {
      items.splice(index, 1);
    }
    this.historyTemp = items;
  }

  get historyTemp() {
    if (!localStorage.getItem('historyTemp')) {
      return [];
    }
    let retorno = localStorage.getItem('historyTemp');
    retorno = atob(retorno);
    return JSON.parse(retorno);
  }

  set historyTemp(history) {
    const ascii = btoa(JSON.stringify(history));
    localStorage.setItem('historyTemp', ascii);
  }
}
