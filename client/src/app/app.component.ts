import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { Product } from './shared/models/product';
import { BusyService } from './core/services/busy.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header></app-header>
    <div class="mt-6">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrl: './app.css',
})
export class App {
  private busyService = inject(BusyService);

  constructor() {
    effect(() => console.log(this.busyService.loading()));
  }
}
