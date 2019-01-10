import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainModule} from './main/main.module';
import { CountrysComponent } from './countrys/countrys.component';

@NgModule({
  declarations: [
    AppComponent,
    CountrysComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainModule
  ],
  providers: [
    Storage
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
