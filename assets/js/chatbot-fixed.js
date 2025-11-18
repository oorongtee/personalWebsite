// Ray's Personal AI Assistant Chatbot - Simplified and Working Version
class PersonalChatbot {
  constructor() {
    console.log('PersonalChatbot constructor called');
    this.isOpen = false;
    this.conversations = [];
    this.isTyping = false;
    
    // Ray's personal knowledge base
    this.knowledgeBase = {
      skills: [
        'React', 'Vue.js', 'JavaScript', 'TypeScript', 'Node.js', 
        'Product Management', 'UI/UX Design', 'Frontend Development',
        'API Integration', 'Responsive Design', 'Performance Optimization'
      ],
      services: [
        'Website Development', 'Web Application Development',
        'Product Management Consulting', 'UI/UX Design',
        'Frontend Architecture', 'Performance Optimization',
        'API Integration', 'Mobile-First Design'
      ],
      projects: {
        'portfolio': 'This interactive portfolio website with weather integration',
        'ecommerce': 'E-commerce platforms with advanced filtering',
        'dashboards': 'Data visualization dashboards',
        'mobile-apps': 'Responsive mobile-first applications'
      },
      location: 'Taipei, Taiwan',
      email: 'ray68125@gmail.com',
      availability: 'Available for freelance projects and consulting'
    };
    
    this.responses = {
      greeting: [
        "Hello! I'm Ray's AI assistant. I'm here to help you learn about his work and expertise. What interests you most?",
        "Hi there! I can tell you all about Ray's skills, projects, and how he might help with your next project. What would you like to know?"
      ],
      skills: [
        "Ray specializes in modern frontend technologies including **React**, **Vue.js**, and **TypeScript**. He's also experienced in **Product Management** and **UI/UX Design**.",
        "Ray's core expertise includes **JavaScript/TypeScript**, **React & Vue.js frameworks**, **Node.js backend development**, and **API integration**."
      ],
      projects: [
        "Ray has worked on diverse projects including **interactive portfolio websites**, **e-commerce platforms**, **data visualization dashboards**, and **mobile-first applications**.",
        "Recent work includes this **weather-integrated portfolio**, **responsive e-commerce solutions**, and **custom dashboard applications**."
      ],
      services: [
        "Ray offers **Website Development**, **Web Application Development**, **Product Management Consulting**, and **UI/UX Design** services.",
        "Services include **full-stack web development**, **mobile-first responsive design**, **product strategy consulting**, and **technical architecture planning**."
      ],
      contact: [
        "You can reach Ray at **ray68125@gmail.com** or through the contact form on this website. He's based in **Taipei, Taiwan**.",
        "Ready to discuss your project? Ray typically responds within 24 hours and offers free initial consultations to discuss your project needs. You can also use the contact form for detailed project inquiries."
      ],
      default: [
        "That's an interesting question! I'd be happy to tell you about Ray's **skills**, **projects**, **services**, or how to **get in touch**.",
        "I'd love to help you learn more about Ray's work! What interests you most?"
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
    
    // 創建聊天機器人容器
    const chatContainer = document.createElement('div');
    chatContainer.className = 'chatbot-container';
    chatContainer.innerHTML = `
      <!-- Chat Toggle Button -->
      <div class="chat-toggle" id="chatToggle">
        <div class="chat-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9H9V9h4V7h2v2h2v2h-2v2h-2v-2z"/>
          </svg>
        </div>
        <div class="chat-pulse"></div>
      </div>
      
      <!-- Chat Window -->
      <div class="chat-window" id="chatWindow">
        <div class="chat-header">
          <div class="chat-header-info">
            <div class="chat-avatar">R</div>
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
            <div class="message-avatar">R</div>
            <div class="message-content">
              <p>👋 Hi! I'm Ray's AI assistant. I can help you learn about his skills, projects, and services. What would you like to know?</p>
              <div class="quick-actions">
                <button class="quick-btn" data-action="skills">💻 Skills & Tech</button>
                <button class="quick-btn" data-action="projects">🎯 Projects</button>
                <button class="quick-btn" data-action="services">🚀 Services</button>
                <button class="quick-btn" data-action="contact">📧 Get in Touch</button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="chat-input-container">
          <div class="chat-input-wrapper">
            <input type="text" id="chatInput" placeholder="Ask about Ray's work, skills, or projects..." maxlength="500">
            <button id="chatSend" class="chat-send">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>
          <div class="chat-suggestions" id="chatSuggestions">
            <span class="suggestion" data-text="What technologies does Ray use?">Tech Stack</span>
            <span class="suggestion" data-text="Show me Ray's recent projects">Recent Work</span>
            <span class="suggestion" data-text="How can Ray help with my project?">Collaboration</span>
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
    avatar.textContent = type === 'bot' ? 'R' : 'You';
    
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