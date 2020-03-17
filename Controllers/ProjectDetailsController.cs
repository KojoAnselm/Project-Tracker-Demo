using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Dotnetcore.Angular.TodoApp.Data;
using Dotnetcore.Angular.TodoApp.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Dotnetcore.Angular.TodoApp.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ProjectDetailsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private ApplicationUser user = new ApplicationUser();

        public ProjectDetailsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/ProjectDetails
        [HttpGet]
        public IEnumerable<ProjectDetails> GetProjectDetails()
        {
            user = _context.Users.FirstOrDefault(c => c.Id == User.FindFirst(ClaimTypes.NameIdentifier).Value);
        
            return  _context.ProjectDetails.Include(c => c.Project).ToArray<ProjectDetails>();
        }

        [HttpGet("active")]
        public IEnumerable<ProjectDetails> Get()
        {
            user = _context.Users.FirstOrDefault(c => c.Id == User.FindFirst(ClaimTypes.NameIdentifier).Value);
            return _context.ProjectDetails.Include(c => c.Project).OrderBy(c => c.ProjectId).Where(c =>  c.CreatedBy == user.Email).ToArray<ProjectDetails>();
        }

        // GET: api/ProjectDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectDetails>> GetProjectDetails(int id)
        {
            var projectDetails = await _context.ProjectDetails.FindAsync(id);

            if (projectDetails == null)
            {
                return NotFound();
            }

            return projectDetails;
        }

        // PUT: api/ProjectDetails/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProjectDetails(int id, ProjectDetails projectDetails)
        {
            user = _context.Users.FirstOrDefault(c => c.Id == User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if (id != projectDetails.Id)
            {
                return BadRequest();
            }

           

            if (projectDetails.IsCompleted)
            {
                var getProject = await _context.Projects.FindAsync(projectDetails.ProjectId);
                
                    getProject.HoursWorked = Math.Round( getProject.ProjectDetails.Sum(c => c.HoursWorked),2);
            
                getProject.IsCompleted = true;
                _context.Entry(getProject).State = EntityState.Modified;

            }

            if (projectDetails.CompletedDate.Value != DateTime.MinValue || projectDetails.StartDate != DateTime.MinValue)
            {
                projectDetails.HoursWorked = Math.Round(projectDetails.CompletedDate.Value.Subtract(projectDetails.StartDate).TotalHours, 2);
            }
            projectDetails.ModifiedDate = DateTime.Now;
            projectDetails.ModifiedBy = user.Email;

            _context.Entry(projectDetails).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectDetailsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ProjectDetails
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost("create")]
        public ActionResult<ProjectDetails> PostProjectDetails(ProjectDetails projectDetails)
        {
            user = _context.Users.FirstOrDefault(c => c.Id == User.FindFirst(ClaimTypes.NameIdentifier).Value);
            //var getProjectDetails = _context.ProjectDetails.Include(c => c.StartDate).FirstOrDefault(c => c.ProjectId == projectDetails.ProjectId);

            if (projectDetails.CompletedDate.Value != DateTime.MinValue || projectDetails.StartDate != DateTime.MinValue)
            {
                projectDetails.HoursWorked = Math.Round( projectDetails.CompletedDate.Value.Subtract(projectDetails.StartDate).TotalHours,2);
            }
          
            projectDetails.CreatedDate = DateTime.Now;
                projectDetails.CreatedBy = user.Email;
                _context.ProjectDetails.Add(projectDetails);
                _context.SaveChanges();
             
                if (projectDetails.IsCompleted)
                {
                    var getProject = _context.Projects.Include(c => c.ProjectDetails).FirstOrDefault(c => c.Id == projectDetails.ProjectId);
                    getProject.IsCompleted = true;
                   getProject.HoursWorked = Math.Round(getProject.ProjectDetails.Sum(c => c.HoursWorked),2);
                    _context.Projects.Update(getProject);
                    _context.SaveChanges();

                }

                return CreatedAtAction("GetProjectDetails", new { id = projectDetails.Id }, projectDetails);
            
        }

        // DELETE: api/ProjectDetails/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ProjectDetails>> DeleteProjectDetails(int id)
        {
            var projectDetails = await _context.ProjectDetails.FindAsync(id);
            if (projectDetails == null)
            {
                return NotFound();
            }

            _context.ProjectDetails.Remove(projectDetails);
            await _context.SaveChangesAsync();

            return projectDetails;
        }

        private bool ProjectDetailsExists(int id)
        {
            return _context.ProjectDetails.Any(e => e.Id == id);
        }
    }
}
