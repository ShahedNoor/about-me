const fs = require('fs');

const filesToFix = ['src/app/page.js', 'src/app/apps/page.js'];

filesToFix.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf-8');
    // Find the theme button and remove opacity:0, add an onclick handler
    content = content.replace(
      /class="site-nav-pill-theme" style="opacity:0"/g,
      'class="site-nav-pill-theme" style="opacity:1" onclick="document.documentElement.setAttribute(\'data-theme\', document.documentElement.getAttribute(\'data-theme\') === \'dark\' ? \'light\' : \'dark\')"'
    );
    fs.writeFileSync(file, content);
  }
});

console.log('Fixed theme button opacity and added toggle functionality!');
