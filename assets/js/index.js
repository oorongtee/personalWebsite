// 延遲獲取 DOM 元素，確保在 DOM 載入後獲取
let header = null;
let app = null;

// 初始化 DOM 元素引用
function initDOMElements() {
  header = document.getElementById("header");
  app = document.getElementById("app");
  
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
          <p>Product Manager & Front-end Engineer bridging strategy and execution. Specialized in fintech platforms, gaming products, and full-stack web development with a focus on human-centered design.</p>
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
            <a href="#" target="_blank" title="CV">
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
    <main class="hero">
      <div class="hero-content">
        <h1>I'M Ray!</h1>
        
        <div class="hero-main">
          <div class="photo-section">
            <div class="photo-block">
              <img src="./assets/images/pic/RNI-Films-IMG-6B66762A-3B66-4426-A38E-D627A5555A92.JPG" alt="Ray" class="photo">
            </div>
            <div class="photo-buttons">
              <a href="#/works" class="photo-btn work-btn">View My Work</a>
              <a href="#/contact" class="photo-btn contact-btn">Get In Touch</a>
            </div>
          </div>

          <div class="text-block">
            <h2>I'm a Product Manager & Front-end Engineer based in Taipei.</h2>
            <p>
              I bring a multidisciplinary background in political economy, philosophy, and product development to approach challenges with analytical rigor and human-centered thinking. Self-taught in front-end development with hands-on experience in JavaScript, React.js, and modern frameworks. I've led fintech platforms, coordinated metaverse game projects, and built full-featured web applications from the ground up. I believe meaningful digital experiences require both emotional resonance and technical excellence.
            </p>
          </div>
        </div>
      </div>
    </main>

    <section class="cards-section">
      <div class="cards-grid">
        <div class="card">
          <span class="card-number">01</span>
          <h3 class="card-title">Research & Strategy</h3>
          <p class="card-description">I conduct competitive analysis, user research, and market insights to define product vision and strategy. From fintech platforms to metaverse games, I ground every decision in data and user needs.</p>
        </div>

        <div class="card">
          <span class="card-number">02</span>
          <h3 class="card-title">Build & Code</h3>
          <p class="card-description">Self-taught in modern web development with React, JavaScript ES6+, and full-stack technologies. I build functional prototypes and production-ready applications that bridge the gap between design and engineering.</p>
        </div>

        <div class="card">
          <span class="card-number">03</span>
          <h3 class="card-title">Cross-functional Leadership</h3>
          <p class="card-description">I facilitate communication between business, design, and engineering teams. Having worked across blockchain, gaming, and e-commerce, I understand how to align technical feasibility with business goals and user experience.</p>
        </div>

        <div class="card">
          <span class="card-number">04</span>
          <h3 class="card-title">Data-driven Iteration</h3>
          <p class="card-description">I believe in continuous improvement through testing and feedback. Whether managing virtual land sales worth NT$5M+ or optimizing game mechanics, I use data insights to drive product decisions and enhance user engagement.</p>
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
                <source src="./assets/images/pic/1759939484377.MOV" type="video/mp4">
                Your browser does not support the video tag.
              </video>
              <video class="nature-video" autoplay muted loop playsinline>
                <source src="./assets/images/pic/1759939782624.MOV" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </div>
            <span class="media-caption">Ocean Moments</span>
          </div>
          <div class="image-carousel">
            <div class="carousel-container">
              <img src="./assets/images/pic/77120EDE-EAB9-455E-9DA1-B43B688E842A.jpg" alt="Nature Scene" class="nature-image active">
              <img src="./assets/images/pic/BD96E9F9-612B-468F-BBCA-BECE5930AC0E.jpg" alt="Mountain Adventure" class="nature-image">
              <img src="./assets/images/pic/DE6D93A2-A7CA-47E8-B58E-C474B15EF9C6.jpg" alt="Outdoor Exploration" class="nature-image">
            </div>
            <span class="media-caption">Mountain Adventures</span>
          </div>
        </div>
      </div>
    </section>
    ${footer}
  `,
  about: `
    <main class="page-content about-page">
      <div class="hero-content">
        <h1>About Me.</h1>
        
        <div class="about-content">
        <!-- About Me Section -->
        <section class="about-me-section">
          
          <div class="expertise-list">
            <div class="expertise-item">
              <div class="expertise-content">
                <div class="expertise-header">
                  <span class="expertise-icon engineering"></span>
                  <h2>Engineering</h2>
                </div>
                <p class="expertise-description">
                  Self-taught in front-end development with hands-on experience in JavaScript ES6+, React.js, and modern CSS frameworks. Proficient in building full-featured web applications from the ground up, including e-commerce platforms with Redux state management and responsive design. My technical experience allows me to collaborate effectively with engineers, assess feasibility, and balance architecture, performance, and UX considerations.
                </p>
              </div>
              <a href="https://github.com/oorongtee" target="_blank" class="expertise-link">View Github</a>
            </div>

            <div class="expertise-item">
              <div class="expertise-content">
                <div class="expertise-header">
                  <span class="expertise-icon product"></span>
                  <h2>Product</h2>
                </div>
                <p class="expertise-description">
                  Bringing multidisciplinary background in political economy and philosophy to product challenges with analytical rigor and human-centered thinking. Experienced in defining product vision and strategy, conducting market analysis, and creating user-centered workflows using UX tools. Successfully led fintech platform development and coordinated gaming projects with cross-functional teams, achieving significant business outcomes including NT$5M+ in virtual asset transactions.
                </p>
              </div>
              <a href="#/works" class="expertise-link">View Products</a>
            </div>

            <div class="expertise-item">
              <div class="expertise-content">
                <div class="expertise-header">
                  <span class="expertise-icon design"></span>
                  <h2>Design</h2>
                </div>
                <p class="expertise-description">
                  Proficient in UX design tools including Figma, Photoshop, and prototyping frameworks. Experienced in creating wireframes, user journeys, and visual content for digital marketing campaigns. Successfully designed game narratives, character development, and user interfaces that enhanced player engagement. My design approach focuses on bridging communication between business, design, and engineering teams to deliver products that are both desirable and technically feasible.
                </p>
              </div>
              <a href="https://dribbble.com" target="_blank" class="expertise-link">View Dribbble</a>
            </div>
          </div>
        </section>

        <!-- Work Experience Section -->
        <section class="work-experience-section">
          <h2>Work Experience</h2>
          
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-date">
                <span class="date-range">Aug 2023 - Oct 2023</span>
                <div class="timeline-dot orange"></div>
              </div>
              <div class="timeline-content">
                <h3>Product Manager</h3>
                <div class="company-info">
                  <span class="company-name">Locas Technology CO., LTD</span>
                  <span class="location">Taipei, Taiwan</span>
                </div>
                <div class="job-description">
                  <p>Led product development for blockchain exchange platform from conception to testing phase.</p>
                  <ul>
                    <li>Defined product scope, features, and core user flows for blockchain-based exchange platform</li>
                    <li>Conducted competitive analysis and user flow research to refine product structure</li>
                    <li>Developed prototypes and flowcharts to visualize user experience and system logic</li>
                    <li>Collaborated with CEO to clarify client requirements and ensure functional feasibility</li>
                    <li>Conducted feature testing and proposed improvements to enhance front-end usability</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-date">
                <span class="date-range">Mar 2022 - May 2023</span>
                <div class="timeline-dot blue"></div>
              </div>
              <div class="timeline-content">
                <h3>Product Planner</h3>
                <div class="company-info">
                  <span class="company-name">BITAPE Logistics Technology CO., LTD</span>
                  <span class="location">Taichung, Taiwan</span>
                </div>
                <div class="job-description">
                  <p>Contributed to Freeport Metaverse game planning and coordination, integrating blockchain technology.</p>
                  <ul>
                    <li>Drafted and maintained whitepaper based on stakeholder input and development milestones</li>
                    <li>Managed community engagement and digital marketing campaigns (Discord & Twitter)</li>
                    <li>Designed game missions, narrative storylines, and character development</li>
                    <li>Conducted Beta testing and game mechanics optimization using data-driven insights</li>
                    <li>Supported virtual land sales achieving NT$5M+ transaction value</li>
                    <li>Coordinated cross-functional collaboration between developers and designers</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
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
              <button class="filter-btn" data-filter="devtools">Dev Tools</button>
              <button class="filter-btn" data-filter="opensource">Open Source</button>
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
  
  play: `
    <main class="page-content">
      <div class="hero-content">
        <h1>Play</h1>
        <div class="page-text">
          <p>This is where I showcase my creative projects and experimentations.</p>
          <p>Coming soon...</p>
        </div>
      </div>
    </main>

    ${footer}
  `,
  
  notes: `
    <main class="page-content notes-page">
      <div class="hero-content">
        <h1>My Notes</h1>
        <p class="notes-subtitle">Development insights, tutorials, and thoughts on web technologies</p>
        
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
            <button class="filter-btn" data-filter="life">Life</button>
            <button class="filter-btn" data-filter="life-exploration">Life Exploration</button>
            <button class="filter-btn" data-filter="technology-education">Technology & Education</button>
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
        <p class="contact-subtitle">Get in touch with me for work inquiries or just to say hello.</p>

        <div class="contact-wrapper">
          <!-- 左邊：聯絡表單 -->
          <div class="contact-form-section">
            <h3>Get In Touch</h3>
            <form class="contact-form">
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

              <button type="submit" class="submit-btn">Send Message</button>
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
                <a href="#" target="_blank" title="CV">
                  <span class="social-link-text">CV</span>
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="12" y1="11" x2="12" y2="17"></line>
                    <line x1="9" y1="14" x2="15" y2="14"></line>
                  </svg>
                </a>
                <span class="social-divider">/</span>
                <a href="./docs/ray.pdf" target="_blank" title="Download Resume" download>
                  <span class="social-link-text">Resume</span>
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14,2 14,8 20,8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10,9 9,9 8,9"></polyline>
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
    title: "E-Shopping Mall",
    category: "projects", 
    subtitle: "Full-featured shopping cart and checkout system",
    description: "Complete e-commerce application with shopping cart, product catalog, and checkout flow. Integrates Taiwan agricultural API data, features user authentication, Redux state management, and coupon system. Built with React and Bootstrap for responsive design.",
    technologies: ["React", "Redux", "Bootstrap"],
    website: "https://oorongteeshoppingmall1.netlify.app/",
    github: "https://github.com/oorongtee/ShoppingMall",
    image: "./assets/images/pic/358908403-37c23c03-6cc8-4943-b8b1-aca3178bee5f.png"
  },
  {
    id: 2,
    title: "2025 World Expo Website",
    category: "designs",
    subtitle: "Replica of Osaka World Expo 2025 official website", 
    description: "A faithful recreation of the 2025 Osaka World Expo official website with interactive animations and responsive design. Features hover effects, card animations, and mobile-friendly layout at 768px breakpoint, built entirely from scratch without copying original code.",
    technologies: ["HTML", "TailwindCSS", "JavaScript"],
    website: "https://2025worldexpopractice.netlify.app/",
    github: "https://github.com/oorongtee/2025worldexpo",
    image: "./assets/images/pic/358906446-d96358a5-d66f-4ede-ad02-c90d024f7903.png"
  },
  {
    id: 3,
    title: "Ray's Personal Website",
    category: "projects",
    subtitle: "Modern portfolio website with interactive features",
    description: "A modern personal portfolio website built with Vanilla JavaScript, featuring dynamic weather effects, AI chatbot assistant, and beautiful animations. Includes responsive design, single-page application architecture, and real-time Taiwan weather API integration with visual effects.",
    technologies: ["HTML5", "CSS3", "JavaScript ES6+", "Taiwan Weather API", "EmailJS"],
    website: "https://oorongtee.netlify.app",
    github: "https://github.com/oorongtee/personalWebsite",
    image: "./assets/images/pic/personal-website.jpg"
  },
  {
    id: 4,
    title: "Freeport Metaverse Game",
    category: "projects",
    subtitle: "Metaverse gaming platform with virtual asset management",
    description: "Contributed to planning and coordination of metaverse game featuring cross-platform virtual asset management. Managed community engagement across Discord & Twitter, drafted technical documentation, designed game missions and narratives. Coordinated cross-functional teams and achieved NT$5M+ in virtual land sales transactions.",
    technologies: ["Game Design", "Community Management", "Virtual Assets", "Content Strategy", "Project Management"],
    website: "#",
    github: "#",
    image: "./assets/images/pic/476145173_639227048630092_9063901635535859318_n.jpg"
  }
];

// Notes 頁面數據
const notesData = [
  {
    id: 1,
    title: "CSS for the shell of it",
    description: "Not all work needs to lead somewhere.",
    category: "development",
    date: "2024-03-15",
    icon: "css",
    color: "#61DAFB"
  },
  {
    id: 2,
    title: "How I leverage AI in my everyday work",
    description: "AI is here to eat all the things. Here's how I use it to my advantage.",
    category: "technology-education",
    date: "2024-03-10",
    icon: "ai",
    color: "#FF6B35"
  },
  {
    id: 3,
    title: "Throwaway projects are the best kinds of projects",
    description: "Not all ideas are good ideas. But thats a good thing.",
    category: "life-exploration",
    date: "2024-03-05",
    icon: "project",
    color: "#D63384"
  },
  {
    id: 4,
    title: "WIP: Cover Status Figma plugin",
    description: "I'm reworking my Cover Status plugin for Figma, here's a sneak peak.",
    category: "development",
    date: "2024-02-28",
    icon: "figma",
    color: "#8B5CF6"
  },
  {
    id: 5,
    title: "Flash to Figma: My love story with prototyping tools",
    description: "I've witnessed coding simplify and prototyping principles endure.",
    category: "life",
    date: "2024-02-20",
    icon: "design",
    color: "#EF4444"
  }
];

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
          <a href="${work.website}" target="_blank" class="detail-link">🔗 Website</a>
          <a href="${work.github}" target="_blank" class="detail-link">Github</a>
        </div>
      </div>
    `;
    worksDetailOverlay.classList.add('open');
  }

  // 關閉詳情面板
  function closeDetailPanel() {
    worksDetailOverlay.classList.remove('open');
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
        <div class="work-card-inner">
          <h3>${work.title}</h3>
          <p class="work-subtitle">${work.subtitle}</p>
        </div>
        <div class="work-card-hover-overlay">
          <div class="hover-content">
            <h3 class="hover-title">${work.title}</h3>
            <p class="hover-subtitle">${work.subtitle}</p>
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

  if (!notesGrid) return;

  // 渲染文章列表
  function renderNotes(filter = 'all', searchTerm = '') {
    notesGrid.innerHTML = '';
    
    let filtered = notesData;
    
    // 篩選分類
    if (filter !== 'all') {
      filtered = filtered.filter(note => note.category === filter);
    }
    
    // 搜尋篩選
    if (searchTerm) {
      filtered = filtered.filter(note => 
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    filtered.forEach(note => {
      const card = document.createElement('div');
      card.className = 'note-card';
      card.innerHTML = `
        <div class="note-content">
          <h3 class="note-title">${note.title}</h3>
          <p class="note-description">${note.description}</p>
        </div>
        <div class="note-icon" style="background-color: ${note.color}">
          ${getIconSVG(note.icon)}
        </div>
      `;
      
      card.addEventListener('click', () => {
        // 點擊文章卡片的動作（未來可以開啟文章詳情）
        console.log('Clicked note:', note.title);
      });
      
      notesGrid.appendChild(card);
    });
  }
  
  // 取得圖標 SVG
  function getIconSVG(iconType) {
    const icons = {
      css: '<svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.413l.213 2.622h10.125l-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/></svg>',
      ai: '<svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
      project: '<svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
      figma: '<svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.015-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148z"/></svg>',
      design: '<svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>'
    };
    return icons[iconType] || icons.design;
  }

  // 搜尋功能
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const activeFilter = document.querySelector('.notes-filter .filter-btn.active')?.dataset.filter || 'all';
      renderNotes(activeFilter, e.target.value);
    });
  }

  // 篩選功能
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const searchTerm = searchInput?.value || '';
      renderNotes(btn.dataset.filter, searchTerm);
    });
  });

  // 初始渲染
  renderNotes();
}

// 頁面加載時的初始化

// 修正 navigateTo 函數，確保正確處理首次載入和無效路由
function navigateTo(route) {
  console.log('Navigating to:', route);
  
  // 確保 app 元素存在
  if (!app) {
    console.error('错誤: app 元素不存在!');
    return;
  }
  
  const page = pages[route] || pages.home;
  console.log('Loading page content for route:', route);
  
  if (!page) {
    console.error('错誤: 找不到頁面內容:', route);
    return;
  }
  
  app.innerHTML = `<div class="main-content">${page}</div>`;
  console.log('Page content loaded successfully');
  console.log('App element after content load:', app);
  console.log('Content length:', page.length);
  window.scrollTo(0, 0);

  // 更新 URL
  const newHash = `#/${route}`;
  console.log('Setting hash to:', newHash);
  history.pushState(null, null, newHash);
  
  // 更新導航指示器
  if (navigation) {
    const activeLink = document.querySelector(`.nav a[data-route="${route}"]`);
    if (activeLink) {
      // 移除所有 active 類別
      document.querySelectorAll('.nav a').forEach(l => l.classList.remove('active'));
      // 添加 active 類別
      activeLink.classList.add('active');
      // 更新指示器位置
      navigation.updateIndicator(activeLink);
    }
  }

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
  
  // 如果是 contact 頁面，添加表單提交監聽
  if (route === 'contact') {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', handleContactFormSubmit);
    }
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
    if (activeLink) {
      const linkRect = activeLink.getBoundingClientRect();
      const navRect = nav.getBoundingClientRect();
      
      indicator.style.left = (activeLink.offsetLeft) + 'px';
      indicator.style.width = activeLink.offsetWidth + 'px';
      indicator.style.height = activeLink.offsetHeight + 'px';
    }
  }
  
  // 設置初始指示器位置（預設 home 頁面）
  const activeLink = document.querySelector('.nav a[data-route="home"]');
  if (activeLink) {
    activeLink.classList.add('active');
    setTimeout(() => updateIndicator(activeLink), 100);
  }
  
  return { indicator, updateIndicator };
}

// 全局導航對象
let navigation = null;

// 初始化導航事件監聽器
function initNavigation() {
  console.log('Setting up navigation event listeners...');
  
  // 導航連結點擊
  const navLinks = document.querySelectorAll('.nav a');
  console.log('Found navigation links:', navLinks.length);
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const route = link.getAttribute('data-route');
      console.log('Navigation clicked:', route);
      
      // 移除所有 active 類別
      document.querySelectorAll('.nav a').forEach(l => l.classList.remove('active'));
      
      // 添加 active 類別到當前連結
      link.classList.add('active');
      
      // 更新指示器位置
      if (navigation && navigation.updateIndicator) {
        navigation.updateIndicator(link);
      }
      
      navigateTo(route);
    });
  });

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

// ============================================
// EmailJS 初始化與表單提交
// ============================================

// 初始化 EmailJS
// 注意：需要替換為您的 Service ID 和 Public Key
emailjs.init("lH__yZMP01RGP0bD3");  // 已填入您的 Public Key

// 處理表單提交
function handleContactFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  
  // 獲取表單數據
  const name = form.querySelector('input[placeholder="Please enter your name"]')?.value || '';
  const email = form.querySelector('input[placeholder="Please enter your email"]')?.value || '';
  const subject = form.querySelector('input[placeholder="Please enter your subject"]')?.value || '';
  const message = form.querySelector('textarea[placeholder="Please enter your message"]')?.value || '';
  
  // 驗證表單
  if (!name || !email || !subject || !message) {
    alert('Please fill in all required fields');
    return;
  }
  
  // 準備郵件參數（確保變數名稱與 EmailJS 模板一致）
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
      alert('Message sent successfully! ✓');
      form.reset();
    }, function(error) {
      console.log('FAILED...', error);
      console.log('Error details:', error.text);
      alert(`Failed to send message: ${error.text || 'Unknown error'}. Please check console for details.`);
    });
}

// 輪播功能
function initCarousels() {
  // 初始化影片輪播
  const videos = document.querySelectorAll('.nature-video');
  if (videos.length > 1) {
    let currentVideoIndex = 0;
    
    // 確保第一個影片開始播放
    videos[0].play().catch(e => console.log('Video autoplay prevented:', e));
    
    setInterval(() => {
      videos[currentVideoIndex].classList.remove('active');
      videos[currentVideoIndex].pause(); // 暫停當前影片
      
      currentVideoIndex = (currentVideoIndex + 1) % videos.length;
      
      videos[currentVideoIndex].classList.add('active');
      videos[currentVideoIndex].currentTime = 0; // 重頭播放
      videos[currentVideoIndex].play().catch(e => console.log('Video play failed:', e));
    }, 5000); // 每5秒切換，給影片更多時間
  }
  
  // 初始化圖片輪播
  const images = document.querySelectorAll('.nature-image');
  if (images.length > 1) {
    let currentImageIndex = 0;
    
    setInterval(() => {
      images[currentImageIndex].classList.remove('active');
      currentImageIndex = (currentImageIndex + 1) % images.length;
      images[currentImageIndex].classList.add('active');
    }, 4000); // 每4秒切換
  }
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
  
  console.log('All systems initialized');
}

// 確保在 DOM 完全載入後初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  // DOM 已經載入完成，立即初始化
  initializeApp();
}