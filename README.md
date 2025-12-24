# WorkWise – Trusted Work, Nearby

WorkWise is a modern web application that bridges the gap between skilled local laborers and the people who need their services. From farmers and electricians to photographers and cleaners, the platform provides a trusted, efficient, and user-friendly way to find work and hire help.

---

## Monorepo Structure

- **backend** – Java 21 / Spring Boot 3.5 REST API (auth, jobs, ratings, matching)
- **frontend** – React (SPA) client built with Create React App

---

## Core Features

- **Hyper-Local Job Matching**
  - Search for jobs or workers in your area.
  - Filter by skill category and worker type.

- **AI‑Inspired Job Recommendations**
  - Intelligent matching service that suggests relevant jobs/workers based on skills and history.
  - Exposed via the `MatchingController` and consumed by the `JobRecommendations` UI.

- **Secure Authentication & Authorization**
  - Email/password registration and login.
  - JWT‑based authentication with Spring Security.

- **Trust & Ratings**
  - Rating system to evaluate completed jobs.
  - Reliability/trust score derived from reviews and job history.

- **Digital Payments (Conceptual Layer)**
  - Support for multiple `PaymentType`s at the domain level.
  - Wallet/payment integration points in the model for future expansion.

- **Multi‑Language & Theming (Frontend)**
  - Language context for translations.
  - Theme context for light/dark mode.

- **Rich Worker & Job Profiles**
  - Detailed job postings with status tracking.
  - User profiles with skills, experience, and categories.

---

## Technology Stack

- **Backend**
  - Java 21
  - Spring Boot 3.5 (Web, Data JPA, Security, Validation)
  - JWT (JJWT)
  - MySQL
  - Maven

- **Frontend**
  - React `^19.x`
  - React Router `^7.x`
  - Axios
  - Create React App (`react-scripts`)

---

## Backend Overview

**Key Packages**

- `controller`
  - `AuthController` – login/registration & JWT issuance
  - `UserController` – user profile and basic user operations
  - `JobController` – create, update, list, and manage jobs
  - `SkillController` – manage skills and skill categories
  - `RatingController` – create and fetch ratings
  - `MatchingController` – job/worker matching and recommendations

- `model`
  - `User`, `UserType`
  - `Job`, `JobStatus`, `PaymentType`
  - `Skill`, `SkillCategory`
  - `Rating`

- `security`
  - `WebSecurityConfig`, `AuthTokenFilter`, `JwtUtils`, `UserDetailsImpl`, `UserDetailsServiceImpl`

- `service`
  - `AuthService` – authentication and token handling
  - `MatchingService` – matching and recommendations
  - `RatingService` – rating logic

**Default Configuration**

Defined in `backend/src/main/resources/application.properties`:

- **Server**
  - `server.port=8080`
- **Database**
  - `spring.datasource.url=jdbc:mysql://localhost:3306/workwise_db?...`
  - `spring.datasource.username=<your-username>`
  - `spring.datasource.password=<your-password>`
- **JPA**
  - `spring.jpa.hibernate.ddl-auto=update`
- **JWT**
  - `workwise.app.jwtSecret=<your-secret>`
  - `workwise.app.jwtExpirationMs=86400000`

> **Important:** Replace default credentials/secrets with your own secure values before deploying.

---

## Frontend Overview

**Main Entry Points**

- `src/index.js` – React entry point
- `src/App.js` – main app shell and routing

**Key Areas**

- `components/Auth`
  - `Login`, `Register` – auth flows and form handling

- `components/Jobs`
  - `JobSearch`, `PostJob` – search for jobs and post new ones

- `components/AI`
  - `JobRecommendations` – UI that leverages backend matching/recommendation APIs

- `components/Dashboard`
  - `UserProfile` – user's profile and basic dashboard features

- `components/Rating`
  - `RatingModal` – leaving and viewing ratings

- `components/Layout`
  - `Navbar`, `Footer`, `AuthLayout` – common layout and navigation

- `context`
  - `AuthContext` – auth state & JWT handling on the client
  - `LanguageContext` – language selection
  - `ThemeContext` – theme (light/dark)

- `services/api.js`
  - Centralized Axios client and API helpers (points to the backend).

---

## Getting Started

### Prerequisites

- **Java 21**
- **Maven 3.9+**
- **Node.js 18+ and npm**
- **MySQL 8+**

### Clone the Repository

```bash
git clone <your-repo-url> WorkWise
cd WorkWise
```

---

## Backend Setup (Spring Boot)

From the `backend` directory:

```bash
cd backend

# 1. Configure your database and JWT settings
#    Edit src/main/resources/application.properties
#    or provide environment variables for the same keys.

# 2. Build and run
mvn spring-boot:run
```

By default, the backend will be available at:

- `http://localhost:8080`

You can also build a jar:

```bash
mvn clean package
java -jar target/workwise-backend-1.0.0.jar
```

---

## Frontend Setup (React)

From the `frontend` directory:

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will typically be available at:

- `http://localhost:3000`

Make sure your API base URL in `src/services/api.js` matches the backend host and port (e.g. `http://localhost:8080`).

---

## Running Tests

### Backend Tests

From `backend`:

```bash
mvn test
```

### Frontend Tests

From `frontend`:

```bash
npm test
```

---

## Production Builds

### Backend

```bash
cd backend
mvn clean package
# resulting JAR: target/workwise-backend-1.0.0.jar
```

### Frontend

```bash
cd frontend
npm run build
# build output in frontend/build
```

You can serve the frontend build via any static file host (Nginx, S3, etc.) and configure it to talk to the backend API.

---

## Environment & Security Notes

- **Never commit real database passwords or JWT secrets** to public repositories.
- Use environment variables or a secrets manager in production deployments.
- For local development, you can keep credentials in `application.properties`, but prefer `.env` / local-only configs where possible.

---

## License

This project is proprietary and confidential. © 2025 Hegdeniteesh. All Rights Reserved.

See the `LICENSE` file for more details.