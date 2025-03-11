using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.DTOs.AuthDTOs;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace backend.Controllers;

/// <summary>
/// Controller responsible for handling authentication-related operations.
/// Provides endpoints for user login and password reset functionality.
/// </summary>
[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly PContext _context;
    private readonly IConfiguration _configuration;
    private readonly ILogger<AuthController> _logger;

    /// <summary>
    /// Initializes a new instance of the AuthController.
    /// </summary>
    /// <param name="context">The database context.</param>
    /// <param name="configuration">The application configuration.</param>
    /// <param name="logger">The logger instance.</param>
    public AuthController(PContext context, IConfiguration configuration, ILogger<AuthController> logger)
    {
        _context = context;
        _configuration = configuration;
        _logger = logger;
    }

    /// <summary>
    /// Authenticates an admin user and generates a JWT token.
    /// </summary>
    /// <param name="loginDTO">The login credentials.</param>
    /// <returns>A JWT token if authentication is successful; otherwise, an error response.</returns>
    /// <response code="200">Returns the JWT token.</response>
    /// <response code="401">If authentication fails.</response>
    /// <response code="500">If an unexpected error occurs.</response>
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDTO loginDTO)
    {
        try
        {
            var admin = await _context.Admins.FirstOrDefaultAsync(a => a.Username == loginDTO.Username);
            if (admin == null)
            {
                return Unauthorized();
            }
            if (
                new PasswordHasher<Admin>()
                    .VerifyHashedPassword(admin, admin.Password, loginDTO.Password)
                == PasswordVerificationResult.Failed
            )
            {
                return Unauthorized();
            }
            var token = CreateToken(admin);
            return Ok(new { token });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unexpected error occurred.");
            return StatusCode(500, new { message = "An unexpected error occurred." });
        }
    }

    /// <summary>
    /// Resets the password for an admin user.
    /// </summary>
    /// <param name="resetPasswordDTO">The password reset information.</param>
    /// <returns>Success response if password is reset; otherwise, an error response.</returns>
    /// <response code="200">If the password was successfully reset.</response>
    /// <response code="401">If the current credentials are invalid.</response>
    /// <response code="500">If an unexpected error occurs.</response>
    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDTO resetPasswordDTO)
    {
        try
        {
            var admin = await _context.Admins.FirstOrDefaultAsync(a => a.Username == resetPasswordDTO.Username);
            if (admin == null)
            {
                return Unauthorized();
            }
            if (
                new PasswordHasher<Admin>()
                    .VerifyHashedPassword(admin, admin.Password, resetPasswordDTO.OldPassword)
                == PasswordVerificationResult.Failed
            )
            {
                return Unauthorized();
            }
            admin.Password = new PasswordHasher<Admin>().HashPassword(admin, resetPasswordDTO.NewPassword);
            await _context.SaveChangesAsync();
            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unexpected error occurred.");
            return StatusCode(500, new { message = "An unexpected error occurred." });
        }
    }

    /// <summary>
    /// Creates a JWT token for the authenticated admin user.
    /// </summary>
    /// <param name="admin">The authenticated admin user.</param>
    /// <returns>A JWT token string.</returns>
    /// <exception cref="InvalidOperationException">Thrown when JWT configuration is missing.</exception>
    private string CreateToken(Admin admin)
    {
        var claims = new List<Claim>
            {
                new(ClaimTypes.Name, admin.Username),
                new(ClaimTypes.NameIdentifier, admin.Id.ToString()),
                new(ClaimTypes.Role, "Admin")
            };
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("Jwt:Key") ?? throw new InvalidOperationException("Jwt:Key is not configured")));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);
        var token = new JwtSecurityToken(
            issuer: _configuration.GetValue<string>("Jwt:Issuer") ?? throw new InvalidOperationException("Jwt:Issuer is not configured"),
            audience: _configuration.GetValue<string>("Jwt:Audience") ?? throw new InvalidOperationException("Jwt:Audience is not configured"),
            claims: claims,
            expires: DateTime.Now.AddDays(1),
            signingCredentials: creds
        );
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}

