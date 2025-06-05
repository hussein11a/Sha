const { MongoClient } = require('mongodb');

// MongoDB connection (will be set via environment variables in Netlify)
let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  // For Netlify deployment, MongoDB URL should be set as environment variable
  const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
  const dbName = process.env.DB_NAME || 'test_database';

  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();
    cachedClient = { client, db: client.db(dbName) };
    return cachedClient;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

// Generate UUID
function generateUUID() {
  return 'xxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  };

  // Handle OPTIONS request for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    const path = event.path.replace('/.netlify/functions/api', '');
    const method = event.httpMethod;

    // Root endpoint
    if (path === '' || path === '/') {
      if (method === 'GET') {
        return {
          statusCode: 200,
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: 'Hello World' })
        };
      }
    }

    // Status endpoints
    if (path === '/status') {
      const { db } = await connectToDatabase();

      if (method === 'GET') {
        const statusChecks = await db.collection('status_checks').find({}).limit(1000).toArray();
        return {
          statusCode: 200,
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify(statusChecks)
        };
      }

      if (method === 'POST') {
        const body = JSON.parse(event.body);
        const statusObj = {
          id: generateUUID(),
          client_name: body.client_name,
          timestamp: new Date().toISOString()
        };

        await db.collection('status_checks').insertOne(statusObj);

        return {
          statusCode: 200,
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify(statusObj)
        };
      }
    }

    // Default 404 response
    return {
      statusCode: 404,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Not Found' })
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
};
