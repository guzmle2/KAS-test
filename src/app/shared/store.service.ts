import {Injectable} from '@angular/core';
import {TYPE_METRICS} from './models/type-metrics.enum';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  metrics: TYPE_METRICS = TYPE_METRICS.CELSIUS;

  constructor() {
  }
}
