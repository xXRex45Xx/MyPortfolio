using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace backend.Models;

/// <summary>
/// Represents a social media link associated with the portfolio.
/// This model stores information about different social media platforms and their corresponding URLs.
/// </summary>
[Index("Platform", IsUnique = true)]
public class SocialMedia
{
    /// <summary>
    /// Gets or sets the unique identifier for the social media entry.
    /// </summary>
    [Key]
    public int Id { get; set; }

    /// <summary>
    /// Gets or sets the name of the social media platform (e.g., "GitHub", "LinkedIn", "Twitter").
    /// </summary>
    [Required(ErrorMessage = "Platform is required")]
    public string Platform { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the URL to the social media profile.
    /// Must be a valid URL format.
    /// </summary>
    [Required(ErrorMessage = "Link is required")]
    [Url(ErrorMessage = "Invalid URL")]
    public string Link { get; set; } = string.Empty;
}