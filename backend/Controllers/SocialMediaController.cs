using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

/// <summary>
/// Controller responsible for managing social media links in the portfolio.
/// Provides endpoints for CRUD operations on social media links.
/// Most operations require admin authentication except for retrieving social media links.
/// </summary>
[Authorize(Roles = "Admin")]
[Route("api/[controller]")]
[ApiController]
public class SocialMediaController(PContext context, ILogger<SocialMediaController> logger) : ControllerBase
{
    private readonly PContext _context = context;
    private readonly ILogger<SocialMediaController> _logger = logger;

    /// <summary>
    /// Retrieves a list of all social media links.
    /// This endpoint is publicly accessible.
    /// </summary>
    /// <returns>A list of all social media links.</returns>
    /// <response code="200">Returns the list of social media links.</response>
    /// <response code="500">If an unexpected error occurs.</response>
    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> GetSocialMedias()
    {
        try
        {
            var socialMedias = await _context.SocialMedias.ToListAsync();
            return Ok(socialMedias);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unexpected error occurred.");
            return StatusCode(500, "An unexpected error occurred.");
        }
    }

    /// <summary>
    /// Creates a new social media link.
    /// Requires admin authentication.
    /// </summary>
    /// <param name="socialMedia">The social media link information to create.</param>
    /// <returns>Success response if the social media link was created.</returns>
    /// <response code="200">If the social media link was successfully created.</response>
    /// <response code="401">If the user is not authenticated as an admin.</response>
    /// <response code="500">If an unexpected error occurs.</response>
    [HttpPost]
    public async Task<IActionResult> AddSocialMedia([FromBody] SocialMedia socialMedia)
    {
        try
        {
            var s = new SocialMedia
            {
                Link = socialMedia.Link,
                Platform = socialMedia.Platform
            };
            await _context.SocialMedias.AddAsync(s);
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
    /// Updates an existing social media link.
    /// Requires admin authentication.
    /// </summary>
    /// <param name="id">The ID of the social media link to update.</param>
    /// <param name="socialMedia">The updated social media link information.</param>
    /// <returns>Success response if the social media link was updated.</returns>
    /// <response code="200">If the social media link was successfully updated.</response>
    /// <response code="401">If the user is not authenticated as an admin.</response>
    /// <response code="404">If the social media link is not found.</response>
    /// <response code="500">If an unexpected error occurs.</response>
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateSocialMedia(int id, [FromBody] SocialMedia socialMedia)
    {
        try
        {
            var existingSocialMedia = await _context.SocialMedias.FindAsync(id);
            if (existingSocialMedia == null)
            {
                return NotFound();
            }
            existingSocialMedia.Platform = socialMedia.Platform;
            existingSocialMedia.Link = socialMedia.Link;
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
    /// Deletes a social media link.
    /// Requires admin authentication.
    /// </summary>
    /// <param name="id">The ID of the social media link to delete.</param>
    /// <returns>Success response if the social media link was deleted.</returns>
    /// <response code="200">If the social media link was successfully deleted.</response>
    /// <response code="401">If the user is not authenticated as an admin.</response>
    /// <response code="404">If the social media link is not found.</response>
    /// <response code="500">If an unexpected error occurs.</response>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSocialMedia(int id)
    {
        try
        {
            var existingSocialMedia = await _context.SocialMedias.FindAsync(id);
            if (existingSocialMedia == null)
            {
                return NotFound();
            }
            _context.SocialMedias.Remove(existingSocialMedia);
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


