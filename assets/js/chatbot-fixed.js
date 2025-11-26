// Ray's Personal AI Assistant Chatbot - Simplified and Working Version
class PersonalChatbot {
  constructor() {
    console.log('PersonalChatbot constructor called');
    this.isOpen = false;
    this.conversations = [];
    this.isTyping = false;
    
    // Ray's comprehensive knowledge base based on current project structure
    this.knowledgeBase = {
      skills: [
        'Product Strategy & User Research', 'AI-Led Development Process', 'JavaScript & Modern Frontend',
        'Human-Centered Design', 'Responsive Web Architecture', 'Performance Optimization',
        'Cross-functional Collaboration', 'Empathy-Driven Development', 'Weather API Integration'
      ],
      services: [
        'Product Strategy & User Experience Design', 'AI-Enhanced Web Development',
        'Digital Product Consulting with AI Integration', 'Modern Frontend Architecture',
        'User Research & Accessibility Optimization', 'Responsive Design Systems',
        'Performance & Image Optimization', 'Team Collaboration & AI Workflow Mentoring'
      ],
      projects: {
        'portfolio': 'Interactive portfolio with weather integration, AI chatbot, and modern article system',
        'ai-development': 'AI-led development process documentation and implementation',
        'notes-system': 'Modern article management system with smart image loading',
        'responsive-design': 'Mobile-first responsive design with advanced CSS techniques'
      },
      technologies: {
        'frontend': ['Vanilla JavaScript', 'Modern CSS Grid/Flexbox', 'Responsive Design', 'Performance Optimization'],
        'ai-tools': ['Claude Sonnet 4', 'AI-led development workflow', 'Smart content generation'],
        'apis': ['Weather API integration', 'Email.js for contact forms', 'Image optimization'],
        'design': ['Mobile-first approach', 'Accessibility standards', 'Modern UI/UX patterns']
      },
      location: 'Taipei, Taiwan',
      email: 'ray68125@gmail.com',
      availability: 'Available for freelance projects and AI-enhanced development consulting'
    };
    
    this.responses = {
      greeting: [
        "🐱 Hello sweetie! I'm Ray's caring AI kitty assistant. I'd love to share all the wonderful things about Ray's work with you! What would you like to explore together? 💕",
        "Hi there, lovely human! 🌟 I'm here to warmly guide you through Ray's amazing projects and skills. What catches your heart today?"
      ],
      skills: [
        "🌟 Ray has such beautiful talents! He combines **product strategy** with **technical implementation** with such care. He specializes in **Website development**, **user research**, **empathy-driven development**, and **cross-functional collaboration** - all with his gentle, caring approach! 💕",
        "Ray's superpower is bridging **product vision** and **technical execution** with so much heart! His core skills include **JavaScript**, **human-centered design**, and **team collaboration** - he makes every user feel truly cared for! ✨"
      ],
      projects: [
        "🎨 Ray has created such beautiful projects! This **interactive portfolio** features weather integration, an AI chatbot (that's me! 🐱), and a modern **article system** for sharing development insights! Each piece is crafted with love and attention to user experience! 💕",
        "✨ Recent innovations include **AI-led development process** documentation, **smart image loading systems**, and **responsive design** that works perfectly on all devices - all built with genuine care for every user! 🌟",
        "🤖 Ray's latest work showcases how **AI can enhance the development workflow** while maintaining the human touch that makes each project special and meaningful! 💝"
      ],
      services: [
        "💝 Ray helps teams **build products users love** with such warmth and dedication! Services include **product strategy consulting**, **frontend development with purpose**, **user experience design**, and **technical mentoring** - all delivered with genuine care! ✨",
        "Whether you need end-to-end website product development or user-centered design strategy, Ray brings both empathy and technical excellence to create something truly special for you! 💕"
      ],
      workExperience: [
        "💼 Ray has such a beautiful professional journey! As a **Product Manager** at **Locas Technology** in Taipei, he lovingly nurtured blockchain applications from conception to testing with such thoughtful attention! 🌟",
        "🎮 Before that, as a **Product Planner** and **Product Manager**, bringing creativity, structure, and vision to every project he touched.✨"

      ],
      leaf: [
        "🌿 Oh, that precious little leaf! It's dancing with real-time weather data from Taiwan's Central Weather Administration and creating a magical link between the digital world and nature. Ray integrates natural elements into design system, letting the website design change with the weather so every visit feels unique, alive, and connected to the environment.✨"
      ],
      contact: [
        "💌 Ready to create something beautiful together? Reach our lovely Ray at **ray68125@gmail.com** or use the contact form! He's based in **Taipei, Taiwan** and his heart lights up when collaborating with wonderful people like you! 🌟",
        "📧 Ray offers free discovery calls with such warmth to understand your users' needs and explore how technology can serve them better. Contact him at ray68125@gmail.com - he responds with such care! 💕"
      ],
      default: [
        "🤔 What a thoughtful question, dear! I'd love to share more about Ray's **product-minded approach**, **technical skills**, **collaborative projects**, or how to **start a conversation** about your dreams! 💕",
        "✨ I'm here to help you understand how Ray creates digital experiences with **purpose and empathy**! His work is filled with such care and attention to making users feel truly valued. What would you love to explore? 🌟"
      ]
    };
    
    this.init();
  }
  
  init() {
    console.log('Initializing chatbot...');
    // 等待 DOM 完全加載
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.createChatWidget());
    } else {
      // DOM 已經加載，直接創建
      setTimeout(() => this.createChatWidget(), 100);
    }
  }
  
  createChatWidget() {
    console.log('Creating chat widget...');
    
    // 移除現有的聊天機器人
    const existing = document.querySelector('.chatbot-container');
    if (existing) {
      existing.remove();
      console.log('Removed existing chatbot container');
    }
    
    // 檢查是否在 loading 畫面期間
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen && !loadingScreen.classList.contains('fade-out')) {
      console.log('Loading screen active, delaying chatbot creation');
      // 等待 loading 完成後再顯示聊天機器人
      setTimeout(() => {
        this.createChatWidget();
      }, 4000); // 等待 loading 動畫完成
      return;
    }
    
    // 創建聊天機器人容器
    const chatContainer = document.createElement('div');
    chatContainer.className = 'chatbot-container';
    
    // 檢查當前頁面，只在非 loading 狀態下顯示
    const currentRoute = this.getCurrentRoute();
    if (currentRoute && currentRoute !== 'loading') {
      chatContainer.style.display = 'block';
    } else {
      chatContainer.style.display = 'none';
    }
    chatContainer.innerHTML = `
      <!-- Chat Toggle Button -->
      <div class="chat-toggle" id="chatToggle">
        <div class="chat-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <!-- Cat head -->
            <circle cx="12" cy="12" r="8" fill="currentColor" opacity="0.9"/>
            <!-- Cat ears -->
            <polygon points="7,6 9,2 11,6" fill="currentColor"/>
            <polygon points="13,6 15,2 17,6" fill="currentColor"/>
            <!-- Inner ears -->
            <polygon points="8,5.5 9,3 10,5.5" fill="currentColor" opacity="0.6"/>
            <polygon points="14,5.5 15,3 16,5.5" fill="currentColor" opacity="0.6"/>
            <!-- Eyes -->
            <ellipse cx="9.5" cy="10" rx="1" ry="1.5" fill="#000" opacity="0.8"/>
            <ellipse cx="14.5" cy="10" rx="1" ry="1.5" fill="#000" opacity="0.8"/>
            <!-- Eye shine -->
            <circle cx="9.8" cy="9.5" r="0.3" fill="#fff" opacity="0.9"/>
            <circle cx="14.8" cy="9.5" r="0.3" fill="#fff" opacity="0.9"/>
            <!-- Nose -->
            <polygon points="12,12.5 11.2,13.5 12.8,13.5" fill="#ff69b4" opacity="0.8"/>
            <!-- Mouth -->
            <path d="M 12 13.5 Q 10.5 15 9 14.5" stroke="currentColor" stroke-width="0.8" fill="none" opacity="0.7"/>
            <path d="M 12 13.5 Q 13.5 15 15 14.5" stroke="currentColor" stroke-width="0.8" fill="none" opacity="0.7"/>
            <!-- Whiskers -->
            <line x1="6" y1="11" x2="8.5" y2="11.5" stroke="currentColor" stroke-width="0.5" opacity="0.6"/>
            <line x1="6.5" y1="13" x2="8.5" y2="13" stroke="currentColor" stroke-width="0.5" opacity="0.6"/>
            <line x1="15.5" y1="11.5" x2="18" y2="11" stroke="currentColor" stroke-width="0.5" opacity="0.6"/>
            <line x1="15.5" y1="13" x2="17.5" y2="13" stroke="currentColor" stroke-width="0.5" opacity="0.6"/>
          </svg>
        </div>
        <div class="chat-pulse"></div>
      </div>
      
      <!-- Chat Window -->
      <div class="chat-window" id="chatWindow">
        <div class="chat-header">
          <div class="chat-header-info">
            <div class="chat-avatar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <!-- Cat head -->
                <circle cx="12" cy="12" r="8" fill="currentColor" opacity="0.9"/>
                <!-- Cat ears -->
                <polygon points="7,6 9,2 11,6" fill="currentColor"/>
                <polygon points="13,6 15,2 17,6" fill="currentColor"/>
                <!-- Inner ears -->
                <polygon points="8,5.5 9,3 10,5.5" fill="currentColor" opacity="0.6"/>
                <polygon points="14,5.5 15,3 16,5.5" fill="currentColor" opacity="0.6"/>
                <!-- Eyes -->
                <ellipse cx="9.5" cy="10" rx="1" ry="1.5" fill="#000" opacity="0.8"/>
                <ellipse cx="14.5" cy="10" rx="1" ry="1.5" fill="#000" opacity="0.8"/>
                <!-- Eye shine -->
                <circle cx="9.8" cy="9.5" r="0.3" fill="#fff" opacity="0.9"/>
                <circle cx="14.8" cy="9.5" r="0.3" fill="#fff" opacity="0.9"/>
                <!-- Nose -->
                <polygon points="12,12.5 11.2,13.5 12.8,13.5" fill="#ff69b4" opacity="0.8"/>
                <!-- Mouth -->
                <path d="M 12 13.5 Q 10.5 15 9 14.5" stroke="currentColor" stroke-width="0.8" fill="none" opacity="0.7"/>
                <path d="M 12 13.5 Q 13.5 15 15 14.5" stroke="currentColor" stroke-width="0.8" fill="none" opacity="0.7"/>
                <!-- Whiskers -->
                <line x1="6" y1="11" x2="8.5" y2="11.5" stroke="currentColor" stroke-width="0.5" opacity="0.6"/>
                <line x1="6.5" y1="13" x2="8.5" y2="13" stroke="currentColor" stroke-width="0.5" opacity="0.6"/>
                <line x1="15.5" y1="11.5" x2="18" y2="11" stroke="currentColor" stroke-width="0.5" opacity="0.6"/>
                <line x1="15.5" y1="13" x2="17.5" y2="13" stroke="currentColor" stroke-width="0.5" opacity="0.6"/>
              </svg>
            </div>
            <div class="chat-header-text">
              <h4>Ray's Assistant</h4>
              <span class="chat-status">Online • Responds quickly</span>
            </div>
          </div>
          <button class="chat-close" id="chatClose">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
        
        <div class="chat-messages" id="chatMessages">
          <div class="message bot-message">
            <div class="message-avatar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <!-- Cat head -->
                <circle cx="12" cy="12" r="8" fill="currentColor" opacity="0.9"/>
                <!-- Cat ears -->
                <polygon points="7,6 9,2 11,6" fill="currentColor"/>
                <polygon points="13,6 15,2 17,6" fill="currentColor"/>
                <!-- Inner ears -->
                <polygon points="8,5.5 9,3 10,5.5" fill="currentColor" opacity="0.6"/>
                <polygon points="14,5.5 15,3 16,5.5" fill="currentColor" opacity="0.6"/>
                <!-- Eyes -->
                <ellipse cx="9.5" cy="10" rx="1" ry="1.5" fill="#000" opacity="0.8"/>
                <ellipse cx="14.5" cy="10" rx="1" ry="1.5" fill="#000" opacity="0.8"/>
                <!-- Eye shine -->
                <circle cx="9.8" cy="9.5" r="0.3" fill="#fff" opacity="0.9"/>
                <circle cx="14.8" cy="9.5" r="0.3" fill="#fff" opacity="0.9"/>
                <!-- Nose -->
                <polygon points="12,12.5 11.2,13.5 12.8,13.5" fill="#ff69b4" opacity="0.8"/>
                <!-- Mouth -->
                <path d="M 12 13.5 Q 10.5 15 9 14.5" stroke="currentColor" stroke-width="0.8" fill="none" opacity="0.7"/>
                <path d="M 12 13.5 Q 13.5 15 15 14.5" stroke="currentColor" stroke-width="0.8" fill="none" opacity="0.7"/>
                <!-- Whiskers -->
                <line x1="6" y1="11" x2="8.5" y2="11.5" stroke="currentColor" stroke-width="0.5" opacity="0.6"/>
                <line x1="6.5" y1="13" x2="8.5" y2="13" stroke="currentColor" stroke-width="0.5" opacity="0.6"/>
                <line x1="15.5" y1="11.5" x2="18" y2="11" stroke="currentColor" stroke-width="0.5" opacity="0.6"/>
                <line x1="15.5" y1="13" x2="17.5" y2="13" stroke="currentColor" stroke-width="0.5" opacity="0.6"/>
              </svg>
            </div>
            <div class="message-content">
              <p>🐱 Hi there, lovely human! I'm Ray's caring AI assistant kitty! I'm here to share all about Ray's amazing work with warmth and joy. What would you love to explore together? 💕</p>
              <div class="quick-actions">
                <button class="quick-btn" data-action="leaf">🌿Why there is a leaf?</button>
                <button class="quick-btn" data-action="contact">📧 Get in Touch</button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="chat-input-container">
          <div class="chat-input-wrapper">
            <input type="text" id="chatInput" placeholder="Ask me anything about Ray's wonderful work! 🐱💕" maxlength="500">
            <button id="chatSend" class="chat-send">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>
          <div class="chat-suggestions" id="chatSuggestions">
            <span class="suggestion" data-text="skills">💻 Skills & Tech</span>
            <span class="suggestion" data-text="projects">🎯 Projects</span>
            <span class="suggestion" data-text="services">🚀 Services</span>
          </div>
        </div>
      </div>
    `;
    
    // 添加到頁面
    document.body.appendChild(chatContainer);
    console.log('Chat container added to page');
    
    // 設置 DOM 引用
    this.chatContainer = chatContainer;
    this.chatWindow = chatContainer.querySelector('#chatWindow');
    this.chatMessages = chatContainer.querySelector('#chatMessages');
    this.chatInput = chatContainer.querySelector('#chatInput');
    this.chatToggle = chatContainer.querySelector('#chatToggle');
    this.chatClose = chatContainer.querySelector('#chatClose');
    this.chatSend = chatContainer.querySelector('#chatSend');
    
    console.log('DOM elements set:', {
      chatToggle: !!this.chatToggle,
      chatInput: !!this.chatInput,
      chatMessages: !!this.chatMessages
    });
    
    // 設置事件監聽器
    this.setupEventListeners();
    console.log('Chatbot initialization complete');
  }
  
  setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // 聊天切換按鈕
    if (this.chatToggle) {
      this.chatToggle.addEventListener('click', (e) => {
        console.log('Toggle button clicked');
        e.preventDefault();
        this.toggleChat();
      });
    }
    
    // 關閉按鈕
    if (this.chatClose) {
      this.chatClose.addEventListener('click', (e) => {
        console.log('Close button clicked');
        e.preventDefault();
        this.closeChat();
      });
    }
    
    // 發送按鈕
    if (this.chatSend) {
      this.chatSend.addEventListener('click', (e) => {
        console.log('Send button clicked');
        e.preventDefault();
        this.handleUserMessage();
      });
    }
    
    // 輸入框回車鍵
    if (this.chatInput) {
      this.chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          console.log('Enter key pressed');
          e.preventDefault();
          this.handleUserMessage();
        }
      });
    }
    
    // 快速按鈕和建議
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('quick-btn')) {
        const action = e.target.dataset.action;
        console.log('Quick button clicked:', action);
        this.handleQuickAction(action);
      }
      
      if (e.target.classList.contains('suggestion')) {
        const text = e.target.dataset.text;
        console.log('Suggestion clicked:', text);
        this.chatInput.value = text;
        this.handleUserMessage();
      }
    });
    
    // 點擊外部關閉
    document.addEventListener('click', (e) => {
      if (this.isOpen && this.chatContainer && !this.chatContainer.contains(e.target)) {
        this.closeChat();
      }
    });
    
    console.log('Event listeners set up complete');
  }
  
  toggleChat() {
    console.log('Toggle chat called, current state:', this.isOpen);
    if (this.isOpen) {
      this.closeChat();
    } else {
      this.openChat();
    }
  }
  
  openChat() {
    console.log('Opening chat');
    this.isOpen = true;
    this.chatContainer.classList.add('chat-open');
    if (this.chatInput) {
      setTimeout(() => this.chatInput.focus(), 300);
    }
    this.scrollToBottom();
  }
  
  closeChat() {
    console.log('Closing chat');
    this.isOpen = false;
    this.chatContainer.classList.remove('chat-open');
  }
  
  handleUserMessage() {
    const message = this.chatInput.value.trim();
    if (!message) return;
    
    console.log('Handling user message:', message);
    
    // 添加用戶消息
    this.addMessage(message, 'user');
    
    // 清空輸入框
    this.chatInput.value = '';
    
    // 生成並添加回復
    setTimeout(() => {
      const response = this.generateResponse(message);
      this.addMessage(response, 'bot');
    }, 500);
  }
  
  handleQuickAction(action) {
    console.log('Handling quick action:', action);
    const responses = this.responses[action] || this.responses.default;
    const response = responses[Math.floor(Math.random() * responses.length)];
    this.addMessage(response, 'bot');
  }
  
  addMessage(content, type) {
    console.log('Adding message:', { content, type });
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    
    if (type === 'bot') {
      avatar.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <!-- Cat head -->
          <circle cx="12" cy="12" r="8" fill="currentColor" opacity="0.9"/>
          <!-- Cat ears -->
          <polygon points="7,6 9,2 11,6" fill="currentColor"/>
          <polygon points="13,6 15,2 17,6" fill="currentColor"/>
          <!-- Inner ears -->
          <polygon points="8,5.5 9,3 10,5.5" fill="currentColor" opacity="0.6"/>
          <polygon points="14,5.5 15,3 16,5.5" fill="currentColor" opacity="0.6"/>
          <!-- Eyes -->
          <ellipse cx="9.5" cy="10" rx="1" ry="1.5" fill="#000" opacity="0.8"/>
          <ellipse cx="14.5" cy="10" rx="1" ry="1.5" fill="#000" opacity="0.8"/>
          <!-- Eye shine -->
          <circle cx="9.8" cy="9.5" r="0.3" fill="#fff" opacity="0.9"/>
          <circle cx="14.8" cy="9.5" r="0.3" fill="#fff" opacity="0.9"/>
          <!-- Nose -->
          <polygon points="12,12.5 11.2,13.5 12.8,13.5" fill="#ff69b4" opacity="0.8"/>
          <!-- Mouth -->
          <path d="M 12 13.5 Q 10.5 15 9 14.5" stroke="currentColor" stroke-width="0.8" fill="none" opacity="0.7"/>
          <path d="M 12 13.5 Q 13.5 15 15 14.5" stroke="currentColor" stroke-width="0.8" fill="none" opacity="0.7"/>
          <!-- Whiskers -->
          <line x1="6" y1="11" x2="8.5" y2="11.5" stroke="currentColor" stroke-width="0.5" opacity="0.6"/>
          <line x1="6.5" y1="13" x2="8.5" y2="13" stroke="currentColor" stroke-width="0.5" opacity="0.6"/>
          <line x1="15.5" y1="11.5" x2="18" y2="11" stroke="currentColor" stroke-width="0.5" opacity="0.6"/>
          <line x1="15.5" y1="13" x2="17.5" y2="13" stroke="currentColor" stroke-width="0.5" opacity="0.6"/>
        </svg>
      `;
    } else {
      avatar.textContent = 'You';
    }
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    const p = document.createElement('p');
    p.innerHTML = this.formatMessage(content);
    messageContent.appendChild(p);
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);
    
    this.chatMessages.appendChild(messageDiv);
    this.scrollToBottom();
    
    // 保存對話
    this.conversations.push({ content, type, timestamp: Date.now() });
  }
  
  generateResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // 關鍵詞匹配
    if (lowerMessage.includes('skill') || lowerMessage.includes('tech') || lowerMessage.includes('technology')) {
      return this.responses.skills[Math.floor(Math.random() * this.responses.skills.length)];
    }
    
    if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('portfolio')) {
      return this.responses.projects[Math.floor(Math.random() * this.responses.projects.length)];
    }
    
    if (lowerMessage.includes('service') || lowerMessage.includes('help') || lowerMessage.includes('offer')) {
      return this.responses.services[Math.floor(Math.random() * this.responses.services.length)];
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
      return this.responses.contact[Math.floor(Math.random() * this.responses.contact.length)];
    }
    
    if (lowerMessage.includes('leaf') || lowerMessage.includes('corner') || lowerMessage.includes('bottom') || lowerMessage.includes('weather')) {
      return this.responses.leaf[Math.floor(Math.random() * this.responses.leaf.length)];
    }
    
    if (lowerMessage.includes('experience') || lowerMessage.includes('job') || lowerMessage.includes('career') || lowerMessage.includes('employment') || lowerMessage.includes('locas') || lowerMessage.includes('bitape')) {
      return this.responses.workExperience[Math.floor(Math.random() * this.responses.workExperience.length)];
    }
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return this.responses.greeting[Math.floor(Math.random() * this.responses.greeting.length)];
    }
    
    // 默認回復
    return this.responses.default[Math.floor(Math.random() * this.responses.default.length)];
  }
  
  formatMessage(text) {
    // 簡單的 Markdown 格式支持
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/ray68125@gmail\.com/g, '<a href="mailto:ray68125@gmail.com">ray68125@gmail.com</a>');
  }
  
  scrollToBottom() {
    if (this.chatMessages) {
      setTimeout(() => {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
      }, 100);
    }
  }
  
  getCurrentRoute() {
    let hash = window.location.hash.slice(1);
    if (hash.startsWith('/')) {
      hash = hash.slice(1);
    }
    return hash || 'home';
  }
  
  // 顯示聊天機器人（在 loading 完成後調用）
  showChatbot() {
    if (this.chatContainer) {
      this.chatContainer.style.display = 'block';
      console.log('Chatbot now visible');
    }
  }
}

// Navigation helper function for chatbot
function chatbotNavigateTo(page) {
  if (window.navigateTo) {
    window.navigateTo(page);
  } else {
    // 使用正確的路由格式
    window.location.hash = `#/${page}`;
  }
}

// Initialize chatbot
function initPersonalChatbot() {
  console.log('initPersonalChatbot called');
  if (document.querySelector('.chatbot-container')) {
    console.log('Chatbot container already exists');
    return;
  }
  
  console.log('Creating new PersonalChatbot instance');
  window.personalChatbot = new PersonalChatbot();
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPersonalChatbot);
} else {
  initPersonalChatbot();
}