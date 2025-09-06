#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import articles data (reusing logic from generate-llms-improved.js)
function extractFieldValue(text, fieldName) {
  const patterns = [
    new RegExp(`${fieldName}:\\s*"([^"]*(?:\\\\.[^"]*)*)"`, 'g'),
    new RegExp(`${fieldName}:\\s*'([^']*(?:\\\\.[^']*)*)'`, 'g')
  ];
  
  for (const pattern of patterns) {
    const match = pattern.exec(text);
    if (match) {
      return match[1]
        .replace(/\\'/g, "'")
        .replace(/\\"/g, '"')
        .replace(/\\n/g, '\n')
        .trim();
    }
  }
  
  return null;
}

async function loadArticlesData() {
  try {
    const articlesPath = path.resolve(__dirname, '../src/data/articles.js');
    const content = fs.readFileSync(articlesPath, 'utf8');
    
    const matches = content.match(/\{\s*slug:[\s\S]*?contentModule:[\s\S]*?\}/g);
    
    if (!matches) {
      return [];
    }
    
    const articleObjects = [];
    
    for (const match of matches) {
      try {
        const slug = extractFieldValue(match, 'slug');
        const title = extractFieldValue(match, 'title');
        
        if (slug && title) {
          articleObjects.push({
            slug,
            title,
            url: `/article/${slug}`,
            lastmod: new Date().toISOString().split('T')[0] // Current date as last modified
          });
        }
      } catch (err) {
        console.error('Error parsing article:', err.message);
      }
    }
    
    return articleObjects;
  } catch (error) {
    console.error('Error loading articles:', error.message);
    return [];
  }
}

function generateSitemap(articles) {
  const baseUrl = 'https://jbogner1618.github.io/The_Serpents_Sentence_Website'; // Updated to match repository name
  const currentDate = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>`;

  // Add article URLs
  for (const article of articles) {
    sitemap += `
  <url>
    <loc>${baseUrl}${article.url}</loc>
    <lastmod>${article.lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }

  sitemap += `
</urlset>`;

  return sitemap;
}

function generateRobotsTxt() {
  const baseUrl = 'https://jbogner1618.github.io/The_Serpents_Sentence_Website'; // Updated to match repository name
  
  return `User-agent: *
Allow: /

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Allow LLM-specific file
Allow: /llms.txt

# Disallow build artifacts and source files
Disallow: /assets/
Disallow: /*.js
Disallow: /*.css
Disallow: /*.map

# Allow CSS and JS that are part of the built app
Allow: /assets/*.css
Allow: /assets/*.js
`;
}

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

async function main() {
  console.log('🚀 Generating SEO files...');
  
  const articles = await loadArticlesData();
  console.log(`📚 Found ${articles.length} articles for sitemap`);

  // Generate sitemap.xml
  const sitemapContent = generateSitemap(articles);
  const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');
  ensureDirectoryExists(path.dirname(sitemapPath));
  fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
  console.log('✅ sitemap.xml generated');

  // Generate robots.txt
  const robotsContent = generateRobotsTxt();
  const robotsPath = path.resolve(__dirname, '../public/robots.txt');
  fs.writeFileSync(robotsPath, robotsContent, 'utf8');
  console.log('✅ robots.txt generated');
  
  console.log('🎉 All SEO files generated successfully!');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}