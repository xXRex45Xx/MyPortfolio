using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace backend.Models;

/// <summary>
/// Represents an administrator user in the portfolio application.
/// This model is used for authentication and authorization purposes.
/// </summary>
[Index("Username", IsUnique = true)]
public class Admin
{
    /// <summary>
    /// Gets or sets the unique identifier for the admin user.
    /// </summary>
    [Key]
    public int Id { get; set; }

    /// <summary>
    /// Gets or sets the username for the admin account.
    /// This should be unique across all admin users.
    /// </summary>
    public string Username { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the hashed password for the admin account.
    /// The password is hashed using ASP.NET Core Identity's password hasher.
    /// </summary>
    [DataType(DataType.Password)]
    public string Password { get; set; } = string.Empty;
}