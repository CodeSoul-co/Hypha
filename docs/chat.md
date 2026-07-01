# Chat API

## Base URL

`/api/v1/chat`

## Authentication

Requires JWT Bearer token or X-API-Key header.

---

## Send Message

Send a chat message and receive a response.

### Request

```http
POST /api/v1/chat
Authorization: Bearer <token>
Content-Type: application/json
```

### Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `message` | string | Yes | The message content |
| `sessionId` | string | No | Session ID (auto-generated if not provided) |
| `model` | string | No | Model ID (uses default if not provided) |
| `provider` | string | No | Provider name |
| `agentId` | string | No | Agent ID (default: "default") |

### Example

```bash
curl -X POST http://localhost:3000/api/v1/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "message": "Hello, how are you?",
    "sessionId": "sess_abc123",
    "model": "claude-3-5-sonnet-20241022",
    "provider": "anthropic"
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "sessionId": "sess_abc123",
    "messageId": "msg_xyz789",
    "content": "Hello! I'm doing well, thank you for asking. How can I help you today?",
    "model": "claude-3-5-sonnet-20241022",
    "provider": "anthropic",
    "finishReason": "stop",
    "usage": {
      "inputTokens": 25,
      "outputTokens": 35,
      "totalTokens": 60
    },
    "toolCalls": []
  }
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `sessionId` | string | Chat session identifier |
| `messageId` | string | Unique message ID |
| `content` | string | The response text |
| `model` | string | Model used for this response |
| `provider` | string | Provider used |
| `finishReason` | string | Why the response ended |
| `usage` | object | Token usage information |
| `toolCalls` | array | Tool calls if any |

---

## Stream Message

Send a chat message and receive a streaming response (Server-Sent Events).

### Request

```http
POST /api/v1/chat/stream
Authorization: Bearer <token>
Content-Type: application/json
```

### Body Parameters

Same as Send Message.

### Example

```bash
curl -X POST http://localhost:3000/api/v1/chat/stream \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "message": "Write a short story",
    "sessionId": "sess_abc123",
    "model": "claude-3-5-sonnet-20241022"
  }'
```

### Response (SSE Stream)

```
data: {"type":"content","content":"Once "}
data: {"type":"content","content":"upon "}
data: {"type":"content","content":"a time "}
data: {"type":"done","content":"Once upon a time there was..."}
```

### SSE Event Types

| Type | Description |
|------|-------------|
| `content` | Partial response text chunk |
| `done` | Response complete |
| `error` | Error occurred |

### JavaScript Example

```javascript
async function streamChat(message, sessionId, token) {
  const response = await fetch('http://localhost:3000/api/v1/chat/stream', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ message, sessionId })
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const text = decoder.decode(value);
    const lines = text.split('\n');

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = JSON.parse(line.slice(6));
        if (data.type === 'content') {
          console.log(data.content); // Append to UI
        } else if (data.type === 'done') {
          console.log('Done:', data.content);
        }
      }
    }
  }
}
```

---

## Get Chat History

Get chat history for a session from Redis temporary memory.

### Request

```http
GET /api/v1/chat/:sessionId
Authorization: Bearer <token>
```

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `limit` | number | No | Max messages to return (default: 50) |

### Example

```bash
curl "http://localhost:3000/api/v1/chat/sess_abc123?limit=10" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "msg_001",
      "userId": "user_123",
      "sessionId": "sess_abc123",
      "role": "user",
      "content": "Hello, how are you?",
      "timestamp": "2026-04-03T10:00:00.000Z",
      "modelId": "claude-3-5-sonnet-20241022",
      "modelProvider": "anthropic"
    },
    {
      "id": "msg_002",
      "userId": "user_123",
      "sessionId": "sess_abc123",
      "role": "assistant",
      "content": "Hello! I'm doing well, thank you.",
      "timestamp": "2026-04-03T10:00:01.000Z",
      "modelId": "claude-3-5-sonnet-20241022",
      "modelProvider": "anthropic"
    }
  ]
}
```

---

## Clear Chat History

Clear chat history for a session (from Redis temporary memory).

### Request

```http
POST /api/v1/chat/:sessionId/clear
Authorization: Bearer <token>
```

### Example

```bash
curl -X POST "http://localhost:3000/api/v1/chat/sess_abc123/clear" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Response

```json
{
  "success": true,
  "message": "Chat cleared"
}
```

---

## Delete Session

Delete a chat session from both Redis and MongoDB.

### Request

```http
DELETE /api/v1/chat/:sessionId
Authorization: Bearer <token>
```

### Example

```bash
curl -X DELETE "http://localhost:3000/api/v1/chat/sess_abc123" \
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

## Token Usage Response

The `usage` field in chat responses contains token information:

| Field | Type | Description |
|-------|------|-------------|
| `inputTokens` | number | Tokens in the prompt |
| `outputTokens` | number | Tokens in the response |
| `totalTokens` | number | Total tokens used |

### Example

```json
{
  "usage": {
    "inputTokens": 25,
    "outputTokens": 35,
    "totalTokens": 60
  }
}
```

---

## Session Management

### Session Lifecycle

1. **Create**: When sending a message without `sessionId`, a new session is created
2. **Use**: Messages are stored in Redis with 50-pair limit
3. **Clear**: Session data can be cleared with `/chat/:sessionId/clear`
4. **Delete**: Session can be fully deleted with `/chat/:sessionId`

### Session Storage

| Storage | Duration | Limit |
|---------|----------|-------|
| Redis (Temporary) | 24 hours | 50 message pairs |
| MongoDB (Permanent) | Until deleted | Unlimited |

---

## Error Responses

```json
{
  "success": false,
  "error": {
    "code": "INVALID_MESSAGE",
    "message": "Message is required"
  }
}
```

| Code | Description |
|------|-------------|
| `UNAUTHORIZED` | Invalid or missing authentication |
| `INVALID_MESSAGE` | Message field is required |
| `SESSION_NOT_FOUND` | Session does not exist |
| `MODEL_UNAVAILABLE` | Requested model is not available |
