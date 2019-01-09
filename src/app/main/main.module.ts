import {NgModule} from '@angular/core';
import {MainComponent} from './main.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    SharedModule
  ],
  declarations: [
    MainComponent
  ]
})
export class MainModule {
}
