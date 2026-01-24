import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { ShopService } from '../../../core/services/shop.service';

@Component({
  selector: 'app-filters-dialog',
  imports: [MatDivider, MatSelectionList, MatListOption, MatAnchor, MatButton, FormsModule],
  templateUrl: './filters-dialog.component.html',
  styleUrl: './filters-dialog.component.scss',
})
export class FiltersDialogComponent {
  shop = inject(ShopService);
  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<FiltersDialogComponent>);

  brands = toSignal(this.shop.getBrands());
  types = toSignal(this.shop.getTypes());

  selectedBrands = signal<string[]>(this.data.selectedBrands);
  selectedTypes = signal<string[]>(this.data.selectedTypes);

  applyFilters() {
    this.dialogRef.close({
      selectedBrands: this.selectedBrands(),
      selectedTypes: this.selectedTypes(),
    });
  }
}
