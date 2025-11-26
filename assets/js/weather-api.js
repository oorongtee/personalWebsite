// 台灣氣象 API 整合
class WeatherVisualizer {
  constructor() {
    this.apiUrl = 'https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0001-001?Authorization=CWA-15726EE5-0376-4374-A584-5925C7EFEDB4&format=JSON&StationId=466920&StationName=466920&WeatherElement=&GeoInfo=';
    
    // 預設值（防止 API 失效時的備用）
    this.defaultValues = {
      windSpeed: 5,        // 預設風速 5 m/s
      windDirection: 180,  // 預設風向 南風
      airTemperature: 25   // 預設溫度 25°C
    };
    
    // 🎭 哲學引言配置
    this.philosophicalQuotes = [
      "What I see is thinking, what I hear is thinking too -- Deleuze",
      "Knowledge is not for knowing: knowledge is for cutting -- Foucault", 
      "The body is our general medium for having a world -- Merleau-Ponty"
    ];
    this.currentQuoteIndex = 0;
    
    this.currentData = { ...this.defaultValues };
    this.isApiWorking = false;
    
    this.init();
  }
  
  async init() {
    console.log('🌬️ 初始化氣象視覺化系統...');
    
    // 創建風紋效果
    this.createWindRipples();
    
    // 創建溫度響應樹葉 (改為SVG)
    this.createLeaves();
    
    // 首次獲取數據
    await this.fetchWeatherData();
    
    // 確保至少創建天氣面板，即使沒有數據
    if (!this.weatherPanel) {
      this.createWeatherDisplay();
    }
    
    // 強制第一次更新顯示
    this.updateWeatherDisplay();
    
    // 開始視覺效果
    this.startVisualEffects();
    
    // 定期更新（每5分鐘）
    setInterval(() => this.fetchWeatherData(), 5 * 60 * 1000);
    
    // 監聽窗口大小變化
    window.addEventListener('resize', () => this.handleResize());
    
    console.log('✅ 氣象視覺化系統已啟動', {
      currentData: this.currentData,
      panelExists: !!this.weatherPanel
    });
  }
  
  async fetchWeatherData() {
    try {
      console.log('📡 獲取氣象資料...');
      
      const response = await fetch(this.apiUrl);
      const data = await response.json();
      
      if (data.success === "true" && data.records && data.records.Station && data.records.Station.length > 0) {
        const station = data.records.Station[0];
        const weatherElement = station.WeatherElement;
        
        // 解析風速
        const windSpeedData = weatherElement.WindSpeed;
        if (windSpeedData && windSpeedData !== "-99" && !isNaN(parseFloat(windSpeedData))) {
          this.currentData.windSpeed = Math.max(0, Math.min(50, parseFloat(windSpeedData)));
        }
        
        // 解析風向
        const windDirectionData = weatherElement.WindDirection;
        if (windDirectionData && windDirectionData !== "-99" && !isNaN(parseFloat(windDirectionData))) {
          this.currentData.windDirection = parseFloat(windDirectionData) % 360;
        }
        
        // 解析氣溫
        const airTempData = weatherElement.AirTemperature;
        if (airTempData && airTempData !== "-99" && !isNaN(parseFloat(airTempData))) {
          this.currentData.airTemperature = parseFloat(airTempData);
        }
        
        this.isApiWorking = true;
        console.log('✅ 氣象資料更新成功:', this.currentData);
        
      } else {
        throw new Error('API 資料格式錯誤');
      }
      
    } catch (error) {
      console.warn('⚠️ API 獲取失敗，使用預設值:', error);
      this.isApiWorking = false;
      // 保持當前值或使用預設值
    }
    
    // 更新顯示
    this.updateWeatherDisplay();
    this.updateVisualEffects();
    
    // 創建天氣面板（首次數據獲取後）
    if (!this.weatherPanel) {
      this.createWeatherDisplay();
    }
    
    console.log('📊 天氣數據已更新並顯示:', {
      windSpeed: this.currentData.windSpeed,
      airTemp: this.currentData.airTemperature, 
      windDir: this.currentData.windDirection,
      isApiWorking: this.isApiWorking
    });
  }
  
  createWeatherDisplay() {
    // 天氣顯示面板功能已暫時停用
    // 天氣數據仍會在背景獲取並用於視覺效果
    console.log('🌤️ Weather display UI disabled - weather data still active for visual effects');
    return;
  }

  // 🎯 模組化側邊欄系統
  createSidebar() {
    // 定義側邊欄模組配置 (移除天氣模組)
    this.sidebarModules = [
      {
        id: 'music', 
        title: 'Music',
        svg: this.getMusicSVG(),
        action: () => this.toggleMusicPlayer(),
        panelClass: 'music-player'
      },
      {
        id: 'quote',
        title: 'Philosophy',
        svg: this.getQuoteSVG(),
        action: () => this.toggleQuoteWidget(),
        panelClass: 'quote-widget'
      }
      // 🔮 未來可輕鬆添加更多模組：
      // {
      //   id: 'theme',
      //   title: 'Theme Switcher', 
      //   svg: this.getThemeSVG(),
      //   action: () => this.toggleThemePanel(),
      //   panelClass: 'theme-panel'
      // }
    ];
    
    // 創建側邊欄容器
    const sidebar = document.createElement('div');
    sidebar.className = 'leaf-sidebar leaf-sidebar-hidden';
    
    // 動態生成按鈕
    const sidebarContent = document.createElement('div');
    sidebarContent.className = 'sidebar-content';
    
    this.sidebarModules.forEach(module => {
      const button = document.createElement('button');
      button.className = `sidebar-btn ${module.id}-btn`;
      button.setAttribute('data-panel', module.id);
      button.setAttribute('title', module.title);
      button.innerHTML = module.svg;
      
      // 添加點擊事件
      button.addEventListener('click', module.action);
      
      sidebarContent.appendChild(button);
    });
    
    sidebar.appendChild(sidebarContent);
    document.body.appendChild(sidebar);
    this.sidebar = sidebar;
    
    // 只有點擊葉子時才收起側邊欄和面板
    document.addEventListener('click', (e) => {
      const isClickOnPanel = e.target.closest('.weather-display, .music-player, .quote-widget');
      
      // 點擊葉子時關閉 sidebar 和所有面板
      if (this.leafSvg && this.leafSvg.contains(e.target)) {
        if (!sidebar.classList.contains('leaf-sidebar-hidden')) {
          this.hideSidebar();
          this.hideAllPanels();
        }
      }
      // 點擊面板或 sidebar 時不做任何操作，保持開啟狀態
      else if (isClickOnPanel || sidebar.contains(e.target)) {
        return;
      }
    });
  }

  toggleSidebar() {
    if (!this.sidebar) {
      this.createSidebar();
    }
    
    if (this.sidebar.classList.contains('leaf-sidebar-visible')) {
      this.hideSidebar();
    } else {
      this.showSidebar();
    }
  }

  showSidebar() {
    if (!this.sidebar) {
      this.createSidebar();
    }
    
    this.sidebar.classList.remove('leaf-sidebar-hidden');
    setTimeout(() => {
      this.sidebar.classList.add('leaf-sidebar-visible');
    }, 10);
  }

  hideSidebar() {
    if (this.sidebar) {
      this.sidebar.classList.remove('leaf-sidebar-visible');
      this.sidebar.classList.add('leaf-sidebar-hidden');
      
      // 同時隱藏所有面板
      this.hideWeatherPanel();
      this.hideMusicPlayer();
    }
  }

  // 🎯 統一面板管理 - 確保只有一個面板顯示
  hideAllPanels() {
    this.hideWeatherPanel();
    this.hideMusicPlayer();
    this.hideQuoteWidget();
  }

  toggleWeatherPanel() {
    if (!this.weatherPanel) {
      this.createWeatherDisplay();
    }
    
    if (this.weatherPanel.classList.contains('weather-visible')) {
      this.hideWeatherPanel();
    } else {
      // 隱藏所有其他面板
      this.hideMusicPlayer();
      this.hideQuoteWidget();
      this.showWeatherPanelInSidebar();
    }
  }

  showWeatherPanelInSidebar() {
    if (!this.weatherPanel) {
      this.createWeatherDisplay();
    }
    
    // 更新天氣數據
    this.updateWeatherDisplay();
    
    // 重新定位天氣面板到側邊欄上方
    this.weatherPanel.classList.remove('weather-hidden');
    this.weatherPanel.classList.add('weather-visible', 'weather-sidebar-mode');
    
    // 10秒後自動隱藏
    clearTimeout(this.hideTimeout);
    this.hideTimeout = setTimeout(() => {
      this.hideWeatherPanel();
    }, 10000);
  }

  createMusicPlayer() {
    if (this.musicPlayer) return;
    
    const musicPlayer = document.createElement('div');
    musicPlayer.className = 'music-player music-hidden';
    musicPlayer.innerHTML = `
      <div class="music-header">
        <h4>🎵 Music Player</h4>
        <button class="music-close" title="Close">&times;</button>
      </div>
      <div class="music-content">
        <iframe width="100%" height="166" scrolling="no" frameborder="no" 
          allow="autoplay; encrypted-media" 
          sandbox="allow-same-origin allow-scripts allow-popups"
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/682509758&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
        <div class="music-attribution">
          <a href="https://soundcloud.com/modernarecords" title="Moderna Records" target="_blank">Moderna Records</a> · 
          <a href="https://soundcloud.com/modernarecords/ed-carlsen-hands-heart" title="Ed Carlsen - Hands, Heart" target="_blank">Ed Carlsen - Hands, Heart</a>
        </div>
      </div>
    `;
    
    document.body.appendChild(musicPlayer);
    this.musicPlayer = musicPlayer;
    
    // 添加關閉按鈕事件
    const closeBtn = musicPlayer.querySelector('.music-close');
    closeBtn.addEventListener('click', () => this.hideMusicPlayer());
  }

  toggleMusicPlayer() {
    if (!this.musicPlayer) {
      this.createMusicPlayer();
    }
    
    if (this.musicPlayer.classList.contains('music-visible')) {
      this.hideMusicPlayer();
    } else {
      // 隱藏所有其他面板
      this.hideWeatherPanel();
      this.hideQuoteWidget();
      this.showMusicPlayer();
    }
  }

  showMusicPlayer() {
    if (!this.musicPlayer) {
      this.createMusicPlayer();
    }
    
    this.musicPlayer.classList.remove('music-hidden');
    setTimeout(() => {
      this.musicPlayer.classList.add('music-visible');
    }, 10);
  }

  hideMusicPlayer() {
    if (this.musicPlayer) {
      this.musicPlayer.classList.remove('music-visible');
      this.musicPlayer.classList.add('music-hidden');
    }
  }

  // 🎭 哲學引言面板控制
  toggleQuoteWidget() {
    if (!this.quoteWidget) {
      this.createQuoteWidget();
    }
    
    if (this.quoteWidget.classList.contains('quote-visible')) {
      this.hideQuoteWidget();
    } else {
      // 隱藏所有其他面板
      this.hideWeatherPanel();
      this.hideMusicPlayer();
      this.showQuoteWidget();
    }
  }

  showQuoteWidget() {
    if (!this.quoteWidget) {
      this.createQuoteWidget();
    }
    
    this.quoteWidget.classList.remove('quote-hidden');
    setTimeout(() => {
      this.quoteWidget.classList.add('quote-visible');
    }, 10);
  }

  hideQuoteWidget() {
    if (this.quoteWidget) {
      this.quoteWidget.classList.remove('quote-visible');
      this.quoteWidget.classList.add('quote-hidden');
    }
  }

  createQuoteWidget() {
    this.quoteWidget = document.createElement('div');
    this.quoteWidget.className = 'quote-widget quote-hidden';
    
    this.quoteWidget.innerHTML = `
      <div class="quote-content">
        <div class="quote-text">${this.philosophicalQuotes[this.currentQuoteIndex]}</div>
        <button class="quote-refresh" onclick="weatherVisualizer.refreshQuote()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M23 4v6h-6"/>
            <path d="M1 20v-6h6"/>
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10"/>
            <path d="M3.51 15a9 9 0 0 0 14.85 3.36L23 14"/>
          </svg>
        </button>
      </div>
    `;
    
    document.body.appendChild(this.quoteWidget);
  }

  refreshQuote() {
    this.currentQuoteIndex = (this.currentQuoteIndex + 1) % this.philosophicalQuotes.length;
    const quoteText = this.quoteWidget.querySelector('.quote-text');
    
    // 淡出動畫
    quoteText.style.opacity = '0';
    quoteText.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
      quoteText.textContent = this.philosophicalQuotes[this.currentQuoteIndex];
      quoteText.style.opacity = '1';
      quoteText.style.transform = 'translateY(0)';
    }, 200);
  }
  
  createWindRipples() {
    // 創建自然風紋波動背景
    const rippleContainer = document.createElement('div');
    rippleContainer.className = 'wind-ripples';
    
    // 創建多層波紋（4層以保持效能和視覺品質）
    for (let i = 0; i < 4; i++) {
      const ripple = document.createElement('div');
      ripple.className = `wind-ripple wind-ripple-${i}`;
      rippleContainer.appendChild(ripple);
    }
    
    document.body.appendChild(rippleContainer);
    this.rippleContainer = rippleContainer;
  }
  
  updateWeatherDisplay() {
    // 由於天氣UI已停用，只記錄數據更新
    console.log('🌤️ Weather data updated (UI disabled):', {
      windSpeed: this.currentData.windSpeed.toFixed(1) + ' m/s',
      temperature: this.currentData.airTemperature.toFixed(1) + '°C',
      windDirection: Math.round(this.currentData.windDirection) + '°'
    });
  }
  
  updateVisualEffects() {
    this.updateColorBlobsSpeed();
    this.updateWindRipples();
    this.updateTemperatureEffects();
    
    // 溫度變化時重新生成樹葉顏色
    this.updateLeafColor();
  }
  
  updateColorBlobsSpeed() {
    // 根據風速調整色塊移動速度 (0-50 m/s -> 20-5 秒)
    const windSpeed = this.currentData.windSpeed;
    const baseSpeed = 28; // 原始速度 28秒
    const speedMultiplier = Math.max(0.2, 1 - (windSpeed / 50)); // 風速越大，速度倍數越小
    const newDuration = baseSpeed * speedMultiplier;
    
    const colorBlobs = document.querySelectorAll('.color-blob');
    colorBlobs.forEach((blob, index) => {
      const individualSpeed = newDuration + (index * 8); // 保持個別差異
      blob.style.animationDuration = `${individualSpeed}s`;
    });
    
    console.log(`🌀 色塊速度已更新: ${newDuration.toFixed(1)}s (風速: ${windSpeed} m/s)`);
    
    // 同時更新風波紋效果
    this.updateWindRipplesIntensity();
  }
  
  updateWindRipplesIntensity() {
    // 根據風速調整風波紋強度，但保持文字可讀性
    if (!this.rippleContainer) return;
    
    const windSpeed = this.currentData.windSpeed;
    
    // 移除所有風力等級 class
    this.rippleContainer.classList.remove('light-wind', 'moderate-wind', 'strong-wind');
    
    // 根據風速添加對應的 class（保持低透明度確保文字可讀）
    if (windSpeed <= 3) {
      this.rippleContainer.classList.add('light-wind');
    } else if (windSpeed <= 8) {
      this.rippleContainer.classList.add('moderate-wind');
    } else {
      this.rippleContainer.classList.add('strong-wind');
    }
    
    console.log(`💨 風波紋強度已更新: ${windSpeed <= 3 ? '輕柔微風' : windSpeed <= 8 ? '溫和風力' : '穩定強風'} (${windSpeed} m/s)`);
  }
  
  createLeaves() {
    // 檢查螢幕寬度，只在極小螢幕不創建葉子
    if (window.innerWidth <= 320) {
      console.log('極小螢幕設備，跳過葉子創建');
      return;
    }
    
    // 創建SVG葉子圖片
    const leafSvg = document.createElement('div');
    leafSvg.className = 'weather-leaf-svg';
    leafSvg.innerHTML = this.getLeafSVG();
    document.body.appendChild(leafSvg);
    
    this.leafSvg = leafSvg;
    
    // 添加點擊事件
    leafSvg.addEventListener('click', (e) => this.handleLeafClick(e));
    
    // 開始動畫
    this.animateLeafSvg();
    
    // 根據當前溫度更新葉子顏色（使用CSS濾鏡）
    this.updateLeafColor();
  }
  
  getLeafSVG() {
    // 直接使用img標籤載入外部SVG文件
    return `<img src="/assets/images/icons/leaf.svg" class="leaf-svg-icon" width="48" height="48" alt="Leaf" style="object-fit: contain;">`;
  }

  // 天氣SVG圖示
  getWeatherSVG() {
    return `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
        <circle cx="12" cy="7" r="2" opacity="0.6"/>
        <circle cx="8" cy="11" r="1.5" opacity="0.4"/>
        <circle cx="16" cy="13" r="1" opacity="0.3"/>
      </svg>
    `;
  }

  // 音樂SVG圖示
  getMusicSVG() {
    return `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 18V5l12-2v13"/>
        <circle cx="6" cy="18" r="3" opacity="0.8"/>
        <circle cx="18" cy="16" r="3" opacity="0.8"/>
        <path d="M9 9l12-2" opacity="0.6"/>
        <circle cx="9" cy="12" r="1" opacity="0.4"/>
        <circle cx="21" cy="10" r="1" opacity="0.4"/>
      </svg>
    `;
  }

  // 引言SVG圖示
  getQuoteSVG() {
    return `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M7.5 8.25h9m-9 3H12"/>
        <path d="M7.5 3v2.25M16.5 3v2.25"/>
        <path d="M3.75 9.75h16.5"/>
        <rect x="3.75" y="5.25" width="16.5" height="13.5" rx="2" ry="2" opacity="0.3"/>
        <circle cx="9" cy="12" r="0.5" opacity="0.6"/>
        <circle cx="12" cy="12" r="0.5" opacity="0.6"/>
        <circle cx="15" cy="12" r="0.5" opacity="0.6"/>
      </svg>
    `;
  }

  // 🔧 模組管理系統
  addSidebarModule(moduleConfig) {
    if (!this.sidebarModules) this.sidebarModules = [];
    
    // 檢查模組ID是否已存在
    if (this.sidebarModules.find(m => m.id === moduleConfig.id)) {
      console.warn(`Module ${moduleConfig.id} already exists`);
      return false;
    }
    
    // 添加新模組
    this.sidebarModules.push(moduleConfig);
    
    // 重新創建側邊欄
    if (this.sidebar) {
      this.sidebar.remove();
      this.createSidebar();
    }
    
    return true;
  }

  removeSidebarModule(moduleId) {
    if (!this.sidebarModules) return false;
    
    const index = this.sidebarModules.findIndex(m => m.id === moduleId);
    if (index === -1) return false;
    
    // 移除模組
    this.sidebarModules.splice(index, 1);
    
    // 重新創建側邊欄
    if (this.sidebar) {
      this.sidebar.remove();
      this.createSidebar();
    }
    
    return true;
  }

  // 🎨 未來擴展的SVG模板
  getThemeSVG() {
    return `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        <circle cx="12" cy="6" r="1" opacity="0.6"/>
        <circle cx="17" cy="12" r="1" opacity="0.4"/>
        <circle cx="12" cy="18" r="1" opacity="0.3"/>
      </svg>
    `;
  }

  getSettingsSVG() {
    return `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
        <circle cx="12" cy="5" r="1" opacity="0.5"/>
        <circle cx="12" cy="19" r="1" opacity="0.5"/>
      </svg>
    `;
  }
  
  getLeafSVGColor(temperature) {
    if (temperature < 10) {
      return {
        primary: '#8B4513',
        secondary: '#A0522D', 
        accent: '#CD853F',
        vein: '#654321'
      };
    } else if (temperature <= 20) {
      return {
        primary: '#228B22',
        secondary: '#32CD32',
        accent: '#90EE90', 
        vein: '#006400'
      };
    } else {
      return {
        primary: '#32CD32',
        secondary: '#90EE90',
        accent: '#98FB98',
        vein: '#228B22'
      };
    }
  }

  animateLeafSvg() {
    if (!this.leafSvg) return;
    
    // 獲取當前風速來計算風力效果
    const windSpeed = this.currentData.windSpeed;
    const windStrength = Math.min(windSpeed / 15, 1);
    
    // 更新風力相位 - 更緩慢的動畫
    if (!this.windPhase) this.windPhase = 0;
    this.windPhase += 0.008 + windSpeed * 0.0003; // 減慢動畫速度
    
    // 計算風力抬升效果 - 更柔和的上下浮動
    const windLiftBase = Math.sin(this.windPhase) * windStrength * 12; 
    const windLiftVariation = Math.sin(this.windPhase * 0.7) * 5; // 減少變化幅度
    const windLift = Math.max(0, windLiftBase + windLiftVariation);
    
    // 水平飄移 - 更自然的左右擺動
    const horizontalDrift = Math.sin(this.windPhase * 0.4) * windStrength * 6;
    const horizontalSway = Math.sin(this.windPhase * 0.3) * 3; // 添加微妙的擺動
    const totalHorizontalMove = horizontalDrift + horizontalSway;
    
    // 旋轉效果 - 基於70度的微妙擺動
    const baseRotation = 70; // 基礎旋轉70度
    const windRotation = Math.sin(this.windPhase * 0.5) * windStrength * 8; // 風力旋轉
    const gentleRotation = Math.sin(this.windPhase * 0.2) * 2; // 微妙的自然擺動
    const totalRotation = baseRotation + windRotation + gentleRotation;
    
    // 應用CSS變換
    this.leafSvg.style.transform = `translate(${totalHorizontalMove}px, ${-windLift}px) rotate(${totalRotation}deg)`;
    
    // 更新透明度（風越大越明顯）
    const opacity = 0.85 + windStrength * 0.15;
    this.leafSvg.style.opacity = opacity;
    
    requestAnimationFrame(() => this.animateLeafSvg());
  }
  
  handleLeafClick(e) {
    e.preventDefault();
    e.stopPropagation();
    
    // 添加點擊回饋效果
    this.triggerClickFeedback();
    
    // 顯示或隱藏側邊欄，同時隱藏所有面板
    if (!this.sidebar || this.sidebar.classList.contains('leaf-sidebar-hidden')) {
      this.showSidebar();
    } else {
      this.hideSidebar();
      this.hideAllPanels();
    }
  }
  
  triggerClickFeedback() {
    // 葉子點擊時的動畫回饋 - 輕微縮小到1.15倍（從1.3倍縮小）
    if (this.leafSvg) {
      // 暫時停止呼吸動畫
      this.leafSvg.style.animation = 'none';
      
      // 點擊反饋動畫 - 輕微縮小效果（從1到0.87，即1/1.15）
      this.leafSvg.style.transition = 'all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      this.leafSvg.style.transform = 'rotate(70deg) scale(0.87)';
      this.leafSvg.style.filter = 'brightness(1.1) drop-shadow(0 0 10px rgba(50, 205, 50, 0.6))';
      
      setTimeout(() => {
        this.leafSvg.style.transition = 'all 0.4s ease-out';
        this.leafSvg.style.transform = 'rotate(70deg) scale(1)';
        this.leafSvg.style.filter = 'drop-shadow(0 0 8px rgba(50, 205, 50, 0.4))';
      }, 250);
      
      setTimeout(() => {
        // 恢復呼吸動畫
        this.leafSvg.style.transition = '';
        this.leafSvg.style.animation = 'naturalBreathing 4s ease-in-out infinite';
      }, 650);
    }
  }
  
  showWeatherPanel() {
    // 確保面板存在
    if (!this.weatherPanel) this.createWeatherDisplay();
    
    // 強制更新天氣數據顯示
    this.updateWeatherDisplay();
    
    // 顯示天氣面板 - 添加漸進動畫
    this.weatherPanel.classList.remove('weather-hidden');
    
    // 使用setTimeout確保動畫效果
    setTimeout(() => {
      this.weatherPanel.classList.add('weather-visible');
    }, 10);
    
    // 10秒後自動隱藏（增加顯示時間）
    clearTimeout(this.hideTimeout);
    this.hideTimeout = setTimeout(() => {
      this.hideWeatherPanel();
    }, 10000);
    
    console.log('🍃 天氣葉子被點擊，顯示即時天氣面板', this.currentData);
  }
  
  hideWeatherPanel() {
    if (this.weatherPanel) {
      this.weatherPanel.classList.remove('weather-visible', 'weather-sidebar-mode');
      this.weatherPanel.classList.add('weather-hidden');
    }
  }
  
  updateWindRipples() {
    // 根據風速和風向更新風紋效果
    const windSpeed = this.currentData.windSpeed;
    const windDirection = this.currentData.windDirection;
    
    // 風紋強度 (0-50 m/s -> 0.3-0.8) - 提高基礎可見度
    const rippleIntensity = Math.max(0.3, Math.min(0.8, 0.3 + (windSpeed / 50) * 0.5));
    
    // 風紋頻率 (風速越大，波動越快)
    const rippleFrequency = Math.max(15, 45 - windSpeed * 0.6);
    
    const windRipples = document.querySelectorAll('.wind-ripple');
    windRipples.forEach((ripple, index) => {
      // 根據風向旋轉
      ripple.style.transform = `rotate(${windDirection}deg)`;
      
      // 根據風速調整動畫
      ripple.style.animationDuration = `${rippleFrequency + index * 3}s`;
      ripple.style.opacity = rippleIntensity;
    });
    
    console.log(`🌊 風紋已更新: 強度${rippleIntensity.toFixed(2)}, 方向${windDirection}°`);
  }
  
  updateTemperatureEffects() {
    // 根據氣溫調整綠色畫布色調，但保持色塊原始外觀
    const temperature = this.currentData.airTemperature;
    
    // 色溫調整 (10-40°C)
    const tempNormalized = Math.max(0, Math.min(1, (temperature - 10) / 30)); // 10-40°C -> 0-1
    
    // 只調整綠色畫布的色調
    const greenCanvas = document.querySelector('.green-canvas');
    if (greenCanvas) {
      // 低溫時增加藍色調，高溫時增加黃色調，但效果更微妙
      const hueShift = (tempNormalized - 0.5) * 10; // -5 到 +5 的色調偏移
      greenCanvas.style.filter = `hue-rotate(${hueShift}deg) saturate(${0.9 + tempNormalized * 0.2})`;
    }
    
    // 移除對色塊外觀的修改，保持原始設計
    const colorBlobs = document.querySelectorAll('.color-blob');
    colorBlobs.forEach(blob => {
      blob.style.filter = ''; // 清除濾鏡效果
    });
    
    console.log(`🌡️ 溫度效果已更新: ${temperature}°C (微調綠色畫布)`);
  }
  
  updateLeafColor() {
    if (this.leafSvg) {
      const temp = this.currentData.airTemperature;
      const color = this.getLeafSVGColor(temp);
      
      // 嘗試更新外部SVG的顏色（如果有對應元素）
      const gradient = this.leafSvg.querySelector('linearGradient');
      if (gradient) {
        const stops = gradient.querySelectorAll('stop');
        if (stops.length >= 3) {
          stops[0].setAttribute('stop-color', color.primary);
          stops[1].setAttribute('stop-color', color.secondary);
          stops[2].setAttribute('stop-color', color.accent);
        }
      }
      
      // 嘗試更新葉脈顏色
      const veins = this.leafSvg.querySelectorAll('path[stroke]');
      veins.forEach(vein => {
        vein.setAttribute('stroke', color.vein);
      });
      
      // 如果沒有找到可更新的元素，則透過CSS filter調整整體色調
      if (!gradient && veins.length === 0) {
        if (temp < 10) {
          // 低溫 - 棕色調
          this.leafSvg.style.filter = 'hue-rotate(30deg) saturate(0.8) brightness(0.9)';
        } else if (temp <= 20) {
          // 中溫 - 保持原色
          this.leafSvg.style.filter = 'none';
        } else {
          // 高溫 - 明亮綠色
          this.leafSvg.style.filter = 'hue-rotate(-10deg) saturate(1.2) brightness(1.1)';
        }
      }
    }
  }

  handleResize() {
    // 移除極小螢幕限制，讓所有尺寸都能顯示葉子
    // CSS會負責響應式調整
    
    // 如果葉子不存在，重新創建
    if (!this.leafSvg) {
      this.createLeaves();
      console.log('🔄 較大螢幕模式：重新創建葉子');
    }
  }

  startVisualEffects() {
    // 啟動所有視覺效果
    this.updateVisualEffects();
    
    // 定期微調動畫（每30秒）
    setInterval(() => {
      this.updateVisualEffects();
    }, 30000);
  }
}

// 當 DOM 載入完成後初始化 - 添加錯誤處理
function initWeatherVisualizer() {
  try {
    console.log('初始化 Weather Visualizer...');
    window.weatherVisualizer = new WeatherVisualizer();
    console.log('Weather Visualizer 初始化成功');
  } catch (error) {
    console.error('Weather Visualizer 初始化失敗:', error);
    // 即使失敗也不影響其他功能
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWeatherVisualizer);
} else {
  initWeatherVisualizer();
}