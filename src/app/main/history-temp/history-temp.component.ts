import {Component, Injector, Input, OnInit} from '@angular/core';
import {StoreService} from '../../shared/store.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'kas-history-temp',
  templateUrl: './history-temp.component.html',
  styleUrls: ['./history-temp.component.scss']
})
export class HistoryTempComponent implements OnInit {

  @Input() obj = <any>{};
  store = this.injector.get(StoreService);
  _route = this.injector.get(ActivatedRoute);

  constructor(protected injector: Injector) {
  }

  ngOnInit() {

    const id = this._route.snapshot.params['id'];
    if (id) {
      this.obj['id'] = id;
    }
  }

  get items() {
    return this.store.historyTemp.find(e => e.id === this.obj['id']) || [];
  }

  clearHistory() {
    this.store.removeHistory(this.obj.id);
  }
}
