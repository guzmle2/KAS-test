import {Component, Injector, OnInit} from '@angular/core';
import {StoreService} from '../shared/store.service';

@Component({
  selector: 'kas-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  storage = this.injector.get(StoreService);

  constructor(protected injector: Injector) {
  }

  ngOnInit() {
  }

  get countries() {
    return this.storage.countries || [];
  }
}
