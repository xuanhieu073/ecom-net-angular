import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../../../core/services/shop.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';
import { CurrencyPipe, JsonPipe } from '@angular/common';
import { Product } from '../../../shared/models/product';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/select';
import { MatDivider } from '@angular/material/divider';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-product-details-component',
  imports: [
    MatIcon,
    MatFormField,
    MatDivider,
    MatLabel,
    CurrencyPipe,
    MatButton,
    MatFormField,
    MatInput,
    MatAnchor,
  ],
  templateUrl: './product-details-component.component.html',
  styleUrl: './product-details-component.component.scss',
})
export class ProductDetailsComponentComponent {
  private router = inject(ActivatedRoute);
  private shop = inject(ShopService);

  product = toSignal(
    this.router.params.pipe(
      map((params) => params['id']),
      switchMap((id) => this.shop.getProduct(id)),
    ),
    { initialValue: new Product() },
  );
}
