import {NgModule} from '@angular/core';
import {MainComponent} from './main.component';
import {SharedModule} from '../shared/shared.module';
import {MainService} from './main.service';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    SharedModule
  ],
  declarations: [
    MainComponent
  ],
  providers: [
    MainService
  ]
})
export class MainModule {
}
