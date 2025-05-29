import fetch from 'node-fetch';
import 'dotenv/config';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn('No API_KEY found in environment variables.');
}

export async function fetchFromFootballData(url) {
  const response = await fetch(url, {
    headers: {
      'X-Auth-Token': API_KEY,
      'Content-Type': 'application/json'
    }
  });

  const text = await response.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`Invalid JSON response: ${text}`);
  }

  if (!response.ok) {
    const status = response.status;
    const message = json.message || text;
    throw new Error(`HTTP ${status}: ${message}`);
  }

  return json;
}
