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
    /// Must be unique across all projects.
    /// </summary>
    public string Title { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the industry or category the project belongs to.
    /// </summary>
    public string Industry { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets a brief summary of the project.
    /// This should be concise and suitable for display in project listings.
    /// </summary>
    public string ShortDescription { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets a detailed description of the project.
    /// This can include technical details, challenges faced, and solutions implemented.
    /// </summary>
    public string Description { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the completion date of the project.
    /// </summary>
    public DateTime EndDate { get; set; }

    /// <summary>
    /// Gets or sets a list of key features or technologies used in the project.
    /// Stored as a list of strings.
    /// </summary>
    public List<string> KeyFeatures { get; set; } = [];

    /// <summary>
    /// Gets or sets the URL to the project (e.g., GitHub repository, live demo).
    /// Must be a valid URL format.
    /// </summary>
    public string Link { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets a value indicating whether the project is a source code repository.
    /// </summary>
    public bool IsSourceCode { get; set; } = false;

    /// <summary>
    /// Gets or sets the image URL for the project.
    /// </summary>
    public string ImageUrl { get; set; } = string.Empty;
}