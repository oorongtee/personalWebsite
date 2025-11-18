// Ray's Personal AI Assistant Chatbot
class PersonalChatbot {
  constructor() {
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
    
    // Predefined responses for common questions
    this.responses = {
      greeting: [
        "👋 Hi! I'm Ray's AI assistant. How can I help you learn more about Ray's work?",
        "Hello! I'm here to help you explore Ray's projects and services. What would you like to know?",
        "Hey there! I can tell you about Ray's skills, projects, or how to get in touch. What interests you?"
      ],
      skills: [
        `Ray specializes in ${this.knowledgeBase.skills.slice(0, 4).join(', ')}, and more! He has ${this.knowledgeBase.skills.length}+ core technical skills. Would you like to know about specific technologies?`,
        "Ray's expertise spans frontend development, product management, and UX design. He's particularly strong with modern JavaScript frameworks and creating user-centered experiences."
      ],
      services: [
        `Ray offers professional services including ${this.knowledgeBase.services.slice(0, 3).join(', ')}, and more. Each project is tailored to client needs with focus on quality and user experience.`,
        "From concept to deployment, Ray provides end-to-end development services. He combines technical expertise with product management skills to deliver exceptional results."
      ],
      projects: [
        "Ray has worked on diverse projects including e-commerce platforms, data dashboards, and interactive websites like this one! Check out the 'Works' section to see detailed case studies.",
        "This portfolio itself showcases Ray's technical skills - it features real-time weather integration, interactive animations, and responsive design. Visit the Works page for more projects!"
      ],
      contact: [
        `Ray is based in ${this.knowledgeBase.location} and ${this.knowledgeBase.availability}. You can reach him at ${this.knowledgeBase.email} or use the contact form.`,
        "Ready to discuss your project? Ray responds quickly to emails and offers free initial consultations. Check out the Contact page for more ways to connect!"
      ],
      location: [
        `Ray is located in ${this.knowledgeBase.location}, working with clients locally and internationally. Time zone: UTC+8.`,
        "Based in Taipei, Ray works with clients across different time zones and is experienced in remote collaboration."
      ],
      default: [
        "That's an interesting question! For detailed discussions about your specific needs, I'd recommend reaching out to Ray directly at ray68125@gmail.com",
        "I'd love to help, but that might be best discussed directly with Ray. You can contact him via the contact form or email for personalized assistance.",
        "Great question! Ray would be the best person to give you a detailed answer. Feel free to reach out through the contact page."
      ]
    };
    
    this.init();
  }
  
  init() {
    console.log('Initializing chatbot...');
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.createChatWidget());
    } else {
      this.createChatWidget();
    }
  }
  
  createChatWidget() {
    console.log('Creating chat widget...');
    
    // 檢查是否已存在聊天機器人容器
    const existing = document.querySelector('.chatbot-container');
    if (existing) {
      console.log('聊天機器人容器已存在，移除舊容器');
      existing.remove();
    }
    
    // Create chatbot container
    const chatContainer = document.createElement('div');
    chatContainer.className = 'chatbot-container';
    chatContainer.innerHTML = `
      <!-- Chat Toggle Button -->
      <div class="chat-toggle" id="chatToggle">
        <div class="chat-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-3 9h-2v2h-2v-2H9V9h4V7h2v2h2v2z"/>
          </svg>
        </div>
        <div class="chat-pulse"></div>
      </div>
      
      <!-- Chat Window -->
      <div class="chat-window" id="chatWindow">
        <div class="chat-header">
          <div class="chat-header-info">
            <div class="chat-avatar">
              <span>R</span>
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
              <span>R</span>
            </div>
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
    
    document.body.appendChild(chatContainer);
    console.log('聊天機器人容器已添加到頁面');
    
    // 立即設置 DOM 元素引用
    this.chatContainer = chatContainer;
    this.chatWindow = chatContainer.querySelector('#chatWindow');
    this.chatMessages = chatContainer.querySelector('#chatMessages');
    this.chatInput = chatContainer.querySelector('#chatInput');
    this.chatToggle = chatContainer.querySelector('#chatToggle');
    this.chatClose = chatContainer.querySelector('#chatClose');
    this.chatSend = chatContainer.querySelector('#chatSend');
    
    console.log('DOM 元素已設置:', {
      chatContainer: this.chatContainer,
      chatWindow: this.chatWindow,
      chatMessages: this.chatMessages,
      chatInput: this.chatInput,
      chatToggle: this.chatToggle
    });
    
    // 立即設置事件監聽器
    this.setupEventListeners();
    this.isInitialized = true;
    console.log('聊天機器人初始化完成');
  }
  
  setupEventListeners() {
    // Get DOM elements
    this.chatContainer = document.querySelector('.chatbot-container');
    this.chatInput = document.getElementById('chatInput');
    this.chatMessages = document.getElementById('chatMessages');
    
    console.log('設置事件監聽器:', {
      chatContainer: this.chatContainer,
      chatInput: this.chatInput,
      chatMessages: this.chatMessages
    });
    
    // Toggle chat
    const toggleBtn = document.getElementById('chatToggle');
    console.log('聊天切換按鈕:', toggleBtn);
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        console.log('點擊聊天切換按鈕');
        this.toggleChat();
      });
    }
    document.getElementById('chatClose').addEventListener('click', () => this.closeChat());
    
    // Send message
    document.getElementById('chatSend').addEventListener('click', () => this.handleUserMessage());
    this.chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.handleUserMessage();
      }
    });
    
    // Quick actions
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('quick-btn')) {
        const action = e.target.dataset.action;
        this.handleQuickAction(action);
      }
      
      if (e.target.classList.contains('suggestion')) {
        const text = e.target.dataset.text;
        this.chatInput.value = text;
        this.handleUserMessage();
      }
    });
    
    // Close chat when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isOpen && !this.chatContainer.contains(e.target)) {
        this.closeChat();
      }
    });
  }
  
  toggleChat() {
    if (this.isOpen) {
      this.closeChat();
    } else {
      this.openChat();
    }
  }
  
  openChat() {
    this.isOpen = true;
    this.chatContainer.classList.add('chat-open');
    this.chatInput.focus();
    
    // Add welcome animation
    setTimeout(() => {
      this.scrollToBottom();
    }, 300);
  }
  
  closeChat() {
    this.isOpen = false;
    this.chatContainer.classList.remove('chat-open');
  }
  
  handleUserMessage() {
    const message = this.chatInput.value.trim();
    if (!message || this.isTyping) return;
    
    this.addMessage(message, 'user');
    this.chatInput.value = '';
    this.generateResponse(message);
  }
  
  handleQuickAction(action) {
    const actionQuestions = {
      skills: "What are Ray's main technical skills?",
      projects: "Can you show me Ray's recent projects?",
      services: "What services does Ray offer?",
      contact: "How can I get in touch with Ray?"
    };
    
    const question = actionQuestions[action];
    if (question) {
      this.addMessage(question, 'user');
      this.generateResponse(question);
    }
  }
  
  addMessage(content, type, isHTML = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    if (type === 'bot') {
      messageDiv.innerHTML = `
        <div class="message-avatar">
          <span>R</span>
        </div>
        <div class="message-content">
          ${isHTML ? content : `<p>${content}</p>`}
        </div>
      `;
    } else {
      messageDiv.innerHTML = `
        <div class="message-content">
          <p>${content}</p>
        </div>
      `;
    }
    
    this.chatMessages.appendChild(messageDiv);
    this.scrollToBottom();
  }
  
  generateResponse(userMessage) {
    this.showTypingIndicator();
    
    // Simulate thinking time
    setTimeout(() => {
      const response = this.getPersonalizedResponse(userMessage.toLowerCase());
      this.hideTypingIndicator();
      this.addMessage(response.content, 'bot', response.isHTML);
      
      // Add follow-up suggestions if available
      if (response.suggestions) {
        setTimeout(() => {
          this.addSuggestions(response.suggestions);
        }, 500);
      }
    }, 1000 + Math.random() * 1500);
  }
  
  getPersonalizedResponse(message) {
    // Keywords matching for personalized responses
    const keywordResponses = {
      skills: () => ({
        content: `Ray's core technical skills include:<br><br>
        🚀 <strong>Frontend:</strong> React, Vue.js, JavaScript (ES6+), TypeScript<br>
        🎨 <strong>Design:</strong> UI/UX Design, Responsive Design, CSS3<br>
        📊 <strong>Product:</strong> Product Management, User Research, Analytics<br>
        🔧 <strong>Tools:</strong> Node.js, API Integration, Performance Optimization<br><br>
        He combines technical expertise with product thinking to create user-centered solutions. Want to know about specific technologies?`,
        isHTML: true,
        suggestions: ['React projects', 'UI/UX process', 'Product management approach']
      }),
      
      projects: () => ({
        content: `Ray's recent projects showcase diverse expertise:<br><br>
        🌐 <strong>Interactive Portfolio</strong> - This website with real-time weather integration and animations<br>
        🛒 <strong>E-commerce Platforms</strong> - Advanced filtering and user experience optimization<br>
        📊 <strong>Data Dashboards</strong> - Interactive visualizations and analytics tools<br>
        📱 <strong>Mobile Applications</strong> - Responsive, mobile-first experiences<br><br>
        Check out the <a href="#works" onclick="navigateTo('works')">Works section</a> for detailed case studies!`,
        isHTML: true,
        suggestions: ['Technical details', 'Development process', 'View live demos']
      }),
      
      services: () => ({
        content: `Ray offers comprehensive development and consulting services:<br><br>
        💻 <strong>Web Development</strong> - Modern, responsive websites and applications<br>
        🚀 <strong>Product Management</strong> - Strategy, roadmapping, and user research<br>
        🎨 <strong>UI/UX Design</strong> - User-centered design and prototyping<br>
        ⚡ <strong>Performance Optimization</strong> - Speed and accessibility improvements<br>
        🔗 <strong>API Integration</strong> - Third-party services and data connections<br><br>
        Each project is tailored to your specific needs with focus on quality and user experience.`,
        isHTML: true,
        suggestions: ['Project timeline', 'Pricing information', 'Start a project']
      }),
      
      contact: () => ({
        content: `Ready to work together? Here's how to reach Ray:<br><br>
        📧 <strong>Email:</strong> <a href="mailto:ray68125@gmail.com">ray68125@gmail.com</a><br>
        📍 <strong>Location:</strong> Taipei, Taiwan (UTC+8)<br>
        ⏰ <strong>Availability:</strong> Available for new projects<br><br>
        Ray typically responds within 24 hours and offers free initial consultations to discuss your project needs. You can also use the <a href="#contact" onclick="navigateTo('contact')">contact form</a> for detailed project inquiries.`,
        isHTML: true,
        suggestions: ['Schedule consultation', 'Project requirements', 'View contact form']
      })
    };
    
    // Check for keyword matches
    for (const [keyword, responseFunc] of Object.entries(keywordResponses)) {
      if (message.includes(keyword) || 
          (keyword === 'skills' && (message.includes('tech') || message.includes('technology'))) ||
          (keyword === 'projects' && (message.includes('work') || message.includes('portfolio'))) ||
          (keyword === 'contact' && (message.includes('reach') || message.includes('email') || message.includes('touch')))) {
        return responseFunc();
      }
    }
    
    // Greeting responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      const greetings = this.responses.greeting;
      return {
        content: greetings[Math.floor(Math.random() * greetings.length)],
        suggestions: ['Skills overview', 'Recent projects', 'Available services']
      };
    }
    
    // Default response with helpful suggestions
    const defaultResponses = this.responses.default;
    return {
      content: `${defaultResponses[Math.floor(Math.random() * defaultResponses.length)]}<br><br>
      Meanwhile, I can help you with:<br>
      • Ray's technical skills and experience<br>
      • Recent projects and case studies<br>
      • Available services and collaboration options<br>
      • Contact information and availability`,
      isHTML: true,
      suggestions: ['Technical skills', 'Project portfolio', 'Get in touch']
    };
  }
  
  addSuggestions(suggestions) {
    const suggestionHTML = suggestions.map(suggestion => 
      `<button class="suggestion-chip" onclick="document.getElementById('chatInput').value='${suggestion}'; document.getElementById('chatSend').click();">${suggestion}</button>`
    ).join('');
    
    this.addMessage(`<div class="suggestions-container">${suggestionHTML}</div>`, 'bot', true);
  }
  
  showTypingIndicator() {
    this.isTyping = true;
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-message';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
      <div class="message-avatar">
        <span>R</span>
      </div>
      <div class="message-content">
        <div class="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    `;
    
    this.chatMessages.appendChild(typingDiv);
    this.scrollToBottom();
  }
  
  hideTypingIndicator() {
    this.isTyping = false;
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }
  
  scrollToBottom() {
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
  }
}

// Navigation helper function
function navigateTo(page) {
  if (window.navigateToPage) {
    window.navigateToPage(page);
  } else {
    // Fallback for direct navigation
    window.location.hash = page;
  }
}

// Initialize chatbot when DOM is loaded
function initPersonalChatbot() {
  // 檢查聊天機器人容器是否存在
  if (document.querySelector('.chatbot-container')) {
    console.log('初始化 PersonalChatbot...');
    window.personalChatbot = new PersonalChatbot();
    console.log('PersonalChatbot 初始化完成');
  } else {
    console.log('等待聊天機器人容器創建...');
    setTimeout(initPersonalChatbot, 100);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPersonalChatbot);
} else {
  initPersonalChatbot();
}