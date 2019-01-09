import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarV1Component} from './sidebar-v1/sidebar-v1.component';

@NgModule({
  declarations: [
    SidebarV1Component
  ],
  exports: [
    SidebarV1Component
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}
