#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const CLEAN_CONTENT_REGEX = {
  comments: /\/\*[\s\S]*?\*\/|\/\/.*$/gm,
  templateLiterals: /`[\s\S]*?`/g,
  strings: /'[^']*'|"[^"]*"/g,
  jsxExpressions: /\{.*?\}/g,
  htmlEntities: {
    quot: /&quot;/g,
    amp: /&amp;/g,
    lt: /&lt;/g,
    gt: /&gt;/g,
    apos: /&apos;/g
  }
};

const EXTRACTION_REGEX = {
  route: /<Route\s+[^>]*>/g,
  path: /path=["']([^"']+)["']/,
  element: /element=\{<(\w+)[^}]*\/?\s*>\}/,
  helmet: /<Helmet[^>]*?>([\s\S]*?)<\/Helmet>/i,
  helmetTest: /<Helmet[\s\S]*?<\/Helmet>/i,
  title: /<title[^>]*?>\s*(.*?)\s*<\/title>/i,
  description: /<meta\s+name=["']description["']\s+content=["'](.*?)["']/i
};

function cleanContent(content) {
  return content
    .replace(CLEAN_CONTENT_REGEX.comments, '')
    .replace(CLEAN_CONTENT_REGEX.templateLiterals, '""')
    .replace(CLEAN_CONTENT_REGEX.strings, '""');
}

function cleanText(text) {
  if (!text) return text;
  
  return text
    .replace(CLEAN_CONTENT_REGEX.jsxExpressions, '')
    .replace(CLEAN_CONTENT_REGEX.htmlEntities.quot, '"')
    .replace(CLEAN_CONTENT_REGEX.htmlEntities.amp, '&')
    .replace(CLEAN_CONTENT_REGEX.htmlEntities.lt, '<')
    .replace(CLEAN_CONTENT_REGEX.htmlEntities.gt, '>')
    .replace(CLEAN_CONTENT_REGEX.htmlEntities.apos, "'")
    .trim();
}

function extractRoutes(appJsxPath) {
  if (!fs.existsSync(appJsxPath)) return new Map();

  try {
    const content = fs.readFileSync(appJsxPath, 'utf8');
    const routes = new Map();
    const routeMatches = [...content.matchAll(EXTRACTION_REGEX.route)];
    
    for (const match of routeMatches) {
      const routeTag = match[0];
      const pathMatch = routeTag.match(EXTRACTION_REGEX.path);
      const elementMatch = routeTag.match(EXTRACTION_REGEX.element);
      const isIndex = routeTag.includes('index');
      
      if (elementMatch) {
        const componentName = elementMatch[1];
        let routePath;
        
        if (isIndex) {
          routePath = '/';
        } else if (pathMatch) {
          routePath = pathMatch[1].startsWith('/') ? pathMatch[1] : `/${pathMatch[1]}`;
        }
        
        routes.set(componentName, routePath);
      }
    }

    return routes;
  } catch (error) {
    return new Map();
  }
}

function findReactFiles(dir) {
  return fs.readdirSync(dir).map(item => path.join(dir, item));
}

function extractHelmetData(content, filePath, routes) {
  const cleanedContent = cleanContent(content);
  
  if (!EXTRACTION_REGEX.helmetTest.test(cleanedContent)) {
    return null;
  }
  
  const helmetMatch = content.match(EXTRACTION_REGEX.helmet);
  if (!helmetMatch) return null;
  
  const helmetContent = helmetMatch[1];
  const titleMatch = helmetContent.match(EXTRACTION_REGEX.title);
  const descMatch = helmetContent.match(EXTRACTION_REGEX.description);
  
  const title = cleanText(titleMatch?.[1]);
  const description = cleanText(descMatch?.[1]);
  
  const fileName = path.basename(filePath, path.extname(filePath));
  const url = routes && routes.has && routes.has(fileName) 
    ? routes.get(fileName) 
    : generateFallbackUrl(fileName);
  
  return {
    url,
    title: title || 'Untitled Page',
    description: description || 'No description available'
  };
}

function generateFallbackUrl(fileName) {
  const cleanName = fileName.replace(/Page$/, '').toLowerCase();
  return cleanName === 'app' ? '/' : `/${cleanName}`;
}

async function loadArticlesData() {
  const articlesPath = path.join(process.cwd(), 'src', 'data', 'articles.js');
  
  if (!fs.existsSync(articlesPath)) {
    return [];
  }
  
  try {
    const articlesContent = fs.readFileSync(articlesPath, 'utf8');
    // Extract the articles array using regex
    const articlesMatch = articlesContent.match(/export const articles = (\[[\s\S]*?\]);/);
    
    if (articlesMatch) {
      // Parse the articles data
      const articlesStr = articlesMatch[1];
      // This is a simplified parser - in a real implementation you might want to use a proper JS parser
      // For now, let's extract the basic info we need
      const articleMatches = [...articlesStr.matchAll(/\{\s*slug:\s*["']([^"']+)["'],[\s\S]*?title:\s*["']([^"']*?)["'],[\s\S]*?subtitle:\s*["']([^"']*?)["'],[\s\S]*?summary:\s*["']([^"']*?)["']/g)];
      
      return articleMatches.map(match => ({
        slug: match[1],
        title: match[2],
        subtitle: match[3],
        summary: match[4],
        url: `/article/${match[1]}`
      }));
    }
  } catch (error) {
    console.error('Error loading articles data:', error.message);
  }
  
  return [];
}

function generateLlmsTxt(pages, articles) {
  let content = `# The Serpent's Sentence - Website Content for LLM Parsing

This file provides a structured overview of the website content to aid language models in understanding and parsing the site.

## Site Overview
The Serpent's Sentence is a philosophical exploration of consciousness, language, and artificial intelligence by Justin T. Bogner. The site features a book and collection of articles examining how language shapes consciousness and the implications for AI development.

## Main Pages\n`;

  // Add main pages
  const sortedPages = pages.sort((a, b) => a.title.localeCompare(b.title));
  for (const page of sortedPages) {
    content += `- [${page.title}](${page.url}): ${page.description}\n`;
  }

  // Add articles section
  if (articles.length > 0) {
    content += `\n## Articles\nPhilosophical deep dives into consciousness, language, and AI:\n\n`;
    
    for (const article of articles) {
      content += `### [${article.title}](${article.url})\n`;
      content += `${article.subtitle}\n\n`;
      content += `${article.summary}\n\n`;
      content += `---\n\n`;
    }
  }

  content += `## Key Themes
- Consciousness and awareness
- The neuroscience of the Default Mode Network
- Language acquisition and symbolic thought
- The intersection of ancient wisdom and modern neuroscience
- Artificial intelligence and the future of human consciousness
- The nature of the self and the "narrator" voice
- Contemplative practices and witness consciousness

## Author
Justin T. Bogner is a researcher at the intersection of consciousness studies, neuroscience, and artificial intelligence, bringing together insights from cognitive science, philosophy of mind, and contemplative traditions.
`;

  return content;
}

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function processPageFile(filePath, routes) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return extractHelmetData(content, filePath, routes);
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🚀 Generating llms.txt...');
  
  const pagesDir = path.join(process.cwd(), 'src', 'pages');
  const appJsxPath = path.join(process.cwd(), 'src', 'App.jsx');

  let pages = [];
  
  if (!fs.existsSync(pagesDir)) {
    const appPage = processPageFile(appJsxPath, new Map());
    if (appPage) pages.push(appPage);
  } else {
    const routes = extractRoutes(appJsxPath);
    const reactFiles = findReactFiles(pagesDir);

    pages = reactFiles
      .map(filePath => processPageFile(filePath, routes))
      .filter(Boolean);
  }

  // Load articles data
  const articles = await loadArticlesData();
  console.log(`📚 Found ${articles.length} articles`);
  console.log(`📄 Found ${pages.length} pages`);

  const llmsTxtContent = generateLlmsTxt(pages, articles);
  const outputPath = path.join(process.cwd(), 'public', 'llms.txt');
  
  ensureDirectoryExists(path.dirname(outputPath));
  fs.writeFileSync(outputPath, llmsTxtContent, 'utf8');
  
  console.log('✅ llms.txt generated successfully!');
}

const isMainModule = import.meta.url === `file://${process.argv[1]}`;

if (isMainModule) {
  main();
}
