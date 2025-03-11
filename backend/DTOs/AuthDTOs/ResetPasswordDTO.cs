using System.ComponentModel.DataAnnotations;

namespace backend.DTOs.AuthDTOs;

/// <summary>
/// Data Transfer Object for password reset functionality.
/// Contains the information required to change an admin user's password.
/// </summary>
public class ResetPasswordDTO
{
    /// <summary>
    /// Gets or sets the username of the admin account.
    /// </summary>
    [Required(ErrorMessage = "Username is required")]
    public string Username { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the current password of the admin account.
    /// This is required to verify the user's identity before allowing password change.
    /// </summary>
    [Required(ErrorMessage = "Old password is required")]
    public string OldPassword { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the new password for the admin account.
    /// Must be at least 8 characters long.
    /// </summary>
    [Required(ErrorMessage = "New password is required")]
    [StringLength(100, MinimumLength = 8, ErrorMessage = "Password must be at least 8 characters long")]
    public string NewPassword { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the confirmation of the new password.
    /// Must match the NewPassword field.
    /// </summary>
    [Required(ErrorMessage = "Confirm password is required")]
    [Compare(nameof(NewPassword), ErrorMessage = "Passwords do not match")]
    public string ConfirmPassword { get; set; } = string.Empty;
}