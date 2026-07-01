# Models API

## Base URL

`/api/v1/models`

---

## List All Models

Get all available models from all providers.

### Request

```http
GET /api/v1/models
```

No authentication required.

### Example

```bash
curl http://localhost:3000/api/v1/models
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "claude-3-5-sonnet-20241022",
      "name": "Claude 3.5 Sonnet",
      "provider": "anthropic",
      "displayName": "Claude 3.5 Sonnet",
      "description": "Most intelligent model with excellent reasoning",
      "contextWindow": 200000,
      "supportedFeatures": {
        "streaming": true,
        "toolCalling": true,
        "vision": true
      },
      "pricing": {
        "input": 3,
        "output": 15,
        "currency": "USD"
      }
    },
    {
      "id": "gpt-4o",
      "name": "GPT-4o",
      "provider": "openai",
      "displayName": "GPT-4o",
      "description": "Most capable model, multimodal",
      "contextWindow": 128000,
      "supportedFeatures": {
        "streaming": true,
        "toolCalling": true,
        "vision": true
      },
      "pricing": {
        "input": 2.5,
        "output": 10,
        "currency": "USD"
      }
    }
  ]
}
```

---

## Get Model Details

Get details for a specific model.

### Request

```http
GET /api/v1/models/:id
```

No authentication required.

### Example

```bash
curl http://localhost:3000/api/v1/models/claude-3-5-sonnet-20241022
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "claude-3-5-sonnet-20241022",
    "name": "Claude 3.5 Sonnet",
    "provider": "anthropic",
    "displayName": "Claude 3.5 Sonnet",
    "description": "Most intelligent model with excellent reasoning",
    "contextWindow": 200000,
    "supportedFeatures": {
      "streaming": true,
      "toolCalling": true,
      "vision": true,
      "functionCalling": true
    },
    "pricing": {
      "input": 3,
      "output": 15,
      "currency": "USD"
    }
  }
}
```

---

## List Providers

Get all configured LLM providers.

### Request

```http
GET /api/v1/models/providers/list
```

No authentication required.

### Example

```bash
curl http://localhost:3000/api/v1/models/providers/list
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "name": "anthropic",
      "enabled": true,
      "modelCount": 4
    },
    {
      "name": "openai",
      "enabled": true,
      "modelCount": 4
    },
    {
      "name": "google",
      "enabled": true,
      "modelCount": 3
    },
    {
      "name": "deepseek",
      "enabled": true,
      "modelCount": 2
    },
    {
      "name": "siliconflow",
      "enabled": true,
      "modelCount": 4
    }
  ]
}
```

---

## Get Default Settings

Get the current user's default model settings.

### Request

```http
GET /api/v1/models/defaults/current
Authorization: Bearer <token>
```

### Example

```bash
curl http://localhost:3000/api/v1/models/defaults/current \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Response

```json
{
  "success": true,
  "data": {
    "defaultModel": "claude-3-5-sonnet-20241022",
    "defaultProvider": "anthropic",
    "temperature": 1.0
  }
}
```

---

## Switch Default Model

Change the user's default model.

### Request

```http
POST /api/v1/models/switch
Authorization: Bearer <token>
Content-Type: application/json
```

### Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `model` | string | Yes | Model ID |
| `provider` | string | No | Provider name |
| `temperature` | number | No | Temperature (0-2) |

### Example

```bash
curl -X POST http://localhost:3000/api/v1/models/switch \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "model": "gpt-4o",
    "provider": "openai",
    "temperature": 0.7
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "defaultModel": "gpt-4o",
    "defaultProvider": "openai",
    "temperature": 0.7
  }
}
```

---

## Health Check

Check health status of all LLM providers.

### Request

```http
GET /api/v1/models/health
```

No authentication required.

### Example

```bash
curl http://localhost:3000/api/v1/models/health
```

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

---

## Available Providers

### Anthropic

| Model ID | Name | Context | Features |
|----------|------|---------|----------|
| `claude-3-5-sonnet-20241022` | Claude 3.5 Sonnet | 200K | streaming, tools, vision |
| `claude-3-5-haiku-20241022` | Claude 3.5 Haiku | 200K | streaming, tools, vision |
| `claude-3-opus-20240229` | Claude 3 Opus | 200K | streaming, tools, vision |
| `claude-3-sonnet-20240229` | Claude 3 Sonnet | 200K | streaming, tools, vision |

### OpenAI

| Model ID | Name | Context | Features |
|----------|------|---------|----------|
| `gpt-4o` | GPT-4o | 128K | streaming, tools, vision |
| `gpt-4-turbo` | GPT-4 Turbo | 128K | streaming, tools, vision |
| `gpt-4` | GPT-4 | 8K | streaming, tools |
| `gpt-3.5-turbo` | GPT-3.5 Turbo | 16K | streaming, tools |

### Google

| Model ID | Name | Context | Features |
|----------|------|---------|----------|
| `gemini-2.0-flash` | Gemini 2.0 Flash | 1M | streaming, tools, vision |
| `gemini-1.5-pro` | Gemini 1.5 Pro | 1M | streaming, tools, vision |
| `gemini-1.5-flash` | Gemini 1.5 Flash | 1M | streaming, tools, vision |

### DeepSeek

| Model ID | Name | Context | Features |
|----------|------|---------|----------|
| `deepseek-chat` | DeepSeek Chat | 64K | streaming, tools |
| `deepseek-coder` | DeepSeek Coder | 64K | streaming, tools |

### SiliconFlow

| Model ID | Name | Context |
|----------|------|---------|
| `Qwen/Qwen3-32B` | Qwen3-32B | 32K |
| `Qwen/Qwen2.5-7B-Instruct` | Qwen 2.5 7B | - |
| `deepseek-ai/DeepSeek-V2.5` | DeepSeek V2.5 | - |
| `THUDM/glm-4-9b-chat` | GLM-4 9B | - |

---

## Pricing (USD per Million Tokens)

| Provider | Model | Input | Output |
|----------|-------|-------|--------|
| Anthropic | Claude 3.5 Sonnet | $3.00 | $15.00 |
| Anthropic | Claude 3.5 Haiku | $0.80 | $4.00 |
| OpenAI | GPT-4o | $2.50 | $10.00 |
| OpenAI | GPT-4 Turbo | $10.00 | $30.00 |
| Google | Gemini 2.0 Flash | $0.00 | $0.10 |
| DeepSeek | deepseek-chat | $0.27 | $1.10 |

Full pricing list: `GET /api/v1/usage/pricing`
