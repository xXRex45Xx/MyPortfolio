using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

/// <summary>
/// Controller responsible for managing personal information in the portfolio.
/// Requires admin authentication for modification operations.
/// </summary>
[Authorize(Roles = "Admin")]
[Route("api/[controller]")]
[ApiController]
public class MyInfoController : ControllerBase
{
    private readonly PContext _context;
    private readonly ILogger<MyInfoController> _logger;

    /// <summary>
    /// Initializes a new instance of the MyInfoController.
    /// </summary>
    /// <param name="context">The database context.</param>
    /// <param name="logger">The logger instance.</param>
    public MyInfoController(PContext context, ILogger<MyInfoController> logger)
    {
        _context = context;
        _logger = logger;
    }

    /// <summary>
    /// Retrieves the personal information from the portfolio.
    /// This endpoint is publicly accessible.
    /// </summary>
    /// <returns>The personal information if found; otherwise, null.</returns>
    /// <response code="200">Returns the personal information.</response>
    /// <response code="500">If an unexpected error occurs.</response>
    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> GetMyInfo()
    {
        try
        {
            var myInfo = await _context.MyInfo.FirstOrDefaultAsync();
            return Ok(myInfo);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unexpected error occurred.");
            return StatusCode(500, "An unexpected error occurred.");
        }
    }

    /// <summary>
    /// Updates or creates the personal information in the portfolio.
    /// If no existing record is found, creates a new one with ID 1.
    /// Requires admin authentication.
    /// </summary>
    /// <param name="info">The updated personal information.</param>
    /// <returns>Success response if the update was successful.</returns>
    /// <response code="200">If the information was successfully updated or created.</response>
    /// <response code="401">If the user is not authenticated as an admin.</response>
    /// <response code="500">If an unexpected error occurs.</response>
    [HttpPut]
    public async Task<IActionResult> UpdateMyInfo([FromBody] MyInfo info)
    {
        try
        {
            var myInfo = await _context.MyInfo.FirstOrDefaultAsync();
            if (myInfo == null)
            {
                var tempInfo = new MyInfo
                {
                    Id = 1,
                    Name = info.Name,
                    Title = info.Title,
                    Email = info.Email,
                    Phone = info.Phone,
                    ResumeUrl = info.ResumeUrl,
                    AboutMe = info.AboutMe
                };
                await _context.MyInfo.AddAsync(tempInfo);
                return Ok();
            }
            myInfo.Name = info.Name;
            myInfo.Title = info.Title;
            myInfo.Email = info.Email;
            myInfo.Phone = info.Phone;
            myInfo.ResumeUrl = info.ResumeUrl;
            myInfo.AboutMe = info.AboutMe;
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

