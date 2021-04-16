using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using StockManagement.Data;
using StockManagement.Entity;
using StockManagement.Entity.Repository;
using System.Threading.Tasks;
using StockManagement.Filter;
using StockManagement.Services;

namespace StockManagement.Controllers
{

    [Route("[controller]")]
    [ApiController]
    public class ProductsController : BaseController<Product, EfCoreProductRepository>
    {
        private readonly StockManagementContext _context;
        private readonly IUriService uriService;

        public ProductsController(EfCoreProductRepository repository,IUriService uriService) : base (repository,uriService)
        {
        }

        [HttpGet("/avaliable/{budget}")]
        [Route("/productos/disponibles/")]
        public async Task<ActionResult<IEnumerable<Product>>> getAvaliableProductsByBudgetAsync(int budget)
        {
            var productsRequest = await GetAll();
            IEnumerable<Product> products = productsRequest.Value;
            var filteredProd = products.Where(product => product.Price <= 300);
            if (filteredProd == null)
            {
                return NotFound();
            }
            return new ActionResult<IEnumerable<Product>>(filteredProd);
        }

  

    }
}
