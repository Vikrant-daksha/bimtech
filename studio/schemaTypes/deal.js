export default {
  name: 'deal',
  title: 'Special Deals',
  type: 'document',
  fields: [
    { name: 'title', title: 'Deal Title', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'icon', title: 'Icon (Lucide name)', type: 'string' },
    { name: 'color', title: 'Color (Tailwind color name)', type: 'string' },
  ],
}
