using System;
using System.ComponentModel.DataAnnotations;

namespace backend.DTOs.AuthDTOs;

/// <summary>
/// Data Transfer Object for user authentication.
/// Contains the credentials required for logging in to the admin interface.
/// </summary>
public class LoginDTO
{
    /// <summary>
    /// Gets or sets the username for authentication.
    /// This should match the username in the Admin table.
    /// </summary>
    [
        Required(ErrorMessage = "Username is required")
    ]
    public string Username { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the password for authentication.
    /// This should match the hashed password in the Admin table.
    /// </summary>
    [Required(ErrorMessage = "Password is required")]
    public string Password { get; set; } = string.Empty;
}
