import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarV1Component} from './sidebar-v1/sidebar-v1.component';
import {CardInfoFullComponent} from './card-info-full/card-info-full.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {InterceptorApikey} from './interceptor-apikey';
import {LoadingComponent} from './loading/loading.component';
import {FormAddWeatherComponent} from './form-add-weather/form-add-weather.component';
import {FormsModule} from '@angular/forms';
import {CountrysComponent} from './countrys/countrys.component';
import {MainService} from '../main/main.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [
    SidebarV1Component,
    CardInfoFullComponent,
    LoadingComponent,
    FormAddWeatherComponent,
    CountrysComponent
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    FormsModule,
    SidebarV1Component,
    CardInfoFullComponent,
    LoadingComponent,
    FormAddWeatherComponent,
    CountrysComponent
  ],
  entryComponents: [
    FormAddWeatherComponent
  ],
  providers: [
    MainService,
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorApikey, multi: true}
  ]
})
export class SharedModule {
}
