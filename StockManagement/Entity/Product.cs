using StockManagement.Utils;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StockManagement.Entity
{
    public class Product : IEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public double Price { get; set; }

        [DataType(DataType.Date)]
        public DateTime LoadDate { get; set; }

        [Required]
        public Category Category { get; set; }

    }
}
