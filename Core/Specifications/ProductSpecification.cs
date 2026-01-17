using System;
using Core.Entities;

namespace Core.Specifications;

public class ProductSpecification : BaseSpecification<Product>
{
  public ProductSpecification(ProducctSpecParams specParams) : base(p =>
    (!specParams.Brands.Any() || specParams.Brands.Contains(p.Brand)) &&
    (!specParams.Types.Any() || specParams.Types.Contains(p.Type)) &&
    (string.IsNullOrWhiteSpace(specParams.Search) || p.Name.Contains(specParams.Search))
  )
  {
    ApplyPaging(specParams.PageSize * (specParams.PageIndex - 1), specParams.PageSize);

    switch (specParams.Sort)
    {
      case "priceAsc":
        AddOrderBy(p => p.Price);
        break;
      case "priceDesc":
        AddOrderByDesc(p => p.Price);
        break;
      default:
        AddOrderBy(p => p.Name);
        break;
    }
  }
}
