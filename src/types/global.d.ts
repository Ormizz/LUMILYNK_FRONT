import { NotificationService } from '../utils/notificationService'

declare global {
  interface Window {
    $notify: NotificationService
  }
}

export {}

