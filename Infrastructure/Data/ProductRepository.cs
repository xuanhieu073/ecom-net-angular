using System;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class ProductRepository(StoreContext context) : IProductRepository
{

  public async Task<IReadOnlyList<Product>> GetProductsAsync(string? brand, string? type, string? sort)
  {
    var query = context.products.AsQueryable();
    if (!string.IsNullOrWhiteSpace(brand))
    {
      query = query.Where(p => p.Brand == brand);
    }

    if (!string.IsNullOrWhiteSpace(type))
    {
      query = query.Where(p => p.Type == type);
    }

    query = sort switch
    {
      "priceAsc" => query.OrderBy(p => p.Price),
      "priceDesc" => query.OrderByDescending(p => p.Price),
      _ => query.OrderBy(p => p.Name)
    };

    return await query.ToListAsync();
  }

  public async Task<Product?> GetProductByIdAsync(int id)
  {
    return await context.products.FindAsync(id);
  }

  public async Task AddProductAsync(Product product)
  {
    await context.AddAsync(product);
  }

  public void UpdateProduct(Product product)
  {
    context.Entry(product).State = EntityState.Modified;
  }

  public void DeleteProduct(Product product)
  {
    context.products.Remove(product);
  }

  public async Task<bool> SaveChangesAsync()
  {
    return await context.SaveChangesAsync() > 0;
  }

  public async Task<IReadOnlyList<string>> GetTypesAsync()
  {
    return await context.products.Select(p => p.Type).Distinct().ToListAsync();
  }

  public async Task<IReadOnlyList<string>> GetBrandsAsync()
  {
    return await context.products.Select(p => p.Brand).Distinct().ToListAsync();
  }

  public bool ProductExists(int id)
  {
    return context.products.Any(p => p.Id == id);
  }
}
