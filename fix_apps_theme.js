const fs = require('fs');

const file = 'src/app/apps/page.js';

if (fs.existsSync(file)) {
  let content = fs.readFileSync(file, 'utf-8');
  
  // Remove the inline onclick handler and the style="opacity:1" that fix_theme.js added
  content = content.replace(/ style="opacity:1" onclick="[^"]*"/, ' style="opacity:0"');
  
  fs.writeFileSync(file, content);
  console.log('Removed conflicting inline onclick handler from apps/page.js');
}
