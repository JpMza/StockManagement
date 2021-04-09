using Microsoft.AspNetCore.Mvc;
using StockManagement.Entity;
using StockManagement.Entity.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StockManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public abstract class BaseController<TEntity, TRepository> : ControllerBase
        where TEntity : class, IEntity
        where TRepository : IRepository<TEntity>
    {
        private readonly TRepository repository;

        public BaseController(TRepository repository)
        {
            this.repository = repository;
        }


        // GET: api/[controller]
        [HttpGet]
        [Route("/lista/productos")]
        public async Task<ActionResult<IEnumerable<TEntity>>> Get()
        {
            return await repository.GetAll();
        }

        // GET: api/[controller]/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TEntity>> Get(int id)
        {
            var product = await repository.Get(id);
            if (product == null)
            {
                return NotFound();
            }
            return product;
        }

        // PUT: api/[controller]/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, TEntity product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }
            await repository.Update(product);
            return NoContent();
        }

        // POST: api/[controller]
        [HttpPost]
        public async Task<ActionResult<TEntity>> Post(TEntity product)
        {
            await repository.Add(product);
            return CreatedAtAction("Get", new { id = product.Id }, product);
        }

        // DELETE: api/[controller]/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TEntity>> Delete(int id)
        {
            var product = await repository.Delete(id);
            if (product == null)
            {
                return NotFound();
            }
            return product;
        }

    }
}