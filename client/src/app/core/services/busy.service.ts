import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BusyService {
  loading = signal(false);
  busyRequestCount = signal(0);

  busy() {
    console.log('busy');
    this.busyRequestCount.set(this.busyRequestCount() + 1);
    this.loading.set(true);
  }

  idle() {
    console.log('busy');
    this.busyRequestCount.set(this.busyRequestCount() - 1);
    if (this.busyRequestCount() <= 0) {
      this.busyRequestCount.set(0);
      this.loading.set(false);
    }
  }
}
