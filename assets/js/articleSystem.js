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
  },
  'ai-development': {
    name: 'AI Development',
    color: '#06B6D4',
    icon: '🤖',
    description: 'AI-assisted development and workflow optimization'
  }
};

// 📝 範例文章數據（未來可從 API 或 CMS 載入）
const SAMPLE_ARTICLES = [
  {
    id: 'ai-led-development-turning-point',
    title: 'Why Letting an AI Agent Lead My Development Process Became a Turning Point',
    slug: 'ai-led-development-turning-point',
    excerpt: 'Documenting how I used Copilot AI (paired with Claude Sonnet 4) to lead the development of my personal website, and how this fundamentally shifted my approach to product development.',
    content: `
# Why Letting an AI Agent Lead My Development Process Became a Turning Point

In this article, I want to document how I used Copilot AI (paired with the Claude Sonnet 4 model) to lead the development of my personal website.

The entire development flow, along with my observations, experiments, and iterations with AI, is written into the project's <a href="https://github.com/oorongtee/personalWebsite" target="_blank" style="color: #D97706; text-decoration: underline;">GitHub</a> README.

## My Core Assumption

In a real corporate environment, we should be able to confidently hand over large parts of our workflows and code implementation to AI — not just use it as a minor helper.

During the development process, I continuously ran AI system tests, optimized the project, and read a series of articles by <a href="https://medium.com/@simon3458" target="_blank" style="color: #D97706; text-decoration: underline;">Simon Liu</a>. His perspectives on AI Agent development have deeply influenced how I think about and design my workflow.

---

## Why this AI-Agent-led development approach is a turning point for me

### 1. A fundamental shift in how development is done

Traditionally, the pattern is: **humans lead development, AI occasionally assists**.

In this project, I deliberately flipped that dynamic:
- **AI leads the development process and code implementation**
- **I step in as a supervisor and decision-maker**, adjusting direction and validating outcomes

### 2. Integrating my dual identity as PM and engineer

As a product manager, I've always had to:
- Write feature specs
- Design business logic
- Think through UX
- Then hand all of that off to engineers

Now, with the help of an AI agent, I can:
- **Start from product and feature requirements**
- **Ask AI to generate tests and implementation directly**
- **Gradually feed my thinking and background context into the system**
- **Let AI handle much of the code implementation and initial verification**

This lets me stay focused on product strategy, brand, and visual design, while also being able to ship real code instead of just writing requirement documents.

### 3. A role shift: from prompt engineer to context engineer

My role is shifting from "someone who writes clever prompts" to **"someone who designs and maintains the right context."**

In this setup:
- **What I provide** is product vision, goals, UX rationale, constraints, and priorities
- **AI generates** code and tests based on that context
- **The engineering team** can focus more on core business logic and optimization, instead of grinding through repetitive low-level coding

### 4. A concrete way to work across multiple domains at once

This way of working finally lets me truly do the following at the same time:
- **Ideate new features**
- **Think through UX and user flows**
- **Shape the brand and visual identity**

And then have all of that translated into executable code very quickly.

AI carries most of the implementation workload, while I supervise, review, and steer it to stay aligned with the product direction.

---

## Reflections and observations

### 1. Reliability and risk

Even if AI can write a large portion of the code, **I still need to continuously review, test, and validate**.

AI is not "automatically correct," and I should never fully let go of human oversight.

### 2. Beyond prompts: the importance of context

What truly determines the quality of AI output is **the context I provide**:
- Product vision
- Feature goals
- User scenarios
- UX principles and constraints

The clearer and more structured the context, the more logical and valuable the code AI produces.

### 3. A win–win for efficiency and creativity

By offloading repetitive or mechanical development work to AI, I can devote more energy to:
- **Product positioning**
- **Long-term roadmap planning**
- **Brand voice and communication style**

It's not just about "saving time" — it's about moving my attention from low-leverage tasks to high-leverage decisions.

### 4. Responsibility and accountability stay with humans

Even though AI is driving much of the implementation, I am still ultimately responsible for:
- **Code quality**
- **Maintainability**
- **Security and reliability**

I also have to ensure that this AI-driven workflow actually benefits the team and the organization, instead of introducing new hidden risks.

---

## Final Thoughts

As someone with a humanities background, I'm very aware of this irony:

**To me, a lot of ChatGPT's code still looks ugly. And to many engineers, AI-generated code often looks ugly as well.**

But even so, I'm convinced that as long as we put AI in the right position—**letting it take over repetitive implementation work instead of replacing human thinking**—it can still fundamentally change the way we build products and collaborate.

The key is not to see AI as a replacement, but as a powerful amplifier that lets us focus on what humans do best: **strategic thinking, creative problem-solving, and building meaningful connections with users**.
`,
    category: 'ai-development',
    publishedAt: '2025-11-20',
    readTime: 12,
    image: '/assets/images/pic/personalWebsite.png',
    tags: ['AI', 'Product Management', 'Development', 'Workflow', 'Claude Sonnet'],
    featured: true
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
            <strong>Written by Ray</strong>
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