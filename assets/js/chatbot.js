// =====================
// Ray's AI Assistant Knowledge Base (English)
// =====================
const rayBotKnowledgeEN = {
  greeting: "👋 Hi! I'm Ray's AI assistant. I can help you learn about his skills, projects, and services. What would you like to know?",
  buttons: [
    { label: "💻 Skills & Tech", key: "skills" },
    { label: "🚀 Services", key: "services" },
    { label: "📧 Why is there a leaf in the bottom-left corner?", key: "leaf" }
  ],
  answers: {
    skills: `Ray's Skills & Tech Stack\n\nFrontend: HTML, CSS (design website, responsive, color system), JavaScript (SPA architecture, dynamic content loading, React, API Integration)\nGit & GitHub: version control, team collaboration\nProduct Management: strategy, execution, cross-disciplinary collaboration`,
    services: `Ray's Services\n\nWebsite development\nInteractive frontend and product management\nThird-party API integration (e.g., weather, EmailJS)`,
    portfolio: `Portfolio & Projects\n\nRay's Personal Website\n2025 World Expo\nE-Shopping Mall\nFreeport Metaverse`,
    philosophy: `Uses earth tones and green to create a warm, natural, modern feel.\nInterface elements (like the leaf in the lower-left corner) dynamically change based on weather data, helping users appreciate the beauty of their environment.\nLoading and entrance animations use safe, side-effect-free CSS techniques.`,
    leaf: `The leaf in the lower-left corner is part of my visual design, which dynamically adapts to climate data from Taiwan’s Central Weather Administration. I’ve integrated their API into the system so the interface can subtly reflect the surrounding environment—helping users stay present and appreciate the beauty in the world around them.`
  }
};

// Ray's Personal AI Assistant Chatbot
class PersonalChatbot {
  constructor() {
    this.isOpen = false;
    this.conversations = [];
    this.isTyping = false;
    
    // Ray's personal knowledge base
    this.knowledgeBase = {
      skills: [
        'React', 'JavaScript', 'Node.js', 
        'Product Management', 'UX Design', 'Frontend Development',
        'API Integration', 'Responsive Design', 'Performance Optimization'
      ],
      services: [
        'Website Development', 'Web Application Development',
        'Product Management Consulting', 'UX Design',
        'Frontend Architecture', 'Performance Optimization',
        'API Integration', 'Mobile-First Design'
      ],
      location: 'Taipei, Taiwan',
      email: 'ray68125@gmail.com',
      availability: 'Available for freelance projects and consulting'
    };
    
    // Predefined responses for common questions
    this.responses = {
      greeting: [
        "🐱 Hello sweetie! I'm Ray's caring AI kitty assistant. I'd love to share all the wonderful things about Ray's work with you! What would you like to explore together?",
        "Hi there, lovely human! 🌟 I'm here to warmly guide you through Ray's amazing projects and skills. What catches your heart today?",
        "Hey friend! 💕 I'm Ray's gentle AI companion, and I'm so excited to tell you about his incredible journey. What would make you smile to learn about?"
      ],
      skills: [
        `🌟 Ray has such beautiful talents! He's wonderful with ${this.knowledgeBase.skills.slice(0, 4).join(', ')}, plus ${this.knowledgeBase.skills.length - 4} more amazing skills! His heart really shines in creating user-centered experiences. Would you love to hear about any specific technology? 💕`,
        "💻 Ray's expertise is like a warm embrace spanning frontend development, product management, and UX design. He has this special gift for modern JavaScript frameworks and making users feel truly cared for through his designs! ✨"
      ],
      services: [
        `💝 Ray offers such caring services including ${this.knowledgeBase.services.slice(0, 3).join(', ')}, and so much more! Every project is lovingly tailored to what you need, with Ray's gentle focus on quality and making users feel wonderful.`,
        "🚀 From the first spark of an idea to the final launch, Ray provides end-to-end development with such warmth and dedication! He beautifully weaves together technical expertise with product management skills to create something truly special for you. ✨"
      ],
      projects: [
        "🎨 Ray has poured his heart into so many beautiful projects! From his weather-integrated personal website to e-commerce platforms that feel like a warm hug, and data dashboards that make complex information feel friendly and approachable! 💕",
        "✨ Each of Ray's projects tells a story of care and innovation - interactive websites, blockchain applications, and mobile experiences that truly connect with users' hearts. You can see his love for detail in every pixel! 🌟"
      ],
      workExperience: [
        "💼 Ray has such a lovely professional journey! As a Product Manager at Locas Technology in Taipei, he nurtured blockchain applications from conception to testing with such care and attention. 🌟",
        "🎮 Before that, as a Product Planner at BITAPE Logistics Technology in Taichung, Ray contributed his creative heart to Freeport Metaverse game planning, beautifully integrating blockchain technology with user experiences! ✨"
      ],
      leaf: [
        "🍃 Oh, that sweet little leaf! It's one of Ray's most thoughtful touches - it dances with real-time weather data from Taiwan's Central Weather Administration, creating this magical connection between the digital world and nature's beauty! It's like Ray's way of saying 'stay present and appreciate the world around you.' 💕",
        "🌿 That adorable leaf represents Ray's gentle heart for integrating natural elements into digital design! It changes with the weather, making each visit feel unique and connected to the real world. It's such a beautiful reminder to pause and appreciate our environment! ✨"
      ],
      leaf: [
        "The leaf in the bottom-left corner is part of Ray's visual design, which dynamically adapts to climate data from Taiwan’s Central Weather Administration. It helps users appreciate the beauty of their environment.",
        "That leaf represents Ray's commitment to integrating natural elements into digital design. It changes based on real-time weather data, creating a unique and engaging user experience."
      ],
      contact: [
        `💌 Ray is nestled in the heart of ${this.knowledgeBase.location} and he's so excited to welcome new projects! You can send him a warm message at ${this.knowledgeBase.email} or use the lovely contact form. He always responds with care! 🌟`,
        "📧 Ready to create something beautiful together? Ray's heart lights up when he receives emails, and he lovingly offers free initial consultations to understand your dreams! Check out the Contact page - there are so many wonderful ways to connect! ✨"
      ],
      location: [
        `🏙️ Ray calls ${this.knowledgeBase.location} home, but his heart reaches out to work with amazing people locally and around the world! Time zone: UTC+8, but he's always flexible for the right collaboration! 💕`,
        "🌍 From his cozy base in Taipei, Ray spreads joy working with clients across different time zones. He's become such a pro at remote collaboration, making distance feel like nothing at all! ✨"
      ],
      default: [
        "🤔 What a thoughtful question, dear! While I'd love to chat more, Ray would be absolutely delighted to give you a personalized answer. Drop him a sweet note at ray68125@gmail.com - he really treasures meaningful conversations! 💕",
        "💭 Oh, I wish I could help more with that lovely question! Ray would be the perfect person to discuss this with you personally. Send him a message through the contact form or email - he'll respond with such care and attention! 🌟",
        "✨ That's such a wonderful question! Ray's eyes would light up to answer that for you personally. Please don't hesitate to reach out through the contact page - he loves connecting with thoughtful people like you! 💝"
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
    
    // Check if chatbot container already exists
    const existing = document.querySelector('.chatbot-container');
    if (existing) {
      console.log('Chatbot container already exists, removing old container');
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
              <span>🐱</span>
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
              <span>🐱</span>
            </div>
            <div class="message-content">
              <p>👋 Hi! I'm Ray's AI assistant. I can help you learn about his skills, projects, and services. What would you like to know?</p>
              <div class="quick-actions">
                <button class="quick-btn" data-action="skills">💻 Skills & Tech</button>
                <button class="quick-btn" data-action="services">🚀 Services</button>
                <button class="quick-btn" data-action="leaf">🍃 Why is there a leaf in the bottom-left corner?</button>
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
            <span class="suggestion" data-text="What technologies does Ray use?">Tech Stack</span>
            <span class="suggestion" data-text="Show me Ray's recent projects">Recent Work</span>
            <span class="suggestion" data-text="How can Ray help with my project?">Collaboration</span>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(chatContainer);
    console.log('Chatbot container added to page');
    
    // Immediately set DOM element references
    this.chatContainer = chatContainer;
    this.chatWindow = chatContainer.querySelector('#chatWindow');
    this.chatMessages = chatContainer.querySelector('#chatMessages');
    this.chatInput = chatContainer.querySelector('#chatInput');
    this.chatToggle = chatContainer.querySelector('#chatToggle');
    this.chatClose = chatContainer.querySelector('#chatClose');
    this.chatSend = chatContainer.querySelector('#chatSend');
    
    console.log('DOM elements set:', {
      chatContainer: this.chatContainer,
      chatWindow: this.chatWindow,
      chatMessages: this.chatMessages,
      chatInput: this.chatInput,
      chatToggle: this.chatToggle
    });
    
    // Immediately set up event listeners
    this.setupEventListeners();
    this.isInitialized = true;
    console.log('Chatbot initialization complete');
  }
  
  setupEventListeners() {
    // Get DOM elements
    this.chatContainer = document.querySelector('.chatbot-container');
    this.chatInput = document.getElementById('chatInput');
    this.chatMessages = document.getElementById('chatMessages');
    
    console.log('Setting up event listeners:', {
      chatContainer: this.chatContainer,
      chatInput: this.chatInput,
      chatMessages: this.chatMessages
    });
    
    // Toggle chat
    const toggleBtn = document.getElementById('chatToggle');
    console.log('Chat toggle button:', toggleBtn);
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        console.log('Chat toggle button clicked');
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
      contact: "How can I get in touch with Ray?",
      leaf: "Why is there a leaf in the bottom-left corner?",
      workExperience: "Tell me about Ray's work experience"
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
          <span>🐱</span>
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
        🚀 <strong>Frontend:</strong> React, JavaScript (ES6+)<br>
        🎨 <strong>Design:</strong> UX Design, Responsive Design, CSS3<br>
        📊 <strong>Product:</strong> Product Management, User Research, Analytics<br>
        🔧 <strong>Tools:</strong> Node.js, API Integration, Performance Optimization<br><br>
        He combines technical expertise with product thinking to create user-centered solutions. Want to know about specific technologies?`,
        isHTML: true,
        suggestions: ['React projects', 'UX process', 'Product management approach']
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
        content: `💕 Ready to create something beautiful together? Here's how to reach our lovely Ray:<br><br>
        📧 <strong>Email:</strong> <a href="mailto:ray68125@gmail.com">ray68125@gmail.com</a><br>
        📍 <strong>Location:</strong> Taipei, Taiwan (UTC+8)<br>
        ✨ <strong>Availability:</strong> Excited to welcome new projects!<br><br>
        Ray's heart lights up when he gets messages! He typically responds within 24 hours with such care and warmth. He also offers free initial consultations to understand your dreams. You can also use the <a href="#contact" onclick="navigateTo('contact')">contact form</a> to share your project story! 🌟`,
        isHTML: true,
        suggestions: ['Schedule a sweet consultation', 'Share project dreams', 'Visit contact form']
      }),
      
      leaf: () => ({
        content: `🍃 Oh, that precious little leaf! It's one of Ray's most thoughtful and magical touches! 💕<br><br>
        ✨ That sweet leaf dances with real-time weather data from Taiwan's Central Weather Administration, creating this beautiful bridge between our digital world and nature's wonders!<br><br>
        🌿 It's like Ray's gentle way of whispering "stay present, dear friend, and appreciate the beauty that surrounds you every moment." Each time you visit, it might show you something different - just like how every day brings new natural beauty! 🌟<br><br>
        It represents Ray's caring heart for weaving natural elements into digital experiences, making technology feel warm and alive! 💝`,
        isHTML: true,
        suggestions: ['More about design philosophy', 'Other interactive elements', 'Ray\'s creative process']
      }),
      
      workExperience: () => ({
        content: `💼 Ray has such a beautiful professional journey filled with innovation and care! 🌟<br><br>
        🏢 <strong>Product Manager</strong> at <em>Locas Technology CO., LTD</em> in Taipei<br>
        💡 Where he lovingly nurtured blockchain applications from their first spark of conception all the way through testing, bringing such thoughtful attention to every detail!<br><br>
        🎮 <strong>Product Planner</strong> at <em>BITAPE Logistics Technology CO., LTD</em> in Taichung<br>
        ✨ Contributing his creative heart to Freeport Metaverse game planning and coordination, beautifully weaving blockchain technology into engaging user experiences!<br><br>
        Each role shows Ray's gift for bridging innovative technology with human needs, always with such care and vision! 💕`,
        isHTML: true,
        suggestions: ['Blockchain expertise', 'Product management approach', 'Metaverse projects']
      })
    };
    
    // Check for keyword matches
    for (const [keyword, responseFunc] of Object.entries(keywordResponses)) {
      if (message.includes(keyword) || 
          (keyword === 'skills' && (message.includes('tech') || message.includes('technology'))) ||
          (keyword === 'projects' && (message.includes('work') || message.includes('portfolio'))) ||
          (keyword === 'contact' && (message.includes('reach') || message.includes('email') || message.includes('touch'))) ||
          (keyword === 'leaf' && (message.includes('leaf') || message.includes('corner') || message.includes('bottom'))) ||
          (keyword === 'workExperience' && (message.includes('experience') || message.includes('job') || message.includes('career') || message.includes('employment')))) {
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
  // Check if chatbot container exists
  if (document.querySelector('.chatbot-container')) {
    console.log('Initializing PersonalChatbot...');
    window.personalChatbot = new PersonalChatbot();
    console.log('PersonalChatbot initialization complete');
  } else {
    console.log('Waiting for chatbot container to be created...');
    setTimeout(initPersonalChatbot, 100);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPersonalChatbot);
} else {
  initPersonalChatbot();
}