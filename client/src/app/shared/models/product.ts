export class Product {
  id: string = '';
  name: string = '';
  description: string = '';
  pictureUrl: string = '';
  price: number = 0;

  constructor(initial?: Partial<Product>) {
    this.id = initial?.id || '';
    this.name = initial?.name || '';
    this.description = initial?.description || '';
    this.pictureUrl = initial?.pictureUrl || '';
    this.price = initial?.price || 0;
  }

  fuccd() {
    console.log(this);
  }

  hello(): string {
    return 'hello from Product';
  }
}
