using StockManagement.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StockManagement.Entity.Repository
{
    public class EfCoreProductRepository : EfCoreRepository<Product, StockManagementContext>
    {
        public EfCoreProductRepository(StockManagementContext context) : base(context)
        {

        }
    }
}
