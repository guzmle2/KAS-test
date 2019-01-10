import {AfterViewInit, Component, ComponentFactoryResolver, Injector, OnInit, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {StoreService} from '../store.service';
import {FormAddWeatherComponent} from '../form-add-weather/form-add-weather.component';

declare var jQuery: any;

@Component({
  selector: 'kas-countrys',
  templateUrl: './countrys.component.html',
  styleUrls: ['./countrys.component.scss']
})
export class CountrysComponent implements OnInit, AfterViewInit {

  storage = this.injector.get(StoreService);
  fr = this.injector.get(ComponentFactoryResolver);
  @ViewChild('cityWeather', {read: ViewContainerRef}) container: ViewContainerRef;
  components = [];

  constructor(protected injector: Injector) {
  }

  ngOnInit() {
  }

  addCountry(country) {
    this.storage.addCountry(country);
  }


  instanceForm(city?) {
    const id = `id_${new Date().getTime()}`;
    const factory = this.fr.resolveComponentFactory(FormAddWeatherComponent);
    const ref: any = this.container.createComponent(factory);
    ref.instance.finishSearch.subscribe(e => {
      this.addCountry(e);
      if (!city) {
        this.instanceForm();
      }
    });
    ref.instance.removeCity.subscribe(z => this.removeComp(z, id));
    ref.changeDetectorRef.detectChanges();
    if (city) {
      ref.instance.city = city;
      ref.instance.loadCity();
    }
    ref.changeDetectorRef.detectChanges();
    this.components.push({id: id, component: ref});
  }

  removeComponent(id) {
    const component = this.components.find((a) => a.id === id);
    const componentIndex = this.components.findIndex((a) => a.id === id);
    if (componentIndex !== -1) {
      this.container.remove(this.container.indexOf(component.component));
      this.components.splice(componentIndex, 1);
    }
  }

  ngAfterViewInit(): void {
    for (const city of this.storage.cityDefault) {
      this.instanceForm(city);
    }
    this.instanceForm();
  }

  removeComp(country, id) {
    jQuery('#modal1').modal();
    jQuery('#modal1').modal('open');
    jQuery('#id_country').html(country.name);
    jQuery('#id_deleted').val(country.id);
    this.storage.removeCountry(country);
    this.removeComponent(id);
  }

  removeHistory() {
    const id = jQuery('#id_deleted').val();
    this.storage.removeHistory(id);
  }
}
