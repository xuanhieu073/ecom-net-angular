using System;
using Core.Entities;
using Core.Interfaces;

namespace Infrastructure.Data;

public class SpecifictaionEvaluator<T> where T : BaseEntity
{
  public static IQueryable<T> GetQuery(IQueryable<T> query, ISpecification<T> spec)
  {
    if (spec.Criteria != null)
    {
      query = query.Where(spec.Criteria);
    }

    if (spec.OrderBy != null)
    {
      query = query.OrderBy(spec.OrderBy);
    }

    if (spec.OrderByDesc != null)
    {
      query = query.OrderByDescending(spec.OrderByDesc);
    }

    if (spec.IsPagingEnabled)
    {
      query.Skip(spec.Skip).Take(spec.Take);
    }

    return query;
  }
  public static IQueryable<TResult> GetQuery<TSpec, TResult>(IQueryable<T> query, ISpecification<T, TResult> spec)
  {
    if (spec.Criteria != null)
    {
      query = query.Where(spec.Criteria);
    }

    if (spec.OrderBy != null)
    {
      query = query.OrderBy(spec.OrderBy);
    }

    if (spec.OrderByDesc != null)
    {
      query = query.OrderByDescending(spec.OrderByDesc);
    }

    if (spec.IsPagingEnabled)
    {
      query.Skip(spec.Skip).Take(spec.Take);
    }

    var selectQuery = query as IQueryable<TResult>;

    if (spec.Select != null)
    {
      selectQuery = query.Select(spec.Select);
    }

    if (spec.IsDistinct)
    {
      selectQuery = selectQuery?.Distinct();
    }

    return selectQuery ?? query.Cast<TResult>();
  }
}
