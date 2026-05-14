const { createClient } = require('@sanity/client');
require('dotenv').config();

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-14',
  token: process.env.VITE_SANITY_TOKEN,
});

async function fix() {
  const products = await client.fetch(`*[_type == "product"] | order(title asc)`);
  console.log('--- ALL PRODUCTS (INCL DRAFTS) ---');
  for (const p of products) {
    console.log(`[${p._id}] Title: "${p.title}" | Models: ${p.models?.length || 0}`);
  }
  console.log('-----------------------------------');

  // 2. GLOBAL JUNK CLEANUP (Relevant types only)
  console.log('Searching for untitled/empty documents in defined types...');
  const types = ["product", "service", "amcPlan", "testimonial", "deal", "gallery"];
  const junk = await client.fetch(`*[_type in $types && (title == "Untitled" || title == "untitled" || !defined(title) || title == "")]`, { types });
  
  for (const doc of junk) {
    console.log(`Deleting junk [${doc._id}] Type: ${doc._type} Title: "${doc.title}"`);
    await client.delete(doc._id);
  }
}

fix().catch(err => console.error(err));
