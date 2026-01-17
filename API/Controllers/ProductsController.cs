using API.RequestHelpers;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductsController(IGenericRepository<Product> repo) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult> GetProducts([FromQuery] ProducctSpecParams productParams)
    {
        var spec = new ProductSpecification(productParams);
        return await CreatePagedResult(repo, spec, productParams.PageIndex, productParams.PageSize);
        // var products = await repo.ListAsync(spec);
        // var count = await repo.CountAsync(spec);
        // var pagination = new Pagination<Product>(specParams.PageIndex, specParams.PageSize, count, products);
        // return Ok(pagination);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        var product = await repo.GetByIdAsync(id);

        if (product == null) return NotFound();

        return product;
    }

    [HttpPost]
    public async Task<ActionResult<Product>> CreateProduct(Product product)
    {
        await repo.AddAsync(product);
        if (await repo.SaveChangesAsync())
        {
            return CreatedAtAction("GetProduct", new { id = product.Id }, product);
        }
        return BadRequest("Problem creating product");
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateProduct(int id, Product product)
    {
        if (id != product.Id || !await repo.Exists(id)) return BadRequest("Cannot update this product");

        repo.Update(product);

        if (await repo.SaveChangesAsync())
        {
            return NoContent();
        }

        return BadRequest("Problem updating the product");
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        var product = await repo.GetByIdAsync(id);

        if (product == null) return NotFound();

        repo.Remove(product);

        if (await repo.SaveChangesAsync())
        {
            return NoContent();
        }

        return BadRequest("Problem deleting product");
    }

    [HttpGet("brands")]
    public async Task<IReadOnlyList<string>> GetBrands()
    {
        var spec = new BrandListSpecification();
        return await repo.ListAsync(spec);
    }

    [HttpGet("types")]
    public async Task<IReadOnlyList<string>> GetTypes()
    {
        var spec = new TypeListSpecification();
        return await repo.ListAsync(spec);
    }
}
