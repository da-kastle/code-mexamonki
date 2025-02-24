// api/sync.js

exports.handler = async (event, context) => {
  // Allow only POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    // Parse the incoming request body
    const data = JSON.parse(event.body);
    console.log('Received sync data:', data);

    // Here you can add code to process or store the data,
    // such as writing to a database or another persistent storage.
    // For now, we simply return a success message.

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Sync successful', data: data })
    };
  } catch (error) {
    console.error('Error processing sync data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
};
