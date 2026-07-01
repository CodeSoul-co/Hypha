# OrbitAgent API Documentation

## Overview

OrbitAgent is a multi-user LLM agent backend service with multi-LLM support, designed for frontend integration.

**Base URL**: `http://localhost:3000/api/v1`

---

## Base URLs

| Environment | URL |
|-------------|-----|
| Local Development | `http://localhost:3000/api/v1` |

---

## Quick Start

### 1. Register a User

```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "username": "myuser",
    "password": "password123",
    "displayName": "My User"
  }'
```

### 2. Login

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### 3. Send a Chat Message

```bash
curl -X POST http://localhost:3000/api/v1/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{
    "message": "Hello, how are you?",
    "model": "claude-3-5-sonnet-20241022"
  }'
```

### 4. Check Token Usage

```bash
curl http://localhost:3000/api/v1/usage/stats \
  -H "Authorization: Bearer <your-jwt-token>"
```

---

## API Endpoints

| Section | Description |
|---------|-------------|
| [Authentication](auth.md) | User registration, login, JWT tokens, API keys |
| [Chat](chat.md) | Send messages, stream responses, chat history |
| [Memory](memory.md) | Temporary (Redis) and permanent (MongoDB) memory |
| [Models](models.md) | List and switch LLM models |
| [Token Usage](usage.md) | Track tokens and costs |
| [Status](status.md) | Health check and service status |
| [Frontend Integration](frontend-integration.md) | Integration examples for frontend developers |

---

## Response Format

All API responses follow this format:

### Success Response

```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}
```

---

## Authentication

### Method 1: JWT Bearer Token

Include the JWT token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Method 2: API Key

Include the API key in the X-API-Key header:

```
X-API-Key: oa_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `UNAUTHORIZED` | 401 | Authentication required or invalid token |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 400 | Invalid request parameters |
| `INTERNAL_ERROR` | 500 | Server error |

---

## Rate Limiting

- **Window**: 60 seconds
- **Max Requests**: 100 per window
- **Headers**: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

---

## Web Pages

| Page | URL | Description |
|------|-----|-------------|
| API Documentation | `/api/v1/docs` | Interactive API docs with search |
| Status Dashboard | `/api/v1/status/page` | Service status page |
| Token Usage | `/api/v1/usage/page` | Token usage dashboard |
