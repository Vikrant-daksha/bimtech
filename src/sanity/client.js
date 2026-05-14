import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: '2024-03-14',
  token: import.meta.env.VITE_SANITY_TOKEN, // Use the key from .env
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
