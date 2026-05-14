export default {
  name: 'amcPlan',
  title: 'AMC Plans',
  type: 'document',
  fields: [
    { name: 'name', title: 'Plan Name', type: 'string' },
    { name: 'price', title: 'Price', type: 'string' },
    { name: 'period', title: 'Period', type: 'string' },
    { name: 'features', title: 'Features', type: 'array', of: [{ type: 'string' }] },
    { name: 'isPopular', title: 'Is Popular', type: 'boolean' },
  ],
}
