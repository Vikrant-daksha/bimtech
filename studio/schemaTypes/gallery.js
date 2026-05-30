export default {
  name: 'gallery',
  title: 'Projects (Gallery)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      description: 'Name of the project (e.g. "CCTV Setup – Nalasopara Office")',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      description: 'Auto-generated URL identifier. Click "Generate" after entering the title.',
    },
    {
      name: 'description',
      title: 'Project Description',
      type: 'text',
      description: 'Brief description of what was done, where, and what equipment was installed.',
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      description: 'The main thumbnail shown on the gallery grid.',
    },
    {
      name: 'images',
      title: 'Project Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              title: 'Caption (optional)',
              type: 'string',
            },
          ],
        },
      ],
      description: 'Upload all photos for this project. They will appear in a gallery on the project detail page.',
    },
    {
      name: 'serviceType',
      title: 'Service Type',
      type: 'string',
      description: 'e.g. CCTV, Networking, Intercom — used for filtering.',
      options: {
        list: [
          { title: 'CCTV Installation', value: 'CCTV Installation' },
          { title: 'Boom Barrier System', value: 'Boom Barrier System' },
          { title: 'Interactive Panel', value: 'Interactive Panel' },
          { title: 'Digital Signage', value: 'Digital Signage' },
          { title: 'Intercom System', value: 'Intercom System' },
          { title: 'Attendance System', value: 'Attendance System' },
          { title: 'Networking Solutions', value: 'Networking Solutions' },
          { title: 'Computer & Laptop Services', value: 'Computer & Laptop Services' },
          { title: 'AMC Services', value: 'AMC Services' },
        ],
      },
    },
    {
      name: 'completedAt',
      title: 'Completion Date',
      type: 'date',
      description: 'When was this project completed?',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'serviceType',
      media: 'coverImage',
    },
  },
}
