using backend.DTOs.ProjectDTOs;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

/// <summary>
/// Controller responsible for managing projects in the portfolio.
/// Provides endpoints for CRUD operations on projects.
/// Most operations require admin authentication except for retrieving project information.
/// </summary>
[Authorize(Roles = "Admin")]
[Route("api/[controller]")]
[ApiController]
public class ProjectController : ControllerBase
{
    private readonly PContext _context;
    private readonly ILogger<ProjectController> _logger;

    /// <summary>
    /// Initializes a new instance of the ProjectController.
    /// </summary>
    /// <param name="context">The database context.</param>
    /// <param name="logger">The logger instance.</param>
    public ProjectController(PContext context, ILogger<ProjectController> logger)
    {
        _context = context;
        _logger = logger;
    }

    /// <summary>
    /// Retrieves a list of all projects with basic information.
    /// This endpoint is publicly accessible.
    /// </summary>
    /// <returns>A list of projects with their basic details.</returns>
    /// <response code="200">Returns the list of projects.</response>
    /// <response code="500">If an unexpected error occurs.</response>
    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> GetProjects()
    {
        try
        {
            var projects = await _context.Projects.Select(p => new GetAllProjectsDTO
            {
                Id = p.Id,
                Title = p.Title,
                ShortDescription = p.ShortDescription,
                ImageUrl = p.ImageUrl
            }).ToListAsync();
            return Ok(projects);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unexpected error occurred.");
            return StatusCode(500, new { message = "An unexpected error occurred." });
        }
    }

    /// <summary>
    /// Retrieves detailed information about a specific project.
    /// This endpoint is publicly accessible.
    /// </summary>
    /// <param name="id">The ID of the project to retrieve.</param>
    /// <returns>The project details if found.</returns>
    /// <response code="200">Returns the project details.</response>
    /// <response code="404">If the project is not found.</response>
    /// <response code="500">If an unexpected error occurs.</response>
    [AllowAnonymous]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetProject(int id)
    {
        try
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return NotFound(new { message = "Project does not exist" });
            }
            return Ok(project);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unexpected error occurred.");
            return StatusCode(500, new { message = "An unexpected error occurred." });
        }
    }

    /// <summary>
    /// Creates a new project.
    /// Requires admin authentication.
    /// </summary>
    /// <param name="project">The project information to create.</param>
    /// <returns>Success response if the project was created.</returns>
    /// <response code="200">If the project was successfully created.</response>
    /// <response code="400">If the project data is invalid or if the image is missing, too large (>20MB), or not a JPEG/JPG file.</response>
    /// <response code="401">If the user is not authenticated as an admin.</response>
    /// <response code="500">If an unexpected error occurs.</response>
    [HttpPost]
    public async Task<IActionResult> AddProject([FromForm] CreateProjectDTO project)
    {
        try
        {
            if (project.Image == null)
                return BadRequest(new { message = "Image is required" });
            if (project.Image.Length == 0)
                return BadRequest(new { message = "Image is required" });
            if (project.Image.Length > 20 * 1024 * 1024)
                return BadRequest(new { message = "Image is too large" });
            if (project.Image.ContentType != "image/jpeg" && project.Image.ContentType != "image/jpg")
                return BadRequest(new { message = "Invalid file type" });

            if (!Directory.Exists(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images")))
                Directory.CreateDirectory(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images"));

            var fileName = Guid.NewGuid().ToString() + ".jpg";

            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images", fileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await project.Image.CopyToAsync(stream);
            }
            var p = new Project
            {
                Title = project.Title,
                Industry = project.Industry,
                ShortDescription = project.ShortDescription,
                Description = project.Description,
                EndDate = project.EndDate,
                KeyFeatures = project.KeyFeatures,
                Link = project.Link,
                ImageUrl = "/images/" + fileName
            };
            try
            {
                await _context.Projects.AddAsync(p);
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception)
            {
                System.IO.File.Delete(filePath);
                throw;
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unexpected error occurred.");
            return StatusCode(500, new { message = "An unexpected error occurred." });
        }
    }

    /// <summary>
    /// Updates an existing project.
    /// Requires admin authentication.
    /// </summary>
    /// <param name="id">The ID of the project to update.</param>
    /// <param name="project">The updated project information.</param>
    /// <returns>Success response if the project was updated.</returns>
    /// <response code="200">If the project was successfully updated.</response>
    /// <response code="401">If the user is not authenticated as an admin.</response>
    /// <response code="404">If the project is not found.</response>
    /// <response code="500">If an unexpected error occurs.</response>
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProject(int id, [FromForm] UpdateProjectDTO project)
    {
        try
        {
            var existingProject = await _context.Projects.FindAsync(id);
            if (existingProject == null)
            {
                return NotFound();
            }
            if (project.Image != null && project.Image.Length > 0)
            {
                if (project.Image.Length > 20 * 1024 * 1024)
                    return BadRequest(new { message = "Image is too large" });
                if (project.Image.ContentType != "image/jpeg" && project.Image.ContentType != "image/png")
                    return BadRequest(new { message = "Invalid file type" });

                if (!Directory.Exists(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images")))
                    Directory.CreateDirectory(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images"));

                var fileName = Guid.NewGuid().ToString() + ".jpg";
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images", fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await project.Image.CopyToAsync(stream);
                }
                existingProject.ImageUrl = "/images/" + fileName;
            }
            existingProject.Title = project.Title;
            existingProject.Industry = project.Industry;
            existingProject.ShortDescription = project.ShortDescription;
            existingProject.Description = project.Description;
            existingProject.EndDate = project.EndDate;
            existingProject.KeyFeatures = project.KeyFeatures;
            existingProject.Link = project.Link;
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unexpected error occurred.");
            return StatusCode(500, new { message = "An unexpected error occurred." });
        }
    }

    /// <summary>
    /// Deletes a project.
    /// Requires admin authentication.
    /// </summary>
    /// <param name="id">The ID of the project to delete.</param>
    /// <returns>Success response if the project was deleted.</returns>
    /// <response code="200">If the project was successfully deleted.</response>
    /// <response code="401">If the user is not authenticated as an admin.</response>
    /// <response code="404">If the project is not found.</response>
    /// <response code="500">If an unexpected error occurs.</response>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProject(int id)
    {
        try
        {
            var existingProject = await _context.Projects.FindAsync(id);
            if (existingProject == null)
            {
                return NotFound();
            }
            if (existingProject.ImageUrl != null)
            {
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images", existingProject.ImageUrl.Split('/').Last());
                System.IO.File.Delete(filePath);
            }
            _context.Projects.Remove(existingProject);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unexpected error occurred.");
            return StatusCode(500, new { message = "An unexpected error occurred." });
        }
    }
}

