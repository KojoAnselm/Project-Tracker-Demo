using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Dotnetcore.Angular.TodoApp.Data;
using Dotnetcore.Angular.TodoApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Dotnetcore.Angular.TodoApp.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ProjectController : ControllerBase
    {

        private readonly ApplicationDbContext _applicationDbContext;
        private readonly ILogger<ProjectController> _logger;
        private ApplicationUser user;


        public ProjectController(ILogger<ProjectController> logger, ApplicationDbContext applicationDbContext)
        {
            _logger = logger;
            _applicationDbContext = applicationDbContext;
         

        }

        [HttpGet]
        public IEnumerable<Project> Get()
        {
            user = _applicationDbContext.Users.FirstOrDefault(c => c.Id == User.FindFirst(ClaimTypes.NameIdentifier).Value);
            return _applicationDbContext.Projects.Include(c => c.ProjectDetails).ToArray();
        }

        [HttpGet("active")]
        public IEnumerable<Project> GetActiveProjects()
        {
            user = _applicationDbContext.Users.FirstOrDefault(c => c.Id == User.FindFirst(ClaimTypes.NameIdentifier).Value);
            return _applicationDbContext.Projects.Include(c => c.ProjectDetails).Where(c => c.IsCompleted == false && c.AssignedTo == user.Email).ToArray<Project>();
        }

        [HttpGet("users")]
        public IEnumerable<ApplicationUser> GetUsers()
        {
            user = _applicationDbContext.Users.FirstOrDefault(c => c.Id == User.FindFirst(ClaimTypes.NameIdentifier).Value);
            return _applicationDbContext.Users.ToArray<ApplicationUser>();
        }


        [HttpPost("create")]
        public async Task<ActionResult<ProjectDetails>> PostProject(Project project)
        {
            user = _applicationDbContext.Users.FirstOrDefault(c => c.Id == User.FindFirst(ClaimTypes.NameIdentifier).Value);
            project.CreatedDate = DateTime.Now;
            project.CreatedBy = user.Email;
            if(project.IsCompleted)
            {
                project.HoursWorked = Math.Round( project.CompletedDate.Value.Subtract(DateTime.Now).TotalHours,2);
            }
            _applicationDbContext.Projects.Add(project);
            await _applicationDbContext.SaveChangesAsync();

            return CreatedAtAction("Get", new { id = project.Id }, project);
        }


        [HttpPost]
        public int Update(Project project)
        {
            user = _applicationDbContext.Users.FirstOrDefault(c => c.Id == User.FindFirst(ClaimTypes.NameIdentifier).Value);
            project.ModifiedDate = DateTime.Now;
            project.ModifiedBy = user.Email;
            if (project.IsCompleted)
            {
                project.HoursWorked = Math.Round(project.CompletedDate.Value.Subtract(DateTime.Now).TotalHours, 2);
            }
            _applicationDbContext.Projects.Update(project);
            return _applicationDbContext.SaveChanges();

        }

        
    }
}
