using System.ComponentModel.DataAnnotations;

namespace backend.DTOs.ProjectDTOs;

/// <summary>
/// Data Transfer Object for creating a new project.
/// Contains all the required fields for project creation.
/// </summary>
public class CreateProjectDTO
{
    /// <summary>
    /// Gets or sets the title of the project.
    /// Must be unique across all projects.
    /// </summary>
    [Required(ErrorMessage = "Title is required")]
    public string Title { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the industry or category the project belongs to.
    /// </summary>
    [Required(ErrorMessage = "Industry is required")]
    public string Industry { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets a brief summary of the project.
    /// This should be concise and suitable for display in project listings.
    /// </summary>
    [Required(ErrorMessage = "Short description is required")]
    public string ShortDescription { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets a detailed description of the project.
    /// This can include technical details, challenges faced, and solutions implemented.
    /// </summary>
    [Required(ErrorMessage = "Description is required")]
    public string Description { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the completion date of the project.
    /// </summary>
    [Required(ErrorMessage = "End date is required")]
    public DateTime EndDate { get; set; }

    /// <summary>
    /// Gets or sets a list of key features or technologies used in the project.
    /// Must contain at least one feature.
    /// </summary>
    [Required(ErrorMessage = "Key features are required")]
    [MinLength(1, ErrorMessage = "Key features must contain at least one feature")]
    public List<string> KeyFeatures { get; set; } = [];

    /// <summary>
    /// Gets or sets the URL to the project (e.g., GitHub repository, live demo).
    /// Must be a valid URL format.
    /// </summary>
    [Required(ErrorMessage = "Link is required")]
    [Url(ErrorMessage = "Invalid URL")]
    public string Link { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets a value indicating whether the project is a source code repository.
    /// </summary>
    [Required(ErrorMessage = "Is source code is required")]
    public bool IsSourceCode { get; set; } = false;

    /// <summary>
    /// Gets or sets the project image file.
    /// Required for project creation. Must be a JPEG/JPG file under 20MB.
    /// </summary>
    [Required(ErrorMessage = "Image is required")]
    public IFormFile? Image { get; set; }
}