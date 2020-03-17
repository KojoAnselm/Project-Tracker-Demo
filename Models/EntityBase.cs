using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Dotnetcore.Angular.TodoApp.Models
{
    public class EntityBase
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public bool IsCompleted { get; set; } = false;
        public string AssignedTo { get; set; }
        public string Comment { get; set; }
        public double HoursWorked { get; set; }
        public DateTime? CompletedDate { get; set; }
    }
}
