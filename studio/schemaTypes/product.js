export default {
  name: 'product',
  title: 'Products',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Product Category Name',
      type: 'string',
      description: 'e.g., Laptops, Printers, etc.'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' }
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text'
    },
    {
      name: 'models',
      title: 'Models',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'model',
          title: 'Model',
          fields: [
            {
              name: 'modelName',
              title: 'Model Name',
              type: 'string',
              description: 'e.g., Dell XPS 13, HP Pavilion'
            },
            {
              name: 'image',
              title: 'Model Image',
              type: 'image',
              options: { hotspot: true }
            },
            {
              name: 'specs',
              title: 'Technical Specifications',
              type: 'array',
              description: 'Add specifications as key-value pairs for easy comparison.',
              of: [
                {
                  type: 'object',
                  name: 'specItem',
                  fields: [
                    { 
                      name: 'label', 
                      title: 'Feature Name', 
                      type: 'string', 
                      description: 'e.g., Processor, RAM, Warranty' 
                    },
                    { 
                      name: 'value', 
                      title: 'Value', 
                      type: 'string', 
                      description: 'e.g., Intel i7, 16GB, 1 Year' 
                    }
                  ],
                  preview: {
                    select: {
                      title: 'label',
                      subtitle: 'value'
                    }
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
