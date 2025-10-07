import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import notificationService from './utils/notificationService'

// Importation des fichiers CSS personnalisés
import './assets/template/css/bootstrap.min.css'
import './assets/template/css/all.min.css'
import './assets/template/css/animate.css'
import './assets/template/css/magnific-popup.css'
import './assets/template/css/meanmenu.css'
import './assets/template/css/swiper-bundle.min.css'
import './assets/template/css/nice-select.css'
import './assets/template/css/main.css'
import './assets/template/css/responsive.css'

// Création de l'app et enregistrement global du composant v-select
const app = createApp(App)

app.component('v-select', vSelect)

// Rendre le service de notification disponible globalement
app.config.globalProperties.$notify = notificationService

// Fournir le service de notification pour la Composition API
app.provide('notify', notificationService)

// Exposer le service globalement via window pour compatibilité
window.$notify = notificationService

app.use(router)
app.mount('#app')
