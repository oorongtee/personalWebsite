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
    
    this.currentData = { ...this.defaultValues };
    this.isApiWorking = false;
    
    this.init();
  }
  
  async init() {
    console.log('🌬️ 初始化氣象視覺化系統...');
    
    // 創建風紋效果
    this.createWindRipples();
    
    // 創建溫度響應樹葉
    this.createLeaves();
    
    // 首次獲取數據
    await this.fetchWeatherData();
    
    // 開始視覚效果
    this.startVisualEffects();
    
    // 定期更新（每5分鐘）
    setInterval(() => this.fetchWeatherData(), 5 * 60 * 1000);
    
    console.log('✅ 氣象視覺化系統已啟動');
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
  }
  
  createWeatherDisplay() {
    // 創建氣象資訊顯示面板（隱藏狀態）
    const weatherPanel = document.createElement('div');
    weatherPanel.className = 'weather-display weather-hidden';
    weatherPanel.innerHTML = `
      <div class="weather-location">📍 Taipei, Taiwan</div>
      <div class="weather-item">
        <span class="weather-icon">💨</span>
        <span class="weather-value" id="windSpeed">--</span>
        <span class="weather-unit">m/s</span>
      </div>
      <div class="weather-item">
        <span class="weather-icon wind-direction" id="windDirection">🧭</span>
        <span class="weather-value" id="windDir">--</span>
        <span class="weather-unit">°</span>
      </div>
      <div class="weather-item">
        <span class="weather-icon">🌡️</span>
        <span class="weather-value" id="airTemp">--</span>
        <span class="weather-unit">°C</span>
      </div>
      <div class="weather-status-dot ${this.isApiWorking ? 'online' : 'offline'}" id="apiStatus"></div>
    `;
    
    document.body.appendChild(weatherPanel);
    this.weatherPanel = weatherPanel;
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
    const windSpeedEl = document.getElementById('windSpeed');
    const airTempEl = document.getElementById('airTemp');
    const windDirectionEl = document.getElementById('windDirection');
    const windDirEl = document.getElementById('windDir');
    const apiStatusEl = document.getElementById('apiStatus');
    
    if (windSpeedEl) windSpeedEl.textContent = this.currentData.windSpeed.toFixed(1);
    if (airTempEl) airTempEl.textContent = this.currentData.airTemperature.toFixed(1);
    if (windDirectionEl) {
      windDirectionEl.style.transform = `rotate(${this.currentData.windDirection}deg)`;
    }
    if (windDirEl) windDirEl.textContent = Math.round(this.currentData.windDirection);
    if (apiStatusEl) {
      apiStatusEl.className = `weather-status ${this.isApiWorking ? 'online' : 'offline'}`;
      apiStatusEl.textContent = this.isApiWorking ? '🟢 即時' : '🔴 預設';
    }
  }
  
  updateVisualEffects() {
    this.updateColorBlobsSpeed();
    this.updateWindRipples();
    this.updateTemperatureEffects();
    
    // 溫度變化時重新生成樹葉顏色
    if (this.leaves) {
      this.leaves.forEach(leaf => {
        leaf.color = this.getLeafColor(this.currentData.airTemperature);
      });
    }
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
    // 創建Canvas來繪製樹葉
    const canvas = document.createElement('canvas');
    canvas.className = 'weather-leaves';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.leaves = [];
    
    // 創建初始樹葉
    this.generateLeaves();
    
    // 添加點擊事件
    canvas.addEventListener('click', (e) => this.handleLeafClick(e));
    
    // 開始動畫
    this.animateLeaves();
    
    // 窗口大小改變時調整Canvas
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }
  
  generateLeaves() {
    // 根據溫度生成不同顏色的樹葉
    const temp = this.currentData.airTemperature;
    
    this.leaves = []; // 清空現有樹葉
    
    // 葉子躺在底部的基準位置 - 左下方優雅位置
    const bottomArea = {
      x: 80, // 距離左邊80px，更優雅的位置
      y: this.canvas.height - 80,  // 距離底部80px
      width: 60
    };
    
    // 創建單一精美葉子
    const leaf = {
      baseX: bottomArea.x, // 底部基準X位置
      baseY: bottomArea.y, // 底部基準Y位置
      x: bottomArea.x,
      y: bottomArea.y,
      size: 24, // 更大更顯眼的葉子
      rotation: Math.PI * 0.15, // 優雅的傾斜角度
      rotationSpeed: 0.003, // 緩慢旋轉
      windLift: 0, // 風力抬升高度
      windPhase: 0, // 風力相位
      color: this.getLeafColor(temp),
      clickable: true,
      pulsePhase: 0,
      layerIndex: 0,
      // 新增美化屬性
      shimmer: 0, // 微光效果
      shadowOpacity: 0.4, // 陰影透明度
      glowIntensity: 0.2 // 發光強度
    };
    
    this.leaves.push(leaf);
    
    // 設置點擊區域覆蓋葉子周圍
    this.buttonArea = {
      x: bottomArea.x - 40,
      y: bottomArea.y - 60,
      width: 120,
      height: 120
    };
  }
  
  getLeafColor(temperature) {
    if (temperature < 10) {
      // 棕色偏黑的枯葉 - 乾燥質感
      return {
        primary: '#3c2415',
        secondary: '#2a1810',
        accent: '#4d2f1a',
        texture: 'withered' // 枯萎紋理
      };
    } else if (temperature <= 20) {
      // 秋天的棕色 - 豐富層次
      return {
        primary: '#8b4513',
        secondary: '#a0522d',
        accent: '#cd853f',
        texture: 'autumn' // 秋季紋理
      };
    } else {
      // 綠色 - 新鮮光澤
      return {
        primary: '#228b22',
        secondary: '#32cd32',
        accent: '#90ee90',
        texture: 'fresh' // 新鮮紋理
      };
    }
  }
  
  drawLeaf(leaf) {
    this.ctx.save();
    this.ctx.translate(leaf.x, leaf.y);
    this.ctx.rotate(leaf.rotation);
    
    // 優雅的脈動效果
    let size = leaf.size + Math.sin(leaf.pulsePhase) * 0.8;
    
    // 處理點擊動畫
    if (leaf.clickAnimation) {
      const progress = leaf.clickAnimation.progress / leaf.clickAnimation.duration;
      const scale = 1 + (leaf.clickAnimation.scale - 1) * (1 - progress);
      size *= scale;
      
      // 點擊時的額外上升效果
      const extraLift = leaf.clickAnimation.extraLift * (1 - progress);
      this.ctx.translate(0, -extraLift);
      
      leaf.clickAnimation.progress++;
      if (leaf.clickAnimation.progress >= leaf.clickAnimation.duration) {
        delete leaf.clickAnimation;
      }
    }
    
    // 繪製柔和的外發光
    this.ctx.save();
    this.ctx.shadowColor = leaf.color.accent;
    this.ctx.shadowBlur = 15;
    this.ctx.globalAlpha = leaf.glowIntensity;
    this.drawRealisticLeafShape(size * 1.1, leaf.color);
    this.ctx.restore();
    
    // 繪製優雅的陰影
    this.ctx.save();
    this.ctx.translate(3, 4);
    this.ctx.globalAlpha = leaf.shadowOpacity;
    this.drawRealisticLeafShape(size * 0.98, { 
      primary: 'rgba(42, 24, 16, 0.6)', 
      secondary: 'rgba(42, 24, 16, 0.4)', 
      accent: 'rgba(42, 24, 16, 0.3)' 
    });
    this.ctx.restore();
    
    // 繪製主要葉子
    this.drawRealisticLeafShape(size, leaf.color);
    
    // 添加微光效果
    this.addShimmerEffect(size, leaf);
    
    // 添加溫度相關的紋理效果
    this.addTemperatureTexture(size, leaf.color);
    
    // 添加光照效果
    this.addLeafHighlights(size, leaf.color);
    
    // 繪製精細葉脈
    this.drawDetailedVeins(size, leaf.color);
    
    // 添加邊緣光澤
    this.addEdgeGlow(size, leaf.color);
    
    this.ctx.restore();
  }
  
  drawRealisticLeafShape(size, color) {
    // 確保 color 對象有效
    if (!color || typeof color !== 'object') {
      console.warn('drawRealisticLeafShape: invalid color object:', color);
      color = { primary: '#d4b896', secondary: '#c8a882', accent: '#e6d8c0' };
    }
    
    this.ctx.beginPath();
    
    // 使用貝塞爾曲線繪製真實葉子形狀
    const width = size * 0.6;
    const height = size;
    
    // 葉子頂部
    this.ctx.moveTo(0, -height * 0.5);
    
    // 右側曲線
    this.ctx.bezierCurveTo(
      width * 0.6, -height * 0.3,  // 控制點1
      width * 0.8, height * 0.1,   // 控制點2
      width * 0.3, height * 0.4    // 結束點
    );
    
    // 右下到底部的曲線
    this.ctx.bezierCurveTo(
      width * 0.2, height * 0.45,
      0, height * 0.5,
      0, height * 0.5
    );
    
    // 左側對稱曲線
    this.ctx.bezierCurveTo(
      -width * 0.2, height * 0.45,
      -width * 0.3, height * 0.4,
      -width * 0.3, height * 0.4
    );
    
    this.ctx.bezierCurveTo(
      -width * 0.8, height * 0.1,
      -width * 0.6, -height * 0.3,
      0, -height * 0.5
    );
    
    this.ctx.closePath();
    
    // 創建複雜漸變
    const gradient = this.ctx.createRadialGradient(
      -size * 0.2, -size * 0.3, 0,  // 內圓 (偏左上，模擬光照)
      0, 0, size * 0.8               // 外圓
    );
    
    gradient.addColorStop(0, this.adjustBrightness(color.accent, 40));  // 最亮點
    gradient.addColorStop(0.3, color.primary);                          // 主色
    gradient.addColorStop(0.7, color.secondary);                        // 次色
    gradient.addColorStop(1, this.adjustBrightness(color.secondary, -30)); // 邊緣較暗
    
    this.ctx.fillStyle = gradient;
    this.ctx.fill();
  }
  
  addLeafHighlights(size, color) {
    // 添加高光效果
    this.ctx.save();
    this.ctx.globalAlpha = 0.4;
    
    const highlight = this.ctx.createRadialGradient(
      -size * 0.15, -size * 0.25, 0,
      -size * 0.15, -size * 0.25, size * 0.3
    );
    highlight.addColorStop(0, this.adjustBrightness(color.accent, 60));
    highlight.addColorStop(1, 'transparent');
    
    this.ctx.fillStyle = highlight;
    
    // 繪製高光區域
    this.ctx.beginPath();
    this.ctx.ellipse(-size * 0.15, -size * 0.25, size * 0.2, size * 0.15, -0.3, 0, Math.PI * 2);
    this.ctx.fill();
    
    this.ctx.restore();
  }
  
  drawDetailedVeins(size, color) {
    this.ctx.save();
    this.ctx.strokeStyle = this.adjustBrightness(color.secondary, -40);
    this.ctx.globalAlpha = 0.7;
    
    // 主葉脈
    this.ctx.lineWidth = 1.5;
    this.ctx.beginPath();
    this.ctx.moveTo(0, -size * 0.4);
    this.ctx.quadraticCurveTo(-size * 0.05, 0, 0, size * 0.45);
    this.ctx.stroke();
    
    // 側葉脈
    this.ctx.lineWidth = 0.8;
    const veinCount = 6;
    
    for (let i = 0; i < veinCount; i++) {
      const progress = (i + 1) / (veinCount + 1);
      const y = -size * 0.3 + progress * size * 0.6;
      const maxWidth = this.getLeafWidthAtY(y, size);
      
      // 右側葉脈
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.quadraticCurveTo(
        maxWidth * 0.3, y - size * 0.05,
        maxWidth * 0.6, y + size * 0.08
      );
      this.ctx.stroke();
      
      // 左側葉脈
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.quadraticCurveTo(
        -maxWidth * 0.3, y - size * 0.05,
        -maxWidth * 0.6, y + size * 0.08
      );
      this.ctx.stroke();
    }
    
    this.ctx.restore();
  }
  
  getLeafWidthAtY(y, size) {
    // 計算葉子在特定Y位置的寬度（模擬真實葉子形狀）
    const normalizedY = (y + size * 0.5) / size; // 0到1之間
    
    if (normalizedY < 0.1) return size * 0.1;  // 頂部很窄
    if (normalizedY < 0.6) return size * 0.5 * Math.sin(normalizedY * Math.PI); // 中段最寬
    return size * 0.3 * (1 - normalizedY); // 底部漸窄
  }
  
  addShimmerEffect(size, leaf) {
    // 微光效果，隨時間變化
    const time = Date.now() * 0.003;
    leaf.shimmer = (Math.sin(time + leaf.layerIndex) + 1) * 0.5;
    
    this.ctx.save();
    this.ctx.globalAlpha = leaf.shimmer * 0.2;
    
    // 使用簡單的白色覆蓋層產生微光效果
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    
    // 繪製橢圓形光斑
    this.ctx.beginPath();
    this.ctx.ellipse(0, -size * 0.1, size * 0.3, size * 0.15, -0.3, 0, Math.PI * 2);
    this.ctx.fill();
    
    this.ctx.restore();
  }
  
  addEdgeGlow(size, color) {
    // 邊緣發光效果
    this.ctx.save();
    this.ctx.globalAlpha = 0.6;
    this.ctx.strokeStyle = color.accent;
    this.ctx.lineWidth = 1.5;
    this.ctx.shadowColor = color.accent;
    this.ctx.shadowBlur = 6;
    
    // 繪製葉子輪廓
    this.drawRealisticLeafOutline(size);
    this.ctx.stroke();
    
    this.ctx.restore();
  }
  
  drawRealisticLeafOutline(size) {
    // 繪製葉子輪廓路徑（與 drawRealisticLeafShape 相同但不填充）
    const width = size * 0.6;
    const height = size;
    
    this.ctx.beginPath();
    this.ctx.moveTo(0, -height * 0.5);
    
    // 右側曲線
    this.ctx.bezierCurveTo(
      width * 0.6, -height * 0.3,
      width * 0.8, height * 0.1,
      width * 0.3, height * 0.4
    );
    
    // 右下到底部
    this.ctx.bezierCurveTo(
      width * 0.2, height * 0.45,
      width * 0.05, height * 0.5,
      0, height * 0.5
    );
    
    // 左下到左側
    this.ctx.bezierCurveTo(
      -width * 0.05, height * 0.5,
      -width * 0.2, height * 0.45,
      -width * 0.3, height * 0.4
    );
    
    // 左側曲線
    this.ctx.bezierCurveTo(
      -width * 0.8, height * 0.1,
      -width * 0.6, -height * 0.3,
      0, -height * 0.5
    );
  }

  addTemperatureTexture(size, color) {
    this.ctx.save();
    
    switch(color.texture) {
      case 'withered':
        this.addWitheredTexture(size, color);
        break;
      case 'autumn':
        this.addAutumnTexture(size, color);
        break;
      case 'fresh':
        this.addFreshTexture(size, color);
        break;
    }
    
    this.ctx.restore();
  }
  
  addWitheredTexture(size, color) {
    // 枯葉的乾燥龜裂紋理
    this.ctx.globalAlpha = 0.4;
    this.ctx.strokeStyle = this.adjustBrightness(color.secondary, -50);
    this.ctx.lineWidth = 0.5;
    
    // 隨機裂痕
    for (let i = 0; i < 8; i++) {
      this.ctx.beginPath();
      const startX = (Math.random() - 0.5) * size * 0.8;
      const startY = (Math.random() - 0.5) * size * 0.8;
      const endX = startX + (Math.random() - 0.5) * size * 0.3;
      const endY = startY + (Math.random() - 0.5) * size * 0.3;
      
      this.ctx.moveTo(startX, startY);
      this.ctx.lineTo(endX, endY);
      this.ctx.stroke();
    }
    
    // 乾燥斑點
    this.ctx.fillStyle = this.adjustBrightness(color.primary, -30);
    for (let i = 0; i < 5; i++) {
      const x = (Math.random() - 0.5) * size * 0.6;
      const y = (Math.random() - 0.5) * size * 0.6;
      const radius = Math.random() * 2 + 1;
      
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }
  
  addAutumnTexture(size, color) {
    // 秋季葉子的豐富色彩變化
    this.ctx.globalAlpha = 0.3;
    
    // 色彩斑塊
    const patches = ['#ff6b35', '#f7931e', '#ffcc02', '#8b4513'];
    patches.forEach((patchColor, i) => {
      this.ctx.fillStyle = patchColor;
      const x = (Math.random() - 0.5) * size * 0.5;
      const y = (Math.random() - 0.5) * size * 0.5;
      const radius = size * (0.1 + Math.random() * 0.15);
      
      const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, patchColor);
      gradient.addColorStop(1, 'transparent');
      
      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }
  
  addFreshTexture(size, color) {
    // 新鮮葉子的光澤和水珠效果
    this.ctx.globalAlpha = 0.6;
    
    // 光澤帶
    const glossGradient = this.ctx.createLinearGradient(-size * 0.3, -size * 0.4, size * 0.2, size * 0.1);
    glossGradient.addColorStop(0, 'transparent');
    glossGradient.addColorStop(0.5, this.adjustBrightness(color.accent, 30));
    glossGradient.addColorStop(1, 'transparent');
    
    this.ctx.fillStyle = glossGradient;
    this.ctx.beginPath();
    this.ctx.ellipse(0, -size * 0.1, size * 0.4, size * 0.2, -0.3, 0, Math.PI * 2);
    this.ctx.fill();
    
    // 水珠效果
    this.ctx.globalAlpha = 0.8;
    this.ctx.fillStyle = this.adjustBrightness(color.accent, 50);
    
    for (let i = 0; i < 3; i++) {
      const x = (Math.random() - 0.5) * size * 0.4;
      const y = (Math.random() - 0.5) * size * 0.4;
      const radius = Math.random() * 1.5 + 0.5;
      
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, Math.PI * 2);
      this.ctx.fill();
      
      // 水珠高光
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      this.ctx.beginPath();
      this.ctx.arc(x - radius * 0.3, y - radius * 0.3, radius * 0.3, 0, Math.PI * 2);
      this.ctx.fill();
      
      this.ctx.fillStyle = this.adjustBrightness(color.accent, 50);
    }
  }
  
  adjustBrightness(hexColor, percent) {
    // 調整顏色亮度的輔助函數
    // 檢查輸入是否為字符串
    if (typeof hexColor !== 'string') {
      console.warn('adjustBrightness: hexColor is not a string:', hexColor);
      return '#d4b896'; // 返回默認顏色
    }
    
    // 確保顏色以 # 開頭
    if (!hexColor.startsWith('#')) {
      hexColor = '#' + hexColor;
    }
    
    const num = parseInt(hexColor.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  }
  
  animateLeaves() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // 獲取當前風速來計算風力效果
    const windSpeed = this.currentData.windSpeed;
    const windStrength = Math.min(windSpeed / 15, 1); // 0-1 的風力強度
    
    // 按層次順序繪製葉子
    const sortedLeaves = [...this.leaves].sort((a, b) => a.layerIndex - b.layerIndex);
    
    // 只有一片葉子，所以直接處理
    const leaf = this.leaves[0];
    if (leaf) {
      // 優雅的風力相位更新
      leaf.windPhase += 0.015 + windSpeed * 0.0008;
      
      // 更柔和的風力抬升效果
      const windLiftBase = Math.sin(leaf.windPhase) * windStrength * 45; // 減少抬升高度
      const windLiftVariation = Math.sin(leaf.windPhase * 1.5) * 12; // 微妙的變化
      leaf.windLift = Math.max(0, windLiftBase + windLiftVariation);
      
      // 優雅的水平飄移
      const horizontalDrift = Math.sin(leaf.windPhase * 0.6) * windStrength * 6;
      
      // 更新葉子位置
      leaf.x = leaf.baseX + horizontalDrift;
      leaf.y = leaf.baseY - leaf.windLift;
      
      // 緩慢優雅的旋轉
      leaf.rotation += leaf.rotationSpeed + windSpeed * 0.0003;
      
      // 柔和的脈動
      leaf.pulsePhase += 0.008;
      
      // 更新發光強度（根據風速變化）
      leaf.glowIntensity = 0.15 + windStrength * 0.1;
      
      // 更新陰影透明度（根據高度變化）
      leaf.shadowOpacity = 0.4 - (leaf.windLift / 100) * 0.2;
      
      this.drawLeaf(leaf);
    }
    
    requestAnimationFrame(() => this.animateLeaves());
  }
  
  handleLeafClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    // 檢查是否點擊到按鈕區域（更大的點擊範圍）
    if (this.buttonArea && 
        clickX >= this.buttonArea.x && 
        clickX <= this.buttonArea.x + this.buttonArea.width &&
        clickY >= this.buttonArea.y && 
        clickY <= this.buttonArea.y + this.buttonArea.height) {
      
      // 添加點擊回饋效果
      this.triggerClickFeedback();
      this.showWeatherPanel();
    }
  }
  
  triggerClickFeedback() {
    // 葉子點擊時的動畫回饋 - 模擬被風吹起
    this.leaves.forEach(leaf => {
      leaf.clickAnimation = {
        scale: 1.15,
        extraLift: 30, // 額外向上飄升30px
        duration: 40,
        progress: 0
      };
    });
  }
  
  // 移除透明背景，讓葉子自然存在
  
  drawRoundedRect(x, y, width, height, radius) {
    // 相容性圓角矩形繪製
    this.ctx.beginPath();
    this.ctx.moveTo(x + radius, y);
    this.ctx.lineTo(x + width - radius, y);
    this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    this.ctx.lineTo(x + width, y + height - radius);
    this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    this.ctx.lineTo(x + radius, y + height);
    this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    this.ctx.lineTo(x, y + radius);
    this.ctx.quadraticCurveTo(x, y, x + radius, y);
    this.ctx.closePath();
  }
  
  showWeatherPanel() {
    // 確保面板存在
    if (!this.weatherPanel) this.createWeatherDisplay();
    
    // 顯示天氣面板
    this.weatherPanel.classList.remove('weather-hidden');
    this.weatherPanel.classList.add('weather-visible');
    
    // 8秒後自動隱藏
    clearTimeout(this.hideTimeout);
    this.hideTimeout = setTimeout(() => {
      this.hideWeatherPanel();
    }, 8000);
    
    console.log('🍃 樹葉被點擊，顯示天氣面板');
  }
  
  hideWeatherPanel() {
    if (this.weatherPanel) {
      this.weatherPanel.classList.remove('weather-visible');
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