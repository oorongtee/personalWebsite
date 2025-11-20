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
    excerpt: 'This article documents how I used Copilot AI—paired with the Claude Sonnet 4 model—not merely as a coding assistant but as the primary driver of my personal website\'s development lifecycle.',
    content: `
# Why Letting an AI Agent Lead My Development Process Became a Turning Point

This article documents how I used Copilot AI—paired with the Claude Sonnet 4 model—not merely as a coding assistant but as the primary driver of my personal website's development lifecycle.

All observations, experiments, and workflow iterations are recorded in the project's <a href="https://github.com/oorongtee/personalWebsite" target="_blank" style="color: #D97706; text-decoration: underline;">GitHub README</a>, serving as a living archive of how my approach evolved.

---

## My Core Assumption

In a real corporate environment, we should be able to delegate significant portions of our workflows—architecture scaffolding, code implementation, test generation, and even system design—to AI Agents.

Not as a minor helper, but as an operational unit within the development pipeline.

During this project, I continuously ran system-level AI tests, iterated on my workflow, and studied insights from <a href="https://medium.com/@simon3458" target="_blank" style="color: #D97706; text-decoration: underline;">Simon Liu</a>, whose perspectives on Agent-based development deeply influenced how I architected the process.

---

## Why This AI-Agent-Led Workflow Was a Turning Point for Me

### 1. A fundamental shift in the software development paradigm

The traditional model is straightforward:

**Humans lead. AI assists.**

In this project, I intentionally inverted the hierarchy:
• **AI leads the development workflow and implementation**
• **I act as a supervisor, decision-maker, and system boundary designer**

This shift reframes AI from "autocomplete on steroids" to an execution engine capable of driving end-to-end development under human oversight.

### 2. Integrating my dual identity as a PM and engineer

As a PM, my responsibilities typically include:
• Defining product requirements
• Designing business logic
• Mapping user flows/UX
• Translating all of that into documentation for engineers

But with an AI agent acting as an autonomous implementer, I can instead:
• Start from spec-driven product requirements
• Inject domain context into the system
• Ask AI to generate tests, architecture, and implementation
• Iterate on behavior through context refinement instead of manual coding

This lets me remain deeply focused on product strategy, narrative, and design—while still shipping real, functional code without needing a full engineering cycle.

### 3. Shifting from prompt engineer to context engineer

This project forced me to recognize a key insight:

**The real skill isn't crafting clever prompts—it's designing context architecture.**

In this workflow:
• I define product vision, constraints, UX rationale, and priorities
• AI synthesizes code and test suites based on that context
• The engineering team can focus on high-leverage logic and optimization instead of repetitive boilerplate

In other words, my role is evolving from writing instructions to curating the information environment AI operates within.

### 4. A practical way to work across multiple domains simultaneously

For the first time, I can truly operate in multiple layers of product creation at once:
• Ideation and feature conceptualization
• UX reasoning and flow optimization
• Brand identity and visual direction

AI becomes a multi-domain executor, translating these decisions into executable code quickly.

My job becomes supervision, verification, and alignment—ensuring the implementation stays consistent with product goals.

---

## Reflections and Observations

### 1. Reliability, risk, and human-in-the-loop accountability

Even though AI can write substantial portions of the codebase, it still requires:
• Continuous human review
• Regression testing
• Architectural validation

AI is not "automatically correct," and relinquishing human oversight remains unacceptable.

Risk management does not disappear—it simply shifts focus.

### 2. Context is the true determinant of output quality

The most critical variable is not prompting technique—it's the clarity and structure of context, including:
• Product vision
• Functional objectives
• Edge cases and constraints
• User journeys
• Interaction rules

High-quality context produces high-quality execution.

Poor context produces hallucinated or incoherent systems.

### 3. A win–win for efficiency and creative focus

By outsourcing low-leverage implementation tasks to AI, I can invest more energy into:
• Product strategy and differentiation
• Long-term roadmap architecture
• Narrative, brand, and communication style

This isn't merely time-saving—it's an elevation of where my cognitive effort goes.

### 4. Responsibility never moves to AI

Even when AI drives implementation, humans are still accountable for:
• Code quality and maintainability
• Security, data integrity, and compliance
• Long-term system health
• Ensuring the workflow benefits the organization rather than introducing unseen risks

AI can execute tasks, but it cannot own consequences.

---

## Final Thoughts

Coming from a humanities background, I can't ignore the irony:

To me, much of AI-generated writing still looks aesthetically rough—just as AI-generated code may look inelegant to engineers.

But this does not undermine its value.

As long as we position AI correctly—assigning it repetitive implementation work rather than delegating judgment or creative reasoning—it can reshape how we build products and collaborate.

AI is not a replacement for human insight.

It is a force multiplier that frees humans to focus on what we do best:
• Strategic thinking
• Creative problem-solving
• Meaningful user connection

And that shift, for me, marks a genuine turning point.
`,
    category: 'development',
    publishedAt: '2025-11-21',
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
            <span class="note-date">${this.formatDate(this.article.publishedAt)}</span>
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
            <time class="article-date">${this.formatDate(this.article.publishedAt)}</time>
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
      
      // 段落處理，特別處理包含bullet points的段落
      .split('\n\n')
      .map(paragraph => paragraph.trim())
      .filter(paragraph => paragraph)
      .map(paragraph => {
        if (paragraph.startsWith('<h') || 
            paragraph.startsWith('<pre') || 
            paragraph.startsWith('<blockquote')) {
          return paragraph;
        }
        
        // 檢查是否包含bullet points (•)
        if (paragraph.includes('•')) {
          // 將bullet points轉換為HTML列表項目，保持換行
          const lines = paragraph.split('\n').map(line => line.trim()).filter(line => line);
          const processedLines = lines.map(line => {
            if (line.startsWith('•')) {
              return `<li>${line.substring(1).trim()}</li>`;
            } else {
              return line;
            }
          });
          
          // 如果所有行都是列表項目，包裝在ul中
          if (processedLines.every(line => line.startsWith('<li>') || line === '')) {
            return `<ul>${processedLines.join('')}</ul>`;
          } else {
            // 混合內容，保持原格式但替換bullet points
            return `<p>${paragraph.replace(/•/g, '<br>•')}</p>`;
          }
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