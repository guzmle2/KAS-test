import {Component} from '@angular/core';

@Component({
  selector: 'kas-root',
  template: `
    <header>
      <kas-countrys></kas-countrys>
    </header>
    <main>
      <div class="row">
        <router-outlet></router-outlet>
      </div>
    </main>`
})
export class AppComponent {

}
