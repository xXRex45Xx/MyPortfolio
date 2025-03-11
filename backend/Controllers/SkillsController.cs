using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

/// <summary>
/// Controller responsible for managing skills in the portfolio.
/// Provides endpoints for CRUD operations on skills.
/// Most operations require admin authentication except for retrieving skills.
/// </summary>
[Authorize(Roles = "Admin")]
[Route("api/[controller]")]
[ApiController]
public class SkillsController : ControllerBase
{
    private readonly PContext _context;
    private readonly ILogger<SkillsController> _logger;

    /// <summary>
    /// Initializes a new instance of the SkillsController.
    /// </summary>
    /// <param name="context">The database context.</param>
    /// <param name="logger">The logger instance.</param>
    public SkillsController(PContext context, ILogger<SkillsController> logger)
    {
        _context = context;
        _logger = logger;
    }

    /// <summary>
    /// Retrieves a list of all skills.
    /// This endpoint is publicly accessible.
    /// </summary>
    /// <returns>A list of all skills.</returns>
    /// <response code="200">Returns the list of skills.</response>
    /// <response code="500">If an unexpected error occurs.</response>
    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> GetSkills()
    {
        try
        {
            var skills = await _context.Skills.ToListAsync();
            return Ok(skills);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unexpected error occurred.");
            return StatusCode(500, "An unexpected error occurred.");
        }
    }

    /// <summary>
    /// Creates a new skill.
    /// Requires admin authentication.
    /// </summary>
    /// <param name="skill">The skill information to create.</param>
    /// <returns>Success response if the skill was created.</returns>
    /// <response code="200">If the skill was successfully created.</response>
    /// <response code="401">If the user is not authenticated as an admin.</response>
    /// <response code="500">If an unexpected error occurs.</response>
    [HttpPost]
    public async Task<IActionResult> AddSkill([FromBody] Skill skill)
    {
        try
        {
            if (await _context.Skills.AnyAsync(s => s.Name == skill.Name))
            {
                return BadRequest("Skill already exists.");
            }
            var s = new Skill
            {
                Name = skill.Name
            };
            await _context.Skills.AddAsync(s);
            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unexpected error occurred.");
            return StatusCode(500, "An unexpected error occurred.");
        }
    }

    /// <summary>
    /// Updates an existing skill.
    /// Requires admin authentication.
    /// </summary>
    /// <param name="id">The ID of the skill to update.</param>
    /// <param name="skill">The updated skill information.</param>
    /// <returns>Success response if the skill was updated.</returns>
    /// <response code="200">If the skill was successfully updated.</response>
    /// <response code="401">If the user is not authenticated as an admin.</response>
    /// <response code="404">If the skill is not found.</response>
    /// <response code="500">If an unexpected error occurs.</response>
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateSkill(int id, [FromBody] Skill skill)
    {
        try
        {
            var existingSkill = await _context.Skills.FindAsync(id);
            if (existingSkill == null)
            {
                return NotFound();
            }
            if (await _context.Skills.AnyAsync(s => s.Name == skill.Name))
            {
                return BadRequest("Skill already exists.");
            }
            existingSkill.Name = skill.Name;
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unexpected error occurred.");
            return StatusCode(500, "An unexpected error occurred.");
        }
    }

    /// <summary>
    /// Deletes a skill.
    /// Requires admin authentication.
    /// </summary>
    /// <param name="id">The ID of the skill to delete.</param>
    /// <returns>Success response if the skill was deleted.</returns>
    /// <response code="200">If the skill was successfully deleted.</response>
    /// <response code="401">If the user is not authenticated as an admin.</response>
    /// <response code="404">If the skill is not found.</response>
    /// <response code="500">If an unexpected error occurs.</response>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSkill(int id)
    {
        try
        {
            var existingSkill = await _context.Skills.FindAsync(id);
            if (existingSkill == null)
            {
                return NotFound();
            }
            _context.Skills.Remove(existingSkill);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unexpected error occurred.");
            return StatusCode(500, "An unexpected error occurred.");
        }
    }
}
