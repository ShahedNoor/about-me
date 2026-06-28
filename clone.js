const fs = require('fs');

const htmlContent = fs.readFileSync('C:\\Users\\noor\\.gemini\\antigravity-ide\\brain\\461b2eaf-a769-4952-8631-7129f798dbc7\\.system_generated\\steps\\5\\content.md', 'utf-8');

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
export default function Home() {
  return (
    <div dangerouslySetInnerHTML={{ __html: \`${bodyInner.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} />
  );
}
`;

fs.writeFileSync('src/app/page.js', pageJs);

// Extract CSS links from head
const headMatch = htmlContent.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
let headInner = headMatch ? headMatch[1] : '';
const cssLinks = [...headInner.matchAll(/<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/gi)]
  .map(match => match[1])
  .filter(href => href.endsWith('.css'));

const layoutJs = `
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Shahed Noor - App Developer & Creator",
  description: "An indie creator's playbook.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        ${cssLinks.map(link => `<link rel="stylesheet" href="https://www.mitchkoko.app${link}" />`).join('\n        ')}
      </head>
      <body className={inter.variable}>
        {children}
      </body>
    </html>
  );
}
`;

fs.writeFileSync('src/app/layout.js', layoutJs);

// Clear globals.css to avoid conflicts
fs.writeFileSync('src/app/globals.css', '');

console.log('Clone setup complete!');
