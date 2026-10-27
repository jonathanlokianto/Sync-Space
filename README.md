# Sync Space

Welcome to **Sync Space**! This repository contains the source code for the Sync Space application, including both the Go backend service and the frontend client.

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed on your system:
- [Go](https://go.dev/) (v1.18+ recommended)
- [Node.js](https://nodejs.org/) & `npm`
- [Docker](https://www.docker.com/) & Docker Compose (for database setup)
- [ngrok](https://ngrok.com/) (for exposing local backend online)

---

## Local Development Setup

### 1. Backend

Navigate to the API entry point and start the Go server:

```bash
cd backend/cmd/api
go run .
```

### 2. Frontend

In a separate terminal window, navigate to the frontend directory, install dependencies if you haven't already, and start the development server:

```bash
cd frontend
npm install
npm run dev
```

---

## Hosting & Deployment

To connect your frontend hosted on Netlify with your local backend service, use ngrok to expose your backend server to the internet.

### 1. Backend Hosting Setup (via ngrok)

1. **Database Setup:**
   Spin up the PostgreSQL database instance using Docker Compose:
   ```bash
   docker compose up -d postgres
   ```

2. **Run the API:**
   Navigate to the API directory and start the Go server:
   ```bash
   cd backend/cmd/api
   go run .
   ```

3. **Expose Local Backend Online via ngrok:**
   Expose your running Go API server publicly using ngrok:
   ```bash
   ngrok http <PORT>
   ```
   *(Replace `<PORT>` with the port your Go API runs on, e.g., `8080`)*.

   Keep this terminal running. ngrok will generate a public HTTPS URL (e.g., `https://xxxx.ngrok-free.app`).

4. **Configure CORS:**
   In `backend/internal/middleware/cors.go`, ensure CORS settings accept requests originating from your Netlify domain.

---

### 2. Frontend Deployment (Netlify)

The repository includes a `netlify.toml` file configured for deployment on Netlify.

1. Push your repository to GitHub.
2. Log in to [Netlify](https://www.netlify.com/) and create a **New site from Git**.
3. Select your repository.
4. Set the `NEXT_PUBLIC_API_URL` environment variable in your Netlify site settings to your live ngrok backend URL (e.g., `https://xxxx.ngrok-free.app`).
5. Deploy the site.

---
