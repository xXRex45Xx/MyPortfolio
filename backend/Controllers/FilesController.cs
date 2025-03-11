using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

/// <summary>
/// Controller responsible for managing file uploads and downloads in the portfolio.
/// Handles resume and profile picture file operations.
/// Most operations require admin authentication except for retrieving the resume.
/// </summary>
[Authorize(Roles = "Admin")]
[Route("api/[controller]")]
[ApiController]
public class FilesController : ControllerBase
{
    /// <summary>
    /// Uploads a new resume file.
    /// Requires admin authentication.
    /// The file must be a PDF under 30MB.
    /// </summary>
    /// <param name="file">The PDF file to upload as resume.</param>
    /// <returns>Success response if the file was uploaded.</returns>
    /// <response code="200">If the file was successfully uploaded.</response>
    /// <response code="400">If the file is invalid (empty, larger than 30MB, or not PDF).</response>
    /// <response code="401">If the user is not authenticated as an admin.</response>
    /// <response code="500">If an unexpected error occurs.</response>
    [HttpPost("resume")]
    public async Task<IActionResult> UploadResume(
        [Required(ErrorMessage = "File is required")]
        IFormFile file
    )
    {
        if (file.Length == 0)
            return BadRequest(new { message = "File is empty" });
        if (file.Length > 30 * 1024 * 1024)
            return BadRequest(new { message = "File is too large" });
        if (file.ContentType != "application/pdf")
            return BadRequest(new { message = "Invalid file type" });

        if (!Directory.Exists(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads")))
            Directory.CreateDirectory(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads"));

        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads", "Esrom's Resume.pdf");
        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }
        return Ok();
    }

    /// <summary>
    /// Uploads a new profile picture.
    /// Requires admin authentication.
    /// The image must be a JPEG or PNG file under 10MB.
    /// </summary>
    /// <param name="file">The image file (JPEG/PNG) to upload as profile picture.</param>
    /// <returns>Success response if the file was uploaded.</returns>
    /// <response code="200">If the file was successfully uploaded.</response>
    /// <response code="400">If the file is invalid (empty, larger than 10MB, or not JPEG/PNG).</response>
    /// <response code="401">If the user is not authenticated as an admin.</response>
    /// <response code="500">If an unexpected error occurs.</response>
    [HttpPost("profile-picture")]
    public async Task<IActionResult> UploadProfilePicture(
        [Required(ErrorMessage = "File is required")]
        IFormFile file
    )
    {
        if (file.Length == 0)
            return BadRequest(new { message = "File is empty" });
        if (file.Length > 10 * 1024 * 1024)
            return BadRequest(new { message = "File is too large" });
        if (file.ContentType != "image/jpeg" && file.ContentType != "image/png")
            return BadRequest(new { message = "Invalid file type" });

        if (!Directory.Exists(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images")))
            Directory.CreateDirectory(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images"));

        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images", "profile.jpg");
        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }
        return Ok();
    }

    /// <summary>
    /// Retrieves the current resume file.
    /// This endpoint is publicly accessible.
    /// </summary>
    /// <returns>The resume PDF file if it exists.</returns>
    /// <response code="200">Returns the resume file.</response>
    /// <response code="404">If the resume file does not exist.</response>
    [AllowAnonymous]
    [HttpGet("resume")]
    public async Task<IActionResult> GetResume()
    {
        return await Task.Run<IActionResult>(() =>
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/uploads", "Esrom's Resume.pdf");
            if (!System.IO.File.Exists(filePath))
            {
                return NotFound();
            }
            return PhysicalFile(filePath, "application/pdf");
        });
    }
}
