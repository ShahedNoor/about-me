import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Shahed Noor - App Developer & Creator",
  description: "An indie creator's playbook.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var theme = localStorage.getItem('theme');
                if (theme === 'dark' || theme === 'light') {
                  document.documentElement.setAttribute('data-theme', theme);
                } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                } else {
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              } catch(e) {}
            })();
          `
        }} />
        <link rel="stylesheet" href="https://www.mitchkoko.app/_next/static/chunks/0la5g.~.qnhz6.css" />
        <link rel="stylesheet" href="https://www.mitchkoko.app/_next/static/chunks/0u~f_57sqscez.css" />
        <style dangerouslySetInnerHTML={{
          __html: `
            .site-nav-pill-theme, .theme-toggle {
              opacity: 1 !important;
              pointer-events: auto !important;
            }
          `
        }} />
      </head>
      <body className={inter.variable}>
        {children}
        <script dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('click', function(e) {
              const btn = e.target.closest('.site-nav-pill-theme, .theme-toggle');
              if (btn) {
                const html = document.documentElement;
                const current = html.getAttribute('data-theme');
                const newTheme = current === 'dark' ? 'light' : 'dark';
                html.setAttribute('data-theme', newTheme);
                try { localStorage.setItem('theme', newTheme); } catch(e) {}
              }
            });
          `
        }} />
      </body>
    </html>
  );
}
