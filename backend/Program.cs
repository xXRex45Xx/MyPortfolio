using System.Text;
using backend.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Configure API documentation and Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    // Configure Swagger documentation
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Portfolio API",
        Version = "v1",
        Description = "API for managing portfolio content and admin authentication"
    });

    // Configure JWT authentication in Swagger UI
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter 'Bearer' [space] and then your valid token in the text input below.\nExample: \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\""
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement{
        {
            new OpenApiSecurityScheme{
                Reference = new OpenApiReference{
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            }, Array.Empty<string>()
        }
    });
});

// Configure database context with SQLite
builder.Services.AddDbContext<PContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")
        ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found."));
    // Enable sensitive data logging only in Development
    if (builder.Environment.IsDevelopment())
    {
        options.EnableSensitiveDataLogging();
    }
});

// Configure JWT authentication with secure defaults
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ClockSkew = TimeSpan.FromMinutes(5), // Reduce clock skew for better security
        // Ensure JWT configuration values are present
        ValidIssuer = builder.Configuration.GetValue<string>("Jwt:Issuer")
            ?? throw new InvalidOperationException("Jwt:Issuer is not configured"),
        ValidAudience = builder.Configuration.GetValue<string>("Jwt:Audience")
            ?? throw new InvalidOperationException("Jwt:Audience is not configured"),
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration.GetValue<string>("Jwt:Key")
                ?? throw new InvalidOperationException("Jwt:Key is not configured")))
    };

    // Additional security options
    options.RequireHttpsMetadata = !builder.Environment.IsDevelopment(); // Require HTTPS in production
    options.SaveToken = true; // Save the token after validation
});

var app = builder.Build();

// Configure the HTTP request pipeline with appropriate middleware
if (app.Environment.IsDevelopment())
{
    // Enable Swagger UI in development
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    // Production security headers
    app.Use(async (context, next) =>
    {
        context.Response.Headers.Append("X-Content-Type-Options", "nosniff");
        context.Response.Headers.Append("X-Frame-Options", "DENY");
        context.Response.Headers.Append("X-XSS-Protection", "1; mode=block");
        context.Response.Headers.Append("Referrer-Policy", "strict-origin-when-cross-origin");
        await next();
    });

    using var scope = app.Services.CreateScope();
    var dbContext = scope.ServiceProvider.GetRequiredService<PContext>();
    dbContext.Database.Migrate();
}

// Always redirect to HTTPS in production
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

// Configure CORS with secure defaults
app.UseCors(options =>
{
    if (app.Environment.IsDevelopment())
    {
        // Allow localhost in development
        options.SetIsOriginAllowed(origin => origin.StartsWith(
            builder.Configuration.GetValue<string>("ClientUrl") ?? throw new Exception("ClientUrl is not configured.")
        ))
               .AllowCredentials();
    }
    else
    {
        // Restrict to specific domain in production
        options.SetIsOriginAllowed(origin =>
            origin.StartsWith(builder.Configuration.GetValue<string>("ClientUrl") ?? throw new Exception("ClientUrl is not configured.")))
               .AllowCredentials();
    }
    // Add specific allowed headers
    options.WithHeaders("Authorization", "Content-Type");
    // Add specific allowed methods
    options.WithMethods("GET", "POST", "PUT", "DELETE");
});

// Enable static file serving
app.UseStaticFiles();

// Enable authentication and authorization
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();