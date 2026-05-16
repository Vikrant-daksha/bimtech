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
  const schemaTypes = ["product", "service", "amcPlan", "testimonial", "deal", "gallery"];
  
  // 1. Rename systems
  console.log('Renaming systems...');
  const products = await client.fetch(`*[_type == "product"]`);
  for (const p of products) {
    if (p.title === 'Face Systems' || p.title === 'Face Attendance Systems') {
        console.log(`Updating ${p._id} -> "Face Attendance & Access Control"`);
        await client.patch(p._id).set({ title: "Face Attendance & Access Control" }).commit();
    }
    if (p.title === 'Fingerprint Systems' || p.title === 'Fingerprint Attendance Systems') {
        console.log(`Updating ${p._id} -> "Fingerprint Attendance & Access Control"`);
        await client.patch(p._id).set({ title: "Fingerprint Attendance & Access Control" }).commit();
    }
  }

  // 2. Delete Untitled or Empty in schema types ONLY
  console.log('Cleaning junk from schema types...');
  const junk = await client.fetch(`*[_type in $schemaTypes && (title == "Untitled" || title == "untitled" || !defined(title) || title == "")]`, { schemaTypes });
  
  for (const doc of junk) {
    console.log(`Deleting junk [${doc._id}] Type: ${doc._type} Title: "${doc.title}"`);
    await client.delete(doc._id);
  }

  console.log('✅ Surgical fix complete!');
}

fix().catch(err => console.error(err));
