using System.ComponentModel.DataAnnotations;

namespace backend.Models;

/// <summary>
/// Represents the personal information of the portfolio owner.
/// This model contains basic information such as name, title, contact details, and a brief introduction.
/// </summary>
public class MyInfo
{
    /// <summary>
    /// Gets or sets the unique identifier for the MyInfo record.
    /// </summary>
    [Key]
    public int Id { get; set; }

    /// <summary>
    /// Gets or sets the full name of the portfolio owner.
    /// </summary>
    [Required(ErrorMessage = "Name is required")]
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the professional title or role of the portfolio owner.
    /// </summary>
    [Required(ErrorMessage = "Title is required")]
    public string Title { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the email address for contact purposes.
    /// </summary>
    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid email address")]
    public string Email { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the phone number for contact purposes.
    /// </summary>
    [Required(ErrorMessage = "Phone is required")]
    public string Phone { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the URL to the downloadable resume.
    /// </summary>
    [Required(ErrorMessage = "Resume URL is required")]
    [Url(ErrorMessage = "Invalid URL")]
    public string ResumeUrl { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets a brief introduction or description about the portfolio owner.
    /// </summary>
    [Required(ErrorMessage = "About Me is required")]
    public string AboutMe { get; set; } = string.Empty;
}