// 📚 現代化文章系統 - 支援無限擴展
// ===================================

// 🏷️ 文章分類系統
const ARTICLE_CATEGORIES = {
  'development': {
    name: 'Development',
    color: '#22C55E',
    icon: '🔧',
    description: 'Technical insights and coding adventures'
  },
  'life-exploration': {
    name: 'Life Exploration',
    color: '#F59E0B',
    icon: '🌟',
    description: 'Personal growth and life discoveries'
  },
  'humanity': {
    name: 'Humanity',
    color: '#EF4444',
    icon: '❤️',
    description: 'Human experiences and social insights'
  },
  'product-management': {
    name: 'Product Management',
    color: '#8B5CF6',
    icon: '📊',
    description: 'Strategy, leadership, and product thinking'
  }
};

// 📝 範例文章數據（未來可從 API 或 CMS 載入）
const SAMPLE_ARTICLES = [
  {
    id: 'dev-modern-css-2025',
    title: 'Modern CSS Techniques That Will Change Your Development Workflow',
    slug: 'modern-css-techniques-2025',
    excerpt: 'Exploring cutting-edge CSS features like container queries, cascade layers, and the upcoming features that are reshaping how we style the web.',
    content: `
# Modern CSS Techniques That Will Change Your Development Workflow

In 2025, CSS has evolved far beyond simple styling. Today's CSS is a powerful language that enables complex layouts, dynamic interactions, and responsive designs that were previously impossible without JavaScript.

## Container Queries: The Game Changer

Container queries represent perhaps the biggest shift in responsive design since media queries were introduced. Unlike media queries that respond to viewport size, container queries respond to the size of a containing element.

\`\`\`css
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
\`\`\`

This allows components to be truly modular and responsive regardless of their context in the page.

## Cascade Layers: Organizing CSS at Scale

Cascade layers provide a new way to organize CSS that makes large codebases more maintainable:

\`\`\`css
@layer base, components, utilities;

@layer base {
  body { font-family: system-ui; }
}

@layer components {
  .btn { 
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
  }
}
\`\`\`

## The Future is Bright

With features like style queries, anchor positioning, and enhanced color functions, CSS continues to evolve rapidly. The key is to stay curious and experiment with these new capabilities.

*What CSS feature are you most excited about? Let me know on social media!*
    `,
    category: 'development',
    tags: ['CSS', 'Web Development', 'Frontend', 'Responsive Design'],
    publishDate: '2025-01-15',
    readTime: 8,
    author: 'Ray',
    featured: true,
    image: './assets/images/articles/modern-css.jpg'
  },
  {
    id: 'pm-user-centered-design',
    title: 'Building Products That Users Actually Want: A Human-Centered Approach',
    slug: 'building-products-users-want',
    excerpt: 'How shifting from feature-driven to user-centered design transformed our product success rate and created more meaningful user experiences.',
    content: `
# Building Products That Users Actually Want: A Human-Centered Approach

Product management isn't about building features—it's about solving problems. This fundamental shift in perspective has transformed how I approach product development and dramatically improved user satisfaction.

## The Feature Trap

Many product teams fall into what I call "the feature trap." They focus on adding more functionality without understanding whether users actually need or want these features.

> "The best products are not those with the most features, but those that solve real problems elegantly."

## The Human-Centered Framework

Here's the framework I use to ensure we're building the right things:

### 1. Discover the Real Problem
- Conduct user interviews (not surveys)
- Observe actual behavior, not reported behavior  
- Look for gaps between what users say and do

### 2. Define Success Metrics
- Focus on user outcomes, not feature adoption
- Measure problem resolution, not feature usage
- Track behavioral changes, not engagement metrics

### 3. Design for Humans, Not Users
- Consider emotional context
- Account for cognitive load
- Design for edge cases and stress scenarios

## Case Study: The Notification Redesign

We had a notification system with 15+ different notification types. Usage data showed high engagement, but user interviews revealed frustration and notification fatigue.

Instead of adding more customization options (the feature trap), we:
- Consolidated notifications into 3 meaningful categories
- Used progressive disclosure for details
- Added smart bundling based on user behavior

Result: 40% reduction in notification dismissals and 60% increase in meaningful actions taken.

## Key Takeaways

1. **Listen more than you speak** in user research
2. **Measure what matters** to users, not your team
3. **Simplify before you expand** - remove before you add
4. **Design for scenarios**, not just features

Product management is ultimately about empathy scaled through technology.
    `,
    category: 'product-management',
    tags: ['Product Management', 'UX', 'User Research', 'Strategy'],
    publishDate: '2025-01-10',
    readTime: 6,
    author: 'Ray',
    featured: true,
    image: './assets/images/articles/user-centered-design.jpg'
  },
  {
    id: 'life-digital-minimalism',
    title: 'Digital Minimalism in an AI-Driven World',
    slug: 'digital-minimalism-ai-world',
    excerpt: 'Finding balance between embracing technological progress and maintaining human agency in our increasingly connected lives.',
    content: `
# Digital Minimalism in an AI-Driven World

As AI becomes more integrated into our daily lives, the principles of digital minimalism become more important than ever. How do we embrace helpful technology while maintaining our autonomy and attention?

## The New Digital Landscape

AI tools promise to make us more productive, creative, and informed. But they also introduce new forms of digital dependency and attention fragmentation.

## Principles for Mindful AI Use

### 1. Intentional Adoption
Don't adopt AI tools just because they exist. Ask:
- Does this solve a real problem I have?
- Does this align with my values and goals?
- What am I trading for this convenience?

### 2. Maintained Agency
- Understand what the AI is doing
- Keep the ability to work without it
- Make deliberate choices about when to use it

### 3. Quality Over Quantity
- Choose fewer, better tools
- Focus on tools that amplify your strengths
- Avoid tools that replace your thinking

## My Personal AI Toolkit

I've settled on three AI tools that add genuine value:
- **Writing assistant** for grammar and clarity (not ideas)
- **Research summarizer** for information synthesis
- **Code completion** for routine programming tasks

Each tool serves a specific purpose and enhances rather than replaces human capability.

## The Human Element

Technology should make us more human, not less. The goal isn't to optimize every aspect of life, but to create space for what matters most: relationships, creativity, and personal growth.

*What's your approach to balancing AI tools with human agency?*
    `,
    category: 'life-exploration',
    tags: ['Digital Minimalism', 'AI', 'Technology', 'Mindfulness'],
    publishDate: '2025-01-05',
    readTime: 5,
    author: 'Ray',
    featured: false,
    image: './assets/images/articles/digital-minimalism.jpg'
  }
];

// 🎨 文章卡片渲染器
class ArticleCard {
  constructor(article) {
    this.article = article;
  }

  render() {
    const category = ARTICLE_CATEGORIES[this.article.category];
    const featuredClass = this.article.featured ? 'featured' : '';
    const tagsHtml = this.article.tags
      .slice(0, 3)
      .map(tag => `<span class="article-tag">${tag}</span>`)
      .join('');

    return `
      <article class="note-card ${featuredClass}" data-article-id="${this.article.id}">
        ${this.article.image ? `
          <div class="note-image">
            <img src="${this.article.image}" alt="${this.article.title}" loading="lazy" />
          </div>
        ` : ''}
        
        <div class="note-content">
          <div class="note-meta">
            <span class="note-category" style="--category-color: ${category.color}">
              ${category.icon} ${category.name}
            </span>
            <span class="note-date">${this.formatDate(this.article.publishDate)}</span>
            <span class="read-time">${this.article.readTime} min read</span>
          </div>
          
          <h3 class="note-title">${this.article.title}</h3>
          <p class="note-description">${this.article.excerpt}</p>
          
          <div class="note-footer">
            <div class="article-tags">
              ${tagsHtml}
            </div>
            <button class="read-more-btn" data-article-id="${this.article.id}">
              Read Article
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </article>
    `;
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }
}

// 📱 響應式網格系統
class ResponsiveGrid {
  constructor(container) {
    this.container = container;
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
    this.render();
  }

  addItems(items) {
    this.items.push(...items);
    this.render();
  }

  clear() {
    this.items = [];
    this.container.innerHTML = '';
  }

  filter(predicate) {
    const filteredItems = this.items.filter(predicate);
    this.renderItems(filteredItems);
  }

  render() {
    this.renderItems(this.items);
  }

  renderItems(items) {
    this.container.innerHTML = items
      .map(item => item.render())
      .join('');
    
    this.attachEventListeners();
  }

  attachEventListeners() {
    // 文章點擊事件
    this.container.querySelectorAll('.read-more-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const articleId = e.target.closest('[data-article-id]').dataset.articleId;
        this.openArticle(articleId);
      });
    });

    // 卡片懸停效果
    this.container.querySelectorAll('.note-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
      });
    });
  }

  openArticle(articleId) {
    const article = SAMPLE_ARTICLES.find(a => a.id === articleId);
    if (article) {
      // 使用路由系統導航到文章詳情頁
      window.location.hash = `#/notes/${article.slug}`;
    }
  }
}

// 🔍 智能搜索和過濾系統
class ArticleFilter {
  constructor(articles, onUpdate) {
    this.articles = articles;
    this.onUpdate = onUpdate;
    this.currentCategory = 'all';
    this.currentSearch = '';
  }

  setCategory(category) {
    this.currentCategory = category;
    this.applyFilters();
  }

  setSearch(query) {
    this.currentSearch = query.toLowerCase();
    this.applyFilters();
  }

  applyFilters() {
    let filtered = this.articles;

    // 分類過濾
    if (this.currentCategory !== 'all') {
      filtered = filtered.filter(article => 
        article.category === this.currentCategory
      );
    }

    // 搜索過濾
    if (this.currentSearch) {
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(this.currentSearch) ||
        article.excerpt.toLowerCase().includes(this.currentSearch) ||
        article.tags.some(tag => 
          tag.toLowerCase().includes(this.currentSearch)
        )
      );
    }

    this.onUpdate(filtered);
  }

  getStats() {
    const stats = {
      total: this.articles.length,
      categories: {}
    };

    Object.keys(ARTICLE_CATEGORIES).forEach(cat => {
      stats.categories[cat] = this.articles.filter(a => a.category === cat).length;
    });

    return stats;
  }
}

// 🎯 文章詳情頁面渲染器
class ArticlePage {
  constructor(article) {
    this.article = article;
  }

  render() {
    const category = ARTICLE_CATEGORIES[this.article.category];
    const tagsHtml = this.article.tags
      .map(tag => `<span class="article-tag-detail">${tag}</span>`)
      .join('');

    return `
      <article class="article-page">
        <div class="article-header">
          <nav class="article-breadcrumb">
            <a href="#/notes" class="breadcrumb-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5"></path>
                <path d="m12 19-7-7 7-7"></path>
              </svg>
              Back to Notes
            </a>
          </nav>
          
          <div class="article-meta-header">
            <span class="article-category-badge" style="--category-color: ${category.color}">
              ${category.icon} ${category.name}
            </span>
            <time class="article-date">${this.formatDate(this.article.publishDate)}</time>
            <span class="article-read-time">${this.article.readTime} min read</span>
          </div>
          
          <h1 class="article-title">${this.article.title}</h1>
          
          <div class="article-tags-container">
            ${tagsHtml}
          </div>
        </div>
        
        ${this.article.image ? `
          <div class="article-hero-image">
            <img src="${this.article.image}" alt="${this.article.title}" />
          </div>
        ` : ''}
        
        <div class="article-content">
          ${this.parseMarkdown(this.article.content)}
        </div>
        
        <footer class="article-footer">
          <div class="article-author">
            <div class="author-info">
              <strong>Written by ${this.article.author}</strong>
              <p>Product Manager & Frontend Engineer passionate about creating meaningful digital experiences.</p>
            </div>
          </div>
          
          <nav class="article-navigation">
            <a href="#/notes" class="nav-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5"></path>
                <path d="m12 19-7-7 7-7"></path>
              </svg>
              All Articles
            </a>
          </nav>
        </footer>
      </article>
    `;
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  // 簡單的 Markdown 解析器
  parseMarkdown(content) {
    return content
      // 標題
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      
      // 程式碼區塊
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      
      // 引用
      .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
      
      // 粗體和斜體
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      
      // 段落
      .split('\n\n')
      .map(paragraph => paragraph.trim())
      .filter(paragraph => paragraph)
      .map(paragraph => {
        if (paragraph.startsWith('<h') || 
            paragraph.startsWith('<pre') || 
            paragraph.startsWith('<blockquote')) {
          return paragraph;
        }
        return `<p>${paragraph}</p>`;
      })
      .join('\n');
  }
}

// 🚀 導出模組
window.ArticleSystem = {
  ArticleCard,
  ResponsiveGrid,
  ArticleFilter,
  ArticlePage,
  SAMPLE_ARTICLES,
  ARTICLE_CATEGORIES
};