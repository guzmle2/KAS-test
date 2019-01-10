import {Component, Injector, OnInit} from '@angular/core';
import {StoreService} from '../../shared/store.service';

@Component({
  selector: 'kas-weather-id',
  templateUrl: './weather-id.component.html',
  styleUrls: ['./weather-id.component.scss']
})
export class WeatherIdComponent implements OnInit {

  storage = this.injector.get(StoreService);
  itemDetail: any;

  constructor(protected injector: Injector) {
  }

  ngOnInit() {
  }

  get countries() {
    return this.storage.countries || [];
  }
}
