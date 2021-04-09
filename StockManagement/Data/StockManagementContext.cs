using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StockManagement.Entity;

namespace StockManagement.Data
{
    public class StockManagementContext : DbContext
    {
        public StockManagementContext (DbContextOptions<StockManagementContext> options)
            : base(options)
        {
        }

        public DbSet<Product> Product { get; set; }
    }
}
