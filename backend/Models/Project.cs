using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace backend.Models;

/// <summary>
/// Represents a project in the portfolio.
/// This model contains detailed information about a project including its title, description, features, and links.
/// </summary>
[Index("Title", IsUnique = true)]
public class Project
{
    /// <summary>
    /// Gets or sets the unique identifier for the project.
    /// </summary>
    [Key]
    public int Id { get; set; }

    /// <summary>
    /// Gets or sets the title of the project.
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
    /// This can be formatted as a comma-separated list or JSON array.
    /// </summary>
    [Required(ErrorMessage = "Key features are required")]
    public string KeyFeatures { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the URL to the project (e.g., GitHub repository, live demo).
    /// Must be a valid URL format.
    /// </summary>
    [Required(ErrorMessage = "Link is required")]
    [Url(ErrorMessage = "Invalid URL")]
    public string Link { get; set; } = string.Empty;
}