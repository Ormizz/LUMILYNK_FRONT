<template>
  <div class="notification-container">
    <TransitionGroup 
      name="notification" 
      tag="div" 
      class="notifications-wrapper"
    >
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :class="[
          'notification',
          `notification-${notification.type}`,
          { 'notification-with-icon': notification.icon }
        ]"
        @click="removeNotification(notification.id)"
      >
        <div class="notification-content">
          <div v-if="notification.icon" class="notification-icon">
            <i :class="notification.icon"></i>
          </div>
          <div class="notification-body">
            <div v-if="notification.title" class="notification-title">
              {{ notification.title }}
            </div>
            <div class="notification-message">
              {{ notification.message }}
            </div>
          </div>
          <button 
            class="notification-close"
            @click.stop="removeNotification(notification.id)"
            aria-label="Fermer la notification"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div v-if="notification.progress" class="notification-progress">
          <div 
            class="notification-progress-bar"
            :style="{ width: notification.progress + '%' }"
          ></div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script>
import { ref, onUnmounted } from 'vue'

export default {
  name: 'NotificationSystem',
  setup() {
    const notifications = ref([])
    let autoRemoveTimers = new Map()

    // Types de notifications disponibles
    const notificationTypes = {
      success: { icon: 'fas fa-check-circle', class: 'success' },
      error: { icon: 'fas fa-exclamation-circle', class: 'error' },
      warning: { icon: 'fas fa-exclamation-triangle', class: 'warning' },
      info: { icon: 'fas fa-info-circle', class: 'info' },
      loading: { icon: 'fas fa-spinner fa-spin', class: 'loading' }
    }

    // Ajouter une notification
    const addNotification = (options) => {
      const {
        type = 'info',
        title = '',
        message = '',
        duration = 2000,
        persistent = false,
        progress = null,
        icon = null
      } = options

      const notification = {
        id: Date.now() + Math.random(),
        type,
        title,
        message,
        progress,
        icon: icon || notificationTypes[type]?.icon,
        timestamp: Date.now()
      }

      notifications.value.push(notification)

      // Auto-remove si pas persistant et durée définie
      if (!persistent && duration > 0) {
        const timer = setTimeout(() => {
          removeNotification(notification.id)
        }, duration)
        autoRemoveTimers.set(notification.id, timer)
      }

      return notification.id
    }

    // Supprimer une notification
    const removeNotification = (id) => {
      const index = notifications.value.findIndex(n => n.id === id)
      if (index > -1) {
        notifications.value.splice(index, 1)
        
        // Nettoyer le timer si il existe
        const timer = autoRemoveTimers.get(id)
        if (timer) {
          clearTimeout(timer)
          autoRemoveTimers.delete(id)
        }
      }
    }

    // Méthodes utilitaires pour chaque type
    const success = (message, title = '', options = {}) => {
      return addNotification({ type: 'success', message, title, ...options })
    }

    const error = (message, title = '', options = {}) => {
      return addNotification({ type: 'error', message, title, ...options })
    }

    const warning = (message, title = '', options = {}) => {
      return addNotification({ type: 'warning', message, title, ...options })
    }

    const info = (message, title = '', options = {}) => {
      return addNotification({ type: 'info', message, title, ...options })
    }

    const loading = (message, title = '', options = {}) => {
      return addNotification({ type: 'loading', message, title, persistent: true, ...options })
    }

    // Nettoyer toutes les notifications
    const clearAll = () => {
      notifications.value.forEach(notification => {
        removeNotification(notification.id)
      })
    }

    // Nettoyer les timers au démontage
    onUnmounted(() => {
      autoRemoveTimers.forEach(timer => clearTimeout(timer))
      autoRemoveTimers.clear()
    })

    return {
      notifications,
      addNotification,
      removeNotification,
      success,
      error,
      warning,
      info,
      loading,
      clearAll
    }
  }
}
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 99999;
  pointer-events: none;
}

.notifications-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
}

.notification {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-left: 4px solid;
  pointer-events: auto;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  z-index: 99999;
}

.notification:hover {
  transform: translateX(-4px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.notification-content {
  display: flex;
  align-items: flex-start;
  padding: 16px;
  gap: 12px;
}

.notification-icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.notification-body {
  flex: 1;
  min-width: 0;
}

.notification-title {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 4px;
  color: #1f2937;
}

.notification-message {
  font-size: 14px;
  line-height: 1.4;
  color: #6b7280;
}

.notification-close {
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.notification-close:hover {
  background: #f3f4f6;
  color: #6b7280;
}

.notification-progress {
  height: 3px;
  background: #e5e7eb;
  overflow: hidden;
}

.notification-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
  transition: width 0.3s ease;
}

/* Types de notifications */
.notification-success {
  border-left-color: #10b981;
}

.notification-success .notification-icon {
  color: #10b981;
}

.notification-error {
  border-left-color: #ef4444;
}

.notification-error .notification-icon {
  color: #ef4444;
}

.notification-warning {
  border-left-color: #f59e0b;
}

.notification-warning .notification-icon {
  color: #f59e0b;
}

.notification-info {
  border-left-color: #3b82f6;
}

.notification-info .notification-icon {
  color: #3b82f6;
}

.notification-loading {
  border-left-color: #8b5cf6;
}

.notification-loading .notification-icon {
  color: #8b5cf6;
}

/* Animations d'entrée et de sortie */
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.notification-move {
  transition: transform 0.3s ease;
}

/* Responsive */
@media (max-width: 768px) {
  .notification-container {
    top: 10px;
    right: 10px;
    left: 10px;
  }
  
  .notifications-wrapper {
    max-width: none;
  }
  
  .notification {
    margin-bottom: 8px;
  }
}
</style>
