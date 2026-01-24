import { Component, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { debounceTime, switchMap, tap } from 'rxjs';
import { ShopService } from '../../core/services/shop.service';
import { ShopParams } from '../../shared/models/shop-params';
import { FiltersDialogComponent } from './filters-dialog/filters-dialog.component';
import { ProductItemComponent } from './product-item/product-item.component';

@Component({
  selector: 'app-shop',
  imports: [
    ProductItemComponent,
    MatAnchor,
    MatIcon,
    MatMenu,
    MatSelectionList,
    MatListOption,
    MatMenuModule,
    FormsModule,
    MatPaginator,
    MatIconButton,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent {
  private shop = inject(ShopService);
  private dialogService = inject(MatDialog);

  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low-High', value: 'priceAsc' },
    { name: 'Price: High-Low', value: 'priceDesc' },
  ];
  pageSizeOptions = [5, 10, 15, 20];

  selectedBrands = signal<string[]>([]);
  selectedTypes = signal<string[]>([]);
  selecctedSorts = signal<ShopParams['sort'][]>(['name']);
  selectedPaginator = signal<{ pageIndex: number; pageSize: number }>({
    pageIndex: 1,
    pageSize: 10,
  });
  selectedSearch = signal<string>('');

  selectedParams = signal<ShopParams>(new ShopParams());

  vm = toSignal(
    toObservable(this.selectedParams).pipe(
      switchMap(({ brands, types, sort, pageIndex, pageSize, search }) =>
        this.shop.getProducts(
          new ShopParams({ brands, types, sort: sort, pageIndex, pageSize, search }),
        ),
      ),
    ),
  );

  constructor() {
    toObservable(this.selectedSearch)
      .pipe(debounceTime(400))
      .pipe(tap((search) => this.selectedParams.set({ ...this.selectedParams(), search })))
      .subscribe(() => {});
  }

  handlePageEvent($event: PageEvent) {
    this.selectedParams.set({
      ...this.selectedParams(),
      pageIndex: $event.pageIndex + 1,
      pageSize: $event.pageSize,
    });
  }

  openFiltersDialog() {
    const dialogRef = this.dialogService.open(FiltersDialogComponent, {
      minWidth: '500px',
      // minHeight: '500px',
      data: {
        selectedBrands: this.selectedParams().brands,
        selectedTypes: this.selectedParams().types,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.selectedParams.set({
          ...this.selectedParams(),
          brands: result.selectedBrands,
          types: result.selectedTypes,
        });
      }
    });
  }
}
