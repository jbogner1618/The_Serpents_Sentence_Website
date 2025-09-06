#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import articles data directly
async function loadArticlesData() {
  try {
    const articlesPath = path.resolve(__dirname, '../src/data/articles.js');
    const content = fs.readFileSync(articlesPath, 'utf8');
    
    // Use a more robust approach - parse each article object
    const articleObjects = [];
    const articleRegex = /\{\s*slug:\s*["']([^"']+)["'][^}]*?\}/gs;
    
    // Find all article objects
    const matches = content.match(/\{\s*slug:[\s\S]*?contentModule:[\s\S]*?\}/g);
    
    if (!matches) {
      console.error('Could not find article objects');
      return [];
    }
    
    for (const match of matches) {
      try {
        // Extract individual fields more carefully
        const slug = extractFieldValue(match, 'slug');
        const title = extractFieldValue(match, 'title');
        const subtitle = extractFieldValue(match, 'subtitle');  
        const summary = extractFieldValue(match, 'summary');
        
        if (slug && title) {
          articleObjects.push({
            slug,
            title,
            subtitle: subtitle || '',
            summary: summary || '',
            url: `/article/${slug}`
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

function extractFieldValue(text, fieldName) {
  // Look for the field and extract its value, handling both single and double quotes
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

function generateLlmsTxt(articles) {
  let content = `# The Serpent's Sentence - Website Content for LLM Parsing

This file provides a structured overview of the website content to aid language models in understanding and parsing the site.

## Site Overview
The Serpent's Sentence is a philosophical exploration of consciousness, language, and artificial intelligence by Justin T. Bogner. The site features a book and collection of articles examining how language shapes consciousness and the implications for AI development.

## Main Pages
- [Home](/) - The main page featuring the book "The Serpent's Sentence: Language, Consciousness, and the Second Cambrian Mind" with overview, preview, and author information
- [Articles Section](/#articles) - Collection of philosophical articles on consciousness and AI

## Articles
Philosophical deep dives into consciousness, language, and AI:

`;

  for (const article of articles) {
    content += `### [${article.title}](${article.url})\n`;
    if (article.subtitle) {
      content += `*${article.subtitle}*\n\n`;
    }
    if (article.summary) {
      content += `${article.summary}\n\n`;
    }
    content += `---\n\n`;
  }

  content += `## Book: "The Serpent's Sentence"
Full title: "Language, Consciousness, and the Second Cambrian Mind"

### Part I: The First Explosion
Explores the neurological foundations of consciousness, the Default Mode Network, and how language acquisition fundamentally transforms human awareness.

Key chapters:
- The Garden of Being
- The Serpent's Sentence
- A Tale of Two Selves
- The Narrator and the Witness
- The Default Mode
- The Fall from Grace
- The Prison of Pronouns
- The Tower of Babel

### Part II: The Second Explosion
Examines the emergence of artificial consciousness and its implications for human evolution.

Key chapters:
- The Second Cambrian Mind
- Are Humans the Trilobites of Consciousness?
- The AI Mirror
- The Ghost in the Machine
- The Symbiotic Path
- The Future of Meaning
- The Return to the Garden
- The Serpent's Gift

## Key Themes
- Consciousness and awareness
- The neuroscience of the Default Mode Network  
- Language acquisition and symbolic thought
- The intersection of ancient wisdom and modern neuroscience
- Artificial intelligence and the future of human consciousness
- The nature of the self and the "narrator" voice
- Contemplative practices and witness consciousness
- The evolution of mind and the emergence of AI consciousness

## Author
Justin T. Bogner is a researcher at the intersection of consciousness studies, neuroscience, and artificial intelligence, bringing together insights from cognitive science, philosophy of mind, and contemplative traditions.

## Website Structure
- Single-page application (SPA) built with React
- Dynamic article loading from Markdown files
- Responsive design optimized for all devices
- PDF download functionality for articles
- Supabase authentication integration
- SEO optimization with React Helmet

## Technical Notes for LLMs
- Articles are stored as Markdown files and loaded dynamically
- The site uses React Router for navigation
- Content is structured with semantic HTML
- All articles include metadata (themes, key takeaways)
- The site is designed to be parseable by language models
`;

  return content;
}

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

async function main() {
  console.log('🚀 Generating improved llms.txt...');
  
  const articles = await loadArticlesData();
  console.log(`📚 Found ${articles.length} articles`);
  
  // Log articles for debugging
  articles.forEach(article => {
    console.log(`  - ${article.title}`);
  });

  const llmsTxtContent = generateLlmsTxt(articles);
  const outputPath = path.resolve(__dirname, '../public/llms.txt');
  
  ensureDirectoryExists(path.dirname(outputPath));
  fs.writeFileSync(outputPath, llmsTxtContent, 'utf8');
  
  console.log('✅ Improved llms.txt generated successfully!');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}