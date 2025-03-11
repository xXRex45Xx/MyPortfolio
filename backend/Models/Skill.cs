using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace backend.Models;

/// <summary>
/// Represents a skill or technology in the portfolio.
/// This model is used to track the technical skills and technologies the portfolio owner is proficient in.
/// </summary>
[Index("Name", IsUnique = true)]
public class Skill
{
    /// <summary>
    /// Gets or sets the unique identifier for the skill.
    /// </summary>
    [Key]
    public int Id { get; set; }

    /// <summary>
    /// Gets or sets the name of the skill or technology.
    /// Examples: "C#", "React", "SQL Server", "Docker"
    /// </summary>
    [Required(ErrorMessage = "Skill name is required")]
    public string Name { get; set; } = string.Empty;
}