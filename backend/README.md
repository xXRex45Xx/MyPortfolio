# Portfolio Backend API

ASP.NET Core Web API backend for the portfolio website. This API provides endpoints for managing personal information, projects, skills, and social media links.

## Project Structure

```
backend/
├── Controllers/      # API endpoints
├── Models/          # Database entities
├── DTOs/           # Data Transfer Objects
├── Data/           # Database context and migrations
├── Properties/     # Launch settings
└── Migrations/     # Database migrations
```

## API Endpoints

### Authentication

-   `POST /api/Auth/login` - Authenticate admin user
-   `POST /api/Auth/reset-password` - Reset admin password

### Personal Information

-   `GET /api/MyInfo` - Get personal information
-   `PUT /api/MyInfo` - Update personal information

### Projects

-   `GET /api/Project` - Get all projects (basic info)
-   `GET /api/Project/{id}` - Get project details
-   `POST /api/Project` - Create new project
-   `PUT /api/Project/{id}` - Update project
-   `DELETE /api/Project/{id}` - Delete project

### Skills

-   `GET /api/Skills` - Get all skills
-   `POST /api/Skills` - Add new skill
-   `PUT /api/Skills/{id}` - Update skill
-   `DELETE /api/Skills/{id}` - Delete skill

### Social Media

-   `GET /api/SocialMedia` - Get all social media links
-   `POST /api/SocialMedia` - Add new social media link
-   `PUT /api/SocialMedia/{id}` - Update social media link
-   `DELETE /api/SocialMedia/{id}` - Delete social media link

## Authentication

The API uses JWT (JSON Web Token) authentication. Protected endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Database

The application uses Entity Framework Core with SQLite. The database schema includes:

-   `Admin` - Admin user credentials
-   `MyInfo` - Personal information
-   `Project` - Portfolio projects
-   `Skill` - Technical skills
-   `SocialMedia` - Social media links

## Development Setup

1. Install dependencies:

```bash
dotnet restore
```

2. Update database configuration in `appsettings.json`:

```json
{
    "ConnectionStrings": {
        "DefaultConnection": "Data Source=portfolio.db"
    }
}
```

3. Update JWT configuration in `appsettings.json`:

```json
{
    "Jwt": {
        "Key": "your-secret-key",
        "Issuer": "your-issuer",
        "Audience": "your-audience"
    }
}
```

4. Client Url configuration for CORS policy in `appsettings.json`:

```json
{
    "ClientUrl": "your-client-url"
}
```

5. Apply database migrations:

```bash
dotnet ef database update
```

6. Run the application:

```bash
dotnet run
```

## Default Admin Account

The application seeds a default admin account:

-   Username: admin
-   Password: admin

**Important**: Change these credentials immediately in production.

## API Documentation

Swagger documentation is available at `/swagger` when running in development mode.

## Error Handling

The API uses a consistent error response format:

-   200: Success
-   400: Bad Request
-   401: Unauthorized
-   404: Not Found
-   500: Internal Server Error

## Security Features

1. Password Hashing

    - Uses ASP.NET Core Identity's password hasher
    - Secure password storage

2. JWT Configuration

    - Configurable token lifetime
    - Secure key storage
    - Role-based authorization

3. Input Validation
    - Model validation
    - Data annotations
    - Custom validation rules

## Development Guidelines

1. Use DTOs for data transfer
2. Follow REST conventions
3. Implement proper error handling
4. Document API endpoints
5. Write clean, maintainable code
6. Use async/await for database operations

## Deployment

1. Update connection strings
2. Configure JWT settings
3. Enable HTTPS
4. Set up proper CORS policy
5. Change default admin credentials
