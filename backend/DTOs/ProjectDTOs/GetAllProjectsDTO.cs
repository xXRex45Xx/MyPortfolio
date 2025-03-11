namespace backend.DTOs.ProjectDTOs;

/// <summary>
/// Data Transfer Object for retrieving a list of projects.
/// Contains only the essential information needed for project listings.
/// </summary>
public class GetAllProjectsDTO
{
    /// <summary>
    /// Gets or sets the unique identifier of the project.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Gets or sets the title of the project.
    /// </summary>
    public string Title { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets a brief summary of the project.
    /// This is used for quick previews in project listings.
    /// </summary>
    public string ShortDescription { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the URL of the project's image.
    /// This is used to display the project's image in the project listings.
    /// </summary>
    public string ImageUrl { get; set; } = string.Empty;
}