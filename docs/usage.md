# Token Usage API

## Overview

OrbitAgent automatically tracks token usage and calculates costs for every chat request. All usage data is stored in MongoDB and can be queried via the API.

**Note**: Token tracking is automatically recorded when calling `/api/v1/chat` or `/api/v1/chat/stream`.

---

## Base URL

`/api/v1/usage`

---

## Get Usage Statistics

Get comprehensive token usage statistics for the user.

### Request

```http
GET /api/v1/usage/stats
Authorization: Bearer <token>
```

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `startDate` | string | No | Start date (ISO 8601) |
| `endDate` | string | No | End date (ISO 8601) |

### Example

```bash
curl "http://localhost:3000/api/v1/usage/stats" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Response

```json
{
  "success": true,
  "data": {
    "summary": {
      "totalPromptTokens": 50000,
      "totalCompletionTokens": 120000,
      "totalTokens": 170000,
      "totalCost": 2.45,
      "requestCount": 250
    },
    "byModel": [
      {
        "modelId": "claude-3-5-sonnet-20241022",
        "modelProvider": "anthropic",
        "totalPromptTokens": 30000,
        "totalCompletionTokens": 90000,
        "totalTokens": 120000,
        "totalCost": 1.8,
        "requestCount": 200
      },
      {
        "modelId": "gpt-4o",
        "modelProvider": "openai",
        "totalPromptTokens": 20000,
        "totalCompletionTokens": 30000,
        "totalTokens": 50000,
        "totalCost": 0.65,
        "requestCount": 50
      }
    ],
    "daily": [
      {
        "date": "2026-04-03",
        "totalPromptTokens": 5000,
        "totalCompletionTokens": 12000,
        "totalTokens": 17000,
        "totalCost": 0.245,
        "requestCount": 25
      },
      {
        "date": "2026-04-02",
        "totalPromptTokens": 8000,
        "totalCompletionTokens": 20000,
        "totalTokens": 28000,
        "totalCost": 0.42,
        "requestCount": 40
      }
    ]
  }
}
```

### Date Range Example

```bash
curl "http://localhost:3000/api/v1/usage/stats?startDate=2026-04-01&endDate=2026-04-03" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## Get Recent Usage

Get recent token usage records with pagination.

### Request

```http
GET /api/v1/usage/recent
Authorization: Bearer <token>
```

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `limit` | number | 50 | Records per page (max 200) |
| `skip` | number | 0 | Records to skip |

### Example

```bash
curl "http://localhost:3000/api/v1/usage/recent?limit=10&skip=0" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "_id": "65f1a2b3c4d5e6f7a8b9c0d1",
      "userId": "user_123",
      "sessionId": "sess_abc123",
      "modelId": "claude-3-5-sonnet-20241022",
      "modelProvider": "anthropic",
      "promptTokens": 25,
      "completionTokens": 45,
      "totalTokens": 70,
      "promptCost": 0.000075,
      "completionCost": 0.000675,
      "totalCost": 0.00075,
      "endpoint": "/chat",
      "requestType": "chat",
      "responseTimeMs": 1200,
      "createdAt": "2026-04-03T10:30:00.000Z"
    }
  ],
  "pagination": {
    "limit": 10,
    "skip": 0
  }
}
```

---

## Get Conversation Usage

Get token usage for a specific conversation.

### Request

```http
GET /api/v1/usage/conversation/:conversationId
Authorization: Bearer <token>
```

### Example

```bash
curl "http://localhost:3000/api/v1/usage/conversation/65f1a2b3c4d5e6f7a8b9c0d1" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Response

```json
{
  "success": true,
  "data": {
    "records": [
      {
        "modelId": "claude-3-5-sonnet-20241022",
        "modelProvider": "anthropic",
        "promptTokens": 25,
        "completionTokens": 45,
        "totalTokens": 70,
        "totalCost": 0.00075,
        "createdAt": "2026-04-03T10:30:00.000Z"
      }
    ],
    "totals": {
      "promptTokens": 1000,
      "completionTokens": 3000,
      "totalTokens": 4000,
      "totalCost": 0.045
    }
  }
}
```

---

## Get Pricing Reference

Get model pricing reference table.

### Request

```http
GET /api/v1/usage/pricing
Authorization: Bearer <token>
```

### Example

```bash
curl http://localhost:3000/api/v1/usage/pricing \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "modelId": "claude-3-5-sonnet-20241022",
      "inputPricePerM": 3,
      "outputPricePerM": 15,
      "currency": "USD"
    },
    {
      "modelId": "gpt-4o",
      "inputPricePerM": 2.5,
      "outputPricePerM": 10,
      "currency": "USD"
    }
  ]
}
```

---

## Usage Dashboard

View token usage in a web dashboard.

### URL

```
GET /api/v1/usage/page
```

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `userId` | string | User ID (optional, uses auth if not provided) |

### Example

Open in browser:
```
http://localhost:3000/api/v1/usage/page
```

---

## Cost Calculation

Token costs are calculated automatically on each chat request.

### Formula

```
promptCost = (promptTokens / 1,000,000) × inputPricePerM
completionCost = (completionTokens / 1,000,000) × outputPricePerM
totalCost = promptCost + completionCost
```

### Example

For Claude 3.5 Sonnet with 1000 prompt tokens and 500 completion tokens:

```
promptCost = (1000 / 1,000,000) × $3.00 = $0.003
completionCost = (500 / 1,000,000) × $15.00 = $0.0075
totalCost = $0.0105
```

---

## Usage Record Fields

Each usage record contains:

| Field | Type | Description |
|-------|------|-------------|
| `userId` | string | User identifier |
| `sessionId` | string | Chat session ID |
| `conversationId` | string | Permanent conversation ID |
| `modelId` | string | Model used |
| `modelProvider` | string | Provider name |
| `promptTokens` | number | Input tokens |
| `completionTokens` | number | Output tokens |
| `totalTokens` | number | Total tokens |
| `promptCost` | number | Input cost (USD) |
| `completionCost` | number | Output cost (USD) |
| `totalCost` | number | Total cost (USD) |
| `endpoint` | string | API endpoint used |
| `requestType` | string | Type: chat, stream, tool |
| `responseTimeMs` | number | Response time in ms |
| `createdAt` | Date | Record timestamp |

---

## Integration with Chat

Token usage is automatically recorded when calling:

### POST /api/v1/chat

```json
{
  "success": true,
  "data": {
    "sessionId": "sess_abc123",
    "content": "Response text...",
    "usage": {
      "inputTokens": 25,
      "outputTokens": 45,
      "totalTokens": 70
    }
  }
}
```

### POST /api/v1/chat/stream

Token usage is recorded at the end of the stream in the `done` event's `usage` field.

---

## Rate Limits

There are no rate limits on usage endpoints. All authenticated users can query their own usage data.
