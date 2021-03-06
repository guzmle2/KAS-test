import {NgModule} from '@angular/core';
import {MainComponent} from './main.component';
import {SharedModule} from '../shared/shared.module';
import {WeatherIdComponent} from './weather-id/weather-id.component';
import {HistoryTempComponent} from './history-temp/history-temp.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [

  {
    path: '',
    component: WeatherIdComponent
  },
  {
    path: 'history/:id',
    component: WeatherIdComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    MainComponent,
    WeatherIdComponent,
    HistoryTempComponent
  ],
  exports: [
    SharedModule
  ]
})
export class MainModule {
}
