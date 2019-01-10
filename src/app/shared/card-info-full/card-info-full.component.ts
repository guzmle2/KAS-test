import {Component, EventEmitter, Injector, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MainService} from '../../main/main.service';
import {StoreService} from '../store.service';
import {TYPE_METRICS} from '../models/type-metrics.enum';

@Component({
  selector: 'kas-card-info-full',
  templateUrl: './card-info-full.component.html',
  styleUrls: ['./card-info-full.component.scss']
})
export class CardInfoFullComponent implements OnInit, OnDestroy {

  _id: any;
  data: any;
  mainServices = this.injector.get(MainService);
  storeService = this.injector.get(StoreService);
  metrics = this.storeService.metrics;
  weatherIcons = require('src/assets/icons.json');
  interval: any;
  @Output() eventDetail = new EventEmitter();
  @Input() color_card = '';

  constructor(protected injector: Injector) {
  }

  ngOnInit() {
  }

  getInfo(id) {
    this.mainServices.weatherID(id).subscribe(e => {
      this.data = e;
      this.storeService.addHistory(e);
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
    if (!(this.infoText && Object.keys(this.infoText).length)) {
      return null;
    }
    const code = this.infoText.id;
    let icon = this.weatherIcons[code].icon;
    if (!icon) {
      return '';
    }
    if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
      icon = 'day-' + icon;
    }

    return 'wi wi-' + icon;
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
    if (this.color_card) {
      return this.color_card;
    }
    const day = ' blue darken-1 white-text';
    const night = ' grey darken-2 white-text';

    if (this.iconWeather && this.iconWeather.includes('day')) {
      return day;
    }
    if (this.iconWeather && this.iconWeather.includes('night')) {
      return night;
    }
    return '';
  }

  get id() {
    return this._id;
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  viewDetail() {
    if (this.data) {
      this.eventDetail.emit(this.data);
    }
  }
}
