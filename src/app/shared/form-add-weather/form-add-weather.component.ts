import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

declare var $: any;
declare var M: any;

@Component({
  selector: 'kas-form-add-weather',
  templateUrl: './form-add-weather.component.html',
  styleUrls: ['./form-add-weather.component.scss']
})
export class FormAddWeatherComponent implements OnInit, AfterViewInit {

  data = require('src/assets/city.list.json');
  idCountry = 'country_' + (new Date()).getTime();
  idName = 'name_' + (new Date()).getTime();
  disabled = false;
  isFinished = false;
  @Input() city = <any>{};
  @Output() finishSearch = new EventEmitter();
  @Output() removeCity = new EventEmitter();

  constructor() {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.autoComplet('country');
  }

  autoComplet(key) {
    let a = this.data.map(e => e[key]);
    if (key === 'name') {
      a = this.data.filter(h => h.country === this.city.country.toUpperCase());
      a = a.map(e => e[key]);
    }
    a = a.filter((item, pos) => a.indexOf(item) === pos);
    a = a.reduce((result, item, index) => {
      result[item] = null;
      return result;
    }, {});

    this.loadOptions(key, a);
  }

  loadOptions(idKey, array) {
    const id = `#${idKey === 'name' ? this.idName : this.idCountry}`;
    $(id).autocomplete({
      data: array, limit: 10,
      onAutocomplete: val => {
        if (idKey === 'country' && this.city.country && val !== this.city.country.toUpperCase()) {
          this.valueSelected(val);
        }
        if (val !== this.city[idKey]) {
          this.city[idKey] = val;
        }
      }
    });
  }

  valueSelected(a) {
    if ((a === -1 && this.city.country.length > 1) || (a && a !== -1)) {
      this.autoComplet('name');
    }
  }

  get citySelected() {
    let retorno = null;
    if (!this.city.country || !this.city.name) {
      return retorno;
    }
    retorno = this.data.find(h => {
      return h.name.toLowerCase() === this.city.name.toLowerCase()
        && h.country.toLowerCase() === this.city.country.toLowerCase();
    });
    return retorno;
  }

  loadCity() {
    if (this.citySelected) {
      this.isFinished = true;
      this.finishSearch.emit(this.citySelected);
    }
  }
}
