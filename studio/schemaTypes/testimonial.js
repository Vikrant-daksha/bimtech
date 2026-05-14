export default {
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    { name: 'name', title: 'Customer Name', type: 'string' },
    { name: 'role', title: 'Role', type: 'string' },
    { name: 'content', title: 'Content', type: 'text' },
    { name: 'rating', title: 'Rating', type: 'number' },
    { name: 'image', title: 'Customer Image', type: 'image' },
  ],
}
