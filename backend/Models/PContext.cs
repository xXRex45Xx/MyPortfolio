using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.Models;

/// <summary>
/// Database context for the portfolio application.
/// Manages all database operations and entity relationships.
/// WARNING: Contains default admin credentials that must be changed in production.
/// </summary>
public class PContext(DbContextOptions<PContext> options) : DbContext(options)
{
    /// <summary>
    /// Gets or sets the MyInfo entity set.
    /// </summary>
    public DbSet<MyInfo> MyInfo { get; set; }

    /// <summary>
    /// Gets or sets the Skills entity set.
    /// </summary>
    public DbSet<Skill> Skills { get; set; }

    /// <summary>
    /// Gets or sets the Projects entity set.
    /// </summary>
    public DbSet<Project> Projects { get; set; }

    /// <summary>
    /// Gets or sets the SocialMedia entity set.
    /// </summary>
    public DbSet<SocialMedia> SocialMedias { get; set; }

    /// <summary>
    /// Gets or sets the Admins entity set.
    /// </summary>
    public DbSet<Admin> Admins { get; set; }

    /// <summary>
    /// Configures the database model and seeds initial data.
    /// </summary>
    /// <param name="modelBuilder">The model builder instance.</param>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Create default admin user with credentials (admin/admin)
        // TODO: Change these credentials in production
        var admin = new Admin { Id = 1, Username = "admin" };
        admin.Password = new PasswordHasher<Admin>().HashPassword(admin, "admin");
        modelBuilder.Entity<Admin>().HasData(admin);

        // Create default MyInfo entry with empty values
        modelBuilder.Entity<MyInfo>().HasData(new MyInfo
        {
            Id = 1,
            Name = "",
            Title = "",
            Email = "",
            Phone = "",
            AboutMe = ""
        });
    }
}
