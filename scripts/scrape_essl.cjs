const { createClient } = require('@sanity/client');
const axios = require('axios');
const cheerio = require('cheerio');
const xml2js = require('xml2js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-14',
  token: process.env.VITE_SANITY_TOKEN,
});

async function getProductLinksFromSitemap() {
  console.log('Fetching sitemap...');
  const response = await axios.get('https://esslsecurity.com/sitemap.xml');
  const parser = new xml2js.Parser();
  const result = await parser.parseStringPromise(response.data);
  
  const urls = result.urlset.url.map(u => u.loc[0]);
  
  // Filter for product links
  // Products usually follow the pattern: domain/category/product-name
  // We exclude main category pages like domain/fingerprint
  const productLinks = urls.filter(url => {
    const parts = url.replace('https://www.esslsecurity.com/', '').split('/');
    return parts.length >= 2 && !['contactus', 'about-us', 'products', 'software', 'storage'].includes(parts[0]);
  });

  return productLinks;
}

async function scrapeProduct(url) {
  console.log(`Scraping: ${url}`);
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    let name = $('h3.section-title').text().trim();
    if (!name) name = $('h2').text().trim();
    if (!name) name = $('h1').first().text().trim();
    
    // CLEAN JARGON from Name
    name = name.replace(/^(Specifications for eSSL |Technical Specifications for |Fingerprint - |Face - |Finger Print - |Biometric - )/i, '').trim();
    name = name.replace(/\s*\(\d+\)\s*/g, ' ').trim();

    let imageUrl = $('div.bg-contain').attr('data-background');
    if (!imageUrl) imageUrl = $('.product-images-slider img.img-fluid').attr('src');
    if (!imageUrl) imageUrl = $('img.img-fluid').first().attr('src');

    // Handle relative URLs
    if (imageUrl && !imageUrl.startsWith('http')) {
        imageUrl = `https://www.esslsecurity.com${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
    }
    
    let description = '';
    // Try to find features
    const featuresLabel = $('strong, b, span').filter((i, el) => $(el).text().toLowerCase().includes('features:'));
    if (featuresLabel.length) {
        description = featuresLabel.parent().text().split(/features:/i)[1]?.trim() || '';
    }
    if (!description) {
        description = $('p.mb-5').first().text().trim();
    }

    const specs = [];
    // Try to find specs in lists
    $('ul.list-styled li, .specs-list li').each((i, el) => {
        const text = $(el).text().trim();
        if (text.includes(':')) {
            const [label, ...valueParts] = text.split(':');
            let cleanLabel = label.replace(/^(Specifications for |Technical Specifications for )/i, '').trim();
            let cleanValue = valueParts.join(':').replace(/^(Specifications for |Technical Specifications for )/i, '').trim();
            specs.push({ _key: `spec-${i}`, label: cleanLabel, value: cleanValue });
        }
    });

    if (specs.length === 0) {
        // Fallback for tables
        $('table tr').each((i, el) => {
            let label = $(el).find('td').eq(0).text().trim();
            let value = $(el).find('td').eq(1).text().trim();
            
            label = label.replace(/^(Specifications for |Technical Specifications for )/i, '').trim();
            value = value.replace(/^(Specifications for |Technical Specifications for )/i, '').trim();

            if (label && value) {
                specs.push({ _key: `spec-${i}`, label, value });
            }
        });
    }

    // Grouping by category (fingerprint, face, boombarrier, etc.)
    const category = url.replace('https://www.esslsecurity.com/', '').split('/')[0];

    // VALIDATION: If we couldn't find a name or image, it's probably a junk page or layout error
    if (!name || (!imageUrl && specs.length < 3)) {
        console.warn(`⚠️ Skipping potential junk page: ${url}`);
        return null;
    }

    return {
        name,
        imageUrl,
        description,
        specs,
        category,
        slug: url.split('/').pop()
    };
  } catch (error) {
    console.error(`Error scraping ${url}:`, error.message);
    return null;
  }
}

async function uploadImage(url) {
    if (!url) return null;
    try {
        console.log(`Uploading image: ${url}`);
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data, 'binary');
        const filename = url.split('/').pop();
        const asset = await client.assets.upload('image', buffer, { filename });
        return {
            _type: 'image',
            asset: {
                _type: "reference",
                _ref: asset._id
            }
        };
    } catch (error) {
        console.error(`Error uploading image ${url}:`, error.message);
        return null;
    }
}

/**
 * SCRAPE_ESSL.CJS
 * Use this script to scrape product data from esslsecurity.com and import to Sanity.
 * 
 * To run: node scripts/scrape_essl.cjs
 * 
 * Edit TARGET_SLUGS below to scrape specific products.
 * Leave it empty [] to scrape ALL products found in the sitemap.
 */

const TARGET_SLUGS = ['sf100', 'iclock990', 'aiface mars+qr', 'aiface-arion' ,'f22', 'mu-ai-5', 'aiface-jupiter', 'aiface eris', 'aiface magnum', 'aiface-venus', 'mu-ai-9', 'aiface-mars', 'aiface magnum lite', 'aiface-neptune', 'aiface-mercury access', 'orcus', 'aiface-uranus', 'silkbio-101tc', 'uface-302/uface-602', 'eface-990', 'js-32e', 'js-34e/m', 'sa40b-m', 'x7', 'js-36e', 'js-35e', 'gp-finger-104', 'gp-rfid-105', 'c3-400', 'inbio260', 'ec-20m', 'ec-20k', 'et-1000', 'et-1200', 'et-2000', 'et-1219', 'hht-tl-139-half-height turnstile', 'fht-tl', 'bg-sc-300', 'bgl-100', 'bg100ti', 'bg-cm-300', 'bg100 tii', 'bg-bdc-rl-100', 'bg-100 grey', 'bg-108', 'bg-s-105', 'bg-dc-101', 'bg180-bdc', 'essl lpr 100 camera', 'U5', 'u12-i', 'uhf1-tag1', 'uhf1-tag4', 'uhf1-tag5', 'ebs-5030a', 'ebs-100100',  'd270-1-ip54', 'd270-18-ip54', 'd330-18-ip65', 'd518-63-ip65', 'd468-6', 'd4006', ]; 

// Helper to normalize strings for fuzzy matching (removes spaces, hyphens, and non-alphanumeric)
function normalize(str) {
    return (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

async function run() {
    const links = await getProductLinksFromSitemap();
    console.log(`Found ${links.length} potential products in sitemap.`);
    
    let targets = links;
    if (TARGET_SLUGS.length > 0) {
        const normalizedTargets = TARGET_SLUGS.map(normalize);
        
        targets = links.filter(link => {
            const urlParts = link.split('/');
            const slug = urlParts.pop();
            const category = urlParts.pop();
            
            const normSlug = normalize(slug);
            const normPath = normalize(category + slug);

            // Fuzzy matching: check if target is inside slug, or slug inside target
            return normalizedTargets.some(target => 
                (normSlug && target && (normSlug.includes(target) || target.includes(normSlug))) || 
                (normPath && target && normPath.includes(target))
            );
        });
    }
    
    console.log(`Matched ${targets.length} products to process.`);
    
    console.log(`Processing ${targets.length} products...`);

    for (const link of targets) {
        const data = await scrapeProduct(link);
        if (!data) continue;

        const imageAsset = await uploadImage(data.imageUrl);

        // Grouping by category (fingerprint, face, boombarrier, etc.)
        const categorySlug = data.category;
        const categoryTitle = data.category.charAt(0).toUpperCase() + data.category.slice(1).replace(/([A-Z])/g, ' $1') + ' Systems';

        let productDoc = await client.fetch(`*[_type == "product" && slug.current == $slug][0]`, { slug: categorySlug });

        const modelData = {
            _key: data.slug,
            modelName: data.name,
            image: imageAsset,
            specs: data.specs
        };

        if (productDoc) {
            console.log(`Updating category [${categoryTitle}] with model [${data.name}]`);
            
            // Filter out existing model if it exists to avoid duplicates
            const otherModels = (productDoc.models || []).filter(m => m.modelName !== data.name);
            const updatedModels = [...otherModels, modelData];

            await client.patch(productDoc._id)
                .set({ models: updatedModels })
                .commit();
        } else {
            console.log(`Creating new category [${categoryTitle}] with model [${data.name}]`);
            await client.create({
                _type: 'product',
                title: categoryTitle,
                slug: { _type: 'slug', current: categorySlug },
                description: `High-performance ${categoryTitle} for enterprise security.`,
                models: [modelData]
            });
        }
    }

    console.log('\n✅ Import complete! Check your Sanity Studio.');
}

run();
