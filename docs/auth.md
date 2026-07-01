# Authentication API

## Base URL

`/api/v1/auth`

---

## Register User

Create a new user account.

### Request

```http
POST /api/v1/auth/register
Content-Type: application/json
```

### Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | Yes | User email address |
| `username` | string | Yes | Unique username |
| `password` | string | Yes | Password (min 6 characters) |
| `displayName` | string | No | Display name |

### Example

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

### Response

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "65f1a2b3c4d5e6f7a8b9c0d1",
      "email": "user@example.com",
      "username": "myuser",
      "displayName": "My User",
      "isActive": true,
      "isAdmin": false,
      "preferences": {},
      "createdAt": "2026-04-03T10:00:00.000Z",
      "updatedAt": "2026-04-03T10:00:00.000Z"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## Login

Authenticate user and get tokens.

### Request

```http
POST /api/v1/auth/login
Content-Type: application/json
```

### Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | Yes | Email address |
| `password` | string | Yes | Password |

### Example

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "65f1a2b3c4d5e6f7a8b9c0d1",
      "email": "user@example.com",
      "username": "myuser",
      "displayName": "My User",
      "preferences": {
        "defaultModel": "claude-3-5-sonnet-20241022",
        "defaultProvider": "anthropic",
        "temperature": 1.0
      }
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## Get Current User

Get the authenticated user's profile.

### Request

```http
GET /api/v1/auth/me
Authorization: Bearer <token>
```

### Example

```bash
curl http://localhost:3000/api/v1/auth/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "65f1a2b3c4d5e6f7a8b9c0d1",
    "email": "user@example.com",
    "username": "myuser",
    "displayName": "My User",
    "isActive": true,
    "isAdmin": false,
    "preferences": {
      "defaultModel": "claude-3-5-sonnet-20241022",
      "defaultProvider": "anthropic",
      "temperature": 1.0
    },
    "lastLoginAt": "2026-04-03T10:00:00.000Z",
    "createdAt": "2026-04-03T10:00:00.000Z",
    "updatedAt": "2026-04-03T10:00:00.000Z"
  }
}
```

---

## Update User Profile

Update the authenticated user's profile.

### Request

```http
PUT /api/v1/auth/me
Authorization: Bearer <token>
Content-Type: application/json
```

### Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `displayName` | string | No | New display name |
| `preferences` | object | No | User preferences |

### Example

```bash
curl -X PUT http://localhost:3000/api/v1/auth/me \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "displayName": "New Name",
    "preferences": {
      "defaultModel": "gpt-4o",
      "defaultProvider": "openai",
      "temperature": 0.8
    }
  }'
```

---

## Refresh Token

Get a new access token using refresh token.

### Request

```http
POST /api/v1/auth/refresh
Authorization: Bearer <refresh-token>
```

### Example

```bash
curl -X POST http://localhost:3000/api/v1/auth/refresh \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Response

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## Create API Key

Generate a new API key for programmatic access.

### Request

```http
POST /api/v1/auth/api-key
Authorization: Bearer <token>
Content-Type: application/json
```

### Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | Yes | API key name/label |
| `permissions` | string[] | No | Permissions array |
| `expiresAt` | Date | No | Expiration date |

### Example

```bash
curl -X POST http://localhost:3000/api/v1/auth/api-key \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "name": "My API Key",
    "permissions": ["chat:read", "chat:write"]
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "key": "oa_lKx9mN2pQ4rS7tU8vW1yZ3aB6cD0eF",
    "keyId": "65f1a2b3c4d5e6f7a8b9c0d2",
    "name": "My API Key",
    "permissions": ["chat:read", "chat:write"],
    "isActive": true,
    "createdAt": "2026-04-03T10:00:00.000Z"
  }
}
```

> **Important**: Save the `key` value immediately. It will not be shown again.

---

## List API Keys

Get all API keys for the authenticated user.

### Request

```http
GET /api/v1/auth/api-keys
Authorization: Bearer <token>
```

### Example

```bash
curl http://localhost:3000/api/v1/auth/api-keys \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "keyId": "65f1a2b3c4d5e6f7a8b9c0d2",
      "name": "My API Key",
      "permissions": ["chat:read", "chat:write"],
      "isActive": true,
      "lastUsedAt": "2026-04-03T10:00:00.000Z",
      "createdAt": "2026-04-03T10:00:00.000Z",
      "expiresAt": null
    }
  ]
}
```

---

## Delete API Key

Delete a specific API key.

### Request

```http
DELETE /api/v1/auth/api-key/:keyId
Authorization: Bearer <token>
```

### Example

```bash
curl -X DELETE http://localhost:3000/api/v1/auth/api-key/65f1a2b3c4d5e6f7a8b9c0d2 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Response

```json
{
  "success": true,
  "message": "API key deleted"
}
```

---

## Logout

Logout the current user (invalidate token).

### Request

```http
POST /api/v1/auth/logout
Authorization: Bearer <token>
```

### Example

```bash
curl -X POST http://localhost:3000/api/v1/auth/logout \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Response

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## Available Permissions

| Permission | Description |
|------------|-------------|
| `chat:read` | Read chat history |
| `chat:write` | Send chat messages |
| `memory:read` | Read permanent memory |
| `memory:write` | Write to permanent memory |
| `admin` | Full admin access |
