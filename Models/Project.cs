using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dotnetcore.Angular.TodoApp.Models
{
    public class Project : EntityBase
    {
        public ICollection<ProjectDetails> ProjectDetails { get; set; }
    }

}
