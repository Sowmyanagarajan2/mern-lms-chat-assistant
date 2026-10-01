# MERN LMS AI Assistant

A full LMS dashboard starter with JWT authentication, courses, lessons, assignments, progress tracking, announcements, and an AI assistant.

## Run locally

```bash
npm run install:all
cp backend/.env.example backend/.env
npm run dev
```

Open http://localhost:5173. MongoDB must be running and `OPENAI_API_KEY` is optional; without it the assistant uses a helpful demo response.
