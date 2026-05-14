import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
dotenv.config();

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-14',
  token: process.env.VITE_SANITY_TOKEN,
});

async function check() {
  const data = await client.fetch('*[]');
  console.log(`Total documents found: ${data.length}`);
  const types = [...new Set(data.map(d => d._type))];
  console.log(`Document types: ${types.join(', ')}`);
}

check().catch(console.error);
