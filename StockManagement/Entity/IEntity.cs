using System.ComponentModel.DataAnnotations.Schema;

namespace StockManagement.Entity
{
    public interface IEntity
    {

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        int Id { get; }
    }

}
