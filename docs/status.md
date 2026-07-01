# Status & Health API

## Overview

OrbitAgent provides health check and status endpoints for monitoring the service status, database connections, and LLM provider availability.

---

## Base URL

`/api/v1/status`

---

## Health Check

Basic health check endpoint for load balancers and monitoring systems.

### Request

```http
GET /api/v1/health
```

No authentication required.

### Example

```bash
curl http://localhost:3000/api/v1/health
```

### Response

```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2026-04-03T10:00:00.000Z",
    "uptime": 3600.5
  }
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `status` | string | Always "healthy" if server is running |
| `timestamp` | string | Server time (ISO 8601) |
| `uptime` | number | Server uptime in seconds |

---

## Service Status

Get detailed status of all service components.

### Request

```http
GET /api/v1/status
```

No authentication required.

### Example

```bash
curl http://localhost:3000/api/v1/status
```

### Response

```json
{
  "success": true,
  "data": {
    "service": "OrbitAgent",
    "version": "1.0.0",
    "timestamp": "2026-04-03T10:00:00.000Z",
    "databases": {
      "mongodb": {
        "status": "connected",
        "database": "orbit_agent"
      },
      "redis": {
        "status": "connected",
        "type": "temporary_memory"
      }
    },
    "llm": {
      "health": {
        "anthropic": true,
        "openai": true,
        "google": true,
        "deepseek": false,
        "siliconflow": true
      },
      "availableProviders": ["anthropic", "openai", "google", "siliconflow"],
      "modelCount": 15
    },
    "endpoints": {
      "baseUrl": "/api/v1",
      "auth": ["/auth/register", "/auth/login", "/auth/me"],
      "chat": ["/chat", "/chat/:sessionId", "/chat/:sessionId/clear"],
      "memory": ["/memory/permanent", "/memory/temp/:sessionId"],
      "models": ["/models", "/models/switch"]
    }
  }
}
```

---

## Status Dashboard

View service status in a web dashboard.

### URL

```
GET /api/v1/status/page
```

### Example

Open in browser:
```
http://localhost:3000/api/v1/status/page
```

The dashboard displays:
- MongoDB connection status
- Redis connection status
- LLM provider health status
- Available models per provider
- Quick reference of API endpoints

---

## LLM Provider Health

Check health status of all LLM providers.

### Request

```http
GET /api/v1/models/health
```

No authentication required.

### Response

```json
{
  "success": true,
  "data": {
    "anthropic": true,
    "openai": true,
    "google": true,
    "deepseek": false,
    "ollama": false,
    "siliconflow": true
  }
}
```

### Provider Status

| Status | Meaning |
|--------|---------|
| `true` | Provider is healthy and responding |
| `false` | Provider is unavailable or error |

---

## Database Health

Check health of MongoDB and Redis connections.

### Request

```http
GET /api/v1/status
```

### Database Status Fields

| Field | Description |
|-------|-------------|
| `status` | "connected" or "disconnected" |
| `database` | Database name (MongoDB) |
| `type` | Memory type (Redis) |

---

## Monitoring Best Practices

### Health Check for Load Balancers

```bash
# Check every 30 seconds
curl -f http://localhost:3000/api/v1/health || exit 1
```

### Prometheus Integration

Add to your Prometheus config:

```yaml
scrape_configs:
  - job_name: 'orbitagent'
    static_configs:
      - targets: ['localhost:3000']
    metrics_path: '/api/v1/health'
```

### Grafana Dashboard

Import the following PromQL queries:

| Metric | Query |
|--------|-------|
| Uptime | `up{job="orbitagent"}` |
| Request Rate | `rate(http_requests_total[5m])` |

---

## Error Responses

### Service Unavailable

```json
{
  "success": false,
  "error": {
    "code": "SERVICE_UNAVAILABLE",
    "message": "Service is temporarily unavailable"
  }
}
```

### Database Disconnected

```json
{
  "success": true,
  "data": {
    "databases": {
      "mongodb": {
        "status": "disconnected"
      }
    }
  }
}
```

---

## Startup Logs

When OrbitAgent starts, it logs:

```
Initializing services...
Connecting to MongoDB...
Connecting to Redis...
LLMManager initialized
SkillManager initialized
ToolManager initialized
WorkflowEngine initialized
PromptManager initialized
All services initialized
Server started on port 3000
```

### Log Location

```
/Users/erwin/Downloads/codespace/OrbitAgent/logs/app.log
```

---

## API Documentation

For complete API documentation, visit:
- Interactive Docs: `http://localhost:3000/api/v1/docs`
- Token Usage: `http://localhost:3000/api/v1/usage/page`
- Status Dashboard: `http://localhost:3000/api/v1/status/page`
