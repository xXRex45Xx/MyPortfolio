# Portfolio Website

A modern, full-stack portfolio website built with ASP.NET Core backend and React frontend. This application allows you to showcase your professional experience, projects, skills, and social media presence with a clean and responsive interface.

## Project Structure

```
my-portfolio/
├── backend/         # ASP.NET Core Web API
├── frontend/        # React frontend application
└── .vscode/        # VS Code configuration
```

## Features

-   🔒 Secure authentication system with JWT tokens
-   👤 Personal information management
-   💼 Project portfolio showcase
-   🛠️ Skills and technologies listing
-   🔗 Social media integration
-   📱 Responsive design
-   🔐 Admin dashboard for content management

## Prerequisites

-   .NET 8.0 SDK or later
-   Node.js 18.x or later
-   npm or yarn
-   SQLite

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd my-portfolio
```

2. Set up the backend:

```bash
cd backend
dotnet restore
dotnet ef database update
dotnet run
```

3. Set up the frontend:

```bash
cd frontend
npm install
npm run dev
```

4. Access the application:

-   Frontend: http://localhost:5173
-   Backend API: https://localhost:7105
-   Swagger Documentation: http://localhost:7105/swagger

## Environment Configuration

### Backend

Create an `appsettings.json` file in the backend directory with the following structure:

```json
{
    "ConnectionStrings": {
        "DefaultConnection": "Data Source=portfolio.db"
    },
    "Jwt": {
        "Key": "your-secret-key",
        "Issuer": "your-issuer",
        "Audience": "your-audience"
    }
}
```

## Security

-   JWT-based authentication
-   Password hashing using ASP.NET Core Identity
-   HTTPS enforcement
-   Cross-Origin Resource Sharing (CORS) configuration
-   Input validation and sanitization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
