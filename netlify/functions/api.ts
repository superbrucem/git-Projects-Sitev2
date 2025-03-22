import { Handler } from '@netlify/functions';
import { storage } from '../../server/storage';

export const handler: Handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
  };

  // Handle projects endpoint
  if (event.path.endsWith('/api/projects')) {
    try {
      const projects = await storage.getAllProjects();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(projects)
      };
    } catch (error) {
      console.error('Error fetching projects:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to fetch projects' })
      };
    }
  }

  // Handle featured projects endpoint
  if (event.path.endsWith('/api/projects/featured')) {
    try {
      const featured = await storage.getFeaturedProjects();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(featured)
      };
    } catch (error) {
      console.error('Error fetching featured projects:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to fetch featured projects' })
      };
    }
  }

  return {
    statusCode: 404,
    headers,
    body: JSON.stringify({ error: 'Not found' })
  };
};
