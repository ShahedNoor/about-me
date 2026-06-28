const fs = require('fs');

const htmlContent = fs.readFileSync('C:\\Users\\noor\\.gemini\\antigravity-ide\\brain\\461b2eaf-a769-4952-8631-7129f798dbc7\\.system_generated\\steps\\96\\content.md', 'utf-8');

// Extract body inner HTML
const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
let bodyInner = bodyMatch ? bodyMatch[1] : '';

// Replace some strings: Mitch Koko -> Shahed Noor
bodyInner = bodyInner.replace(/Mitch Koko/g, 'Shahed Noor');
bodyInner = bodyInner.replace(/mitchkoko\.app/g, 'shahednoor.netlify.app');
bodyInner = bodyInner.replace(/mitchkoko/g, 'shahednoor');
// Removing scripts to avoid Next.js hydration mismatch or execution issues
bodyInner = bodyInner.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
// Removing hidden next.js elements
bodyInner = bodyInner.replace(/<div hidden="">.*?<\/div>/, '');

const pageJs = `
export default function Apps() {
  return (
    <div dangerouslySetInnerHTML={{ __html: \`${bodyInner.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} />
  );
}
`;

// Create apps directory if it doesn't exist
if (!fs.existsSync('src/app/apps')) {
  fs.mkdirSync('src/app/apps', { recursive: true });
}

fs.writeFileSync('src/app/apps/page.js', pageJs);

console.log('Apps Clone setup complete!');
