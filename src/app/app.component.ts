import {Component} from '@angular/core';

@Component({
  selector: 'kas-root',
  template: `
    <header>
      <kas-sidebar-v1>
        <kas-form-add-weather></kas-form-add-weather>
      </kas-sidebar-v1>
    </header>
    <main>
      <div class="row">
        <router-outlet></router-outlet>
      </div>
    </main>`
})
export class AppComponent {

}
