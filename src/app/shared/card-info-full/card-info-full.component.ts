import {Component, Injector, Input, OnInit} from '@angular/core';
import {MainService} from '../../main/main.service';
import {StoreService} from '../store.service';
import {TYPE_METRICS} from '../models/type-metrics.enum';
import {Observable} from 'rxjs';

@Component({
  selector: 'kas-card-info-full',
  templateUrl: './card-info-full.component.html',
  styleUrls: ['./card-info-full.component.scss']
})
export class CardInfoFullComponent implements OnInit {
  isLoading = true;
  _id: any;
  data: any;
  mainServices = this.injector.get(MainService);
  storeService = this.injector.get(StoreService);
  metrics = this.storeService.metrics;
  weatherIcons = require('src/assets/icons.json');
  interval: any;

  constructor(protected injector: Injector) {
  }

  ngOnInit() {
  }

  getInfo(id) {
    this.isLoading = true;
    this.mainServices.weatherID(id).subscribe(e => {
      this.isLoading = false;
      this.data = e;
    });
  }

  get infoText() {
    let retorno = <any>{};
    if (this.data && this.data.weather && this.data.weather.length) {
      retorno = this.data.weather[0];
    }
    return retorno;
  }

  get main() {
    let retorno;
    if (this.data && this.data.main && Object.keys(this.data.main).length) {
      retorno = this.data.main;
    }
    return retorno;
  }

  get metricSymbol() {
    let retorno = 'K';
    if (!this.metrics) {
      return retorno;
    }
    retorno = this.metrics === TYPE_METRICS.CELSIUS ? 'C°' : 'F°';
    return retorno;
  }

  get iconWeather() {
    const prefix = 'wi wi-';
    if (!this.infoText) {
      return null;
    }
    const code = this.infoText.id;
    let icon = this.weatherIcons[code].icon;

    if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
      icon = 'day-' + icon;
    }

    return prefix + icon;
  }

  @Input('id')
  set id(id) {
    this._id = id;
    this.getInfo(this._id);
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = setInterval(() => {
      this.getInfo(this._id);
    }, this.storeService.timeInterval);

  }

  get colorCard() {
    const day = ' blue darken-1 white-text';
    const night = ' grey darken-2 white-text';
    if (this.iconWeather.includes('day')) {
      return day;
    }
    if (this.iconWeather.includes('night')) {
      return night;
    }
    return '';
  }

  get id() {
    return this._id;
  }
}
