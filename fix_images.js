const fs = require('fs');

const files = ['src/app/page.js', 'src/app/apps/page.js'];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Find all src and srcSet attributes that use /_next/image?url=...
    // and decode the URL to point directly to https://www.mitchkoko.app
    
    content = content.replace(/(src|srcSet)="\/_next\/image\?url=([^&]+)(?:[^"]*)"/g, (match, attr, encodedUrl) => {
      const decodedUrl = decodeURIComponent(encodedUrl);
      return `${attr}="https://www.mitchkoko.app${decodedUrl}"`;
    });

    // Handle any remaining srcset that might have multiple URLs in them
    // It's easier to just strip the srcSet and use the direct src to avoid complex parsing
    content = content.replace(/srcSet="[^"]*"/g, '');

    fs.writeFileSync(file, content);
  }
});

console.log('Fixed image URLs!');
