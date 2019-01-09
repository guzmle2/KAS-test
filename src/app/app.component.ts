import {Component} from '@angular/core';

@Component({
  selector: 'kas-root',
  template: `
    <header>
      <kas-sidebar-v1>
        <li>
          <a>First Sidebar Link</a>
        </li>
        <li>
          <a>Second Sidebar Link</a>
        </li>
      </kas-sidebar-v1>
    </header>
    <main>
      <router-outlet></router-outlet>
    </main>`
})
export class AppComponent {

}
