export class ShopParams {
  brands: string[] = [];
  types: string[] = [];
  sort: 'name' | 'priceAsc' | 'priceDesc' = 'name';
  pageIndex = 1;
  pageSize = 10;
  search = '';

  constructor(inital?: Partial<ShopParams>) {
    this.brands = inital?.brands || [];
    this.types = inital?.types || [];
    this.sort = inital?.sort || 'name';
    this.pageIndex = inital?.pageIndex || 1;
    this.pageSize = inital?.pageSize || 10;
    this.search = inital?.search || '';
  }
}
