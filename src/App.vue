<template>
  <div id="app">
    <router-view />
    <NotificationSystem ref="notificationSystem" />
  </div>
</template>

<script>
import NotificationSystem from './components/NotificationSystem.vue'
import notificationService from './utils/notificationService'

export default {
  name: 'App',
  components: {
    NotificationSystem
  },
  async mounted() {
    // Attendre que le composant soit complètement monté
    await this.$nextTick()
    
    // Initialiser le service de notification avec le composant
    if (this.$refs.notificationSystem) {
      notificationService.setNotificationComponent(this.$refs.notificationSystem)
      console.log('Service de notification initialisé avec succès')
    } else {
      console.error('Composant NotificationSystem non trouvé')
    }
  },
  updated() {
    // Réinitialiser si nécessaire lors des mises à jour
    if (this.$refs.notificationSystem && !notificationService.notificationComponent) {
      notificationService.setNotificationComponent(this.$refs.notificationSystem)
    }
  }
}
</script>