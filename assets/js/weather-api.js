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
      <div class="weather-status-dot ${this.isApiWorking ? 'online' : 'offline'}" id="apiStatus" title="${this.isApiWorking ? '即時數據' : '預設數據'}"></div>
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
    
    console.log('🔍 查找天氣顯示元素:', {
      windSpeedEl: !!windSpeedEl,
      airTempEl: !!airTempEl, 
      windDirectionEl: !!windDirectionEl,
      windDirEl: !!windDirEl,
      apiStatusEl: !!apiStatusEl
    });
    
    if (windSpeedEl) windSpeedEl.textContent = this.currentData.windSpeed.toFixed(1);
    if (airTempEl) airTempEl.textContent = this.currentData.airTemperature.toFixed(1);
    if (windDirectionEl) {
      windDirectionEl.style.transform = `rotate(${this.currentData.windDirection}deg)`;
    }
    if (windDirEl) windDirEl.textContent = Math.round(this.currentData.windDirection);
    if (apiStatusEl) {
      apiStatusEl.className = `weather-status-dot ${this.isApiWorking ? 'online' : 'offline'}`;
      apiStatusEl.title = this.isApiWorking ? '即時數據' : '預設數據';
    }
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
    // 檢查螢幕寬度，平板和手機不創建葉子
    if (window.innerWidth <= 768) {
      console.log('平板/手機設備，跳過葉子創建');
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
    
    // 切換天氣面板顯示/隱藏
    if (this.weatherPanel && this.weatherPanel.classList.contains('weather-visible')) {
      this.hideWeatherPanel();
    } else {
      this.showWeatherPanel();
    }
  }
  
  triggerClickFeedback() {
    // 葉子點擊時的動畫回饋 - 更自然的反饋效果
    if (this.leafSvg) {
      // 暫時停止呼吸動畫
      this.leafSvg.style.animation = 'none';
      
      // 點擊反饋動畫
      this.leafSvg.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
      this.leafSvg.style.transform = 'rotate(70deg) scale(1.15)';
      this.leafSvg.style.filter = 'brightness(1.4) drop-shadow(0 0 15px rgba(50, 205, 50, 0.8))';
      
      setTimeout(() => {
        this.leafSvg.style.transition = 'all 0.5s ease-out';
        this.leafSvg.style.transform = 'rotate(70deg) scale(1)';
        this.leafSvg.style.filter = 'drop-shadow(0 0 4px rgba(50, 205, 50, 0.3))';
      }, 300);
      
      setTimeout(() => {
        // 恢復呼吸動畫
        this.leafSvg.style.transition = '';
        this.leafSvg.style.animation = 'leafBreathing 3s ease-in-out infinite';
      }, 800);
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
    const isSmallScreen = window.innerWidth <= 768;
    
    if (isSmallScreen && this.leafSvg) {
      // 小螢幕時移除葉子
      this.leafSvg.remove();
      this.leafSvg = null;
      console.log('🔄 小螢幕模式：移除葉子');
    } else if (!isSmallScreen && !this.leafSvg) {
      // 大螢幕時重新創建葉子
      this.createLeaves();
      console.log('🔄 大螢幕模式：重新創建葉子');
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