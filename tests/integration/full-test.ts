/**
 * Integration Test Script for OrbitAgent
 * Tests: Chat, Memory (Redis), Permanent Storage (MongoDB)
 */

import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/v1';

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
};

function log(type: 'success' | 'error' | 'info' | 'warn', message: string) {
  const prefix = {
    success: `${colors.green}✓`,
    error: `${colors.red}✗`,
    info: `${colors.blue}ℹ`,
    warn: `${colors.yellow}⚠`,
  }[type];
  console.log(`${prefix} ${message}${colors.reset}`);
}

// Test results
interface TestResult {
  name: string;
  passed: boolean;
  error?: string;
}

const results: TestResult[] = [];

async function testHealthCheck() {
  log('info', 'Testing Health Check...');
  try {
    const response = await axios.get(`${BASE_URL}/health`);
    if (response.data.success) {
      log('success', `Health Check: OK (Uptime: ${response.data.data.uptime}s)`);
      results.push({ name: 'Health Check', passed: true });
    }
  } catch (error: any) {
    log('error', `Health Check Failed: ${error.message}`);
    results.push({ name: 'Health Check', passed: false, error: error.message });
  }
}

async function testAuth() {
  log('info', 'Testing Authentication...');
  try {
    // Register a test user
    const timestamp = Date.now().toString(36);
    const registerData = {
      email: `test${timestamp}@example.com`,
      username: `testuser${timestamp}`,
      password: 'testpassword123',
    };

    const registerResponse = await axios.post(`${BASE_URL}/auth/register`, registerData);

    if (registerResponse.data.success) {
      log('success', `User Registered: ${registerData.username}`);

      // Store token for subsequent tests
      const token = registerResponse.data.data.accessToken;

      // Test login
      const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
        email: registerData.email,
        password: registerData.password,
      });

      if (loginResponse.data.success) {
        log('success', 'Login Successful');
        results.push({ name: 'Authentication', passed: true });
        return token;
      }
    }

    results.push({ name: 'Authentication', passed: false, error: 'Registration or login failed' });
    return null;
  } catch (error: any) {
    log('error', `Auth Failed: ${error.response?.data?.error?.message || error.message}`);
    results.push({ name: 'Authentication', passed: false, error: error.message });
    return null;
  }
}

async function testChat(token: string) {
  log('info', 'Testing Chat with SiliconFlow (Qwen3-32B)...');
  try {
    const response = await axios.post(
      `${BASE_URL}/chat`,
      {
        message: '你好，请介绍一下你自己',
        model: 'Qwen/Qwen3-32B',
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      log('success', `Chat Response Received:`);
      console.log(`   Model: ${response.data.data.model}`);
      console.log(`   Content: ${response.data.data.content.substring(0, 100)}...`);
      results.push({ name: 'Chat (SiliconFlow)', passed: true });
      return response.data.data.sessionId;
    }
  } catch (error: any) {
    log('error', `Chat Failed: ${error.response?.data?.error?.message || error.message}`);
    results.push({ name: 'Chat (SiliconFlow)', passed: false, error: error.message });
    return null;
  }
}

async function testChatHistory(token: string, sessionId: string) {
  log('info', 'Testing Chat History (Redis Temporary Memory)...');
  try {
    const response = await axios.get(`${BASE_URL}/chat/${sessionId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data.success) {
      const messageCount = response.data.data.length;
      log('success', `Chat History Retrieved: ${messageCount} messages`);
      results.push({ name: 'Chat History (Redis)', passed: true });
      return true;
    }
  } catch (error: any) {
    log('error', `Chat History Failed: ${error.response?.data?.error?.message || error.message}`);
    results.push({ name: 'Chat History (Redis)', passed: false, error: error.message });
    return false;
  }
}

async function testPermanentMemory(token: string, sessionId: string) {
  log('info', 'Testing Permanent Memory (MongoDB)...');
  try {
    // Create a conversation in permanent storage
    const createResponse = await axios.post(
      `${BASE_URL}/memory/permanent`,
      {
        sessionId,
        agentId: 'default',
        modelId: 'Qwen/Qwen3-32B',
        modelProvider: 'siliconflow',
        title: 'Test Conversation',
        tags: ['test'],
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (createResponse.data.success) {
      const conversationId = createResponse.data.data.id;
      log('success', `Permanent Conversation Created: ${conversationId}`);

      // List conversations
      const listResponse = await axios.get(`${BASE_URL}/memory/permanent`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (listResponse.data.success) {
        log('success', `Conversations Listed: ${listResponse.data.data.length} found`);
        results.push({ name: 'Permanent Memory (MongoDB)', passed: true });
        return conversationId;
      }
    }
  } catch (error: any) {
    log('error', `Permanent Memory Failed: ${error.response?.data?.error?.message || error.message}`);
    results.push({ name: 'Permanent Memory (MongoDB)', passed: false, error: error.message });
  }
}

async function testModelList(token: string) {
  log('info', 'Testing Model List...');
  try {
    const response = await axios.get(`${BASE_URL}/models`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data.success) {
      const siliconflowModels = response.data.data.filter(
        (m: any) => m.id.includes('Qwen') || m.provider === 'siliconflow'
      );
      log('success', `Models Available: ${response.data.data.length} total`);
      log('info', `SiliconFlow Models: ${siliconflowModels.map((m: any) => m.id).join(', ')}`);
      results.push({ name: 'Model List', passed: true });
      return true;
    }
  } catch (error: any) {
    log('error', `Model List Failed: ${error.response?.data?.error?.message || error.message}`);
    results.push({ name: 'Model List', passed: false, error: error.message });
    return false;
  }
}

async function testClearChat(token: string, sessionId: string) {
  log('info', 'Testing Clear Chat (Redis Cleanup)...');
  try {
    const response = await axios.post(`${BASE_URL}/chat/${sessionId}/clear`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data.success) {
      log('success', 'Chat Cleared Successfully');
      results.push({ name: 'Clear Chat (Redis)', passed: true });
      return true;
    }
  } catch (error: any) {
    log('error', `Clear Chat Failed: ${error.response?.data?.error?.message || error.message}`);
    results.push({ name: 'Clear Chat (Redis)', passed: false, error: error.message });
    return false;
  }
}

async function checkRedisDirectly() {
  log('info', 'Checking Redis Keys...');
  try {
    const { exec } = require('child_process');
    exec('redis-cli KEYS "orbit:*"', (error: any, stdout: string) => {
      if (!error) {
        const keys = stdout.trim().split('\n').filter((k: string) => k);
        log('success', `Redis Keys Found: ${keys.length}`);
        if (keys.length > 0) {
          keys.slice(0, 5).forEach((key: string) => {
            log('info', `  - ${key}`);
          });
        }
      }
    });
  } catch (error: any) {
    log('error', `Redis Check Failed: ${error.message}`);
  }
}

async function checkMongoDirectly() {
  log('info', 'Checking MongoDB Collections...');
  try {
    const { exec } = require('child_process');
    exec('mongosh --quiet --eval "db.getMongo().getDBNames()" 2>/dev/null || mongo --quiet --eval "db.getMongo().getDBNames()"', (error: any, stdout: string) => {
      if (!error) {
        log('success', `MongoDB Databases: ${stdout.trim()}`);
      }
    });
  } catch (error: any) {
    log('error', `MongoDB Check Failed: ${error.message}`);
  }
}

// Run all tests
async function runTests() {
  console.log('\n' + '='.repeat(60));
  console.log(`${colors.blue}OrbitAgent Integration Test Suite${colors.reset}`);
  console.log('='.repeat(60) + '\n');

  // Check infrastructure first
  log('info', '=== Infrastructure Check ===');
  await checkRedisDirectly();
  await checkMongoDirectly();
  console.log('');

  // Test 1: Health Check
  log('info', '=== API Tests ===');
  await testHealthCheck();

  // Test 2: Authentication
  const token = await testAuth();
  if (!token) {
    log('error', 'Cannot proceed without authentication token');
    printSummary();
    return;
  }

  // Test 3: Model List
  await testModelList(token);

  // Test 4: Chat with SiliconFlow
  const sessionId = await testChat(token);
  if (!sessionId) {
    log('warn', 'Cannot test memory without chat session');
    printSummary();
    return;
  }

  // Test 5: Chat History (Redis)
  await testChatHistory(token, sessionId);

  // Test 6: Permanent Memory (MongoDB)
  await testPermanentMemory(token, sessionId);

  // Test 7: Clear Chat (Redis)
  await testClearChat(token, sessionId);

  printSummary();
}

function printSummary() {
  console.log('\n' + '='.repeat(60));
  console.log(`${colors.blue}Test Summary${colors.reset}`);
  console.log('='.repeat(60));

  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;

  results.forEach((result) => {
    if (result.passed) {
      log('success', result.name);
    } else {
      log('error', `${result.name}: ${result.error || 'Unknown error'}`);
    }
  });

  console.log('');
  console.log(`${colors.green}Passed: ${passed}${colors.reset} | ${colors.red}Failed: ${failed}${colors.reset}`);
  console.log('='.repeat(60) + '\n');

  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch(console.error);
