const fs = require('fs');
const data = JSON.parse(fs.readFileSync('products_temp.json', 'utf8'));
const products = data.data;

console.log('Total products:', products.length);
console.log('Has more pages:', data.next_page_url !== null);

console.log('\n=== VISIBLE PRODUCT TITLES ===');
const visible = products.filter(p => p.visible);
console.log('Visible count:', visible.length);
visible.forEach(p => console.log('-', p.title));

console.log('\n=== ALL UNIQUE TAGS ===');
const tags = new Set();
products.forEach(p => (p.tags || []).forEach(t => tags.add(t)));
[...tags].sort().forEach(t => console.log(t));

console.log('\n=== SAMPLE PRODUCT IMAGES ===');
const sample = visible[0];
if (sample && sample.images) {
  console.log('Product:', sample.title);
  console.log('Images count:', sample.images.length);
  sample.images.slice(0, 3).forEach((img, i) => {
    console.log(`Image ${i + 1}:`, img.src ? img.src.substring(0, 80) + '...' : 'no src');
  });
}
