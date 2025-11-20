/**
 * 🚨 現代化通知系統 (Modern Notification System)
 * 
 * 功能特點:
 * - 統一的通知管理架構
 * - 現代化毛玻璃視覺設計
 * - 智能通知防洪湧機制
 * - 無障礙支援 (ARIA labels, 鍵盤導航)
 * - 自適應定位系統
 * - 優先級管理系統
 * - 音效回饋支援
 * 
 * 使用方法:
 * NotificationManager.show('訊息內容', 'success'); // 成功通知
 * NotificationManager.show('錯誤訊息', 'error');   // 錯誤通知
 * NotificationManager.show('警告訊息', 'warning'); // 警告通知
 * NotificationManager.show('一般訊息', 'info');    // 資訊通知
 */

class NotificationManager {
  constructor() {
    this.notifications = new Map();
    this.container = null;
    this.maxNotifications = 5;
    this.defaultDuration = 5000;
    this.animationDuration = 300;
    this.soundEnabled = false;
    this.position = 'top-right'; // top-right, top-left, bottom-right, bottom-left, top-center, bottom-center
    
    this.initializeContainer();
    this.bindKeyboardEvents();
  }

  /**
   * 初始化通知容器
   */
  initializeContainer() {
    this.container = document.createElement('div');
    this.container.className = `notification-container notification-${this.position}`;
    this.container.setAttribute('role', 'region');
    this.container.setAttribute('aria-label', 'Notifications');
    this.container.setAttribute('aria-live', 'polite');
    document.body.appendChild(this.container);
  }

  /**
   * 綁定鍵盤事件 (無障礙支援)
   */
  bindKeyboardEvents() {
    document.addEventListener('keydown', (e) => {
      // ESC 鍵關閉所有通知
      if (e.key === 'Escape') {
        this.clearAll();
      }
      
      // Ctrl + Shift + N 鍵切換聲音
      if (e.ctrlKey && e.shiftKey && e.key === 'N') {
        this.toggleSound();
      }
    });
  }

  /**
   * 顯示通知
   * @param {string} message - 通知訊息
   * @param {string} type - 通知類型: success, error, warning, info
   * @param {Object} options - 選項配置
   */
  show(message, type = 'info', options = {}) {
    const config = {
      duration: options.duration || this.defaultDuration,
      persistent: options.persistent || false,
      actionButton: options.actionButton || null,
      icon: options.icon || this.getDefaultIcon(type),
      priority: options.priority || 'normal', // low, normal, high, critical
      onClose: options.onClose || null,
      allowDuplicates: options.allowDuplicates || false,
      ...options
    };

    // 防洪湧: 檢查是否已存在相同訊息
    if (!config.allowDuplicates) {
      const existingId = this.findExistingNotification(message, type);
      if (existingId) {
        this.refreshNotification(existingId);
        return existingId;
      }
    }

    // 如果達到最大通知數，移除最舊的
    if (this.notifications.size >= this.maxNotifications) {
      this.removeOldestNotification();
    }

    const notificationId = this.generateId();
    const notificationElement = this.createElement(notificationId, message, type, config);
    
    this.notifications.set(notificationId, {
      element: notificationElement,
      type,
      message,
      config,
      timestamp: Date.now()
    });

    this.container.appendChild(notificationElement);
    
    // 動畫進入
    requestAnimationFrame(() => {
      notificationElement.classList.add('notification-show');
    });

    // 播放聲音 (如果啟用)
    if (this.soundEnabled) {
      this.playNotificationSound(type);
    }

    // 自動關閉 (除非設為持久)
    if (!config.persistent && config.duration > 0) {
      setTimeout(() => {
        this.hide(notificationId);
      }, config.duration);
    }

    // 觸發顯示事件
    this.triggerEvent('notification:show', { id: notificationId, message, type, config });

    return notificationId;
  }

  /**
   * 隱藏通知
   * @param {string} notificationId - 通知 ID
   */
  hide(notificationId) {
    const notification = this.notifications.get(notificationId);
    if (!notification) return;

    const { element, config } = notification;

    // 動畫移除
    element.classList.add('notification-hide');
    
    setTimeout(() => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
      this.notifications.delete(notificationId);
      
      // 觸發關閉回調
      if (config.onClose) {
        config.onClose(notificationId);
      }
      
      // 觸發隱藏事件
      this.triggerEvent('notification:hide', { id: notificationId });
    }, this.animationDuration);
  }

  /**
   * 創建通知元素
   */
  createElement(id, message, type, config) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type} priority-${config.priority}`;
    notification.setAttribute('data-notification-id', id);
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', config.priority === 'critical' ? 'assertive' : 'polite');
    notification.setAttribute('tabindex', '-1');

    const iconHtml = config.icon ? `<div class="notification-icon">${config.icon}</div>` : '';
    const actionHtml = config.actionButton ? 
      `<button class="notification-action" aria-label="${config.actionButton.label}">${config.actionButton.text}</button>` : '';

    notification.innerHTML = `
      <div class="notification-content">
        ${iconHtml}
        <div class="notification-text">
          <div class="notification-message">${message}</div>
          ${config.subtitle ? `<div class="notification-subtitle">${config.subtitle}</div>` : ''}
        </div>
      </div>
      <div class="notification-controls">
        ${actionHtml}
        <button class="notification-close" aria-label="關閉通知" title="關閉通知 (ESC)">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
      <div class="notification-progress" aria-hidden="true"></div>
    `;

    // 綁定事件
    this.bindNotificationEvents(notification, id, config);

    return notification;
  }

  /**
   * 綁定通知事件
   */
  bindNotificationEvents(element, id, config) {
    const closeBtn = element.querySelector('.notification-close');
    const actionBtn = element.querySelector('.notification-action');
    const progressBar = element.querySelector('.notification-progress');

    // 關閉按鈕
    closeBtn.addEventListener('click', () => this.hide(id));

    // 動作按鈕
    if (actionBtn && config.actionButton) {
      actionBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (config.actionButton.onClick) {
          config.actionButton.onClick(id);
        }
        if (config.actionButton.closeOnClick !== false) {
          this.hide(id);
        }
      });
    }

    // 懸停暫停自動關閉
    if (!config.persistent && config.duration > 0) {
      let remainingTime = config.duration;
      let startTime = Date.now();
      let timeoutId;

      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const progress = (elapsed / config.duration) * 100;
        if (progressBar) {
          progressBar.style.width = `${Math.min(progress, 100)}%`;
        }
      };

      const progressInterval = setInterval(updateProgress, 50);

      element.addEventListener('mouseenter', () => {
        remainingTime = config.duration - (Date.now() - startTime);
        clearTimeout(timeoutId);
        clearInterval(progressInterval);
        if (progressBar) {
          progressBar.style.animationPlayState = 'paused';
        }
      });

      element.addEventListener('mouseleave', () => {
        if (remainingTime > 0) {
          startTime = Date.now();
          timeoutId = setTimeout(() => this.hide(id), remainingTime);
          const newInterval = setInterval(updateProgress, 50);
          setTimeout(() => clearInterval(newInterval), remainingTime);
        }
      });
    }

    // 鍵盤導航
    element.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (actionBtn) {
          actionBtn.click();
        }
      } else if (e.key === 'Escape') {
        this.hide(id);
      }
    });
  }

  /**
   * 獲取預設圖示
   */
  getDefaultIcon(type) {
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };
    return icons[type] || icons.info;
  }

  /**
   * 生成唯一 ID
   */
  generateId() {
    return `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 查找現有通知
   */
  findExistingNotification(message, type) {
    for (const [id, notification] of this.notifications) {
      if (notification.message === message && notification.type === type) {
        return id;
      }
    }
    return null;
  }

  /**
   * 刷新通知 (重置計時器)
   */
  refreshNotification(id) {
    const notification = this.notifications.get(id);
    if (notification) {
      notification.element.classList.add('notification-refresh');
      setTimeout(() => {
        notification.element.classList.remove('notification-refresh');
      }, 200);
    }
  }

  /**
   * 移除最舊的通知
   */
  removeOldestNotification() {
    let oldestId = null;
    let oldestTime = Date.now();

    for (const [id, notification] of this.notifications) {
      if (notification.timestamp < oldestTime) {
        oldestTime = notification.timestamp;
        oldestId = id;
      }
    }

    if (oldestId) {
      this.hide(oldestId);
    }
  }

  /**
   * 播放通知聲音
   */
  playNotificationSound(type) {
    // 使用 Web Audio API 生成簡單的提示音
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
      const audioContext = new (AudioContext || webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      const frequencies = {
        success: 800,
        error: 400,
        warning: 600,
        info: 700
      };

      oscillator.frequency.setValueAtTime(frequencies[type] || frequencies.info, audioContext.currentTime);
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    }
  }

  /**
   * 切換聲音啟用/禁用
   */
  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    this.show(
      `通知聲音已${this.soundEnabled ? '啟用' : '停用'}`, 
      'info', 
      { duration: 2000 }
    );
  }

  /**
   * 清除所有通知
   */
  clearAll() {
    const notificationIds = Array.from(this.notifications.keys());
    notificationIds.forEach(id => this.hide(id));
  }

  /**
   * 設置位置
   */
  setPosition(position) {
    this.container.className = `notification-container notification-${position}`;
    this.position = position;
  }

  /**
   * 觸發自定義事件
   */
  triggerEvent(eventType, detail) {
    const event = new CustomEvent(eventType, { detail });
    document.dispatchEvent(event);
  }

  /**
   * 快捷方法
   */
  success(message, options = {}) {
    return this.show(message, 'success', options);
  }

  error(message, options = {}) {
    return this.show(message, 'error', { duration: 7000, ...options });
  }

  warning(message, options = {}) {
    return this.show(message, 'warning', { duration: 6000, ...options });
  }

  info(message, options = {}) {
    return this.show(message, 'info', options);
  }

  /**
   * 批量顯示通知
   */
  showBatch(notifications) {
    return notifications.map(({ message, type, options }) => 
      this.show(message, type, options)
    );
  }

  /**
   * 獲取統計信息
   */
  getStats() {
    return {
      total: this.notifications.size,
      byType: Array.from(this.notifications.values()).reduce((stats, notification) => {
        stats[notification.type] = (stats[notification.type] || 0) + 1;
        return stats;
      }, {}),
      position: this.position,
      soundEnabled: this.soundEnabled
    };
  }
}

// 創建全域實例
const NotificationManager = new NotificationManager();

// 向後兼容的函數
function showSuccessMessage(message, container) {
  return NotificationManager.success(message);
}

function showErrorMessage(message, container) {
  return NotificationManager.error(message);
}

function showWarningMessage(message) {
  return NotificationManager.warning(message);
}

function showInfoMessage(message) {
  return NotificationManager.info(message);
}

// 全域暴露
if (typeof window !== 'undefined') {
  window.NotificationManager = NotificationManager;
  window.showSuccessMessage = showSuccessMessage;
  window.showErrorMessage = showErrorMessage;
  window.showWarningMessage = showWarningMessage;
  window.showInfoMessage = showInfoMessage;
}

// 模組導出 (如果支援)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NotificationManager;
}