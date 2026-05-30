export default {
  name: 'service',
  title: 'Services',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'icon', title: 'Icon (Lucide name)', type: 'string' },
    { name: 'image', title: 'Cover Image', type: 'image' },
    {
      name: 'introduction',
      title: 'Introduction',
      type: 'text',
      description: 'Short introductory paragraph displayed on the service detail page.',
    },
    {
      name: 'whatsIncluded',
      title: "What's Included",
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'includedItem',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
          ],
          preview: {
            select: { title: 'title', subtitle: 'description' },
          },
        },
      ],
    },
    {
      name: 'benefits',
      title: 'Key Benefits',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Short benefit statements shown as bullet points.',
    },
    {
      name: 'suitableFor',
      title: 'Suitable For',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Types of customers or locations this service is ideal for.',
    },
    {
      name: 'brands',
      title: 'Brands We Work With',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Optional – list of brand names relevant to this service.',
    },
    // Legacy field kept for backwards compat – maps to introduction if present
    { name: 'description', title: 'Description (legacy)', type: 'text' },
  ],
}
