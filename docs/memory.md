# Memory API

## Overview

OrbitAgent has two types of memory:

| Type | Storage | Duration | Use Case |
|------|---------|----------|----------|
| Temporary | Redis | 24 hours | Active chat sessions |
| Permanent | MongoDB | Until deleted | Long-term conversation storage |

---

## Base URL

`/api/v1/memory`

---

## Temporary Memory (Redis)

### Get Temporary Memory

Get temporary memory for a specific session.

```http
GET /api/v1/memory/temp/:sessionId
Authorization: Bearer <token>
```

### Example

```bash
curl "http://localhost:3000/api/v1/memory/temp/sess_abc123" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "msg_001",
      "role": "user",
      "content": "Hello",
      "timestamp": "2026-04-03T10:00:00.000Z"
    },
    {
      "id": "msg_002",
      "role": "assistant",
      "content": "Hi there!",
      "timestamp": "2026-04-03T10:00:01.000Z"
    }
  ]
}
```

---

### List All Temporary Sessions

Get all temporary sessions for the current user.

```http
GET /api/v1/memory/temp
Authorization: Bearer <token>
```

### Example

```bash
curl "http://localhost:3000/api/v1/memory/temp" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "sessionId": "sess_abc123",
      "messageCount": 10,
      "lastMessage": "2026-04-03T10:00:00.000Z"
    }
  ]
}
```

---

### Delete Temporary Memory

Delete temporary memory for a specific session.

```http
DELETE /api/v1/memory/temp/:sessionId
Authorization: Bearer <token>
```

### Example

```bash
curl -X DELETE "http://localhost:3000/api/v1/memory/temp/sess_abc123" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Response

```json
{
  "success": true,
  "message": "Session deleted"
}
```

---

## Permanent Memory (MongoDB)

### List Conversations

Get all permanent conversations for the user.

```http
GET /api/v1/memory/permanent
Authorization: Bearer <token>
```

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `limit` | number | 20 | Items per page |
| `archived` | boolean | false | Include archived |

### Example

```bash
curl "http://localhost:3000/api/v1/memory/permanent?page=1&limit=10" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Response

```json
{
  "success": true,
  "data": {
    "conversations": [
      {
        "id": "65f1a2b3c4d5e6f7a8b9c0d1",
        "sessionId": "sess_abc123",
        "title": "My Conversation",
        "modelId": "claude-3-5-sonnet-20241022",
        "modelProvider": "anthropic",
        "agentId": "default",
        "tags": ["important"],
        "isArchived": false,
        "createdAt": "2026-04-03T10:00:00.000Z",
        "updatedAt": "2026-04-03T10:30:00.000Z"
      }
    ],
    "pagination": {
      "total": 50,
      "page": 1,
      "limit": 10,
      "pages": 5
    }
  }
}
```

---

### Create Conversation

Create a new permanent conversation.

```http
POST /api/v1/memory/permanent
Authorization: Bearer <token>
Content-Type: application/json
```

### Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `sessionId` | string | Yes | Session ID to link |
| `title` | string | No | Conversation title |
| `modelId` | string | No | Model used |
| `modelProvider` | string | No | Provider used |
| `agentId` | string | No | Agent ID |
| `tags` | string[] | No | Tags for categorization |

### Example

```bash
curl -X POST "http://localhost:3000/api/v1/memory/permanent" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "sessionId": "sess_abc123",
    "title": "Project Discussion",
    "modelId": "claude-3-5-sonnet-20241022",
    "modelProvider": "anthropic",
    "tags": ["project", "planning"]
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "65f1a2b3c4d5e6f7a8b9c0d1",
    "sessionId": "sess_abc123",
    "title": "Project Discussion",
    "modelId": "claude-3-5-sonnet-20241022",
    "modelProvider": "anthropic",
    "tags": ["project", "planning"],
    "createdAt": "2026-04-03T10:00:00.000Z"
  }
}
```

---

### Get Conversation

Get a specific permanent conversation.

```http
GET /api/v1/memory/permanent/:id
Authorization: Bearer <token>
```

### Example

```bash
curl "http://localhost:3000/api/v1/memory/permanent/65f1a2b3c4d5e6f7a8b9c0d1" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "65f1a2b3c4d5e6f7a8b9c0d1",
    "sessionId": "sess_abc123",
    "title": "Project Discussion",
    "modelId": "claude-3-5-sonnet-20241022",
    "modelProvider": "anthropic",
    "messages": [
      {
        "id": "msg_001",
        "role": "user",
        "content": "Hello",
        "timestamp": "2026-04-03T10:00:00.000Z"
      },
      {
        "id": "msg_002",
        "role": "assistant",
        "content": "Hi there!",
        "timestamp": "2026-04-03T10:00:01.000Z"
      }
    ],
    "createdAt": "2026-04-03T10:00:00.000Z",
    "updatedAt": "2026-04-03T10:30:00.000Z"
  }
}
```

---

### Get Conversation Messages

Get messages for a specific conversation.

```http
GET /api/v1/memory/permanent/:id/messages
Authorization: Bearer <token>
```

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `limit` | number | 50 | Max messages |
| `role` | string | - | Filter by role (user/assistant) |

### Example

```bash
curl "http://localhost:3000/api/v1/memory/permanent/65f1a2b3c4d5e6f7a8b9c0d1/messages?limit=20" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "msg_001",
      "role": "user",
      "content": "Hello",
      "tokens": 5,
      "timestamp": "2026-04-03T10:00:00.000Z",
      "modelId": "claude-3-5-sonnet-20241022",
      "modelProvider": "anthropic"
    }
  ]
}
```

---

### Update Conversation

Update a conversation's title, tags, or archive status.

```http
PUT /api/v1/memory/permanent/:id
Authorization: Bearer <token>
Content-Type: application/json
```

### Body Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `title` | string | New title |
| `tags` | string[] | New tags |
| `isArchived` | boolean | Archive/unarchive |

### Example

```bash
curl -X PUT "http://localhost:3000/api/v1/memory/permanent/65f1a2b3c4d5e6f7a8b9c0d1" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "title": "Updated Title",
    "tags": ["important", "reviewed"],
    "isArchived": false
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "65f1a2b3c4d5e6f7a8b9c0d1",
    "title": "Updated Title",
    "tags": ["important", "reviewed"],
    "isArchived": false,
    "updatedAt": "2026-04-03T11:00:00.000Z"
  }
}
```

---

### Delete Conversation

Delete a permanent conversation.

```http
DELETE /api/v1/memory/permanent/:id
Authorization: Bearer <token>
```

### Example

```bash
curl -X DELETE "http://localhost:3000/api/v1/memory/permanent/65f1a2b3c4d5e6f7a8b9c0d1" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Response

```json
{
  "success": true,
  "message": "Conversation deleted"
}
```

---

## Search

### Search Conversations

Search conversations by title or tags.

```http
GET /api/v1/memory/permanent/search/conversations
Authorization: Bearer <token>
```

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `q` | string | Yes | Search query |
| `tags` | string | No | Filter by tags (comma-separated) |
| `page` | number | No | Page number |
| `limit` | number | No | Items per page |

### Example

```bash
curl "http://localhost:3000/api/v1/memory/permanent/search/conversations?q=project&tags=important" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Response

```json
{
  "success": true,
  "data": {
    "conversations": [...],
    "pagination": {
      "total": 5,
      "page": 1,
      "limit": 20,
      "pages": 1
    }
  }
}
```

---

### Search Messages

Search message content within conversations.

```http
GET /api/v1/memory/permanent/search/messages
Authorization: Bearer <token>
```

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `q` | string | Yes | Search query |
| `conversationId` | string | No | Filter by conversation |
| `page` | number | No | Page number |
| `limit` | number | No | Items per page |

### Example

```bash
curl "http://localhost:3000/api/v1/memory/permanent/search/messages?q=error" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## Memory Statistics

Get memory statistics for the current user.

```http
GET /api/v1/memory/stats
Authorization: Bearer <token>
```

### Example

```bash
curl "http://localhost:3000/api/v1/memory/stats" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Response

```json
{
  "success": true,
  "data": {
    "temporary": {
      "sessionCount": 15,
      "totalMessages": 150
    },
    "permanent": {
      "conversationCount": 50,
      "messageCount": 500
    }
  }
}
```
