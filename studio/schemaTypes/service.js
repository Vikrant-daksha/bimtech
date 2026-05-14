export default {
  name: 'service',
  title: 'Services',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'image', title: 'Image', type: 'image' },
    { name: 'icon', title: 'Icon (Lucide name)', type: 'string' },
  ],
}
