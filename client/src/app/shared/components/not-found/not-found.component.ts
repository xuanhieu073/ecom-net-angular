import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [MatIcon, RouterLink],
  templateUrl: './not-found.component.html',
  styles: `
    .icon-display {
      transform: scale(3);
    }
  `,
})
export class NotFoundComponent {}
