export default {
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Customer Name',
      type: 'string',
    },
    {
      name: 'role',
      title: 'Role / Designation',
      type: 'string',
      description: 'e.g. "Store Manager", "Office Owner", "Principal"',
    },
    {
      name: 'content',
      title: 'Review Text',
      type: 'text',
    },
    {
      name: 'rating',
      title: 'Rating (1–5)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
    },
    {
      name: 'image',
      title: 'Customer Photo (optional)',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'projectName',
      title: 'Project Name (optional)',
      type: 'string',
      description: 'Link this review to a specific project — e.g. "CCTV Setup – Nalasopara Office". Must match the Gallery project title exactly.',
    },
    {
      name: 'featured',
      title: 'Show on Homepage',
      type: 'boolean',
      description: 'Toggle ON to display this review in the homepage testimonials section (max 6 shown).',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'projectName',
      media: 'image',
    },
  },
}
