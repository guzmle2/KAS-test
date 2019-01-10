import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'kas-main',
  template: `
    <router-outlet></router-outlet>`
})
export class MainComponent implements OnInit {
  ngOnInit(): void {
  }


}
