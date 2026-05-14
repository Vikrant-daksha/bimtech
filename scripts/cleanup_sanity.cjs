const { createClient } = require('@sanity/client');
require('dotenv').config();

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-14',
  token: process.env.VITE_SANITY_TOKEN,
});

async function cleanup() {
  console.log('Fetching all products...');
  const products = await client.fetch(`*[_type == "product"]`);
  console.log(`Found ${products.length} categories.`);

  const mergedCategories = {};

  for (const product of products) {
    // 1. Clean Title
    let title = product.title || '';
    title = title.replace(/\s*\(\d+\)\s*/g, ' ').trim();
    title = title.replace(/Systems/i, 'Systems').trim();
    const normTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '');

    // 2. Process Models
    const cleanedModels = (product.models || []).map(model => {
      let modelName = model.modelName || '';
      // Remove prefixes/jargon
      modelName = modelName.replace(/^(Specifications for eSSL |Technical Specifications for |Fingerprint - |Face - |Finger Print - |Biometric - )/i, '').trim();
      modelName = modelName.replace(/\s*\(\d+\)\s*/g, ' ').trim();

      const cleanedSpecs = (model.specs || []).map(spec => {
        let label = spec.label || '';
        let value = spec.value || '';
        
        // Remove "Specifications for" etc from labels/values
        label = label.replace(/^(Specifications for |Technical Specifications for )/i, '').trim();
        value = value.replace(/^(Specifications for |Technical Specifications for )/i, '').trim();
        
        return { ...spec, label, value };
      });

      return { ...model, modelName, specs: cleanedSpecs };
    });

    // 3. Merging Logic
    if (mergedCategories[normTitle]) {
      console.log(`Merging [${product.title}] into [${mergedCategories[normTitle].title}]`);
      // Combine models and filter duplicates by modelName
      const existingModels = mergedCategories[normTitle].models || [];
      const newModels = cleanedModels;
      
      const allModels = [...existingModels];
      for (const model of newModels) {
        if (!allModels.some(m => m.modelName.toLowerCase() === model.modelName.toLowerCase())) {
          allModels.push(model);
        }
      }
      mergedCategories[normTitle].models = allModels;
      
      // Mark original for deletion
      mergedCategories[normTitle].toDelete = mergedCategories[normTitle].toDelete || [];
      mergedCategories[normTitle].toDelete.push(product._id);
    } else {
      mergedCategories[normTitle] = {
        ...product,
        title,
        models: cleanedModels
      };
    }
  }

  // 4. Final Updates and Deletions
  for (const key in mergedCategories) {
    const p = mergedCategories[key];

    // Delete junk/null categories
    if (!p.title || (p.models && p.models.length === 0) || p.title.toLowerCase().includes('null')) {
        console.log(`Deleting junk/null category: ${p.title} (${p._id})`);
        await client.delete(p._id);
        continue;
    }

    // Update the main document
    console.log(`Updating category: ${p.title}`);
    await client.patch(p._id)
      .set({ 
        title: p.title, 
        models: p.models 
      })
      .commit();

    // Delete the duplicates
    if (p.toDelete) {
      for (const id of p.toDelete) {
        console.log(`Deleting duplicate: ${id}`);
        await client.delete(id);
      }
    }
  }

  console.log('✅ Cleanup complete!');
}

cleanup().catch(err => console.error(err));
