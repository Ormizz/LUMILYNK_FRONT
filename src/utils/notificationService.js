/**
 * Service de notification centralisé
 * Fournit une interface unifiée pour gérer les notifications dans l'application
 */

class NotificationService {
  constructor() {
    this.notificationComponent = null
    this.queue = []
    this.isReady = false
  }

  /**
   * Définit le composant de notification à utiliser
   * @param {Object} component - Instance du composant NotificationSystem
   */
  setNotificationComponent(component) {
    this.notificationComponent = component
    this.isReady = true
    
    // Traiter la queue des notifications en attente
    this.processQueue()
  }

  /**
   * Traite la queue des notifications en attente
   */
  processQueue() {
    if (!this.isReady || this.queue.length === 0) return
    
    while (this.queue.length > 0) {
      const notification = this.queue.shift()
      this._showNotification(notification)
    }
  }

  /**
   * Affiche une notification
   * @param {Object} options - Options de la notification
   * @returns {number|string} ID de la notification
   */
  _showNotification(options) {
    if (!this.isReady || !this.notificationComponent) {
      // Mettre en queue si le service n'est pas prêt
      this.queue.push(options)
      return null
    }

    return this.notificationComponent.addNotification(options)
  }

  /**
   * Affiche une notification de succès
   * @param {string} message - Message de la notification
   * @param {string} title - Titre de la notification (optionnel)
   * @param {Object} options - Options supplémentaires
   * @returns {number|string} ID de la notification
   */
  success(message, title = '', options = {}) {
    return this._showNotification({
      type: 'success',
      message,
      title,
      ...options
    })
  }

  /**
   * Affiche une notification d'erreur
   * @param {string} message - Message de la notification
   * @param {string} title - Titre de la notification (optionnel)
   * @param {Object} options - Options supplémentaires
   * @returns {number|string} ID de la notification
   */
  error(message, title = '', options = {}) {
    return this._showNotification({
      type: 'error',
      message,
      title,
      ...options
    })
  }

  /**
   * Affiche une notification d'avertissement
   * @param {string} message - Message de la notification
   * @param {string} title - Titre de la notification (optionnel)
   * @param {Object} options - Options supplémentaires
   * @returns {number|string} ID de la notification
   */
  warning(message, title = '', options = {}) {
    return this._showNotification({
      type: 'warning',
      message,
      title,
      ...options
    })
  }

  /**
   * Affiche une notification d'information
   * @param {string} message - Message de la notification
   * @param {string} title - Titre de la notification (optionnel)
   * @param {Object} options - Options supplémentaires
   * @returns {number|string} ID de la notification
   */
  info(message, title = '', options = {}) {
    return this._showNotification({
      type: 'info',
      message,
      title,
      ...options
    })
  }

  /**
   * Affiche une notification de chargement
   * @param {string} message - Message de la notification
   * @param {string} title - Titre de la notification (optionnel)
   * @param {Object} options - Options supplémentaires
   * @returns {number|string} ID de la notification
   */
  loading(message, title = '', options = {}) {
    return this._showNotification({
      type: 'loading',
      message,
      title,
      persistent: true,
      ...options
    })
  }

  /**
   * Supprime une notification spécifique
   * @param {number|string} id - ID de la notification à supprimer
   */
  remove(id) {
    if (this.isReady && this.notificationComponent) {
      this.notificationComponent.removeNotification(id)
    }
  }

  /**
   * Supprime toutes les notifications
   */
  clearAll() {
    if (this.isReady && this.notificationComponent) {
      this.notificationComponent.clearAll()
    }
  }

  /**
   * Met à jour le progrès d'une notification
   * @param {number|string} id - ID de la notification
   * @param {number} progress - Progression (0-100)
   */
  updateProgress(id, progress) {
    if (this.isReady && this.notificationComponent) {
      // Trouver la notification et mettre à jour son progrès
      const notification = this.notificationComponent.notifications.find(n => n.id === id)
      if (notification) {
        notification.progress = Math.max(0, Math.min(100, progress))
      }
    }
  }

  /**
   * Notification de succès pour l'upload de fichier
   * @param {string} documentType - Type de document uploadé
   * @returns {number|string} ID de la notification
   */
  fileUploaded(documentType) {
    return this.success(
      `${documentType} uploadé avec succès !`,
      'Upload réussi',
      { duration: 4000 }
    )
  }

  /**
   * Notification d'erreur pour l'upload de fichier
   * @param {string} documentType - Type de document
   * @returns {number|string} ID de la notification
   */
  fileUploadError(documentType) {
    return this.error(
      `Erreur lors de l'upload de ${documentType}`,
      'Échec de l\'upload',
      { duration: 6000 }
    )
  }

  /**
   * Notification de succès pour la suppression de fichier
   * @param {string} documentType - Type de document supprimé
   * @returns {number|string} ID de la notification
   */
  fileDeleted(documentType) {
    return this.success(
      `${documentType} supprimé avec succès !`,
      'Suppression réussie',
      { duration: 4000 }
    )
  }

  /**
   * Notification d'erreur pour la suppression de fichier
   * @param {string} documentType - Type de document
   * @returns {number|string} ID de la notification
   */
  fileDeleteError(documentType) {
    return this.error(
      `Erreur lors de la suppression de ${documentType}`,
      'Échec de la suppression',
      { duration: 6000 }
    )
  }

  /**
   * Notification de succès pour la mise à jour de fichier
   * @param {string} documentType - Type de document mis à jour
   * @returns {number|string} ID de notification
   */
  fileUpdated(documentType) {
    return this.success(
      `${documentType} mis à jour avec succès !`,
      'Mise à jour réussie',
      { duration: 4000 }
    )
  }

  /**
   * Notification d'erreur pour la mise à jour de fichier
   * @param {string} documentType - Type de document
   * @returns {number|string} ID de notification
   */
  fileUpdateError(documentType) {
    return this.error(
      `Erreur lors de la mise à jour de ${documentType}`,
      'Échec de la mise à jour',
      { duration: 6000 }
    )
  }

  /**
   * Vérifie si le service est prêt
   * @returns {boolean}
   */
  isServiceReady() {
    return this.isReady && this.notificationComponent !== null
  }

  /**
   * Notifications utilitaires supplémentaires utilisées dans l'app
   */
  updated(resourceName = 'Élément') {
    return this.success(
      `${resourceName} mis à jour avec succès !`,
      'Mise à jour réussie',
      { duration: 2000 }
    )
  }

  deleted(resourceName = 'Élément') {
    return this.success(
      `${resourceName} supprimé avec succès !`,
      'Suppression réussie',
      { duration: 2000 }
    )
  }

  logoutSuccess() {
    return this.info(
      'Vous avez été déconnecté(e).',
      'Déconnexion',
      { duration: 2000 }
    )
  }

  validationError(message = 'Veuillez vérifier les champs du formulaire.') {
    return this.warning(
      message,
      'Erreur de validation',
      { duration: 4000 }
    )
  }

  networkError() {
    return this.error(
      'Erreur de connexion au serveur. Réessayez plus tard.',
      'Erreur réseau',
      { duration: 5000 }
    )
  }

  unauthorized() {
    return this.error(
      'Session expirée ou accès non autorisé.',
      'Non autorisé',
      { duration: 4000 }
    )
  }

  /**
   * Affiche un succès puis redirige après un délai
   * @param {string} message
   * @param {string} title
   * @param {string} path
   * @param {number} delayMs
   */
  successAndRedirect(message, title = 'Succès', path = '/', delayMs = 2000) {
    this.success(message, title, { duration: delayMs })
    setTimeout(() => {
      window.location.href = path
    }, delayMs)
  }
}

// Créer une instance singleton
const notificationService = new NotificationService()

export default notificationService
