// 🌟 Loading Screen 控制
function initLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen');
  
  // 確保所有資源載入完成
  window.addEventListener('load', () => {
    // 延遲3秒顯示完整動畫效果
    setTimeout(() => {
      if (loadingScreen) {
        loadingScreen.classList.add('fade-out');
        
        // 動畫完成後移除元素
        setTimeout(() => {
          loadingScreen.remove();
          // 顯示聊天機器人
          if (window.personalChatbot && window.personalChatbot.showChatbot) {
            window.personalChatbot.showChatbot();
          }
        }, 1600); // 與CSS transition時間同步
      }
    }, 3000);
  });
}

// 延遲獲取 DOM 元素，確保在 DOM 載入後獲取
let header = null;
let app = null;

// 初始化 DOM 元素引用
function initDOMElements() {
  header = document.getElementById("header");
  app = document.getElementById("app");
  
  // 確保導航默認可見
  if (header) {
    header.classList.add('nav-visible');
    header.classList.remove('nav-hidden');
  }
  
  console.log('DOM elements initialized:', {
    header: !!header,
    app: !!app
  });
  
  if (!app) {
    console.error('错誤: 找不到 app 元素!');
    return false;
  }
  
  return true;
}

// 頁腳模板
const footer = `
    <!-- Footer -->
    <footer class="contact-footer">
      <div class="footer-content">
        <!-- 左邊：介紹和信息 -->
        <div class="footer-section footer-left">
          <h4>Ray</h4>
          <p>Product Manager & Front-end Developer bridging strategy and execution — creating digital experiences shaped by technology, grounded in human behavior, and refined through both empathy and technical craft.</p>
        </div>

        <!-- 中間：聯絡信息 -->
        <div class="footer-section footer-center">
          <h4>Contact Info</h4>
          <div class="contact-info">
            <div class="contact-item">
              <span class="contact-icon">✉</span>
              <div class="contact-details">
                <span class="contact-label">Email</span>
                <a href="mailto:ray68125@gmail.com">ray68125@gmail.com</a>
              </div>
            </div>
            <div class="contact-item">
              <span class="contact-icon">📍</span>
              <div class="contact-details">
                <span class="contact-label">Location</span>
                <span>Taipei, Taiwan</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 右邊：連結 -->
        <div class="footer-section footer-right">
          <h4>Elsewhere</h4>
          <div class="footer-links">
            <a href="https://github.com/oorongtee" target="_blank" title="GitHub">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z"/>
              </svg>
              GitHub
            </a>
            <a href="https://medium.com/@ray841206" target="_blank" title="Medium">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
              </svg>
              Medium
            </a>
            <a href="https://www.linkedin.com/in/ray-chen-112916331/" target="_blank" title="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
            <a href="#" onclick="showResumeError(); return false;" title="Resume">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
              </svg>
              Resume
            </a>
          </div>
        </div>
      </div>

      <!-- 下方：版權 -->
      <div class="footer-bottom">
        <p>© 2025 Ray. All rights reserved.</p>
      </div>
    </footer>
  `;

// 頁面模板
const pages = {
  home: `
    <!-- Hero Section -->
    <section class="section-lg">
      <div class="container">
        <div class="hero-content">
          <!-- Main Content Grid -->
          <div class="grid lg:grid-cols-2 gap-16 items-center">
            <!-- Photo Section -->
            <div class="photo-section">
              <div class="photo-block image-container">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzQwIiBoZWlnaHQ9IjQyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJyZ2JhKDI0MCwgMjI4LCAyMTAsIDAuMSkiLz48L3N2Zz4=" 
                     alt="Ray - A digital experience craftsman focused on empathy-driven solutions" 
                     class="photo lazy-image"
                     data-src="/assets/images/profile/profile-alt-1.jpg"
                     loading="lazy"
                     decoding="async">
              </div>
              <div class="photo-actions">
                <a href="#/works" class="btn btn-primary gentle-hover">
                  <span>Explore My Work</span>
                  <!-- Lucide Arrow Right -->
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </a>
                <a href="#/contact" class="btn btn-secondary gentle-hover">
                  <!-- Lucide Heart -->
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                  Let's Connect
                </a>
              </div>
            </div>

            <!-- Text Content -->
            <div class="text-content">
              <div class="intro-badge">
                <span class="badge badge-nature">Digital Experience Craftsman</span>
              </div>
              
              <h1 class="hero-title">
                I craft <span class="text-accent">digital experiences</span><br>
                that matter — not just interfaces.
              </h1>
              
              <div class="hero-subtitle">
                <p class="lead-text">
                  Bridging strategy and execution with empathy-driven design, I create meaningful solutions 
                  shaped by technology, grounded in human behavior, and refined through both analytical rigor and technical craft.
                </p>
              </div>

              <div class="value-props">
                <div class="value-item">
                  <!-- Lucide Users -->
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <span>Bridge between business, design, and engineering</span>
                </div>
                <div class="value-item">
                  <!-- Lucide Lightbulb -->
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path>
                    <path d="M9 18h6"></path>
                    <path d="M10 22h4"></path>
                  </svg>
                  <span>Rapid prototyping for idea validation</span>
                </div>
                <div class="value-item">
                  <!-- Lucide Heart -->
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                  <span>Gentle leadership focused on human needs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="section bg-gradient services-section-new">
      <div class="container">
        <div class="text-center mb-12">
          <h2 class="text-h2 mb-4 services-title">What I Do</h2>
          <p class="text-body-lg services-subtitle max-w-2xl mx-auto">
            From strategy to implementation, I bridge the gap between business goals and technical execution
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          <div class="card services-card">
            <div class="card-header">
              <div class="flex items-center gap-6">
                <div class="badge services-badge-number">01</div>
                <h3 class="card-title services-card-title">Product Management</h3>
              </div>
            </div>
            <div class="card-content">
              <p class="services-card-text">
                I translate business goals into actionable product decisions. Through competitive analysis, user research, and clear prioritization, I shape the product roadmap and ensure every feature delivers real user and business value.
              </p>
            </div>
            <div class="card-footer">
              <span class="badge services-badge">Product Strategy</span>
              <span class="badge services-badge">User Research</span>
              <span class="badge services-badge">Execution</span>
            </div>
          </div>

          <div class="card services-card">
            <div class="card-header">
              <div class="flex items-center gap-6">
                <div class="badge services-badge-number">02</div>
                <h3 class="card-title services-card-title">Front-end Development</h3>
              </div>
            </div>
            <div class="card-content">
              <p class="services-card-text">
                Self-taught in modern web development with React, JavaScript ES6+, and front-end technologies. I build functional prototypes and production-ready applications that bridge design and engineering.
              </p>
            </div>
            <div class="card-footer">
              <span class="badge services-badge">React</span>
              <span class="badge services-badge">JavaScript</span>
              <span class="badge services-badge">Front-end</span>
            </div>
          </div>

          <div class="card services-card">
            <div class="card-header">
              <div class="flex items-center gap-6">
                <div class="badge services-badge-number">03</div>
                <h3 class="card-title services-card-title">Cross-functional Collaboration</h3>
              </div>
            </div>
            <div class="card-content">
              <p class="services-card-text">
                I facilitate communication between business, design, and engineering teams. I understand how to align technical feasibility with business goals.
              </p>
            </div>
            <div class="card-footer">
              <span class="badge services-badge">Leadership</span>
              <span class="badge services-badge">Communication</span>
              <span class="badge services-badge">Alignment</span>
            </div>
          </div>

          <div class="card services-card">
            <div class="card-header">
              <div class="flex items-center gap-6">
                <div class="badge services-badge-number">04</div>
                <h3 class="card-title services-card-title">UX & Data-Driven Iteration</h3>
              </div>
            </div>
            <div class="card-content">
              <p class="services-card-text">
                I believe in continuous improvement through testing and feedback. I leverage data insights and UX principles to guide product decisions and refine user experiences.
              </p>
            </div>
            <div class="card-footer">
              <span class="badge services-badge">Testing</span>
              <span class="badge services-badge">Insights</span>
              <span class="badge services-badge">Optimization</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="interests-section">
      <div class="interests-content">
        <p class="interests-text">
          Beyond work, I love connecting with nature, enjoying the tranquility of the seaside and the challenge of mountain climbing.
          These moments allow me to relax and recharge, while also bringing inspiration to my creative work.
        </p>
        <div class="interests-media">
          <div class="video-carousel">
            <div class="carousel-container">
              <video class="nature-video active" autoplay muted loop playsinline>
                <source src="/assets/images/media/about-video-1.mov" type="video/mp4">
                Your browser does not support the video tag.
              </video>
              <video class="nature-video" autoplay muted loop playsinline>
                <source src="/assets/images/media/about-video-2.mov" type="video/mp4"
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          <div class="image-carousel">
            <div class="carousel-container">
              <img src="/assets/images/gallery/nature-scene-1.jpg" alt="Nature Scene" class="nature-image active">
              <img src="/assets/images/gallery/mountain-adventure.jpg" alt="Mountain Adventure" class="nature-image">
              <img src="/assets/images/gallery/outdoor-exploration.jpg" alt="Outdoor Exploration" class="nature-image">
            </div>
          </div>
        </div>
      </div>
    </section>
    ${footer}
  `,
  about: `
    <main class="page-content about-page timeline-page">
      <div class="hero-content">
        <h1>About Me.</h1>
        <p class="page-subtitle">My journey through technology, creativity, and human connection</p>
        
        <!-- Interactive Timeline Container -->
        <div class="timeline-container">
          <div class="timeline-line"></div>
          
          <!-- Timeline Nodes -->
          <div class="timeline-node" data-category="introduction">
            <div class="node-marker">
              <span class="node-icon"></span>
            </div>
            <div class="timeline-card glassmorphism timeline-card-intro" data-node="intro">
              <div class="card-header">
                <h3>Hello, I'm Ray</h3>
                <span class="card-badge">Introduction</span>
              </div>
              <div class="card-content">
                <p>A Product Manager and Front-end Developer who bridges strategy with execution, creating digital experiences that truly matter to people.</p>
              </div>
              <div class="card-expand-trigger">
                <span>Learn More</span>
                <svg class="expand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              <div class="card-expanded-content">
                <h4>My Philosophy</h4>
                <p>I believe technology becomes powerful when it connects with people on a human level. My background in political economy and philosophy gives me a unique lens for approaching product challenges with both analytical rigor and empathetic understanding.</p>
                <p>As a Product Manager and Front-end Developer, I focus on creating digital experiences that bridge the gap between complex technical concepts and meaningful human interactions. Every project is an opportunity to make technology more accessible and impactful for the people who use it.</p>
              </div>
            </div>
          </div>

          <div class="timeline-node" data-category="skills">
            <div class="node-marker">
              <span class="node-icon"></span>
            </div>
            <div class="timeline-card glassmorphism timeline-card-skills" data-node="skills">
              <div class="card-header">
                <h3>Core Capabilities</h3>
                <span class="card-badge skills">Skills</span>
              </div>
              <div class="card-content">
                <p>Versatile skill set spanning product management, user experience, and technical implementation.</p>
              </div>
              <div class="card-expand-trigger">
                <span>View Skills</span>
                <svg class="expand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              <div class="card-expanded-content">
                <div class="skills-grid">
                  <div class="skill-category">
                    <h4>Product Management</h4>
                    <ul>
                      <li>Strategic roadmap planning & prioritization</li>
                      <li>Cross-functional team coordination</li>
                      <li>User research & Data analysis</li>
                      <li>Agile development methodologies</li>
                    </ul>
                  </div>
                  <div class="skill-category">
                    <h4>Technical Skills</h4>
                    <ul>
                      <li>React.js & modern JavaScript (ES6+)</li>
                      <li>Responsive web design & CSS</li>
                      <li>API integration & data visualization</li>
                      <li>Rapid prototyping & MVP development</li>
                    </ul>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div class="timeline-node" data-category="experience">
            <div class="node-marker">
              <span class="node-icon"></span>
            </div>
            <div class="timeline-card glassmorphism timeline-card-experience" data-node="experience">
              <div class="card-header">
                <h3>Professional Journey</h3>
                <span class="card-badge experience">Experience</span>
              </div>
              <div class="card-content">
                <p>Building innovative products in blockchain technologies, focusing on user adoption and meaningful experiences.</p>
              </div>
              <div class="card-expand-trigger">
                <span>View Experience</span>
                <svg class="expand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              <div class="card-expanded-content">
                <div class="experience-timeline">
                  <div class="exp-item">
                    <div class="exp-header">
                      <h4>Product Manager</h4>
                      <span class="exp-company">Locas Technology</span>
                      <span class="exp-period">2023Aug-2023Oct</span>
                    </div>
                    <p>Blockchain application development with focus on user research, competitive analysis, and cross-functional team coordination. Bridged complex technical concepts with user-friendly experiences.</p>
                  </div>
                  <div class="exp-item">
                    <div class="exp-header">
                      <h4>Project Coordinator</h4>
                      <span class="exp-company">BITAPE Technology</span>
                      <span class="exp-period">2022Mar-2023May</span>
                    </div>
                    <p>Contributed to Freeport Metaverse game development, integrating innovative blockchain technologies with engaging user experiences. Managed community engagement, game design and content strategy.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>



          <div class="timeline-node" data-category="vision">
            <div class="node-marker">
              <span class="node-icon"></span>
            </div>
            <div class="timeline-card glassmorphism timeline-card-vision" data-node="vision">
              <div class="card-header">
                <h3>Future Vision</h3>
                <span class="card-badge vision">What's Next</span>
              </div>
              <div class="card-content">
                <p>Passionate about creating technology that makes a positive impact on people's lives and communities.</p>
              </div>
              <div class="card-expand-trigger">
                <span>Learn More</span>
                <svg class="expand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              <div class="card-expanded-content">
                <h4>What Drives Me Forward</h4>
                <p>I'm excited about collaborating on projects that create meaningful change. Whether it's improving accessibility, building sustainable solutions, or fostering genuine human connections through technology.</p>
                <div class="vision-items">
                  <div class="vision-item">
                    <h5>Social Impact</h5>
                    <p>Working on products that address real societal challenges and improve quality of life for communities.</p>
                  </div>
                  <div class="vision-item">
                    <h5>Collaborative Innovation</h5>
                    <p>Building bridges between diverse teams, ideas, and technologies to create solutions greater than the sum of their parts.</p>
                  </div>
                  <div class="vision-item">
                    <h5>Intentional Technology</h5>
                    <p>Developing tools and experiences that enhance human capabilities without overwhelming or replacing human judgment.</p>
                  </div>
                </div>
                <div class="cta-section">
                  <p><strong>Ready to collaborate?</strong> I'm open to consulting opportunities, product partnerships, and meaningful projects.</p>
                  <a href="#/contact" class="timeline-cta-btn" onclick="navigateTo('contact')">
                    <span>Start a Conversation</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
        
        <div class="about-content">




          <!-- Playful & Modern Version -->
          <div class="about-version enhanced-section" id="about-enhanced">
            <div class="about-header">
              <h2 class="about-headline gradient-headline">Product Manager + Front-end Developer</h2>
            </div>
            
            <section class="about-section origin-story-section">
              <div class="content-box earth-shadow hover-animated accessible">
                <h4><span class="section-icon"></span>The Origin Story</h4>
                <p>Started in political economy and philosophy, got lost in big ideas, and accidentally discovered my real talent: translating complexity into experiences people actually enjoy using. Now I'm that rare creature who speaks product strategy, user empathy, and JavaScript—fluently.</p>
              </div>
            </section>

            <section class="about-section what-i-bring-section">
              <div class="content-box earth-shadow hover-animated accessible">
                <h4><span class="section-icon"></span>What I Bring</h4>
                <div class="values-grid playful">
                <div class="value-item playful truth-telling">
                  <h4>Truth-Telling</h4>
                  <p>No buzzword soup here. I call things as they are, cut through the noise, and build products that solve real, human problems — not imaginary KPI fantasies.</p>
                </div>
                <div class="value-item playful mind-reading">
                  <h4>Mind-Reading</h4>
                  <p>Not actual magic—just sharp user research plus a habit of observing people a little too closely. The result? Features that feel like I read your mind.</p>
                </div>
                <div class="value-item playful evolution-mode">
                  <h4>Evolution Mode</h4>
                  <p>I’m always upgrading. Today it's React.js and product frameworks; tomorrow it might be AI-driven ecosystems or something we don’t even have a name for yet.</p>
                </div>
                <div class="value-item playful system-thinking">
                  <h4>System Thinking</h4>
                  <p>I zoom out to see the system, zoom in to fix the detail, and connect everything into something scalable, maintainable, and meaningful.</p>
                </div>
                </div>
              </div>
            </section>

            <section class="about-section personal-section">
              <div class="content-box earth-shadow hover-animated accessible">
                <h4><span class="section-icon"></span>When I'm Not Coding...</h4>
                <p>You'll catch me devouring sci-fi novels, street photography adventures, or getting lost in architectural rabbit holes during travel. I can discuss both Blade Runner && Javascript with equal enthusiasm!</p>
                <h4><span class="section-icon"></span>What I’m Looking For</h4>
                <p>I’m ready to team up with people who want to build things that matter. Small social impact ideas that need clarity? I’m in. Consulting projects where I can flex both PM strategy and dev execution? Even better. Let’s make digital experiences that genuinely improve life—one thoughtful interface at a time.</p>

                <div class="cta-content">
                  <h3>Ready to Build Something Awesome?</h3>
                  <p>Let's chat about your next project over virtual coffee!</p>
                  <a href="#/contact" class="contact-btn" onclick="navigateTo('contact'); return false;">
                    <span>Get In Touch</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </svg>
                  </a>
                </div>
              </div>
            </section>
            
          </div>
        </div>
      </div>
    </main>

    ${footer}
  `,

  works: `
    <main class="page-content works-page">
      <div class="hero-content">
        <h1>Works.</h1>
        
        <div class="works-container">
          <!-- 中央：項目網格與分類 -->
          <div class="works-center-section">
            <div class="works-filter">
              <button class="filter-btn active" data-filter="all">All</button>
              <button class="filter-btn" data-filter="projects">Projects</button>
              <button class="filter-btn" data-filter="dev">Dev</button>
              <button class="filter-btn" data-filter="designs">Designs</button>
            </div>

            <div class="works-grid" id="worksGrid">
              <!-- 項目卡片會動態生成 -->
            </div>
          </div>
        </div>

        <!-- 右側滑出面板 -->
        <div class="works-detail-overlay" id="worksDetailOverlay">
          <button class="detail-close-btn" id="detailCloseBtn">×</button>
          <div class="works-detail-section" id="worksDetail">
            <!-- 項目詳情會動態生成 -->
          </div>
        </div>
      </div>
    </main>

    ${footer}
  `,
  
  notes: `
    <main class="page-content notes-page">
      <div class="hero-content">
        <h1>My Notes</h1>
        
        <!-- 搜尋和篩選 -->
        <div class="notes-search-section">
          <div class="search-container">
            <input type="text" id="notesSearch" placeholder="Search notes..." class="search-input">
            <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
              <path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          
          <div class="notes-filter">
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="development">Development</button>
            <button class="filter-btn" data-filter="life-exploration">Life Exploration</button>
            <button class="filter-btn" data-filter="humanity">Humanity</button>
            <button class="filter-btn" data-filter="product-management">Product Management</button>
          </div>
        </div>
        
        <!-- 文章列表 -->
        <div class="notes-container">
          <div class="notes-grid" id="notesGrid">
            <!-- 文章卡片會動態生成 -->
          </div>
        </div>
      </div>
    </main>

    ${footer}
  `,
  
  contact: `
    <main class="page-content contact-page">
      <div class="hero-content">
        <h1>Contact Me</h1>
        
        <div class="contact-content">
        <div class="contact-intro">
          <div class="contact-avatar">
            <img src="/assets/images/profile/profile-contact.png" alt="Ray's Photo" class="profile-photo">
            <div class="status-indicator">
              <span class="status-dot"></span>
              <span class="status-text">Usually responds within 2 days</span>
            </div>
          </div>
          <div class="contact-personal-info">
            <p class="contact-subtitle">Hi there! I'm Ray — a Product Manager & Front-end Developer.</p>
            <p class="response-info">💬 I read and respond to every message myself. Whether you're reaching out about opportunities, collaboration, or simply to connect, I'm always happy to hear from you.</p>
          </div>
        </div>

        <div class="contact-wrapper">
          <!-- 左邊：聯絡表單 -->
          <div class="contact-form-section">
            <div class="form-header">
              <h3>Send me a message</h3>
              <p class="form-description">I'll get back to you within 2-3 business days. All fields are required.</p>
            </div>
            <form class="contact-form">
              <!-- Honeypot field for spam protection -->
              <input type="text" name="website" style="display: none;" tabindex="-1" autocomplete="off">
              <div class="form-group">
                <label>Name</label>
                <input type="text" name="name" placeholder="Please enter your name" required>
              </div>

              <div class="form-group">
                <label>Email</label>
                <input type="email" name="email" placeholder="Please enter your email" required>
              </div>

              <div class="form-group">
                <label>Subject</label>
                <input type="text" name="subject" placeholder="Please enter your subject" required>
              </div>

              <div class="form-group">
                <label>Message</label>
                <textarea name="message" placeholder="Please enter your message" rows="5" required></textarea>
              </div>

              <div class="form-message" id="form-message"></div>
              <button type="submit" class="submit-btn" id="submit-btn">
                <span class="btn-text">Send Message</span>
                <span class="btn-loading" style="display: none;">
                  <svg class="loading-spinner" width="16" height="16" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-dasharray="32" stroke-dashoffset="32">
                      <animate attributeName="stroke-dashoffset" dur="1s" repeatCount="indefinite" values="32;0"/>
                    </circle>
                  </svg>
                  Sending...
                </span>
              </button>
              
              <!-- Rate Limiting Information Panel -->
              <div class="rate-limit-info" id="rate-limit-info">
                <h4>📧 Message Delivery & Security</h4>
                <p>To maintain security and prevent spam, I've implemented the following measures:</p>
                <ul>
                  <li><strong>Cooldown Period:</strong> 2 minutes between messages</li>
                  <li><strong>Daily Limit:</strong> Maximum 5 messages per day</li>
                  <li><strong>Alternative Contact:</strong> For urgent matters, email me directly at <a href="mailto:ray68125@gmail.com">ray68125@gmail.com</a></li>
                </ul>
              </div>
            </form>
          </div>

          <!-- 右邊：聯絡信息 -->
          <div class="contact-info-section">
            <h3>Contact Info</h3>
            
            <div class="info-item">
              <span class="info-icon">✉</span>
              <div>
                <p class="info-label">Email</p>
                <a href="mailto:ray68125@gmail.com">ray68125@gmail.com</a>
              </div>
            </div>

            <div class="info-item">
              <span class="info-icon">📍</span>
              <div>
                <p class="info-label">Location</p>
                <p>Taipei, Taiwan</p>
              </div>
            </div>

            <div class="social-links-contact">
              <p class="info-label">Social Links</p>
              <div class="social-icons-contact">
                <a href="https://github.com/oorongtee" target="_blank" title="GitHub">
                  <span class="social-link-text">GitHub</span>
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V21"></path>
                  </svg>
                </a>
                <span class="social-divider">/</span>
                <a href="https://medium.com/@ray841206" target="_blank" title="Medium">
                  <span class="social-link-text">Medium</span>
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                    <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0"></path>
                  </svg>
                </a>
                <span class="social-divider">/</span>
                <a href="https://www.linkedin.com/in/ray-chen-112916331/" target="_blank" title="LinkedIn">
                  <span class="social-link-text">LinkedIn</span>
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"></path>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <span class="social-divider">/</span>
                <a href="#" onclick="showResumeError(); return false;" title="Resume">
                  <span class="social-link-text">Resume</span>
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="12" y1="11" x2="12" y2="17"></line>
                    <line x1="9" y1="14" x2="15" y2="14"></line>
                  </svg>
                </a>

                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </main>

    ${footer}
  `
};

// Works 頁面數據
const worksData = [
  {
    id: 1,
    title: "Ray's Personal Website",
    category: "dev",
    subtitle: "AI-driven development workflow showcase with modern portfolio features",
    description: "A living demonstration of AI-agent-led development, where Copilot AI paired with Claude Sonnet 4 served as the primary development driver. This portfolio showcases the complete workflow transformation from traditional coding to context engineering, featuring dynamic weather integration, AI chatbot assistant, and comprehensive development documentation in the GitHub README.",
    technologies: ["AI-Driven Development", "Context Engineering", "Claude Sonnet 4", "Workflow Optimization"],
    website: "",
    github: "https://github.com/oorongtee/personalWebsite",
    document: "./docs/PersonalWebsite_Spec.pdf",
    image: "/assets/images/projects/ray-personal-website.png"
  },
  {
    id: 2,
    title: "Freeport Metaverse Game",
    category: "projects",
    subtitle: "A cross-platform metaverse game integrating blockchain for virtual asset management.",
    description: "Contributed to the planning and coordination of a metaverse game with cross-platform virtual asset management. Hand-on with community engagement, created product, and designed game missions and narrative contents. Collaborated closely with cross-functional teams to support development and feature execution.",
    technologies: ["Game Design", "Community Management", "Content Strategy"],
    website: "",
    github: "",
    image: "/assets/images/projects/freeport-metaverse.jpg"
  }
];

// Notes 頁面數據
const notesData = [
  {
    id: 1,
    title: "How I leverage AI in my everyday work",
    description: "Here's how I use it to my advantage.",
    category: "technology-education",
    date: "2024-03-10",
    icon: "ai",
    color: "#FF6B35"
  },
  {
    id: 2,
    title: "JS for the shape of interaction",
    description: "Make interfaces behave like people expect.",
    category: "development",
    date: "2024-03-15",
    icon: "js",
    color: "#F7DF1E"
  }
];

// 全域導航控制函數
function hideNavigation() {
  const header = document.getElementById('header');
  if (header) {
    header.classList.remove('nav-visible');
    header.classList.add('nav-hidden');
  }
}

function showNavigation() {
  const header = document.getElementById('header');
  if (header) {
    header.classList.remove('nav-hidden');
    header.classList.add('nav-visible');
  }
}

// Resume error message function
function showResumeError() {
  if (window.NotificationManager && typeof window.NotificationManager.error === 'function') {
    window.NotificationManager.error('Ray has not created a CV yet');
  } else {
    alert('Ray has not created a CV yet');
  }
}

// 初始化 Works 頁面
function initWorksPage() {
  const worksGrid = document.getElementById("worksGrid");
  const worksDetail = document.getElementById("worksDetail");
  const worksDetailOverlay = document.getElementById("worksDetailOverlay");
  const detailCloseBtn = document.getElementById("detailCloseBtn");
  const filterBtns = document.querySelectorAll(".filter-btn");

  if (!worksGrid) return;

  // 打開詳情面板
  function openDetailPanel(work) {
    const techTags = work.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
    worksDetail.innerHTML = `
      <div class="detail-content">
        <div class="detail-header">
          <h2>${work.title}</h2>
          <p class="detail-subtitle">${work.subtitle}</p>
          ${work.image ? `<div class="detail-image"><img src="${work.image}" alt="${work.title}" /></div>` : ''}
        </div>
        <p class="detail-description">${work.description}</p>
        <div class="detail-technologies">
          <h4>Technologies</h4>
          <div class="tech-list">
            ${techTags}
          </div>
        </div>
        <div class="detail-links">
          ${work.website ? `<a href="${work.website}" target="_blank" class="detail-link">🔗 Website</a>` : ''}
          ${work.github ? `<a href="${work.github}" target="_blank" class="detail-link">Github</a>` : ''}
          ${work.document ? `<a href="${work.document}" target="_blank" class="detail-link">📄 Document</a>` : ''}
        </div>
      </div>
    `;
    worksDetailOverlay.classList.add('open');
    
    // 🎯 智能隱藏導航 - 使用優雅的延遲效果
    setTimeout(() => {
      hideNavigation();
    }, 300);
  }

  // 關閉詳情面板
  function closeDetailPanel() {
    worksDetailOverlay.classList.remove('open');
    
    // 🎯 智能顯示導航 - 立即顯示以提供更好的用戶體驗
    showNavigation();
  }

  // 渲染項目卡片
  function renderWorks(filter = 'all') {
    worksGrid.innerHTML = '';
    const filtered = filter === 'all' ? worksData : worksData.filter(work => work.category === filter);
    
    filtered.forEach(work => {
      const card = document.createElement('div');
      card.className = 'work-card';
      card.innerHTML = `
        ${work.image ? `<div class="work-card-image"><img src="${work.image}" alt="${work.title}" /></div>` : ''}
        <div class="work-card-content">
          <div class="work-card-inner">
            <h3>${work.title}</h3>
            <p class="work-subtitle">${work.subtitle}</p>
          </div>
        </div>
        <div class="work-card-hover-overlay">
          <div class="hover-content">
            <h3 class="hover-title">${work.title}</h3>
            <p class="hover-subtitle">${work.subtitle}</p>
            <div class="hover-description">
              <p>${work.description}</p>
            </div>
            <div class="hover-technologies">
              ${work.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="hover-actions">
              <span class="view-details">View Details</span>
            </div>
          </div>
        </div>
      `;
      
      card.addEventListener('click', () => {
        openDetailPanel(work);
        // 高亮當前卡片
        document.querySelectorAll('.work-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      });
      
      card.addEventListener('mouseenter', () => {
        card.classList.add('hovered');
      });
      
      card.addEventListener('mouseleave', () => {
        card.classList.remove('hovered');
      });
      
      worksGrid.appendChild(card);
    });
  }

  // 篩選按鈕事件
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderWorks(filter);
      // 關閉詳情面板
      closeDetailPanel();
    });
  });

  // 關閉按鈕事件
  detailCloseBtn.addEventListener('click', closeDetailPanel);

  // 點擊背景關閉
  worksDetailOverlay.addEventListener('click', (e) => {
    if (e.target === worksDetailOverlay) {
      closeDetailPanel();
    }
  });

  // 初始渲染
  renderWorks();
}

// 初始化 Notes 頁面
function initNotesPage() {
  const notesGrid = document.getElementById("notesGrid");
  const searchInput = document.getElementById("notesSearch");
  const filterBtns = document.querySelectorAll(".notes-filter .filter-btn");

  if (!notesGrid || !window.ArticleSystem) {
    console.warn('Notes grid or ArticleSystem not available');
    return;
  }

  // 創建響應式網格和過濾器
  const grid = new window.ArticleSystem.ResponsiveGrid(notesGrid);
  const articleCards = window.ArticleSystem.SAMPLE_ARTICLES.map(article => 
    new window.ArticleSystem.ArticleCard(article)
  );
  
  const filter = new window.ArticleSystem.ArticleFilter(
    window.ArticleSystem.SAMPLE_ARTICLES,
    (filteredArticles) => {
      const filteredCards = filteredArticles.map(article => 
        new window.ArticleSystem.ArticleCard(article)
      );
      grid.renderItems(filteredCards);
    }
  );

  // 搜尋功能
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      filter.setSearch(e.target.value);
    });
  }

  // 分類篩選
  filterBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      // 移除所有按鈕的 active 類
      filterBtns.forEach(b => b.classList.remove("active"));
      // 添加到當前按鈕
      e.target.classList.add("active");
      
      const filterValue = e.target.dataset.filter;
      filter.setCategory(filterValue);
    });
  });

  // 初始渲染
  grid.addItems(articleCards);
  
  console.log('📚 Notes page initialized with', articleCards.length, 'articles');
}

// 頁面加載時的初始化

// ============================================
// 圖片優化與延遲載入
// ============================================

// 圖片延遲載入觀察器
let imageObserver = null;

// 初始化圖片延遲載入
function initImageLazyLoading() {
  // 檢查瀏覽器支援
  if ('IntersectionObserver' in window) {
    imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadImage(entry.target);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });
  }
}

// 載入單一圖片（增強版）
function loadImage(img) {
  return new Promise((resolve, reject) => {
    // 檢查是否支援 WebP 格式
    // Use original image format - WebP conversion disabled
    let imageSrc = img.dataset.src || img.src;
    loadImageWithSrc(img, imageSrc, resolve, reject);
  });
}

// 實際載入圖片的函數
function loadImageWithSrc(img, src, resolve, reject) {
  const imageLoader = new Image();
  
  // 設定載入開始時間
  const startTime = performance.now();
  
  imageLoader.onload = () => {
    const loadTime = performance.now() - startTime;
    console.log(`Image loaded in ${loadTime.toFixed(2)}ms:`, src);
    
    // 使用淡入動畫
    img.style.opacity = '0';
    img.src = imageLoader.src;
    img.classList.add('loaded');
    img.classList.remove('loading');
    
    // 淡入效果
    setTimeout(() => {
      img.style.transition = 'opacity 0.3s ease';
      img.style.opacity = '1';
    }, 10);
    
    if (imageObserver) {
      imageObserver.unobserve(img);
    }
    
    resolve(img);
  };
  
  imageLoader.onerror = () => {
    const loadTime = performance.now() - startTime;
    console.error(`Image failed to load after ${loadTime.toFixed(2)}ms:`, src);
    
    // 載入失敗，使用美化的佔位圖
    const fallbackSvg = createFallbackImage(img.alt || 'Image not available');
    img.src = fallbackSvg;
    img.classList.add('loaded', 'error');
    img.classList.remove('loading');
    
    if (imageObserver) {
      imageObserver.unobserve(img);
    }
    
    // 顯示用戶友好的錯誤訊息
    showImageLoadError(src);
    
    reject(new Error('Failed to load image'));
  };
  
  // 設定載入超時（10秒）
  setTimeout(() => {
    if (!img.classList.contains('loaded')) {
      imageLoader.onerror();
    }
  }, 10000);
  
  imageLoader.src = src;
}

// 檢查 WebP 支援
function checkWebPSupport() {
  if (typeof checkWebPSupport.supported !== 'undefined') {
    return checkWebPSupport.supported;
  }
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  const supported = canvas.toDataURL('image/webp').indexOf('webp') > -1;
  checkWebPSupport.supported = supported;
  return supported;
}

// 測試圖片是否存在
function testImageExists(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
    setTimeout(() => resolve(false), 3000); // 3秒超時
  });
}

// 創建美化的錯誤佔位圖
function createFallbackImage(alt) {
  const svg = `
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fallbackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:rgba(240,228,210,0.1);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgba(240,228,210,0.05);stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#fallbackGradient)"/>
      <circle cx="200" cy="120" r="30" fill="rgba(240,228,210,0.2)"/>
      <path d="M185 105 L215 105 L200 135 Z" fill="rgba(240,228,210,0.3)"/>
      <text x="50%" y="70%" font-family="Inter, sans-serif" font-size="14" fill="rgba(240,228,210,0.6)" text-anchor="middle">${alt}</text>
    </svg>
  `;
  return 'data:image/svg+xml;base64,' + btoa(svg);
}

// 顯示圖片載入錯誤提示 - 現代化設計
function showImageLoadError(src) {
  const filename = src.split('/').pop();
  
  // 不要顯示太多錯誤訊息，避免干擾用戶
  if (Date.now() - (showImageLoadError.lastShown || 0) > 5000) {
    NotificationSystem.info(`📷 ${filename}`, {
      title: 'Image Loading',
      subtitle: 'Using fallback display',
      duration: 2000,
      position: 'bottom-right'
    });
    showImageLoadError.lastShown = Date.now();
  }
}

// 處理特定圖片延遲載入（僅針對文章圖片）
function setupLazyImages() {
  const images = document.querySelectorAll('img[data-src], .note-card img, .article-card img');
  const startTime = performance.now();
  
  console.log(`Setting up lazy loading for ${images.length} article images...`);
  
  images.forEach((img, index) => {
    // 添加載入類別，預設為loading狀態
    img.classList.add('lazy-image', 'loading');
    
    // 預載入文章圖片
    if (img.src && !img.src.includes('data:image/svg+xml')) {
      preloadImage(img.src || img.dataset.src).then(() => {
        img.classList.remove('loading');
        img.classList.add('loaded');
      }).catch(() => {
        img.classList.remove('loading');
        img.classList.add('error');
      });
    }
    
    // 設定圖片屬性以優化效能
    img.setAttribute('loading', 'lazy');
    img.setAttribute('decoding', 'async');
    
    // 為重要圖片（首屏）設定較高優先級
    if (index < 3) {
      img.setAttribute('fetchpriority', 'high');
    }
    
    if (imageObserver) {
      imageObserver.observe(img);
    } else {
      // 備用：延遲載入以避免阻塞
      setTimeout(() => {
        loadImage(img);
      }, index * 100);
    }
  });
  
  const setupTime = performance.now() - startTime;
  console.log(`Lazy loading setup completed in ${setupTime.toFixed(2)}ms`);
}

// 創建適應性圖片佔位符
function createImagePlaceholder(img) {
  const width = img.getAttribute('width') || 400;
  const height = img.getAttribute('height') || 300;
  const alt = img.alt || 'Loading...';
  
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:rgba(240,228,210,0.1);stop-opacity:1" />
          <stop offset="50%" style="stop-color:rgba(240,228,210,0.2);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgba(240,228,210,0.1);stop-opacity:1" />
        </linearGradient>
        <animateTransform attributeName="gradientTransform" type="translate" 
                          values="-100 0;100 0;-100 0" dur="2s" repeatCount="indefinite"/>
      </defs>
      <rect width="100%" height="100%" fill="url(#shimmer)"/>
      <text x="50%" y="50%" font-family="Inter, sans-serif" font-size="12" 
            fill="rgba(240,228,210,0.4)" text-anchor="middle" dy=".3em">${alt}</text>
    </svg>
  `;
  return 'data:image/svg+xml;base64,' + btoa(svg);
}

// 圖片壓縮與優化
function optimizeImages() {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    // 添加 loading="lazy" 屬性（現代瀏覽器原生支持）
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
    
    // 添加 decoding="async" 提升效能
    if (!img.hasAttribute('decoding')) {
      img.setAttribute('decoding', 'async');
    }
  });
}

// ============================================
// 用戶回饋機制
// ============================================

// 顯示成功訊息 (使用新的通知系統)
// 這個函數現在由 notificationSystem.js 提供
// function showSuccessMessage 已移至 notificationSystem.js

// 顯示錯誤訊息 (使用新的通知系統)
// 這個函數現在由 notificationSystem.js 提供
// function showErrorMessage 已移至 notificationSystem.js

// 添加點擊回饋效果
function addClickFeedback() {
  document.addEventListener('click', (e) => {
    const element = e.target;
    
    // 為按鈕和連結添加點擊效果
    if (element.matches('button, .btn, a, .card, .work-card')) {
      element.classList.add('clicked');
      
      setTimeout(() => {
        element.classList.remove('clicked');
      }, 200);
    }
  });
}

// 修正 navigateTo 函數，確保正確處理首次載入和無效路由
function navigateTo(route) {
  console.log('Navigating to:', route);
  
  // 確保 app 元素存在
  if (!app) {
    console.error('错誤: app 元素不存在!');
    return;
  }
  
  // 檢查是否為notes子路由（文章詳情）
  if (route.startsWith('notes/')) {
    const articleSlug = route.split('/')[1];
    loadArticlePage(articleSlug);
    return;
  }
  
  const page = pages[route];
  console.log('Loading page content for route:', route);
  
  if (!page) {
    console.error('錯誤: 找不到頁面內容:', route);
    if (window.NotificationManager && typeof window.NotificationManager.warning === 'function') {
      window.NotificationManager.warning(`Page not found: ${route}`, {
        subtitle: 'Redirecting to home page...',
        duration: 3000
      });
    }
    // 導航到首頁而不是 404
    if (route !== 'home') {
      navigateTo('home');
    }
    return;
  }
  
  app.innerHTML = `<div class="main-content">${page}</div>`;
  
  // 設定圖片延遲載入和優化
  setTimeout(() => {
    setupLazyImages();
    optimizeImages();
  }, 100);
  console.log('Page content loaded successfully');
  console.log('App element after content load:', app);
  console.log('Content length:', page.length);
  window.scrollTo(0, 0);

  // 更新 URL
  const newHash = `#/${route}`;
  console.log('Setting hash to:', newHash);
  history.pushState(null, null, newHash);
  
  // 更新導航指示器
  if (navigation && navigation.updateIndicatorForRoute) {
    navigation.updateIndicatorForRoute(route);
  }

  // 顯示導航（確保在一般頁面導航時導航是可見的）
  showNavigation();

  // 如果是 works 頁面，初始化項目網格
  if (route === 'works') {
    initWorksPage();
  }
  
  // 如果是 notes 頁面，初始化文章列表
  if (route === 'notes') {
    initNotesPage();
  }
  
  // 如果是 home 頁面，初始化輪播
  if (route === 'home') {
    initCarousels();
  }
  
  // 如果是 contact 頁面，添加表單提交監聽和即時驗證
  if (route === 'contact') {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', handleContactFormSubmit);
      
      // 添加即時驗證
      const inputs = contactForm.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        input.addEventListener('blur', function() {
          validateFieldRealTime(this);
        });
        
        input.addEventListener('input', function() {
          // 清除錯誤狀態當用戶開始輸入
          if (this.classList.contains('error')) {
            this.classList.remove('error');
            const errorMsg = this.parentNode.querySelector('.field-error');
            if (errorMsg) {
              errorMsg.remove();
            }
          }
        });
      });
    }
  }
}

// 即時欄位驗證
function validateFieldRealTime(field) {
  const value = field.value.trim();
  const fieldName = field.name;
  let errorMessage = '';
  
  // 清除之前的錯誤
  field.classList.remove('error');
  const existingError = field.parentNode.querySelector('.field-error');
  if (existingError) {
    existingError.remove();
  }
  
  // 驗證各欄位
  switch (fieldName) {
    case 'name':
      if (value && value.length < 2) {
        errorMessage = 'Name must be at least 2 characters long';
      }
      break;
    case 'email':
      if (value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errorMessage = 'Please enter a valid email address';
        }
      }
      break;
    case 'subject':
      if (value && value.length < 3) {
        errorMessage = 'Subject must be at least 3 characters long';
      }
      break;
    case 'message':
      if (value && value.length < 10) {
        errorMessage = 'Message must be at least 10 characters long';
      }
      break;
  }
  
  // 顯示錯誤訊息
  if (errorMessage) {
    field.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = errorMessage;
    field.parentNode.appendChild(errorDiv);
  }
}

// 暴露 navigateTo 為全局函數
window.navigateTo = navigateTo;

// 處理 hash 變化，添加 fallback
window.addEventListener('hashchange', () => {
  let hash = window.location.hash.slice(1); // 移除 #
  if (hash.startsWith('/')) {
    hash = hash.slice(1); // 移除 /
  }
  const route = hash || 'home'; // 預設跳轉到 home
  console.log('Hash changed to:', route);
  navigateTo(route);
});

// 初始化導航指示器
function initNavigationIndicator() {
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav a');
  
  // 創建指示器元素
  const indicator = document.createElement('div');
  indicator.className = 'nav-indicator';
  nav.appendChild(indicator);
  
  // 更新指示器位置
  function updateIndicator(activeLink) {
    if (activeLink && indicator) {
      // 使用 requestAnimationFrame 確保 DOM 更新完成
      requestAnimationFrame(() => {
        try {
          // 獲取導航容器的相對位置
          const navRect = nav.getBoundingClientRect();
          const linkRect = activeLink.getBoundingClientRect();
          
          // 計算相對於導航容器的位置
          const relativeLeft = linkRect.left - navRect.left;
          const relativeTop = linkRect.top - navRect.top;
          
          indicator.style.left = relativeLeft + 'px';
          indicator.style.width = activeLink.offsetWidth + 'px';
          indicator.style.height = activeLink.offsetHeight + 'px';
          indicator.style.top = relativeTop + 'px';
          
          console.log('Navigation indicator updated for:', activeLink.getAttribute('data-route'));
        } catch (error) {
          console.error('Error updating navigation indicator:', error);
        }
      });
    }
  }
  
  // 根據路由名稱更新指示器
  function updateIndicatorForRoute(routeName) {
    console.log('Updating indicator for route:', routeName);
    
    // 移除所有 active 類別
    document.querySelectorAll('.nav a').forEach(l => l.classList.remove('active'));
    
    // 對於筆記文章路由，normalize 到 'notes'
    let normalizedRoute = routeName;
    if (routeName && routeName.startsWith('notes/')) {
      normalizedRoute = 'notes';
    }
    
    // 找到對應的導航連結
    const targetLink = document.querySelector(`.nav a[data-route="${normalizedRoute}"]`);
    if (targetLink) {
      targetLink.classList.add('active');
      updateIndicator(targetLink);
    } else {
      console.warn('No navigation link found for route:', routeName);
    }
  }
  
  // 設置初始指示器位置 - 多次嘗試確保正確初始化
  function initializeIndicator() {
    const initialRoute = getCurrentRoute();
    console.log('Initializing indicator for route:', initialRoute);
    
    // 確保導航元素已完全渲染
    const targetLink = document.querySelector(`.nav a[data-route="${initialRoute}"]`);
    if (targetLink && targetLink.offsetWidth > 0) {
      updateIndicatorForRoute(initialRoute);
    } else {
      // 如果元素還未完全渲染，延遲重試
      setTimeout(initializeIndicator, 100);
    }
  }
  
  // 初始化指示器
  setTimeout(initializeIndicator, 100);
  
  // 監聽窗口大小變化，重新計算位置
  window.addEventListener('resize', () => {
    const currentRoute = getCurrentRoute();
    setTimeout(() => {
      updateIndicatorForRoute(currentRoute);
    }, 100);
  });
  
  // 監聽字體載入完成，重新計算位置
  if (document.fonts) {
    document.fonts.ready.then(() => {
      const currentRoute = getCurrentRoute();
      updateIndicatorForRoute(currentRoute);
    });
  }
  
  return { indicator, updateIndicator, updateIndicatorForRoute };
}

// 獲取當前路由
function getCurrentRoute() {
  let hash = window.location.hash.slice(1); // 移除 #
  if (hash.startsWith('/')) {
    hash = hash.slice(1); // 移除 /
  }
  return hash || 'home';
}

// 全局導航對象
let navigation = null;

// 初始化導航事件監聽器
function initNavigation() {
  console.log('Setting up navigation event listeners...');
  
  // 導航連結點擊 - 包含桌面和手機版
  const allNavLinks = document.querySelectorAll('.nav a, .mobile-nav-menu a');
  console.log('Found navigation links:', allNavLinks.length);
  
  allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const route = link.getAttribute('data-route');
      console.log('Navigation clicked:', route);
      
      // 如果是手機版導航，關閉選單
      closeMobileNav();
      
      // navigateTo will handle indicator updates
      navigateTo(route);
    });
  });

  // 初始化手機版導航
  initMobileNavigation();

  // 滾動事件 - header 效果
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
  
  console.log('Navigation initialized');
}

// 🚀 Enhanced Mobile Navigation with Better UX
function initMobileNavigation() {
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileNavClose = document.getElementById('mobileNavClose');
  const mobileNavLinks = mobileNavOverlay?.querySelectorAll('a[data-route]');
  
  if (!mobileMenuToggle || !mobileNavOverlay || !mobileNavClose) {
    console.log('Mobile navigation elements not found, skipping mobile nav setup');
    return;
  }
  
  // Enhanced open mobile navigation with visual feedback
  mobileMenuToggle.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Add click feedback animation
    mobileMenuToggle.style.transform = 'scale(0.95)';
    setTimeout(() => {
      mobileMenuToggle.style.transform = '';
    }, 150);
    
    openMobileNav();
  });
  
  // Enhanced close with visual feedback
  mobileNavClose.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Add visual feedback
    mobileNavClose.style.transform = 'rotate(90deg) scale(0.9)';
    setTimeout(() => {
      mobileNavClose.style.transform = '';
      closeMobileNav();
    }, 150);
  });
  
  // 點擊背景關閉選單
  mobileNavOverlay.addEventListener('click', (e) => {
    if (e.target === mobileNavOverlay) {
      closeMobileNav();
    }
  });
  
  // ESC 鍵關閉選單
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNavOverlay.classList.contains('open')) {
      closeMobileNav();
    }
  });
  
  // Enhanced mobile nav link clicks
  mobileNavLinks?.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Add visual feedback
      link.style.transform = 'translateY(-4px) scale(1.05)';
      link.style.boxShadow = '0 8px 20px rgba(34, 197, 94, 0.3)';
      
      const route = link.getAttribute('data-route');
      if (route) {
        setTimeout(() => {
          closeMobileNav();
          setTimeout(() => {
            loadPage(route);
          }, 250);
        }, 200);
      }
    });
  });
  
  console.log('🚀 Enhanced mobile navigation initialized');
}

function openMobileNav() {
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  if (mobileNavOverlay) {
    // Store scroll position to prevent jumping
    const scrollY = window.scrollY;
    
    mobileNavOverlay.classList.add('open');
    
    // Enhanced scroll prevention
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    
    // Store scroll position for restoration
    document.body.dataset.scrollY = scrollY;
  }
}

function closeMobileNav() {
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  if (mobileNavOverlay) {
    mobileNavOverlay.classList.remove('open');
    
    // Restore scroll position smoothly
    const scrollY = document.body.dataset.scrollY || 0;
    
    // Reset body styles
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    
    // Restore scroll position
    window.scrollTo(0, parseInt(scrollY));
    
    // Clean up
    delete document.body.dataset.scrollY;
  }
}

// ============================================
// EmailJS 初始化與表單提交
// ============================================

// 檢查 EmailJS 是否載入
if (typeof emailjs === 'undefined') {
  console.error('EmailJS not loaded! Contact form will not work.');
} else {
  console.log('✅ EmailJS loaded successfully');
  // 初始化 EmailJS
  emailjs.init("lH__yZMP01RGP0bD3");  // 已填入您的 Public Key
  console.log('✅ EmailJS initialized');
}

// Contact form rate limiting
let lastSubmissionTime = 0;
const SUBMISSION_COOLDOWN = 120000; // 2 minutes
const MAX_DAILY_SUBMISSIONS = 5;
const DAILY_SUBMISSION_KEY = 'dailySubmissions';
const SUBMISSION_DATE_KEY = 'lastSubmissionDate';

// Get current daily submission count
function getDailySubmissionCount() {
  const today = new Date().toDateString();
  const lastDate = localStorage.getItem(SUBMISSION_DATE_KEY);
  const count = parseInt(localStorage.getItem(DAILY_SUBMISSION_KEY) || '0');
  
  if (lastDate !== today) {
    // Reset count for new day
    localStorage.setItem(SUBMISSION_DATE_KEY, today);
    localStorage.setItem(DAILY_SUBMISSION_KEY, '0');
    return 0;
  }
  
  return count;
}

// Increment daily submission count
function incrementDailySubmissionCount() {
  const count = getDailySubmissionCount();
  localStorage.setItem(DAILY_SUBMISSION_KEY, (count + 1).toString());
}

// Check if user can submit
function canSubmitMessage() {
  const now = Date.now();
  const timeSinceLastSubmission = now - lastSubmissionTime;
  const dailyCount = getDailySubmissionCount();
  
  return {
    canSubmit: timeSinceLastSubmission >= SUBMISSION_COOLDOWN && dailyCount < MAX_DAILY_SUBMISSIONS,
    dailyLimitReached: dailyCount >= MAX_DAILY_SUBMISSIONS,
    cooldownRemaining: Math.max(0, SUBMISSION_COOLDOWN - timeSinceLastSubmission),
    dailyCount: dailyCount
  };
}

// 處理表單提交
function handleContactFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const messageDiv = document.getElementById('form-message');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');
  
  // Check rate limiting
  const rateLimitCheck = canSubmitMessage();
  
  if (!rateLimitCheck.canSubmit) {
    if (rateLimitCheck.dailyLimitReached) {
      if (window.NotificationManager && typeof window.NotificationManager.warning === 'function') {
        window.NotificationManager.warning('Daily message limit reached', {
          subtitle: `You have reached the daily limit of ${MAX_DAILY_SUBMISSIONS} messages. Please try again tomorrow or contact me directly at ray68125@gmail.com`,
          duration: 10000,
          actionButton: {
            text: 'Copy Email',
            label: 'Copy email address to clipboard',
            onClick: () => {
              navigator.clipboard.writeText('ray68125@gmail.com');
              if (window.NotificationManager && typeof window.NotificationManager.success === 'function') {
                window.NotificationManager.success('Email address copied to clipboard');
              }
            }
          }
        });
      } else {
        alert(`Daily message limit reached. Please try again tomorrow or contact me at ray68125@gmail.com`);
      }
    } else {
      const remainingMinutes = Math.ceil(rateLimitCheck.cooldownRemaining / 60000);
      if (window.NotificationManager && typeof window.NotificationManager.warning === 'function') {
        window.NotificationManager.warning('Please wait before sending another message', {
          subtitle: `To prevent spam, there's a 2-minute cooldown between messages. Please wait ${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''} before trying again.`,
          duration: 8000
        });
      } else {
        alert(`Please wait ${remainingMinutes} minute(s) before sending another message.`);
      }
    }
    return;
  }
  
  // 清除之前的訊息
  clearFormMessage();
  
  // 添加提交動畫反饋
  form.classList.add('form-submitting');
  
  // Honeypot spam protection check
  const honeypot = form.querySelector('input[name="website"]')?.value || '';
  if (honeypot) {
    console.log('Spam detected via honeypot');
    // Silently ignore spam submissions with fake success
    setTimeout(() => {
      showFormMessage(
        '✅ <strong>Thank you for your message!</strong><br>' +
        'We have received your inquiry and will get back to you soon.',
        'success'
      );
      form.reset();
      form.classList.remove('form-submitting');
    }, 1500); // 模擬真實提交時間
    return;
  }
  
  // 獲取表單數據
  const name = form.querySelector('input[name="name"]')?.value?.trim() || '';
  const email = form.querySelector('input[name="email"]')?.value?.trim() || '';
  const subject = form.querySelector('input[name="subject"]')?.value?.trim() || '';
  const message = form.querySelector('textarea[name="message"]')?.value?.trim() || '';
  
  // 即時欄位驗證反饋
  const fields = [
    { name: 'name', value: name, element: form.querySelector('input[name="name"]') },
    { name: 'email', value: email, element: form.querySelector('input[name="email"]') },
    { name: 'subject', value: subject, element: form.querySelector('input[name="subject"]') },
    { name: 'message', value: message, element: form.querySelector('textarea[name="message"]') }
  ];
  
  // 清除之前的錯誤狀態
  fields.forEach(field => {
    field.element.classList.remove('error', 'valid');
  });
  
  // 詳細驗證
  const validation = validateContactForm({ name, email, subject, message });
  if (!validation.isValid) {
    // 標記錯誤欄位
    fields.forEach(field => {
      if (validation.fieldErrors && validation.fieldErrors[field.name]) {
        field.element.classList.add('error');
        // 添加震動效果
        field.element.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
          field.element.style.animation = '';
        }, 500);
      } else if (field.value) {
        field.element.classList.add('valid');
      }
    });
    
    if (window.NotificationManager && typeof window.NotificationManager.error === 'function') {
      window.NotificationManager.error('Form validation failed', {
        subtitle: validation.errors.join(' | '),
        duration: 6000
      });
    } else {
      alert('Form validation failed: ' + validation.errors.join(' | '));
    }
    form.classList.remove('form-submitting');
    return;
  }
  
  // 標記所有欄位為有效
  fields.forEach(field => {
    field.element.classList.add('valid');
  });
  
  // 檢查 EmailJS 是否可用
  if (typeof emailjs === 'undefined') {
    if (window.NotificationManager && typeof window.NotificationManager.error === 'function') {
      window.NotificationManager.error('Email service temporarily unavailable', {
        subtitle: 'Please contact me directly at ray68125@gmail.com',
        persistent: true,
        actionButton: {
          text: 'Copy Email',
          label: 'Copy email address to clipboard',
          onClick: () => {
            navigator.clipboard.writeText('ray68125@gmail.com');
            if (window.NotificationManager && typeof window.NotificationManager.success === 'function') {
              window.NotificationManager.success('Email address copied to clipboard');
            }
          }
        }
      });
    } else {
      alert('Email service temporarily unavailable. Please contact me directly at ray68125@gmail.com');
    }
    form.classList.remove('form-submitting');
    return;
  }
  
  // 顯示載入狀態
  setLoadingState(true);
  
  // 準備郵件參數
  const templateParams = {
    from_name: name,
    from_email: email,
    reply_to: email,
    to_name: 'Ray',
    to_email: 'ray68125@gmail.com',
    subject: subject,
    message: message
  };
  
  // 發送郵件
  emailjs.send('service_fetlagj', 'template_4ns0c4a', templateParams)
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
      
      // Update rate limiting tracking
      lastSubmissionTime = Date.now();
      incrementDailySubmissionCount();
      
      const remainingSubmissions = MAX_DAILY_SUBMISSIONS - getDailySubmissionCount();
      let subtitle = 'Thank you for reaching out. I will get back to you within 24-48 hours.';
      
      if (remainingSubmissions <= 2 && remainingSubmissions > 0) {
        subtitle += ` Note: You have ${remainingSubmissions} message${remainingSubmissions !== 1 ? 's' : ''} remaining today (daily limit: ${MAX_DAILY_SUBMISSIONS}).`;
      } else if (remainingSubmissions === 0) {
        subtitle += ' This was your last message for today. For urgent matters, please contact me directly at ray68125@gmail.com.';
      }
      
      if (window.NotificationManager && typeof window.NotificationManager.success === 'function') {
        window.NotificationManager.success('Message sent successfully! 😃', {
          subtitle: 'Thank you for reaching out. I will reply you within 24-48 hours.',
          duration: 10000,
          icon: '📩'
        });
      } else {
        alert('Message sent successfully! 😃\nThank you for reaching out. I will reply you within 24-48 hours.');
      }
      
      // Show rate limiting info panel after successful submission
      const rateLimitInfo = document.getElementById('rate-limit-info');
      if (rateLimitInfo) {
        rateLimitInfo.classList.add('show');
        // Auto-hide after 30 seconds
        setTimeout(() => {
          rateLimitInfo.classList.remove('show');
        }, 30000);
      }
      
      form.reset();
    })
    .catch(function(error) {
      console.error('EmailJS Error:', error);
      if (window.NotificationManager && typeof window.NotificationManager.error === 'function') {
        window.NotificationManager.error('Failed to send message', {
          subtitle: 'There was a technical issue. Please try again or contact me directly.',
          actionButton: {
            text: 'Copy Email',
            label: 'Copy email address to clipboard',
            onClick: () => {
              navigator.clipboard.writeText('ray68125@gmail.com');
              if (window.NotificationManager && typeof window.NotificationManager.success === 'function') {
                window.NotificationManager.success('Email address copied to clipboard');
              }
            }
          },
          duration: 10000
        });
      } else {
        alert('Failed to send message. Please try again or contact ray68125@gmail.com directly.');
      }
    })
    .finally(function() {
      setLoadingState(false);
    });
}

// 表單驗證函數
function validateContactForm({ name, email, subject, message }) {
  const errors = [];
  
  // 姓名驗證
  if (!name) {
    errors.push('• Please enter your <strong>name</strong>');
  } else if (name.length < 2) {
    errors.push('• Name must be at least <strong>2 characters</strong> long');
  }
  
  // Email 驗證
  if (!email) {
    errors.push('• Please enter your <strong>email address</strong>');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push('• Please enter a <strong>valid email address</strong>');
    }
  }
  
  // 主旨驗證
  if (!subject) {
    errors.push('• Please enter a <strong>subject</strong>');
  } else if (subject.length < 3) {
    errors.push('• Subject must be at least <strong>3 characters</strong> long');
  }
  
  // 訊息驗證
  if (!message) {
    errors.push('• Please enter your <strong>message</strong>');
  } else if (message.length < 10) {
    errors.push('• Message must be at least <strong>10 characters</strong> long');
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

// 顯示表單訊息
function showFormMessage(message, type) {
  const messageDiv = document.getElementById('form-message');
  messageDiv.innerHTML = message;
  messageDiv.className = `form-message ${type}`;
  messageDiv.style.display = 'block';
  
  // 滾動到訊息位置
  messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// 清除表單訊息
function clearFormMessage() {
  const messageDiv = document.getElementById('form-message');
  messageDiv.style.display = 'none';
  messageDiv.className = 'form-message';
  messageDiv.innerHTML = '';
}

// 設定載入狀態
function setLoadingState(isLoading) {
  const submitBtn = document.getElementById('submit-btn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');

  submitBtn.disabled = isLoading;
  btnText.style.display = isLoading ? 'none' : 'inline';
  btnLoading.style.display = isLoading ? 'inline-flex' : 'none';
  
  if (isLoading) {
    submitBtn.classList.add('loading');
  } else {
    submitBtn.classList.remove('loading');
  }
}

// 輪播功能
function initCarousels() {
  // 初始化影片輪播
  const videos = document.querySelectorAll('.nature-video');
  if (videos.length > 1) {
    let currentVideoIndex = 0;
    let videoErrorCount = 0;
    
    // 為每個影片添加錯誤處理
    videos.forEach((video, index) => {
      video.addEventListener('error', () => {
        videoErrorCount++;
        console.error(`Video ${index + 1} failed to load`);
        showMediaError('video', index + 1);
      });
      
      video.addEventListener('loadstart', () => {
        console.log(`Video ${index + 1} started loading`);
      });
    });
    
    // 確保第一個影片開始播放
    videos[0].play().catch(e => {
      console.log('Video autoplay prevented:', e);
      showMediaError('video', 1, 'Autoplay prevented');
    });
    
    setInterval(() => {
      if (videoErrorCount < videos.length) {
        videos[currentVideoIndex].classList.remove('active');
        videos[currentVideoIndex].pause(); // 暫停當前影片
        
        currentVideoIndex = (currentVideoIndex + 1) % videos.length;
        
        videos[currentVideoIndex].classList.add('active');
        videos[currentVideoIndex].currentTime = 0; // 重頭播放
        videos[currentVideoIndex].play().catch(e => {
          console.log('Video play failed:', e);
          showMediaError('video', currentVideoIndex + 1, 'Playback failed');
        });
      }
    }, 5000); // 每5秒切換，給影片更多時間
  }
  
  // 初始化圖片輪播
  const images = document.querySelectorAll('.nature-image');
  if (images.length > 1) {
    let currentImageIndex = 0;
    let imageErrorCount = 0;
    
    // 為每個圖片添加錯誤處理
    images.forEach((img, index) => {
      img.addEventListener('error', () => {
        imageErrorCount++;
        console.error(`Image ${index + 1} failed to load`);
        showMediaError('image', index + 1);
      });
      
      img.addEventListener('load', () => {
        console.log(`Image ${index + 1} loaded successfully`);
      });
    });
    
    setInterval(() => {
      if (imageErrorCount < images.length) {
        images[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % images.length;
        images[currentImageIndex].classList.add('active');
      }
    }, 4000); // 每4秒切換
  }
}

// 媒體載入錯誤提示函數
function showMediaError(mediaType, index, reason = 'Failed to load') {
  const errorMessage = `${mediaType === 'video' ? '影片' : '圖片'} ${index} 載入失敗: ${reason}`;
  
  // 創建錯誤提示元素
  const errorDiv = document.createElement('div');
  errorDiv.className = 'media-error-toast';
  errorDiv.innerHTML = `
    <div class="error-content">
      <span class="error-icon">⚠️</span>
      <span class="error-text">${errorMessage}</span>
    </div>
  `;
  
  // 添加到頁面
  document.body.appendChild(errorDiv);
  
  // 3秒後自動移除
  setTimeout(() => {
    if (errorDiv.parentNode) {
      errorDiv.remove();
    }
  }, 3000);
}



// 環境光初始化
function initAmbientLight() {
  const ambientLight = document.createElement('div');
  ambientLight.className = 'ambient-light';
  document.body.appendChild(ambientLight);
}

// 綠色畫布初始化
function initGreenCanvas() {
  const greenCanvas = document.createElement('div');
  greenCanvas.className = 'green-canvas';
  document.body.appendChild(greenCanvas);
}

// 溫和色塊效果初始化
function initNeonEffects() {
  console.log('初始化溫和色塊效果...');
  
  // 檢查是否已存在
  const existing = document.querySelector('.gentle-colors');
  if (existing) {
    existing.remove();
    console.log('移除舊的色塊容器');
  }
  
  // 創建色塊容器
  const colorContainer = document.createElement('div');
  colorContainer.className = 'gentle-colors';
  document.body.appendChild(colorContainer);
  console.log('色塊容器已創建，z-index:', window.getComputedStyle(colorContainer).zIndex);
  
  // 創建3個大色塊
  for (let i = 0; i < 3; i++) {
    const colorBlob = document.createElement('div');
    colorBlob.className = 'color-blob';
    colorBlob.style.animationDelay = (i * 10) + 's';
    colorContainer.appendChild(colorBlob);
    console.log(`色塊 ${i+1} 已創建，背景:`, window.getComputedStyle(colorBlob).background);
  }
  
  console.log('溫和色塊效果創建完成，總共', colorContainer.children.length, '個色塊');
}

// 初始化背景效果
function initBackgroundEffects() {
  console.log('=== 初始化背景效果 ===');
  try {
    initAmbientLight();
    console.log('✅ 環境光效果已初始化');
  } catch (error) {
    console.error('❌ 環境光效果初始化失敗:', error);
  }
  
  try {
    initGreenCanvas();
    console.log('✅ 綠色畫布已初始化');
  } catch (error) {
    console.error('❌ 綠色畫布初始化失敗:', error);
  }
  
  try {
    initNeonEffects();
    console.log('✅ 溫和色塊效果已初始化');
  } catch (error) {
    console.error('❌ 溫和色塊效果初始化失敗:', error);
  }
}



// 主初始化函數
function initializeApp() {
  console.log('Initializing app...');
  
  // 首先初始化 DOM 元素
  if (!initDOMElements()) {
    console.error('初始化失敗: DOM 元素不可用');
    return;
  }
  
  // 初始化導航指示器
  navigation = initNavigationIndicator();
  
  // 初始化導航事件監聽器
  initNavigation();
  
  // 初始化圖片優化功能
  initImageLazyLoading();
  
  // 初始化增強的用戶交互功能
  addClickFeedback();
  initEnhancedHoverEffects();
  initAccessibilityFeatures();
  initPerformanceOptimizations();
  
  // 初始化頁面 - 修正路由解析
  let currentRoute = window.location.hash.slice(1); // 移除 #
  if (currentRoute.startsWith('/')) {
    currentRoute = currentRoute.slice(1); // 移除 /
  }
  if (!currentRoute) {
    currentRoute = 'home';
  }
  console.log('Initial route detected:', currentRoute);
  navigateTo(currentRoute);
  
  // 重新啟用背景效果
  console.log('正在重新啟用背景效果...');
  
  // 初始化所有背景效果
  try {
    initBackgroundEffects();
    console.log('✅ 所有背景效果已初始化');
  } catch (error) {
    console.error('❌ 背景效果初始化失敗:', error);
  }
  
  // 確保天氣系統已經初始化
  setTimeout(() => {
    if (window.weatherVisualizer) {
      console.log('✅ 天氣系統已運行');
    } else {
      console.log('⚠️ 天氣系統尚未初始化，將手動初始化...');
      try {
        window.weatherVisualizer = new WeatherVisualizer();
        console.log('✅ 天氣系統手動初始化成功');
      } catch (error) {
        console.error('❌ 天氣系統初始化失敗:', error);
      }
    }
  }, 1000);
  
  // 初始化 Loading Screen
  initLoadingScreen();
  
  console.log('All systems initialized');
}

// 圖片預載入策略
function preloadCriticalImages() {
  const criticalImages = [
    '/assets/images/profile/profile-alt-1.jpg',
    // 添加其他關鍵圖片
  ];
  
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
}

// 預載入單個圖片
function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

// 圖片效能監控
function monitorImagePerformance() {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((entries) => {
      entries.getEntries().forEach(entry => {
        if (entry.initiatorType === 'img') {
          console.log(`Image loaded: ${entry.name} in ${entry.duration.toFixed(2)}ms`);
        }
      });
    });
    observer.observe({ entryTypes: ['resource'] });
  }
}

// 🎨 Enhanced Hover Effects for Better UX
function initEnhancedHoverEffects() {
  // Enhanced card hover effects
  const cards = document.querySelectorAll('.card, .services-card, .note-card');
  cards.forEach(card => {
    let hoverTimeout;
    
    card.addEventListener('mouseenter', () => {
      clearTimeout(hoverTimeout);
      card.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      card.style.transform = 'translateY(-6px) scale(1.02)';
      card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2), 0 8px 16px rgba(34, 197, 94, 0.1)';
    });
    
    card.addEventListener('mouseleave', () => {
      hoverTimeout = setTimeout(() => {
        card.style.transform = '';
        card.style.boxShadow = '';
      }, 50);
    });
  });
  
  console.log('🎨 Enhanced hover effects initialized');
}

// ♿ Accessibility Features
function initAccessibilityFeatures() {
  // Focus indicators for keyboard navigation (excluding nav links)
  const focusableElements = document.querySelectorAll('input, textarea, [tabindex]:not([tabindex="-1"])');
  
  focusableElements.forEach(element => {
    element.addEventListener('focus', () => {
      element.style.outline = '2px solid rgba(34, 197, 94, 0.6)';
      element.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', () => {
      element.style.outline = '';
      element.style.outlineOffset = '';
    });
  });
  
  console.log('♿ Accessibility features initialized (nav elements excluded)');
}

// ⚡ Performance Optimizations
function initPerformanceOptimizations() {
  // Optimize scroll performance
  let ticking = false;
  
  function updateOnScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        ticking = false;
      });
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', updateOnScroll, { passive: true });
  console.log('⚡ Performance optimizations initialized');
}

// ============================================
//   📚 ARTICLE SYSTEM INTEGRATION
// ============================================

// 載入文章詳情頁面
function loadArticlePage(slug) {
  if (!window.ArticleSystem) {
    console.error('ArticleSystem not loaded');
    navigateTo('notes');
    return;
  }
  
  const article = window.ArticleSystem.SAMPLE_ARTICLES.find(a => a.slug === slug);
  
  if (!article) {
    console.warn('Article not found:', slug);
    navigateTo('notes');
    return;
  }
  
  const articlePage = new window.ArticleSystem.ArticlePage(article);
  app.innerHTML = `<div class="main-content">${articlePage.render()}</div>`;
  
  // 隱藏導航（類似WORKS頁面的體驗）
  setTimeout(() => {
    hideNavigationForContent();
  }, 300);
  
  // 更新URL
  const newHash = `#/notes/${slug}`;
  history.pushState(null, null, newHash);
  
  // 更新導航指示器為notes
  if (navigation && navigation.updateIndicatorForRoute) {
    navigation.updateIndicatorForRoute('notes');
  }
  
  window.scrollTo(0, 0);
}

// 導航控制函數
function hideNavigationForContent() {
  const header = document.getElementById('header');
  if (header) {
    header.classList.remove('nav-visible');
    header.classList.add('nav-hidden');
  }
}

function showNavigationForContent() {
  const header = document.getElementById('header');
  if (header) {
    header.classList.remove('nav-hidden');
    header.classList.add('nav-visible');
  }
}

// Interactive Timeline Functionality for About Page
class TimelineManager {
  constructor() {
    this.timelineNodes = [];
    this.observer = null;
    this.isInitialized = false;
  }
  
  cleanup() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    // 移除之前的事件監聽器
    this.timelineNodes.forEach(node => {
      const expandTrigger = node.querySelector('.card-expand-trigger');
      if (expandTrigger) {
        expandTrigger.replaceWith(expandTrigger.cloneNode(true));
      }
    });
    this.timelineNodes = [];
  }

  init() {
    // 重置初始化狀態，允許重新渲染
    this.cleanup();
    this.isInitialized = false;
    
    this.timelineNodes = document.querySelectorAll('.timeline-node');
    if (this.timelineNodes.length === 0) return;
    
    console.log('🚀 Initializing interactive timeline...', { nodes: this.timelineNodes.length });
    
    // Setup intersection observer for scroll animations
    this.setupScrollAnimations();
    
    // Setup card interactions
    this.setupCardInteractions();
    
    // Setup accessibility
    this.setupAccessibility();
    
    this.isInitialized = true;
    console.log('✅ Timeline initialized successfully');
  }

  setupScrollAnimations() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      // Skip animations if user prefers reduced motion
      this.timelineNodes.forEach(node => node.classList.add('animate-in'));
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Add staggered animation delay based on index
            const nodeIndex = Array.from(this.timelineNodes).indexOf(entry.target);
            setTimeout(() => {
              entry.target.classList.add('animate-in');
            }, nodeIndex * 150);
          }
        });
      },
      {
        root: null,
        rootMargin: '-100px 0px -100px 0px',
        threshold: 0.3
      }
    );

    this.timelineNodes.forEach(node => {
      this.observer.observe(node);
    });
  }

  setupCardInteractions() {
    const timelineCards = document.querySelectorAll('.timeline-card');
    
    timelineCards.forEach(card => {
      const expandTrigger = card.querySelector('.card-expand-trigger');
      const expandedContent = card.querySelector('.card-expanded-content');
      
      if (!expandTrigger || !expandedContent) return;

      expandTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleCard(card);
      });

      // Keyboard support
      expandTrigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleCard(card);
        }
      });

      // Make expand trigger focusable
      expandTrigger.setAttribute('tabindex', '0');
      expandTrigger.setAttribute('role', 'button');
    });
  }

  toggleCard(card) {
    const isExpanded = card.classList.contains('expanded');
    const expandTrigger = card.querySelector('.card-expand-trigger span');
    
    if (isExpanded) {
      card.classList.remove('expanded');
      expandTrigger.textContent = this.getExpandText(card);
      card.setAttribute('aria-expanded', 'false');
    } else {
      // Close other expanded cards for better UX
      document.querySelectorAll('.timeline-card.expanded').forEach(otherCard => {
        if (otherCard !== card) {
          otherCard.classList.remove('expanded');
          otherCard.setAttribute('aria-expanded', 'false');
          const otherTrigger = otherCard.querySelector('.card-expand-trigger span');
          if (otherTrigger) {
            otherTrigger.textContent = this.getExpandText(otherCard);
          }
        }
      });
      
      card.classList.add('expanded');
      expandTrigger.textContent = 'Show Less';
      card.setAttribute('aria-expanded', 'true');
      
      // Reduced scroll distance - only slight adjustment
      setTimeout(() => {
        const cardRect = card.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Only scroll if card is significantly out of view
        if (cardRect.bottom > windowHeight + 50) {
          const scrollOffset = window.scrollY + (cardRect.bottom - windowHeight) + 80; // Small adjustment
          window.scrollTo({ 
            top: scrollOffset,
            behavior: 'smooth'
          });
        }
      }, 300);
    }
  }

  getExpandText(card) {
    const nodeData = card.getAttribute('data-node');
    const expandTexts = {
      'intro': 'Learn More',
      'skills': 'View Skills', 
      'experience': 'View Experience',
      'projects': 'Explore Projects',
      'vision': 'Learn More'
    };
    return expandTexts[nodeData] || 'Learn More';
  }

  setupAccessibility() {
    // Add ARIA labels and descriptions
    this.timelineNodes.forEach((node, index) => {
      const card = node.querySelector('.timeline-card');
      const expandTrigger = node.querySelector('.card-expand-trigger');
      const expandedContent = node.querySelector('.card-expanded-content');
      
      if (card && expandTrigger && expandedContent) {
        const nodeId = `timeline-node-${index}`;
        const contentId = `timeline-content-${index}`;
        
        card.setAttribute('id', nodeId);
        expandedContent.setAttribute('id', contentId);
        expandTrigger.setAttribute('aria-controls', contentId);
        expandTrigger.setAttribute('aria-expanded', 'false');
        
        // Add descriptive labels
        const category = node.getAttribute('data-category');
        const title = card.querySelector('.card-header h3')?.textContent;
        
        if (title) {
          expandTrigger.setAttribute('aria-label', `Expand ${title} section`);
        }
      }
    });
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.isInitialized = false;
  }
}

// Global timeline manager instance
let timelineManager = null;

// Initialize timeline when on about page
function initTimelinePage() {
  if (document.querySelector('.timeline-page')) {
    if (!timelineManager) {
      timelineManager = new TimelineManager();
    }
    timelineManager.init();
  }
}

// Modified navigateTo function to initialize about page functionality
const originalNavigateTo = window.navigateTo;
window.navigateTo = function(route) {
  // Call original function
  if (originalNavigateTo) {
    originalNavigateTo(route);
  } else {
    navigateTo(route);
  }
  
  // Initialize about page functionality after page load
  if (route === 'about') {
    setTimeout(() => {
      initTimelinePage();
    }, 100);
  }
};

// 確保在 DOM 完全載入後初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    preloadCriticalImages();
    monitorImagePerformance();
    initializeApp();
  });
} else {
  // DOM 已經載入完成，立即初始化
  preloadCriticalImages();
  monitorImagePerformance();
  initializeApp();
}