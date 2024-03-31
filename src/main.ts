import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { HogwartsTestComponent } from './app/hogwarts-test/hogwarts-test.component';

@Component({
  selector: 'app-root',
  imports: [HogwartsTestComponent],
  standalone: true,
  template: `
    <app-hogwarts-test></app-hogwarts-test>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
