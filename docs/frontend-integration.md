# Frontend Integration Guide

## Overview

This guide helps frontend developers integrate with OrbitAgent API.

---

## Authentication Flow

### Option 1: JWT Authentication (Web Apps)

```
1. User registers -> POST /auth/register
2. User logs in   -> POST /auth/login
3. Store tokens   -> accessToken, refreshToken
4. Include token  -> Authorization: Bearer <token>
5. Refresh when expired -> POST /auth/refresh
```

### Option 2: API Key Authentication (Mobile/Desktop Apps)

```
1. User registers/logs in once -> Get JWT
2. Create API key  -> POST /auth/api-key
3. Store API key   -> oa_xxxxxxxxxxxxxxx
4. Include key     -> X-API-Key: <api-key>
```

---

## Quick Integration Examples

### JavaScript/TypeScript

```typescript
const API_BASE = 'http://localhost:3000/api/v1';

class OrbitAgentClient {
  private token: string = '';
  private apiKey: string = '';

  // Set JWT token
  setToken(token: string) {
    this.token = token;
  }

  // Set API Key
  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  // Get auth headers
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    } else if (this.apiKey) {
      headers['X-API-Key'] = this.apiKey;
    }
    return headers;
  }

  // Register
  async register(email: string, username: string, password: string) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, password }),
    });
    const data = await res.json();
    if (data.success) {
      this.token = data.data.accessToken;
    }
    return data;
  }

  // Login
  async login(email: string, password: string) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.success) {
      this.token = data.data.accessToken;
    }
    return data;
  }

  // Send chat message
  async chat(message: string, sessionId?: string, model?: string) {
    const res = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ message, sessionId, model }),
    });
    return res.json();
  }

  // Stream chat
  async *streamChat(message: string, sessionId?: string) {
    const res = await fetch(`${API_BASE}/chat/stream`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ message, sessionId }),
    });

    const reader = res.body!.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const text = decoder.decode(value);
      const lines = text.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          yield JSON.parse(line.slice(6));
        }
      }
    }
  }

  // Get chat history
  async getHistory(sessionId: string) {
    const res = await fetch(`${API_BASE}/chat/${sessionId}`, {
      headers: this.getHeaders(),
    });
    return res.json();
  }

  // Get token usage
  async getUsage() {
    const res = await fetch(`${API_BASE}/usage/stats`, {
      headers: this.getHeaders(),
    });
    return res.json();
  }
}

// Usage
const client = new OrbitAgentClient();
await client.login('user@example.com', 'password');
const result = await client.chat('Hello!');
console.log(result.data.content);
```

---

### React Example

```tsx
import React, { useState, useCallback } from 'react';

const API_BASE = 'http://localhost:3000/api/v1';

export function ChatComponent({ token }: { token: string }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => 'sess_' + Math.random().toString(36).slice(2));

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ message: input, sessionId }),
      });

      const data = await res.json();

      if (data.success) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.data.content,
        }]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ height: 400, overflowY: 'auto' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            textAlign: msg.role === 'user' ? 'right' : 'left',
          }}>
            <div style={{
              display: 'inline-block',
              padding: '8px 12px',
              borderRadius: 12,
              background: msg.role === 'user' ? '#007bff' : '#e9ecef',
              color: msg.role === 'user' ? '#fff' : '#000',
              margin: '4px',
            }}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', marginTop: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && sendMessage()}
          style={{ flex: 1, padding: 8 }}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
}
```

---

### Python Example

```python
import requests
import json

API_BASE = "http://localhost:3000/api/v1"

class OrbitAgent:
    def __init__(self):
        self.token = None
        self.api_key = None

    def login(self, email: str, password: str):
        res = requests.post(
            f"{API_BASE}/auth/login",
            json={"email": email, "password": password}
        )
        data = res.json()
        if data["success"]:
            self.token = data["data"]["accessToken"]
        return data

    def chat(self, message: str, session_id: str = None):
        headers = {"Authorization": f"Bearer {self.token}"}
        res = requests.post(
            f"{API_BASE}/chat",
            json={"message": message, "sessionId": session_id},
            headers=headers
        )
        return res.json()

    def get_usage(self):
        headers = {"Authorization": f"Bearer {self.token}"}
        res = requests.get(f"{API_BASE}/usage/stats", headers=headers)
        return res.json()

# Usage
client = OrbitAgent()
client.login("user@example.com", "password")
result = client.chat("Hello!")
print(result["data"]["content"])
```

---

### cURL Examples

```bash
# Register
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","username":"myuser","password":"pass123"}'

# Login
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"pass123"}'

# Send message
curl -X POST http://localhost:3000/api/v1/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{"message":"Hello!","model":"claude-3-5-sonnet-20241022"}'

# Get history
curl http://localhost:3000/api/v1/chat/sess_abc123 \
  -H "Authorization: Bearer <your-token>"

# Check usage
curl http://localhost:3000/api/v1/usage/stats \
  -H "Authorization: Bearer <your-token>"
```

---

## WebSocket Alternative

For real-time chat, consider using WebSocket instead of SSE:

```javascript
// Note: OrbitAgent currently uses SSE
// This is a conceptual example for WebSocket migration
const ws = new WebSocket('ws://localhost:3000/ws/chat');

ws.onopen = () => {
  ws.send(JSON.stringify({
    type: 'chat',
    message: 'Hello!',
    sessionId: 'sess_abc123'
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'content') {
    console.log(data.content);
  } else if (data.type === 'done') {
    console.log('Complete:', data.content);
  }
};
```

---

## Error Handling

```typescript
try {
  const result = await client.chat('Hello!');
  if (!result.success) {
    switch (result.error.code) {
      case 'UNAUTHORIZED':
        // Redirect to login
        break;
      case 'MODEL_UNAVAILABLE':
        // Show error, suggest another model
        break;
      default:
        // Show generic error
    }
  }
} catch (err) {
  // Network error
  console.error('Network error:', err);
}
```

---

## Session Management

```typescript
// Generate a new session
const sessionId = 'sess_' + Math.random().toString(36).slice(2);

// Store in localStorage
localStorage.setItem('sessionId', sessionId);

// Retrieve on page load
const sessionId = localStorage.getItem('sessionId') || generateNew();
```

---

## Token Refresh

```typescript
class OrbitAgentClient {
  async refreshToken() {
    const res = await fetch(`${API_BASE}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    });
    const data = await res.json();
    if (data.success) {
      this.token = data.data.token;
    }
    return data;
  }

  // Auto-refresh on 401
  async request(url: string, options: RequestInit) {
    const res = await fetch(url, options);
    if (res.status === 401) {
      await this.refreshToken();
      // Retry with new token
      options.headers['Authorization'] = `Bearer ${this.token}`;
      return fetch(url, options);
    }
    return res;
  }
}
```
