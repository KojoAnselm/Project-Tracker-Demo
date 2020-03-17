using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dotnetcore.Angular.TodoApp.Models
{
    public class ProjectDetails : EntityBase
    {
        public int ProjectId { get; set; }
        public Project Project { get; set; }
        public DateTime StartDate { get; set; }
       
      
    }
}
